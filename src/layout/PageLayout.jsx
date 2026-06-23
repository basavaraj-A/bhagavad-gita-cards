import { useScreenSize } from "../hooks/useScreenSize";

function PageLayout({ children }) {
  const { isMobile } = useScreenSize();
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
        backgroundAttachment: "fixed",
        paddingBottom: "80px", // space for ad
        overflowX: "hidden", // 👈 add
        boxSizing: "border-box", // 👈 add
        width: "100%",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: isMobile ? "16px" : "24px", // 👈 update
          boxSizing: "border-box", // 👈 add
          width: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default PageLayout;
