import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import { useCart } from "./context/CartContext";
import ProductSlider from "./components/ProductSlider";
import SidebarCart from "./components/SidebarCart";
import Login from "./pages/Login";
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
      
      // Try multiple API endpoints for better reliability
      const endpoints = [
        "https://dummyjson.com/products?limit=20",
        "https://dummyjson.com/products",
        "https://api.escuelajs.co/api/v1/products"
      ];
      
      let productsData = [];
      let apiSuccess = false;
      
      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            mode: 'cors'
          });
          
          if (response.ok) {
            const data = await response.json();
            
            // Handle different API response structures
            if (data.products && Array.isArray(data.products)) {
              productsData = data.products;
            } else if (Array.isArray(data)) {
              productsData = data;
            }
            
            apiSuccess = true;
            console.log('Successfully fetched products from:', endpoint);
            break;
          }
        } catch (endpointError) {
          console.warn(`Failed to fetch from ${endpoint}:`, endpointError);
          continue;
        }
      }
      
      // If all APIs fail, use fallback products
      if (!apiSuccess || productsData.length === 0) {
        console.log('Using fallback products');
        productsData = getFallbackProducts();
      }
      
      // Ensure all products have required fields
      const validProducts = productsData.map((product: any) => ({
        id: product.id || Math.random(),
        title: product.title || product.name || 'Unknown Product',
        description: product.description || 'Product description',
        price: product.price || 99.99,
        category: product.category || 'general',
        thumbnail: product.thumbnail || product.images?.[0] || 'https://picsum.photos/seed/product/300/200.jpg',
        images: product.images || [product.thumbnail || 'https://picsum.photos/seed/product/300/200.jpg']
      }));
      
      setProducts(validProducts);
      
    } catch (error) {
      console.error("Error fetching products:", error);
      // Use fallback products on any error
      setProducts(getFallbackProducts());
    } finally {
      setLoading(false);
    }
  };

  // Fallback products for when API fails
  const getFallbackProducts = (): Product[] => [
    {
      id: 1,
      title: "Wireless Headphones",
      description: "High-quality wireless headphones with noise cancellation",
      price: 299.99,
      category: "electronics",
      thumbnail: "https://picsum.photos/seed/headphones/300/200.jpg",
      images: ["https://picsum.photos/seed/headphones/300/200.jpg"]
    },
    {
      id: 2,
      title: "Smart Watch",
      description: "Feature-rich smartwatch with health tracking",
      price: 199.99,
      category: "electronics",
      thumbnail: "https://picsum.photos/seed/watch/300/200.jpg",
      images: ["https://picsum.photos/seed/watch/300/200.jpg"]
    },
    {
      id: 3,
      title: "Laptop Backpack",
      description: "Durable backpack with laptop compartment",
      price: 49.99,
      category: "accessories",
      thumbnail: "https://picsum.photos/seed/backpack/300/200.jpg",
      images: ["https://picsum.photos/seed/backpack/300/200.jpg"]
    },
    {
      id: 4,
      title: "Wireless Mouse",
      description: "Ergonomic wireless mouse",
      price: 29.99,
      category: "electronics",
      thumbnail: "https://picsum.photos/seed/mouse/300/200.jpg",
      images: ["https://picsum.photos/seed/mouse/300/200.jpg"]
    },
    {
      id: 5,
      title: "Phone Case",
      description: "Protective phone case with style",
      price: 19.99,
      category: "accessories",
      thumbnail: "https://picsum.photos/seed/case/300/200.jpg",
      images: ["https://picsum.photos/seed/case/300/200.jpg"]
    },
    {
      id: 6,
      title: "Bluetooth Speaker",
      description: "Portable bluetooth speaker",
      price: 79.99,
      category: "electronics",
      thumbnail: "https://picsum.photos/seed/speaker/300/200.jpg",
      images: ["https://picsum.photos/seed/speaker/300/200.jpg"]
    },
    {
      id: 7,
      title: "USB Cable",
      description: "High-speed USB charging cable",
      price: 12.99,
      category: "accessories",
      thumbnail: "https://picsum.photos/seed/cable/300/200.jpg",
      images: ["https://picsum.photos/seed/cable/300/200.jpg"]
    },
    {
      id: 8,
      title: "Tablet Stand",
      description: "Adjustable tablet stand",
      price: 34.99,
      category: "accessories",
      thumbnail: "https://picsum.photos/seed/stand/300/200.jpg",
      images: ["https://picsum.photos/seed/stand/300/200.jpg"]
    },
    {
      id: 9,
      title: "Power Bank",
      description: "Portable power bank 10000mAh",
      price: 39.99,
      category: "electronics",
      thumbnail: "https://picsum.photos/seed/powerbank/300/200.jpg",
      images: ["https://picsum.photos/seed/powerbank/300/200.jpg"]
    },
    {
      id: 10,
      title: "Desk Lamp",
      description: "LED desk lamp with adjustable brightness",
      price: 44.99,
      category: "home",
      thumbnail: "https://picsum.photos/seed/lamp/300/200.jpg",
      images: ["https://picsum.photos/seed/lamp/300/200.jpg"]
    },
    {
      id: 11,
      title: "Water Bottle",
      description: "Insulated water bottle 1L",
      price: 24.99,
      category: "sports",
      thumbnail: "https://picsum.photos/seed/bottle/300/200.jpg",
      images: ["https://picsum.photos/seed/bottle/300/200.jpg"]
    },
    {
      id: 12,
      title: "Notebook Set",
      description: "Premium notebook set with pens",
      price: 18.99,
      category: "stationery",
      thumbnail: "https://picsum.photos/seed/notebook/300/200.jpg",
      images: ["https://picsum.photos/seed/notebook/300/200.jpg"]
    },
    {
      id: 13,
      title: "Gaming Keyboard",
      description: "Mechanical gaming keyboard with RGB",
      price: 89.99,
      category: "electronics",
      thumbnail: "https://picsum.photos/seed/keyboard/300/200.jpg",
      images: ["https://picsum.photos/seed/keyboard/300/200.jpg"]
    },
    {
      id: 14,
      title: "Yoga Mat",
      description: "Non-slip yoga mat with carrying strap",
      price: 29.99,
      category: "sports",
      thumbnail: "https://picsum.photos/seed/yogamat/300/200.jpg",
      images: ["https://picsum.photos/seed/yogamat/300/200.jpg"]
    },
    {
      id: 15,
      title: "Coffee Maker",
      description: "Compact coffee maker for home",
      price: 129.99,
      category: "home",
      thumbnail: "https://picsum.photos/seed/coffee/300/200.jpg",
      images: ["https://picsum.photos/seed/coffee/300/200.jpg"]
    },
    {
      id: 16,
      title: "Fitness Tracker",
      description: "Smart fitness tracker with heart rate monitor",
      price: 69.99,
      category: "sports",
      thumbnail: "https://picsum.photos/seed/tracker/300/200.jpg",
      images: ["https://picsum.photos/seed/tracker/300/200.jpg"]
    },
    {
      id: 17,
      title: "Webcam HD",
      description: "1080p HD webcam with microphone",
      price: 59.99,
      category: "electronics",
      thumbnail: "https://picsum.photos/seed/webcam/300/200.jpg",
      images: ["https://picsum.photos/seed/webcam/300/200.jpg"]
    },
    {
      id: 18,
      title: "Plant Pot Set",
      description: "Decorative plant pot set of 3",
      price: 35.99,
      category: "home",
      thumbnail: "https://picsum.photos/seed/plants/300/200.jpg",
      images: ["https://picsum.photos/seed/plants/300/200.jpg"]
    },
    {
      id: 19,
      title: "Travel Pillow",
      description: "Memory foam travel pillow",
      price: 22.99,
      category: "travel",
      thumbnail: "https://picsum.photos/seed/pillow/300/200.jpg",
      images: ["https://picsum.photos/seed/pillow/300/200.jpg"]
    },
    {
      id: 20,
      title: "Wireless Charger",
      description: "Fast wireless charging pad",
      price: 32.99,
      category: "electronics",
      thumbnail: "https://picsum.photos/seed/charger/300/200.jpg",
      images: ["https://picsum.photos/seed/charger/300/200.jpg"]
    }
  ];

  /* ================= FILTER ================= */

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );
  const gridProducts = filteredProducts.slice(0, 12);
  const sliderProducts = filteredProducts.slice(12, 20); // start from 13th product
  /* ================= UI ================= */

  return (
    <Routes>
       <Route path="/login" element={<Login />} />
        <Route path="/" element={
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
        } />
      </Routes>
  );
}

export default App;