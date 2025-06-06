import { Layout } from "antd";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Layout.Header
      style={{
        backgroundColor: "#48a860",
        color: "#fff",
        position: "sticky",
        top: 0,
        maxWidth: "100%",
        padding: "0 70px",
        zIndex: 1000, // Ensure header stays above other elements
        height: 64, // Fixed height for consistency
        lineHeight: "64px", // Center content vertically
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
      }}
    >
      <ul
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 20, // Increased gap for better spacing
          background: "transparent", // Remove redundant background
          color: "#fff",
          listStyle: "none",
          padding: "0 20px",
          margin: 0,
          flexWrap: "wrap", // Allow wrapping on small screens
        }}
      >
        <li>
          <Link
            to="/"
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: 16,
              padding: "8px 12px",
              borderRadius: 4,
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/brands"
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: 16,
              padding: "8px 12px",
              borderRadius: 4,
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
          >
            Brands
          </Link>
        </li>
        <li>
          <Link
            to="/lists"
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: 16,
              padding: "8px 12px",
              borderRadius: 4,
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
          >
            Lists
          </Link>
        </li>
      </ul>
    </Layout.Header>
  );
}