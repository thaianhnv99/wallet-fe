const Coin = ({
  perc,
  setPerc,
  token,
}: {
  perc: number;
  setPerc: (num: number) => void;
  token: string;
}) => {
  return (
    <div
      style={{
        width: "100px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div>{token}</div>
      <div style={{
        marginTop: '5px'
      }}>{perc}</div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "1rem",
        }}
      >
        <button onClick={() => setPerc(perc + 1)}>Up</button>
        <button onClick={() => setPerc(perc - 1)}>Down</button>
      </div>
    </div>
  );
};

export default Coin;
