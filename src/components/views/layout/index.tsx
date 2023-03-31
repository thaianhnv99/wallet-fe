const Layout = ({ children }: { children: any }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="main">{children}</div>
      <div
        style={{
          marginTop: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "2rem",
            backgroundColor: "#b3b3b3",
            height: "50px",
            paddingLeft: "3rem",
          }}
        >
          Footer
        </div>
      </div>
    </div>
  );
};

export default Layout;
