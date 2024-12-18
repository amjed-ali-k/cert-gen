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
import { certificatesTable } from "./db/schema";
import { v7 as uuid } from "uuid";

type Bindings = {
  DB: D1Database;
};

type Variables = {
  db: ReturnType<typeof createDb>;
};
const inputSchema = z.object({
  data: z.string().min(10),
});
const newCertSchema = z.object({
  key: z.string(),
  reciptent: z.string(),
  reciptentDescription: z.string(),
  issuer: z.string(),
  issuerDescription: z.string(),
  issuedFor: z.string(),
  issuedForDescription: z.string(),
  certificateElements: z.object({
    text: z.string(),
    styles: z.object({}),
  }),
  certificateBackground: z.string(),
  height: z.number(),
  width: z.number(),
  fonts: z.array(z.string()),
});

const app = new Hono<{
  Bindings: Bindings;
  Variables: Variables;
}>()
  .use(renderer)
  .use("*", async (c, next) => {
    c.set("db", createDb(c.env.DB));
    await next();
  })
  .get("/", (c) => {
    return c.render(
      <Layout>
        <div class="grid grid-cols-4 flex-1 !h-full">
          <CertificateViewer />
          <Info />
        </div>
      </Layout>
    );
  })
  .get("/image.svg", async (c) => {
    const v = await generateSVGFromElement((<SampleCert />) as any, [
      "Pacifico",
    ]);
    c.res.headers.set("Content-Type", "image/svg+xml");
    return new Response(v, {
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
      },
    });
  })
  .put("/generate-cert", zodValidator(inputSchema), async (c) => {
    const { data } = c.req.valid("json");

    const values = jwtDecode(data, "my-super-secret-key");
    if (!values) c.json({ message: "Invalid token" }, 400);
    const cleanData = newCertSchema.parse(values);
    if (!cleanData) return c.json({ message: "Validation failed" }, 400);

    const db = c.get("db");
    const cert = await db
      .insert(certificatesTable)
      .values({ ...cleanData, id: uuid() })
      .returning()
      .get();
    return c.json({ message: "Certificate generated", id: cert.id }, 200);
  });

export default app;
