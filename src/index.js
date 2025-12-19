const path = require('path');
const express = require('express');
const { getAssetPath } = require('redoc-dist');

/**
 * Express middleware for serving ReDoc API documentation with embedded static assets
 * @param {Object} options - Configuration options
 * @param {string} options.specUrl - URL to the OpenAPI specification
 * @param {string} [options.title='API Documentation'] - Title for the documentation page
 * @returns {Function} Express middleware function
 */
function redocx(options = {}) {
  // Validate required options
  if (!options.specUrl) {
    throw new Error('specUrl is required');
  }

  // Set default options
  const opts = {
    title: 'API Documentation',
    ...options,
  };

  // Get the path to ReDoc static assets
  const redocPath = getAssetPath();

  // Create a router to handle both static assets and documentation
  const router = express.Router();

  // Serve static assets from the same path as the documentation
  router.use(express.static(redocPath));

  // Serve the HTML page for GET requests
  router.get('/', (req, res, next) => {
    res.type('html').send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${opts.title}</title>
        <!-- needed for adaptive design -->
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body {
            margin: 0;
            padding: 0;
          }
        </style>
      </head>
      <body>
        <redoc spec-url='${opts.specUrl}'></redoc>
        <script src="./redoc.standalone.js"></script>
      </body>
      </html>
      `);
  });

  return router;
}

module.exports = redocx;
