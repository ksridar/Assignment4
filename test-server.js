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

  it('should measure the response time for accessing the root endpoint', (done) => {
    const startTimestamp = new Date().getTime();
    request(baseUrl)
      .get('/')
      .end((err, response) => {
        if (err) return done(err);

        expect(response.status).to.equal(200);
        expect(response.text).to.equal('Server');

        const endTimestamp = new Date().getTime();
        const responseTime = endTimestamp - startTimestamp;

        console.log('Response time for accessing the root endpoint:', responseTime, 'ms');
        done();
      });
  });
});

