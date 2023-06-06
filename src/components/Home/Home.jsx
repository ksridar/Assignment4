import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, deleteAll, setItems } from '../../redux/store.js';
import DetailedView from '../DetailedView/DetailedView.jsx';

import './Home.css';

function Home() {
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setItems([
        {
          name: 'Dog',
          description: 'Black Labrador',
          price: '$500',
          image:
            'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
        },
      ])
    );
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = document.getElementById('item').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const image = document.getElementById('image').value;

    const item = {
      name,
      description,
      price,
      image,
    };
    dispatch(addItem(item));
    document.getElementById('form').reset();
  };

  const handleClear = (event) => {
    event.preventDefault();
    document.getElementById('form').reset();
  };

  const handleDeleteAll = (event) => {
    event.preventDefault();
    dispatch(deleteAll());
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
