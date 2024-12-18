import { Hono } from "hono";
import { renderer } from "./renderer";
import { Layout } from "./layout";
import { Info } from "./compontents/info";
import { CertificateViewer } from "./compontents/certificateViewer";
import { generateSVGFromElement } from "./lib";
import { SampleCert } from "./compontents/sample-cert";
import { createDb } from "./db";

type Bindings = {
  DB: D1Database;
};

type Variables = {
  db: ReturnType<typeof createDb>;
};

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
  });

export default app;
