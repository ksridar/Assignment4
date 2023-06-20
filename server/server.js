const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.use(cors({
    origin: '*',
  }));
  

let items = [
  {
    id: 1,
    name: 'Dog',
    description: 'Black Labrador',
    price: '$500',
    image: 'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
  },
];

app.get('/items', (req, res) => {
  res.json(items);
});

app.post('/items', (req, res) => {
  const newItem = req.body;
  newItem.id = items.length + 1;
  items.push(newItem);
  res.json(newItem);
});

app.put('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const updatedItem = req.body;
  
    items = items.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          ...updatedItem,
        };
      }
      return item;
    });
  
    res.json({ message: 'Item updated successfully' });
  });
  
app.delete('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  items = items.filter((item) => item.id !== itemId);
  res.json({ message: 'Item deleted successfully' });
});

app.delete('/items', (req, res) => {
    items = [];
    res.json({ message: 'All items deleted successfully' });
  });  

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
