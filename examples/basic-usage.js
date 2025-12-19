const express = require('express');
const path = require('path');
const redocx = require('../dist/index.js');

const app = express();

// Serve ReDoc documentation with embedded static assets (one-liner)
app.use('/docs', redocx({
  specUrl: '/openapi.json',
  title: 'Petstore API Documentation'
}));

// Serve the OpenAPI specification
// You would replace this with your actual OpenAPI specification
app.use('/openapi.json', express.static(path.join(__dirname, 'petstore.json')));

// Simple health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Documentation available at http://localhost:${PORT}/docs`);
});