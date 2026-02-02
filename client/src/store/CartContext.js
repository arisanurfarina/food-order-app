import { createContext, useState } from 'react';

const CartContext = createContext();

function CartContextProvider({children}) {

  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const addCartItem = (meal) => {
    const existingItem = cartItems.find(item => item.id === meal.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item => item.id === meal.id ? {...existingItem, quantity: existingItem.quantity + 1} : item));
    } else {
      setCartItems([...cartItems, {...meal, quantity: 1}]);
    }
    
    setTotalAmount(prev => (prev + Number(meal.price)));
  }

  const removeCartItem = (mealId) => {
    const existingItem = cartItems.find(item => item.id === mealId);
    
    if (existingItem.quantity === 1) {
      setCartItems(cartItems.filter(item => item.id !== mealId));
    } else {
      setCartItems(cartItems.map(item => item.id === mealId ? {...existingItem, quantity: existingItem.quantity - 1} : item)); // map through and if the id match, reduce quantity by 1
    }
    
    setTotalAmount(prev => (prev - Number(existingItem.price)));
  }

  const value = {
    cartItems, 
    setCartItems,
    totalAmount, 
    setTotalAmount,
    addCartItem,
    removeCartItem
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export { CartContext, CartContextProvider };