import { useState, useEffect } from 'react';
import Guitar from './components/Guitar';
import Header from './components/Header';
import { db } from './data/db';

function App() {
  // ! OBTAIN THE LOCALSTORAGE
  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };
  // ! STATE
  const [data] = useState(db);

  // ! STATE TO MANAGE THE CART
  const [cart, setCart] = useState(initialCart);

  // ! GLOBALS VARIABLES
  const MIN_ITEMS = 1;
  const MAX_ITEMS = 5;

  // ! LOCALSTORAGE RECOMMENDED USE
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // ! FUNCTION TO ADD A NEW ELEMENT TO THE CART
  function addToCart(item) {
    // console.log('Adding to the Cart!');

    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);
    // console.log(itemExist);

    if (itemExists >= 0) {
      // console.log('Already Exists ');
      if (cart[itemExists].quantity >= MAX_ITEMS) return;

      // ! COPY OF THE STATE TO AVOID MUTATE IT
      const copyOfState = [...cart];
      copyOfState[itemExists].quantity++;
      setCart(copyOfState);
    } else {
      // console.log("Doesn't exist yet");

      item.quantity = 1;
      setCart([...cart, item]);
    }

    // ! CALLING THE FUNCTION
    // localStorageCart()
  }

  // ! FUNCTION TO REMOVE AN ELEMENT FROM THE CART
  function removeItem(id) {
    // console.log('removing..', id);
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }

  // ! FUNCTION TO DECREASE THE QUANTITY OF ELEMENTS FROM THE CART
  function decreaseQuantity(id) {
    // console.log('Decreasing...', id);
    const decreasedQuantity = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(decreasedQuantity);
  }

  // ! FUNCTION TO INCREASE THE QUANTITY OF ELEMENTS FROM THE CART
  function increaseQuantity(id) {
    // console.log('Increasing...', id);
    const increasedQuantity = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(increasedQuantity);
  }

  // ! FUNCTION TO EMPTY THE ELEMENTS OF THE CART
  function emptyCart() {
    setCart([]);
  }

  // ! FUNCTION TO CHARGE THE LOCALSTORAGE
  // * NOT RECOMMENDED
  /** function localStorageCart() {
    localStorage.setItem('cartito', JSON.stringify(cart))
  }
  */

  return (
    <>
      <Header
        cart={cart}
        removeItem={removeItem}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        emptyCart={emptyCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Our Collection</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar key={guitar.id} guitar={guitar} addToCart={addToCart} />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - All Rights Reserved &copy; 2025
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
