function PageLayout({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
        backgroundAttachment: "fixed",
        paddingBottom: "80px", // space for ad
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "24px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default PageLayout;
