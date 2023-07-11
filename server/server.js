const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

const uri = 'mongodb+srv://ksridar:Kittumani22!@assignmentcluster.68qrzri.mongodb.net/assignmentcluster?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors({
  origin: '*',
}));

app.use(bodyParser.json());



let items = [
{
  id: 1,
  name: 'Dog',
  description: 'Black Labrador',
  price: '$500',
  image: 'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
},
];

let collection;

async function connectToMongoDB() {
  try {
    await client.connect();
    const db = client.db('assignmentcluster');
    collection = db.collection('items');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToMongoDB();

app.get('/', (req, res) => {
  res.send('Server');
});

app.get('/items', (req, res) => {
  collection.find().toArray()
    .then((items) => {
      res.json(items);
    })
    .catch((err) => {
      console.error('Error retrieving items from MongoDB:', err);
      res.status(500).json({ error: 'Failed to retrieve items' });
    });
});

app.post('/items', (req, res) => {
  const newItem = req.body;
  collection.insertOne(newItem, (err, result) => {
    if (err) {
      console.error('Error inserting item into MongoDB:', err);
      res.status(500).json({ error: 'Failed to add item' });
    } else {
      newItem._id = result.insertedId;
      items.push(newItem);
      res.json(newItem);
    }
  });
});

app.put('/items/:id', (req, res) => {
  const itemId = req.params.id;
  const updatedItem = { ...req.body };
  delete updatedItem._id;

  collection.updateOne(
    { _id: new ObjectId(itemId) },
    { $set: updatedItem },
    (err, result) => {
      if (err) {
        console.error('Error updating item in MongoDB:', err);
        res.status(500).json({ error: 'Failed to update item' });
      } else {
        if (result.matchedCount === 0) {
          res.status(404).json({ error: 'Item not found' });
        } else {
          res.json({ message: 'Item updated successfully' });
        }
      }
    }
  );
});


app.delete('/items/:id', (req, res) => {
  const itemId = req.params.id;  
  console.log(itemId);
  collection.deleteOne({ _id: new ObjectId(itemId) }, (err, result) => {
    if (err) {
      console.error('Error deleting item from MongoDB:', err);
      res.status(500).json({ error: 'Failed to delete item' });
    } else {
      if (result.deletedCount === 0) {
        res.status(404).json({ error: 'Item not found' });
      } else {
        res.json({ message: 'Item deleted successfully' });
      }
    }
  });
});


app.delete('/items', (req, res) => {
  collection.deleteMany({}, (err) => {
    if (err) {
      console.error('Error deleting all items from MongoDB:', err);
      res.status(500).json({ error: 'Failed to delete all items' });
    } else {
      res.json({ message: 'All items deleted successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
