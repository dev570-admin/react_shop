import { useState } from "react";
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
  const { cart } = useCart(); 
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="header">
        <h1 className="logo">ShopEasy</h1>

        {/* Hamburger menu for mobile */}
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>

        <NavMenu links={["Home", "Products", "About", "Contact"]} isOpen={isMenuOpen} />

        <div className="header-right">
          <SearchBar value={search} onChange={onSearchChange} />
          <span className="icon">👤</span>
         <span className="icon" style={{ position: 'relative', cursor: 'pointer' }} onClick={onCartClick}>
    🛒 <span className="cart-badge">{cartCount}</span>
</span>
        </div>

        {/* Mobile search bar beside chatbot */}
        <div className="mobile-header-icons">
          <SearchBar value={search} onChange={onSearchChange} className="mobile-search" />
          <span className="icon mobile-chatbot">💬</span>
        </div>
      </header>
      
      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div className="mobile-menu-overlay" onClick={toggleMenu}></div>
      )}
    </>
  );
}

export default Header;