# redocx-express 🚀

Express Middleware for ReDoc API Documentation - Beautiful, Interactive, and Zero-Config API Documentation for Express Apps

Enhance your Express.js applications with stunning, interactive API documentation using ReDoc. This middleware seamlessly integrates with your existing Express server to provide a professional documentation experience with minimal setup.

## 🌟 Features & Benefits

* ✅ Interactive API Documentation - Beautiful, responsive design that developers love
* ✅ Zero Configuration - Get started in seconds with minimal setup
* ✅ Beautiful UI - Modern, responsive design that developers love
* ✅ OpenAPI 3.x Support - Full compatibility with OpenAPI specifications
* ✅ Embedded Assets - No external dependencies or CDN requirements
* ✅ Customizable - Easily configure titles and API spec URLs

## 📦 Installation

```bash
npm install redocx-express
```

## 🚀 Quick Start

### Basic Setup

```javascript
const express = require('express');
const redocx = require('redocx-express');

const app = express();

// Serve ReDoc documentation with embedded static assets
app.use('/docs', redocx({
  specUrl: '/openapi.json',
  title: 'My API Documentation'  // Optional: custom page title
}));

// Serve your OpenAPI specification
app.use('/openapi.json', express.static('path/to/your/openapi.json'));

app.listen(3000, () => {
  console.log('Documentation available at http://localhost:3000/docs');
});
```

## ⚙️ Configuration Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| specUrl | string | Required | URL to your OpenAPI specification (JSON or YAML) |
| title | string | 'API Documentation' | Custom title for the documentation page |

## 💡 How It Works

1. The middleware serves both the static CSS and JavaScript files from the redoc-dist package and generates an HTML page that includes the ReDoc web component
2. The web component fetches your OpenAPI specification and renders interactive documentation
3. Developers can browse endpoints and understand your API quickly

## 📄 Example OpenAPI Specification

Place your OpenAPI specification file in your project and serve it with Express:

```javascript
app.use('/openapi.json', express.static('public/openapi.json'));
```

## 🔍 Keywords

ReDoc, Express middleware, API documentation, OpenAPI, Swagger alternative, REST API documentation, API reference, documentation generator, API visualization, OpenAPI 3.0

## 📄 License

MIT

⭐ Like this project? Star it on GitHub and follow us for updates!