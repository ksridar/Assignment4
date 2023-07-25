const { expect } = require('chai');
const request = require('supertest');

const baseUrl = 'https://assignment-5-c1oy.onrender.com';


describe('Server Endpoints', () => {
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
