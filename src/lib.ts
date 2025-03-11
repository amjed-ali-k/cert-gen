import { ReactNode } from "hono/jsx";
import satori from "satori";
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
  {
    url: "https://fonts.gstatic.com/s/raleway/v34/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaorCIPrQ.ttf",
    font: "Raleway",
    weight: 400 as const,
  },
  {
    url: "https://fonts.gstatic.com/s/raleway/v34/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVs9pbCIPrQ.ttf",
    font: "Raleway:bold",
    weight: 700 as const,
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
