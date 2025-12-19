import * as path from 'path';
import * as express from 'express';
import { getAssetPath } from 'redoc-dist';
import { Request, Response, NextFunction } from 'express';
/**
 * Options for configuring the ReDoc middleware
 */
interface RedocxOptions {
  /** URL to the OpenAPI specification */
  specUrl: string;
  /** Title for the documentation page */
  title?: string;
}

/**
 * Generates the HTML for the ReDoc documentation page
 * @param options - Configuration options
 * @returns HTML string
 */
const generateElementsHtml = (options: RedocxOptions): string => {
  return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${options.title}</title>
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
        <redoc spec-url='${options.specUrl}'></redoc>
        <script src="./redoc.standalone.js"></script>
      </body>
      </html>
      `;
};

/**
 * Express middleware for serving ReDoc API documentation with embedded static assets
 * @param options - Configuration options
 * @returns Express middleware function
 */
const redocx = (options: RedocxOptions = {} as RedocxOptions): express.Router => {
  // Validate required options
  if (!options.specUrl) {
    throw new Error('specUrl is required');
  }

  // Set default options
  const opts: RedocxOptions = {
    title: 'API Documentation',
    specUrl: options.specUrl,
  };

  // Get the path to ReDoc static assets
  const redocPath = getAssetPath();

  // Create a router to handle both static assets and documentation
  const router = express.Router();

  // Serve static assets from the same path as the documentation
  router.use(express.static(redocPath));

  // Serve the HTML page for GET requests
  router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.type('html').send(generateElementsHtml(opts));
  });

  return router;
};

export = redocx;