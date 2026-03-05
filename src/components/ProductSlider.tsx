import { useRef, useState } from "react";
import { useCart } from "../context/CartContext";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
};

type ProductSliderProps = {
  products: Product[];
};

function ProductSlider({ products }: ProductSliderProps) {
  const { addToCart } = useCart();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Get unique categories from products
  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

  // Filter products by selected category
  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -240, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 240, behavior: 'smooth' });
    }
  };

  return (
    <section className="slider-section">
      <div className="slider-header">
        <h2 style={{color: "#d341ba",fontSize: "30px",backgroundColor: "#5a0448",}}>
          {selectedCategory === "All" ? "All Products" : selectedCategory}
        </h2>
        <div className="slider-arrows">
          <button className="arrow-btn left-arrow" onClick={scrollLeft}>
            ‹
          </button>
          <button className="arrow-btn right-arrow" onClick={scrollRight}>
            ›
          </button>
        </div>
      </div>

      {/* Category Selection */}
      <div className="category-selector">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="product-slider" ref={sliderRef}>
        {filteredProducts.map((product) => (
          <div className="slider-card" key={product.id}>
            <div className="image-box">
              <img src={product.thumbnail} alt={product.title} />
            </div>

            <h4>{product.title}</h4>
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
        ))}
      </div>
    </section>
  );
}

export default ProductSlider;