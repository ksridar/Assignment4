import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItemAsync, editItemAsync } from '../../redux/store.js';

function DetailedView() {
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(null);

  const openPopup = (item) => {
    setSelectedItem(item);
  };

  const closePopup = () => {
    setSelectedItem(null);
  };

  const handleEdit = (event) => {
    event.preventDefault();
    const editedItem = {
      ...selectedItem,
      description: event.target.elements.editDescription.value,
      price: event.target.elements.editPrice.value,
    };
    dispatch(editItemAsync(editedItem));
    setSelectedItem(editedItem);
  };

  const handleDelete = (itemId) => {
    dispatch(deleteItemAsync(itemId));
  };

  return (
    <>
      {items.map((item, index) => (
        <div key={index} className="card" onClick={() => openPopup(item)}>
          <img src={item.image} alt={item.name} className="cardImage" />
          <div className="cardContent">
            <h5>{item.name}</h5>
          </div>
        </div>
      ))}

      {selectedItem && (
        <div className="popup">
          <div className="popupContent">
            <img src={selectedItem.image} className="cardImage" />
            <form onSubmit={handleEdit}>
              <h2>{selectedItem.name}</h2>
              <div className="input">
                <label htmlFor="editDescription">Description</label>
                <input
                  id="editDescription"
                  type="text"
                  defaultValue={selectedItem.description}
                />
              </div>
              <div className="input">
                <label htmlFor="editPrice">Price</label>
                <input
                  id="editPrice"
                  type="text"
                  defaultValue={selectedItem.price}
                />
              </div>
              <div className="buttons">
                <button type="submit">Save</button>
              
              </div>
            </form>
            <button className="closeButton" onClick={closePopup}>
              Close
            </button>
            <button onClick={() => handleDelete(selectedItem.id)}>Delete</button>
          </div>
        </div>
      )}
    </>
  );
}

export default DetailedView;
