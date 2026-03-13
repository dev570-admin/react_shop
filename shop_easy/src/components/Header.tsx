import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavMenu from "./NavMenu";
import SearchBar from "./SearchBar";
import { useCart } from "../context/CartContext";

type HeaderProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onCartClick: () => void;
};

function Header({ search, onSearchChange, onCartClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const { cart } = useCart();
  const navigate = useNavigate();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  /* Check login status */
  useEffect(() => {
    const checkLogin = () => {
      const loginStatus = localStorage.getItem("isLoggedIn");
      const email = localStorage.getItem("userEmail");

      if (loginStatus === "true" && email) {
        setIsLoggedIn(true);
        setUserEmail(email);
      } else {
        setIsLoggedIn(false);
        setUserEmail("");
      }
    };

    checkLogin();

    // Listen for login changes across tabs
    window.addEventListener("storage", checkLogin);

    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginClick = () => {
    console.log("Login button clicked - navigating to /login");
    console.log("Navigate function:", navigate);
    
    try {
      navigate("/login");
      console.log("Navigation successful");
    } catch (error) {
      console.error("Navigation failed:", error);
      window.location.href = "/login";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");

    setIsLoggedIn(false);
    setUserEmail("");

    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <>
      <header className="header">
        <h1 className="logo" onClick={() => navigate("/")}>
          ShopEasy
        </h1>

        {/* Mobile menu button */}
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>

        <NavMenu
          links={["Home", "Products", "About", "Contact" ]}
          isOpen={isMenuOpen}
        />

        <div className="header-right">
          <SearchBar value={search} onChange={onSearchChange} />

          {/* LOGIN / USER */}
          {isLoggedIn ? (
            <div className="user-section">
              <span
                className="user-email"
                onClick={handleProfileClick}
                title="Profile"
              >
                {userEmail ? userEmail.split("@")[0] : "User"}
              </span>

              <button
                className="logout-btn"
                onClick={handleLogout}
                title="Logout"
              >
                🚪
              </button>
            </div>
          ) : (
            <>
              <button
                className="login-btn"
                onClick={handleLoginClick}
                title="Login"
              >
                👤 Login
              </button>
              
              
            </>
          )}

          {/* CART */}
          <span
            className="icon"
            style={{ position: "relative", cursor: "pointer" }}
            onClick={onCartClick}
          >
            🛒
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </span>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </>
  );
}

export default Header;