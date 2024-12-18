export const SampleCert = () => {
  return (
    
    <div
      style={{
        height: "424px",
        width: "600px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        fontSize: 32,
        fontWeight: 600,
        position: "relative",
        fontFamily:'Roboto Condensed'
      }}
    >
      <img
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
         
          height: "424px",
          width: "600px",
        }}
        src="https://i.ibb.co/1Qbs2NM/certificate-sample.png"
      />
        <p
          style={{
            position: "absolute",
            fontSize: 32,
            top: 200,
            fontFamily: 'Playwrite ES Deco Guides',
          }}
        >
          Amjed Ali K
        </p>

        <p
          style={{
            position: "absolute",
            fontSize: 12,
            top: 320,
            left: 190,
          }}
        >
          24-July-2024
        </p>

        <p
          style={{
            position: "absolute",
            fontSize: 12,
            top: 320,

            left: 360,
          }}
        >
          sd/-
        </p>
    </div>
  );
};
