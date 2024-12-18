import { Hono } from "hono";
import { renderer } from "./renderer";
import { Layout } from "./layout";
import { Info } from "./compontents/info";
import { CertificateViewer } from "./compontents/certificateViewer";
import { generateSVGFromElement } from "./lib";
import { SampleCert } from "./compontents/sample-cert";

const app = new Hono();

app.use(renderer);

app.get("/", (c) => {
  return c.render(
    <Layout>
      <div class="grid grid-cols-4 flex-1 !h-full">
        <CertificateViewer />
        <Info />
      </div>
    </Layout>
  );
});

app.get("/image.svg", async (c) => {
  const v = await generateSVGFromElement((<SampleCert />) as any, ['Pacifico']);
  c.res.headers.set("Content-Type", "image/svg+xml");
  return new Response(v, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
    },
  });
});

export default app;
