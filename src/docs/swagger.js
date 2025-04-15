import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const IS_LIVE = process.env.IS_LIVE;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Vehicle Management System',
      version: '1.0.0',
      description: 'API documentation for the Vehicle Management System',
      contact: {
        name: 'API Support',
        email: 'support@vehiclemanagementsystem.com'
      }
    },
    servers: [
      {
        url: IS_LIVE ? process.env.LIVE_API_URL : 'http://localhost:3000/api',
        description: IS_LIVE ? 'Production server' : 'Development server'
      }
    ],
    components: {
      schemas: {
        Vehicle: {
          type: 'object',
          required: ['make', 'model', 'year', 'registrationNumber'],
          properties: {
            id: {
              type: 'integer',
              description: 'The auto-generated ID of the vehicle'
            },
            make: {
              type: 'string',
              description: 'The manufacturer of the vehicle'
            },
            model: {
              type: 'string',
              description: 'The model of the vehicle'
            },
            year: {
              type: 'integer',
              description: 'The manufacturing year of the vehicle'
            },
            registrationNumber: {
              type: 'string',
              description: 'The unique registration number of the vehicle'
            },
            color: {
              type: 'string',
              description: 'The color of the vehicle'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date-time when the vehicle was created'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date-time when the vehicle was last updated'
            }
          },
          example: {
            id: 1,
            make: 'Toyota',
            model: 'Camry',
            year: 2022,
            registrationNumber: 'ABC123',
            color: 'Silver',
            createdAt: '2023-06-01T10:00:00Z',
            updatedAt: '2023-06-01T10:00:00Z'
          }
        },
        Error: {
          type: 'object',
          properties: {
            status: {
              type: 'boolean',
              default: false
            },
            message: {
              type: 'string'
            }
          }
        },
        Success: {
          type: 'object',
          properties: {
            status: {
              type: 'boolean',
              default: true
            },
            message: {
              type: 'string'
            },
            data: {
              type: 'object'
            }
          }
        }
      },
      responses: {
        BadRequest: {
          description: 'Bad Request',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                status: false,
                message: 'Invalid request parameters'
              }
            }
          }
        },
        NotFound: {
          description: 'Resource Not Found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                status: false,
                message: 'Vehicle not found'
              }
            }
          }
        },
        InternalError: {
          description: 'Internal Server Error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                status: false,
                message: 'An internal server error occurred'
              }
            }
          }
        }
      }
    },
   
  },
  apis: ['./src/routes/v1/*.js', './src/controllers/*.js']
};

const specs = swaggerJsdoc(options);

export default {
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(specs, { 
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "Vehicle Management System API"
  })
}; 