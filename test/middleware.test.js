const express = require('express');
const request = require('supertest');
const elements = require('../dist/index');



describe('redocx-express', () => {
  it('should throw an error if specUrl is not provided', () => {
    expect(() => elements()).toThrow('specUrl is required');
  });

  it('should return a middleware function', () => {
    const middleware = elements({ specUrl: '/openapi.json' });
    expect(typeof middleware).toBe('function');
  });

  it('should serve HTML for GET requests', async () => {
    const app = express();
    app.use('/docs', elements({ specUrl: '/openapi.json' }));

    const response = await request(app).get('/docs/');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('text/html');
    expect(response.text).toContain('<redoc');
  });

  
});
