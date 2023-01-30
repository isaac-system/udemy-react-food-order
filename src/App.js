import { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import Info from "./components/Info/Info";

function App() {
  const [cartIsVisible, setCartIsVisible] = useState(false);
  const [moreInfoIsVisible, setMoreInfoIsVisible] = useState(false);
  const showCartHandler = () => {
    setCartIsVisible(true);
  };

  const hideCartHandler = () => {
    setCartIsVisible(false);
  };

  const showInfoHandler = () => {
    setMoreInfoIsVisible(true);
  };

  const hideInfoHandler = () => {
    setMoreInfoIsVisible(false);
  };

  return (
    <CartProvider>
      {cartIsVisible && <Cart onClose={hideCartHandler} />}
      {moreInfoIsVisible && <Info onClose={hideInfoHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals onShowInfo={showInfoHandler} />
      </main>
    </CartProvider>
  );
}

export default App;
