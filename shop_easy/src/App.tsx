import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import { useCart } from "./context/CartContext";
import ProductSlider from "./components/ProductSlider";
import SidebarCart from "./components/SidebarCart";
import "./style.css";

/* ================= TYPES ================= */

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
  images: string[];
};

/* ================= APP ================= */

function App() {
  const [search, setSearch] = useState<string>("");
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { addToCart } = useCart();

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  /* ================= FETCH PRODUCTS ================= */

  useEffect(() => {
    fetchProducts();
  }, []); // ✅ correct dependency

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://dummyjson.com/products?limit=20"
      );
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= FILTER ================= */

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );
  const gridProducts = filteredProducts.slice(0, 12);
  const sliderProducts = filteredProducts.slice(12, 20); // start from 13th product
  /* ================= UI ================= */

  return (
    <>
      {/* Header */}
      <Header search={search} onSearchChange={setSearch} onCartClick={handleCartClick} />

      {/* Main */}
      <main className="container">
        <h2>Trendig Products</h2>

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="products">
            {filteredProducts.length > 0 ? (
              gridProducts.map((product) => (
                <div className="product-card" key={product.id}>
                  <div className="image-box">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      loading="lazy"
                    />
                  </div>

                  <h3>{product.title}</h3>
                  <p>₹{product.price}</p>

                  <button
                    onClick={() =>
                      addToCart({
                        id: product.id,
                        name: product.title,
                        price: product.price,
                      })
                    }
                  >
                    Add to Cart 
                  </button>
                  
                </div>
              ))
            ) : (
              <p>No products found</p>
            )}

            
          </div>
        )}

        {/* Product Slider */}
{sliderProducts.length > 0 && (
  <ProductSlider products={sliderProducts} />
)}
      </main>

      {/* Footer */}
      <Footer />

      {/* Sidebar Cart */}
      <SidebarCart isOpen={isCartOpen} onClose={handleCartClose} />

      {/* Floating Chatbot (GLOBAL) */}
      <ChatBot />
    </>
  );
}

export default App;