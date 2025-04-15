import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

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
        url: 'http://localhost:3000/api',
        description: 'Development server'
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
    paths: {
      '/vehicles': {
        post: {
          tags: ['Vehicles'],
          summary: 'Create a new vehicle',
          description: 'Creates a new vehicle entry in the system',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['make', 'model', 'year', 'registrationNumber'],
                  properties: {
                    make: {
                      type: 'string',
                      example: 'Honda'
                    },
                    model: {
                      type: 'string',
                      example: 'Civic'
                    },
                    year: {
                      type: 'integer',
                      example: 2021
                    },
                    registrationNumber: {
                      type: 'string',
                      example: 'XYZ789'
                    },
                    color: {
                      type: 'string',
                      example: 'Blue'
                    }
                  }
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'Vehicle created successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      status: {
                        type: 'boolean',
                        example: true
                      },
                      message: {
                        type: 'string',
                        example: 'Vehicle created successfully'
                      },
                      data: {
                        $ref: '#/components/schemas/Vehicle'
                      }
                    }
                  }
                }
              }
            },
            '400': {
              $ref: '#/components/responses/BadRequest'
            },
            '500': {
              $ref: '#/components/responses/InternalError'
            }
          }
        },
        get: {
          tags: ['Vehicles'],
          summary: 'Get all vehicles',
          description: 'Retrieves a list of all vehicles in the system',
          responses: {
            '200': {
              description: 'List of vehicles retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      status: {
                        type: 'boolean',
                        example: true
                      },
                      message: {
                        type: 'string',
                        example: 'Vehicles retrieved successfully'
                      },
                      data: {
                        type: 'array',
                        items: {
                          $ref: '#/components/schemas/Vehicle'
                        }
                      }
                    }
                  }
                }
              }
            },
            '500': {
              $ref: '#/components/responses/InternalError'
            }
          }
        }
      },
      '/vehicles/{id}': {
        get: {
          tags: ['Vehicles'],
          summary: 'Get a vehicle by ID',
          description: 'Retrieves a specific vehicle by its ID',
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: {
                type: 'integer'
              },
              description: 'The ID of the vehicle to retrieve',
              example: 1
            }
          ],
          responses: {
            '200': {
              description: 'Vehicle retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      status: {
                        type: 'boolean',
                        example: true
                      },
                      message: {
                        type: 'string',
                        example: 'Vehicle retrieved successfully'
                      },
                      data: {
                        $ref: '#/components/schemas/Vehicle'
                      }
                    }
                  }
                }
              }
            },
            '400': {
              $ref: '#/components/responses/BadRequest'
            },
            '404': {
              $ref: '#/components/responses/NotFound'
            },
            '500': {
              $ref: '#/components/responses/InternalError'
            }
          }
        },
        put: {
          tags: ['Vehicles'],
          summary: 'Update a vehicle',
          description: 'Updates an existing vehicle entry in the system',
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: {
                type: 'integer'
              },
              description: 'The ID of the vehicle to update',
              example: 1
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer',
                      example: 1
                    },
                    make: {
                      type: 'string',
                      example: 'Honda'
                    },
                    model: {
                      type: 'string',
                      example: 'Accord'
                    },
                    year: {
                      type: 'integer',
                      example: 2023
                    },
                    registrationNumber: {
                      type: 'string',
                      example: 'XYZ789'
                    },
                    color: {
                      type: 'string',
                      example: 'Red'
                    }
                  }
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'Vehicle updated successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      status: {
                        type: 'boolean',
                        example: true
                      },
                      message: {
                        type: 'string',
                        example: 'Vehicle updated successfully'
                      }
                    }
                  }
                }
              }
            },
            '400': {
              $ref: '#/components/responses/BadRequest'
            },
            '404': {
              $ref: '#/components/responses/NotFound'
            },
            '500': {
              $ref: '#/components/responses/InternalError'
            }
          }
        },
        delete: {
          tags: ['Vehicles'],
          summary: 'Delete a vehicle',
          description: 'Deletes a vehicle from the system',
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: {
                type: 'integer'
              },
              description: 'The ID of the vehicle to delete',
              example: 1
            }
          ],
          responses: {
            '200': {
              description: 'Vehicle deleted successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      status: {
                        type: 'boolean',
                        example: true
                      },
                      message: {
                        type: 'string',
                        example: 'Vehicle deleted successfully'
                      }
                    }
                  }
                }
              }
            },
            '400': {
              $ref: '#/components/responses/BadRequest'
            },
            '404': {
              $ref: '#/components/responses/NotFound'
            },
            '500': {
              $ref: '#/components/responses/InternalError'
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js']
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