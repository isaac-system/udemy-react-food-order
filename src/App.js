import { useEffect, useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import Info from "./components/Info/Info";
import { useDispatch } from "react-redux";
import { cartActions } from "./store/cartSlice";

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

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const Response = await fetch(
        "https://your-firebase-address/orderAmount.json"
      );

      if (!Response.ok) {
        throw new Error("Something went wrong!");
      }

      const ResponseData = await Response.json();

      const loadedData = [];

      for (const key in ResponseData) {
        loadedData.push({
          id: key,
          amount: ResponseData[key].amount,
          deliveryAmount: ResponseData[key].deliveryAmount,
        });
      }

      dispatch(cartActions.getInfo(loadedData));
    };

    fetchData().catch((error) => {
      console.log(error);
    });
  }, [dispatch]);

  return (
    <>
      {cartIsVisible && <Cart onClose={hideCartHandler} />}
      {moreInfoIsVisible && <Info onClose={hideInfoHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals onShowInfo={showInfoHandler} />
      </main>
    </>
  );
}

export default App;
