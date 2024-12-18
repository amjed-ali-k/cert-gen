import { CSSProperties } from "hono/jsx";

export const SampleCert = ({
  height,
  width,
  image,
  items,
}: {
  height: number;
  width: number;
  image?: string | null;
  items: {
    text: string;
    styles: CSSProperties;
  }[];
}) => {
  return (
    <div
      style={{
        height: { height },
        width: { width },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        fontSize: 32,
        fontWeight: 600,
        position: "relative",
        fontFamily: "Roboto Condensed",
      }}
    >
  {image &&    <img
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          height: { height },
          width: { width },
        }}
        src={image}
      />}
      {items.map((item, i) => (
        <p key={item.text + i} style={item.styles}>
          {item.text}
        </p>
      ))}
    </div>
  );
};
