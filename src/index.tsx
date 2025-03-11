import { Hono } from "hono";
import { renderer } from "./renderer";
import { Layout } from "./layout";
import { Info } from "./compontents/info";
import { CertificateViewer } from "./compontents/certificateViewer";
import { generateSVGFromElement } from "./lib";
import { SampleCert } from "./compontents/sample-cert";
import { createDb } from "./db";
import { z } from "zod";
import { jwtDecode, zodValidator } from "./lib/validators";
import { CertificateElements, certificatesTable } from "./db/schema";
import { v7 as uuid } from "uuid";
import { eq } from "drizzle-orm";
import { format } from "date-fns/format";
import { cors } from 'hono/cors'
import { Resvg } from '@resvg/resvg-js';

type Bindings = {
  DB: D1Database;
  CERT_KEY: string;
};

type Variables = {
  db: ReturnType<typeof createDb>;
};
const inputSchema = z.object({
  data: z.string().min(10),
});
const newCertSchema = z.object({
  id: z.string().uuid().optional(),
  reciptent: z.string(),
  reciptentDescription: z.string(),
  issuer: z.string().optional(),
  issuerDescription: z.string().optional(),
  issuedFor: z.string(),
  issuedForDescription: z.string(),
  certificateElements: z.array(
    z.object({
      text: z.string(),
      styles: z.object({}).passthrough(),
    })
  ),
  height: z.number(),
  width: z.number(),
  fonts: z.array(z.string()),
  certificateBackground: z.string(),
});

const app = new Hono<{
  Bindings: Bindings;
  Variables: Variables;
}>()
  .use(renderer)
  .use(cors())
  .use("*", async (c, next) => {
    c.set("db", createDb(c.env.DB));
    await next();
  })
  .get("/cert/:certId", async (c) => {
    const certId = c.req.param("certId");
    const db = c.get("db");
    const cert = await db
      .select()
      .from(certificatesTable)
      .where(eq(certificatesTable.id, certId))
      .get();
    if (!cert) return c.text("Certificate not found", 404);
    return c.render(
      <Layout id={cert.id} reciptent={cert.reciptent} issuedFor={cert.issuedFor}>
        <div class="grid grid-cols-4 flex-1 !h-full">
          <CertificateViewer id={cert.id} />
          <Info
            date={format(new Date(cert.issuedAt), "dd-MM-yyyy p")}
            id={cert.id}
            issuer={cert.issuer}
            issuerDescription={cert.issuerDescription}
            reciptent={cert.reciptent}
            reciptentDescription={cert.reciptentDescription}
          />
        </div>
      </Layout>
    );
  })
  .get("/cert/:certId/image.svg", async (c) => {
    const certId = c.req.param("certId");
    const bg = c.req.query("bg") === "false" ? false : true;
    const db = c.get("db");
    const cert = await db
      .select()
      .from(certificatesTable)
      .where(eq(certificatesTable.id, certId))
      .get();
    if (!cert) return c.text("Certificate not found", 404);
    const v = await generateSVGFromElement(
      (
        <SampleCert
          height={cert.height}
          width={cert.width}
          image={bg ? cert.certificateBackground : undefined}
          items={JSON.parse(cert.certificateElements) as CertificateElements}
        />
      ) as any,
      cert.fonts ? (JSON.parse(cert.fonts) as string[]) : ["Roboto Condensed"],
      cert.width,
      cert.height
    );
    c.res.headers.set("Content-Type", "image/svg+xml");
    return new Response(v, {
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
      },
    });
  })
  .get("/cert/:certId/image.png", async (c) => {
    const certId = c.req.param("certId");
    const bg = c.req.query("bg") === "false" ? false : true;
    const db = c.get("db");
    const cert = await db
      .select()
      .from(certificatesTable)
      .where(eq(certificatesTable.id, certId))
      .get();
    if (!cert) return c.text("Certificate not found", 404);
    const v = await generateSVGFromElement(
      (
        <SampleCert
          height={cert.height}
          width={cert.width}
          image={bg ? cert.certificateBackground : undefined}
          items={JSON.parse(cert.certificateElements) as CertificateElements}
        />
      ) as any,
      cert.fonts ? (JSON.parse(cert.fonts) as string[]) : ["Roboto Condensed"],
      cert.width,
      cert.height
    );

    try {
      // Convert SVG string to PNG using Resvg
      const resvg = new Resvg(v);
      const pngData = resvg.render();
      const pngBuffer = pngData.asPng();
  
      // Return the PNG as a response
      return new Response(pngBuffer, {
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=604800', // Optional caching
        },
      });
    } catch (error) {
      console.error('Error converting SVG to PNG:', error);
      return c.text('Error generating PNG', 500);
    }
  })
  .put("/generate-cert", zodValidator(inputSchema), async (c) => {
    const { data } = c.req.valid("json");

    const key = c.env.CERT_KEY;
    const values = jwtDecode(data, key ?? "my-super-secret-key");
    if (!values) c.json({ message: "Invalid token" }, 400);
    const cleanData = newCertSchema.parse(values);
    if (!cleanData) return c.json({ message: "Validation failed" }, 400);
    const db = c.get("db");
    const cert = await db
      .insert(certificatesTable)
      .values({
        ...cleanData,
        id: cleanData.id ?? uuid(),
        issuedAt: Date.now(),
        fonts: JSON.stringify(cleanData.fonts),
        certificateElements: JSON.stringify(cleanData.certificateElements),
      })
      .returning()
      .get();
    console.log(
      `New certificate generated! ID:${cert.id}, Issued for ${cert.issuedFor}`
    );
    return c.json({ message: "Certificate generated", id: cert.id }, 200);
  })
  .get("/new", async (c) => {
    const db = c.get("db");
    return c.json(
      await db
        .insert(certificatesTable)
        .values({
          id: uuid(),
          reciptent: "Fathima Nusrath Jahan",
          reciptentDescription: "Electronics Engineering",
          issuer: "Jane Doe",
          issuerDescription: "Sports counciler",
          issuedAt: Date.now(),
          issuedFor: "Outstanding Performance",
          issuedForDescription: "-",
          certificateElements: JSON.stringify([
            {
              text: "Fathima Nusrath Jahan",
              styles: {
                position: "absolute",
                fontSize: 32,
                top: 200,
              },
            },
          ]),
          certificateBackground:
            "https://i.ibb.co/1Qbs2NM/certificate-sample.png",
          height: 424,
          width: 600,
          fonts: JSON.stringify(["Roboto Condensed"]),
        })
        .returning()
        .get()
    );
  });

export default app;
