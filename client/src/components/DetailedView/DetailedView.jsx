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
    window.location.reload();
  };

  const handleEdit = (event) => {
    event.preventDefault();
    const editedItem = {
      ...selectedItem,
      description: event.target.elements.editDescription.value,
      price: event.target.elements.editPrice.value,
      location: event.target.elements.editLocation.value,
    };
    dispatch(editItemAsync(editedItem))
      .then(() => setSelectedItem(editedItem))
      .catch((error) => console.log(error));
  };

  const handleDelete = (id) => {
    dispatch(deleteItemAsync(id))
      .then(() => window.location.reload())
      .catch((error) => console.log(error));
    window.location.reload();
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
              <div className="input">
                <label htmlFor="editLocation">Location</label>
                <input
                 id="editLocation"
                 type="text"
                 defaultValue={selectedItem.location}
                />
              </div>
              <div className="buttons">
                <button type="submit">Save</button>
              </div>
            </form>
            <button className="closeButton" onClick={closePopup}>
              Close
            </button>
            <button onClick={() => handleDelete(selectedItem._id)}>Delete</button>
          </div>
        </div>
      )}
    </>
  );
}

export default DetailedView;
