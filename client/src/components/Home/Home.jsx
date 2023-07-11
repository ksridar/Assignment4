import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItemAsync, deleteAllAsync, setItemsAsync } from '../../redux/store.js';
import DetailedView from '../DetailedView/DetailedView.jsx';

import './Home.css';

function Home() {
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('http://localhost:3001/items')
      .then((response) => response.json())
      .then((data) => dispatch(setItemsAsync(data)))
      .catch((error) => console.log(error));
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = document.getElementById('item').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const image = document.getElementById('image').value;
    const location = document.getElementById('location').value;

    const item = {
      name,
      description,
      price,
      image,
      location,
    };
    dispatch(addItemAsync(item));
    window.location.reload();
    //document.getElementById('form').reset();
  };

  const handleClear = (event) => {
    event.preventDefault();
    document.getElementById('form').reset();
  };

  const handleDeleteAll = (event) => {
    event.preventDefault();
    dispatch(deleteAllAsync());
    window.location.reload();
  };

  return (
    <>
      <nav>
        <a className="navItem" href="">
          Home
        </a>
      </nav>
      <div className="container">
        <div>
          <form id="form" className="form" onSubmit={handleSubmit}>
            <div className="input">
              <label htmlFor="item">Item Name</label>
              <input id="item" type="text" />
            </div>
            <div className="input">
              <label htmlFor="description">Description</label>
              <input id="description" type="text" />
            </div>
            <div className="input">
              <label htmlFor="price">Price</label>
              <input id="price" type="text" />
            </div>
            <div className="input">
              <label htmlFor="location">Location</label>
              <input id="location" type="text" />
            </div>
            <div className="input">
              <label htmlFor="image">Image</label>
              <input id="image" type="text" />
            </div>
            <div className="buttons">
              <button type="reset" onClick={handleClear}>
                Clear
              </button>
              <button type="submit">Add</button>
              <button onClick={handleDeleteAll}>Delete All</button>
            </div>
            <div>
              <p id="totalNumberItems">Total # of Items: {items.length}</p>
            </div>
          </form>
        </div>
        <div id="inventory" className="inventory">
          {items.length > 0 ? (
            <DetailedView key={items[0].name} item={items[0]} />
          ) : (
            <p>No items available</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
