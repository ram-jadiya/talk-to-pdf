import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';
import { schemas } from '../swagger/components/schemas';
import { requestBodies } from '../swagger/components/requestBodies';
import { responses } from '../swagger/components/responses';
import { paths } from '../swagger/paths';

// Define Swagger options
const options = {
  definition: {
    openapi: '3.0.0', // Specify the OpenAPI version
    info: {
      title: 'TalkToPdf API Documentation', // Title of the API
      version: '1.0.0', // API version
      description: 'API Documentation for QueryPDF', // Brief description
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1', // Development server URL
        description: 'Development server', // Description of the server
      },
    ],
    components: {
      schemas: schemas, // Include schemas
      requestBodies: { ...requestBodies }, // Include request body definitions
      responses: { ...responses }, // Include response definitions
    },
    paths: paths, // Include API paths
  },
  apis: [], // Specify files to be parsed for documentation
};

// Generate Swagger specification
const swaggerSpec = swaggerJSDoc(options);

// Setup Swagger UI for the Express application
export const setupSwagger = (app: Application): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Serve Swagger UI at /api-docs
};
