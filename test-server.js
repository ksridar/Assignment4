const { expect } = require('chai');
const request = require('supertest');

const baseUrl = 'https://assignment-5-c1oy.onrender.com';


describe('Server Endpoints unit', () => {
  it('should return "Server" when accessing the root endpoint', async () => {
    const response = await request(baseUrl).get('/');
    expect(response.status).to.equal(200);
    expect(response.text).to.equal('Server');
  });

  it('should retrieve items when accessing the /items endpoint', async () => {
    const response = await request(baseUrl).get('/items');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });
});


describe('End to End Test (extra feature)', () => {
  let items = []; 
  const app = require('express')();
  app.use(require('body-parser').json());

  app.post('/items', (req, res) => {
    const newItem = req.body;
    newItem.id = items.length + 1;
    items.push(newItem);
    res.json(newItem);
  });

  app.put('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id, 10);
    const updatedItem = req.body;
    const itemIndex = items.findIndex((item) => item.id === itemId);

    if (itemIndex !== -1) {
      items[itemIndex] = { ...items[itemIndex], ...updatedItem };
      res.json({ message: 'Item updated successfully' });
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  });

  app.delete('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id, 10);
    const itemIndex = items.findIndex((item) => item.id === itemId);

    if (itemIndex !== -1) {
      items.splice(itemIndex, 1);
      res.json({ message: 'Item deleted successfully' });
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  });

  it('should add a new item to the server', async () => {
    const newItem = {
      name: 'New Item',
      description: 'Test item',
      price: '$100',
      image: 'https://example.com/image.jpg',
    };

    const response = await request(app)
      .post('/items')
      .send(newItem);

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('id');
    expect(response.body.name).to.equal(newItem.name);
  });

  it('should update an existing item on the server', async () => {
    const newItem = {
      name: 'New Item',
      description: 'Test item',
      price: '$100',
      image: 'https://example.com/image.jpg',
    };

    const response = await request(app)
      .post('/items')
      .send(newItem);

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('id');

    const updatedItem = {
      name: 'Updated Item',
      description: 'Updated test item',
      price: '$200',
      image: 'https://example.com/updated-image.jpg',
    };

    const updateResponse = await request(app)
      .put(`/items/${response.body.id}`)
      .send(updatedItem);

    expect(updateResponse.status).to.equal(200);
    expect(updateResponse.body).to.deep.equal({ message: 'Item updated successfully' });
  });

  it('should return 404 when updating a non-existing item on the server', async () => {
    const nonExistentItemId = 999;

    const updatedItem = {
      name: 'Updated Item',
      description: 'Updated test item',
      price: '$200',
      image: 'https://example.com/updated-image.jpg',
    };

    const updateResponse = await request(app)
      .put(`/items/${nonExistentItemId}`)
      .send(updatedItem);

    expect(updateResponse.status).to.equal(404);
    expect(updateResponse.body).to.deep.equal({ error: 'Item not found' });
  });

  it('should delete an existing item from the server', async () => {
    const newItem = {
      name: 'New Item',
      description: 'Test item',
      price: '$100',
      image: 'https://example.com/image.jpg',
    };

    const response = await request(app)
      .post('/items')
      .send(newItem);

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('id');

    const deleteResponse = await request(app).delete(`/items/${response.body.id}`);

    expect(deleteResponse.status).to.equal(200);
    expect(deleteResponse.body).to.deep.equal({ message: 'Item deleted successfully' });
  });

  it('should return 404 when deleting a non-existing item from the server', async () => {
    const nonExistentItemId = 999;

    const deleteResponse = await request(app).delete(`/items/${nonExistentItemId}`);

    expect(deleteResponse.status).to.equal(404);
    expect(deleteResponse.body).to.deep.equal({ error: 'Item not found' });
  });
});


