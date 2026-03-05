import { useCart } from "../context/CartContext";
import { useState } from "react";

type SidebarCartProps = {
  isOpen: boolean;
  onClose: () => void;
};

function SidebarCart({ isOpen, onClose }: SidebarCartProps) {
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  const increaseQuantity = (id: number) => {
    const item = cart.find(item => item.id === id);
    if (item) {
      addToCart({ id: item.id, name: item.name, price: item.price });
    }
  };

  const decreaseQuantity = (id: number) => {
    const item = cart.find(item => item.id === id);
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    }
  };

  const removeItem = (id: number) => {
    removeFromCart(id);
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className={`cart-overlay ${isClosing ? 'fade-out' : ''}`}
          onClick={handleClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`sidebar-cart ${isOpen ? 'open' : ''} ${isClosing ? 'slide-out' : ''}`}>
        <div className="cart-header">
          <h3>Shopping Cart</h3>
          <button className="close-btn" onClick={handleClose}>×</button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p className="item-price">₹{item.price}</p>
                </div>
                
                <div className="item-controls">
                  <div className="quantity-controls">
                    <button 
                      className="qty-btn"
                      onClick={() => decreaseQuantity(item.id)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      className="qty-btn"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>
                  
                  <button className="remove-btn" onClick={() => removeItem(item.id)}>
                    🗑️
                  </button>
                </div>
                
                <div className="item-total">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <strong>Total: ₹{totalPrice}</strong>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        )}
      </div>
    </>
  );
}

export default SidebarCart;
