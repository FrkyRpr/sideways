export default function AboutSection() {
  const AboutContainer = {
    display: "grid",
    placeItems: "center",
    textAlign: "center",
    padding: "60px 20px",
    backgroundColor: "#f5f5f5",
  };

  const ContentWrapper = {
    maxWidth: "900px",
    padding: "40px",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  };

  const AboutH1 = {
    fontSize: "2.5em",
    color: "#3a8a50", 
    fontWeight: "bold",
    marginBottom: "20px",
  };

  const AboutParagraph = {
    fontSize: "1.2em",
    color: "#333",
    lineHeight: "1.6",
    marginBottom: "30px",
  };

  const TeamContainer = {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    marginTop: "40px",
  };

  const TeamCard = {
    backgroundColor: "#48a860",
    color: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    width: "220px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  };

  const TeamImage = {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "10px",
  };

  return (
    <div style={AboutContainer}>
      <div style={ContentWrapper}>
        <h1 style={AboutH1}>About Us</h1>
        <p style={AboutParagraph}>
          Welcome to our platform! We are dedicated to building intuitive and efficient 
          solutions to enhance user experiences. Our Laravel-React application integrates 
          CRUD operations, ensuring seamless data management and a user-friendly interface.
        </p>

        <h2 style={{ ...AboutH1, fontSize: "2em" }}>Our Mission</h2>
        <p style={AboutParagraph}>
          Our mission is to simplify technology, providing accessible and powerful tools 
          for individuals and businesses. We believe in innovation, collaboration, and 
          delivering high-quality solutions.
        </p>

        <h2 style={{ ...AboutH1, fontSize: "2em" }}>Meet Our Team</h2>
        <div style={TeamContainer}>
          <div style={TeamCard}>
            <img src="/img/team1.jpg" alt="Team Member" style={TeamImage} />
            <h3>John Doe</h3>
            <p>Lead Developer</p>
          </div>

          <div style={TeamCard}>
            <img src="/img/team2.jpg" alt="Team Member" style={TeamImage} />
            <h3>Jane Smith</h3>
            <p>Project Manager</p>
          </div>

          <div style={TeamCard}>
            <img src="/img/team3.jpg" alt="Team Member" style={TeamImage} />
            <h3>Mark Johnson</h3>
            <p>UI/UX Designer</p>
          </div>
        </div>
      </div>
    </div>
  );
}
