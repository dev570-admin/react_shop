function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            vitae libero.
          </p>
        </div>

        <div className="footer-section">
          <h3>Services</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginLeft: "-1em" }}>
              &#9758; <a href="#">Complain</a>
            </li>
            <li style={{ marginLeft: "-1em" }}>
              &#9758; <a href="#">Cancellation & Returns</a>
            </li>
            <li style={{ marginLeft: "-1em" }}>
              &#9758; <a href="#">Marketing</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>More</h3> 
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginLeft: "-1em" }}>
              &#9758; <a href="#">Career</a>
            </li>
            <li style={{ marginLeft: "-1em" }}>
              &#9758; <a href="#">FAQ</a>
            </li>
            <li style={{ marginLeft: "-1em" }}>
              &#9758; <a href="#">Enquery</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="narrow-footer">
        <div className="social-links">
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
        </div>

        <div className="center">&copy; 2026 My Company</div>

        <div className="right">
          <a href="#">Privacy Policy</a> |{" "}
          <a href="#">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 


