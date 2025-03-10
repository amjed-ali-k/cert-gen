import { ReactNode } from "hono/jsx";
import satori from "satori";
import PDFDocument from "pdfkit";
import SVGtoPDF from "svg-to-pdfkit";
import BlobStream from "blob-stream";
import { sift, unique } from "radash";

// TO convert google fonts to link visit: https://gist.github.com/cvan/21aefbfd786a146c0d93
const savedfonts = [
  {
    url: "https://fonts.gstatic.com/s/pacifico/v22/FwZY7-Qmy14u9lezJ-6H6Mw.ttf",
    font: "Pacifico",
    weight: 400 as const,
  },
  {
    url: "https://fonts.gstatic.com/s/robotocondensed/v27/ieVo2ZhZI2eCN5jzbjEETS9weq8-_d6T_POl0fRJeyWyosBO5Xk.ttf",
    font: "Roboto Condensed",
    weight: 400 as const,
  },
  {
    url: "https://fonts.gstatic.com/s/borel/v3/6qLOKZsftAPisjsmaSc.ttf",
    font: "Borel",
    weight: 400 as const,
  },
  {
    url: "https://fonts.gstatic.com/s/grandhotel/v19/7Au7p_IgjDKdCRWuR1azplQKGFk.ttf",
    font: "Grand Hotel",
    weight: 400 as const,
  },
  {
    url: "https://fonts.gstatic.com/s/lora/v35/0QI6MX1D_JOuGQbT0gvTJPa787z5vBJBkqg.ttf",
    font: "Lora:bold",
    weight: 700 as const,
  },
  {
    url: "https://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-B4iFV0Uw.ttf",
    font: "Rubik",
    weight: 400 as const,
  },
  {
    url: "https://fonts.gstatic.com/s/aubrey/v28/q5uGsou7NPBw-p7fvQlo.ttf",
    font: "Aubrey",
    weight: 400 as const,
  },
];

export const generateSVGFromElement = async (
  elm: ReactNode,
  fonts: string[],
  width: number,
  height: number
) => {
  const usedFonts = sift(
    unique([...fonts, "Roboto Condensed"]).map((f) => {
      return savedfonts.find((font) => font.font === f);
    })
  );

  const fontData = await Promise.all(
    usedFonts.map(async (f) => ({
      data: await fetch(f.url).then((res) => res.arrayBuffer()),
      name: f.font,
      weight: f.weight,
      style: "normal" as const,
    }))
  );

  const svg = await satori(elm, {
    height,
    width,
    fonts: fontData,
  });
  return svg;
};

export const generatePdfFromSVG = (
  svg: string,
  width: number,
  height: number,
  callBack: (e: string) => void
) => {
  return generatePdf(svg, width, height, callBack);
};

// let geistBold: ArrayBuffer | null = null;

export const genratePdfFromElement = async (
  elm: ReactNode,
  callback: (e: string) => void,
  height: number,
  width: number
) => {
  const svg = await generateSVGFromElement(
    elm,
    ["Pacifico", "Roboto Condensed", "Borel"],
    width,
    height
  );
  await generatePdfFromSVG(svg, width, height, callback);
};

const generatePdf = async (
  svg: any,
  width: any,
  height: any,
  callBack: any
) => {
  const doc = new PDFDocument({
    compress: false,
    size: "A4",
  });

  // is svg is array, then loop through it and add to pdf as separate pages
  if (Array.isArray(svg)) {
    svg.forEach((s, i) => {
      if (i > 0) {
        doc.addPage();
      }
      SVGtoPDF(doc, s, 0, 0, {
        width,
        height,
        preserveAspectRatio: "xMidYMid meet",
      });
    });
  } else {
    SVGtoPDF(doc, svg, 0, 0, {
      width,
      height,
      preserveAspectRatio: "xMidYMid meet",
    });
  }

  const stream = doc.pipe(BlobStream());
  stream.on("finish", () => {
    const blob = stream.toBlob("application/pdf");
    const url = URL.createObjectURL(blob);
    callBack(url);
  });
  doc.end();
};
