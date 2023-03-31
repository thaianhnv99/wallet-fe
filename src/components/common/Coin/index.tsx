const Coin = ({
  perc,
  setPerc,
  token,
}: {
  perc: number;
  setPerc: (pool: boolean) => void;
  token: string;
}) => {
  return (
    <div
      style={{
        width: "100%",
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
          justifyContent: 'center'
        }}
      >
        <button onClick={() => setPerc(true)}>Up</button>
        <button onClick={() => setPerc(false)}>Down</button>
      </div>
    </div>
  );
};

export default Coin;
