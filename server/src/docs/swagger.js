const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'VentureConnect Enterprise API',
    version: '1.0.0',
    description:
      'Production-grade RESTful API documentation for VentureConnect — Full-Stack Multi-Tenant Startup Sourcing, Pitch Deck AI Evaluation, Cap Table Dilution Simulator, Virtual Data Room (VDR), and In-App Term Sheet E-Signature Platform.',
    contact: {
      name: 'VentureConnect Platform Engineering',
      email: 'engineering@ventureconnect.internal',
    },
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Local Development Server',
    },
    {
      url: 'https://api.ventureconnect.io',
      description: 'Production Cloud API',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  paths: {
    '/api/health': {
      get: {
        summary: 'Service Health Check',
        tags: ['System'],
        responses: {
          200: {
            description: 'API operational',
          },
        },
      },
    },
    '/api/auth/register': {
      post: {
        summary: 'Register new user',
        tags: ['Authentication'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string' },
                  password: { type: 'string' },
                  role: { type: 'string', enum: ['founder', 'investor', 'mentor', 'team_member', 'incubator', 'legal'] },
                },
              },
            },
          },
        },
        responses: { 201: { description: 'User registered successfully' } },
      },
    },
    '/api/auth/login': {
      post: {
        summary: 'Authenticate and receive JWT token',
        tags: ['Authentication'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  password: { type: 'string' },
                },
              },
            },
          },
        },
        responses: { 200: { description: 'Authenticated successfully' } },
      },
    },
    '/api/ai/pitch-deck/analyze': {
      post: {
        summary: 'Trigger AI multi-page PDF evaluation on pitch deck',
        tags: ['AI Pitch Deck Engine'],
        responses: { 200: { description: 'Analysis generated' } },
      },
    },
    '/api/ai/ask-deck': {
      post: {
        summary: 'Interactive AI Copilot Q&A over pitch deck text',
        tags: ['AI Pitch Deck Engine'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  deckId: { type: 'string' },
                  question: { type: 'string' },
                },
              },
            },
          },
        },
        responses: { 200: { description: 'AI answer returned' } },
      },
    },
    '/api/funding/cap-table/{startupId}': {
      get: {
        summary: 'Fetch Cap Table & Shareholders',
        tags: ['Cap Table & Dilution'],
        parameters: [{ name: 'startupId', in: 'path', required: false, schema: { type: 'string' } }],
        responses: { 200: { description: 'Cap table retrieved' } },
      },
    },
    '/api/funding/cap-table/simulate': {
      post: {
        summary: 'Simulate round dilution & net wealth gains',
        tags: ['Cap Table & Dilution'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  preMoneyValuation: { type: 'number' },
                  newInvestment: { type: 'number' },
                  esopExpansion: { type: 'number' },
                },
              },
            },
          },
        },
        responses: { 200: { description: 'Dilution model calculated' } },
      },
    },
    '/api/deals/vdr/documents/{startupId}': {
      get: {
        summary: 'Retrieve Virtual Data Room documents (with access status and watermarking)',
        tags: ['Virtual Data Room (VDR)'],
        parameters: [{ name: 'startupId', in: 'path', required: false, schema: { type: 'string' } }],
        responses: { 200: { description: 'VDR documents' } },
      },
    },
    '/api/deals/vdr/documents/{documentId}/request-access': {
      post: {
        summary: 'Investor requests access to locked VDR document',
        tags: ['Virtual Data Room (VDR)'],
        parameters: [{ name: 'documentId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Access requested' } },
      },
    },
    '/api/deals/vdr/documents/{documentId}/manage-access': {
      post: {
        summary: 'Founder approves/revokes investor access with watermark and expiry',
        tags: ['Virtual Data Room (VDR)'],
        parameters: [{ name: 'documentId', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  investorId: { type: 'string' },
                  action: { type: 'string', enum: ['approve', 'revoke'] },
                  durationDays: { type: 'number' },
                },
              },
            },
          },
        },
        responses: { 200: { description: 'Access updated' } },
      },
    },
    '/api/deals/term-sheets': {
      get: {
        summary: 'List active and executed deal term sheets',
        tags: ['Term Sheets & E-Sign'],
        responses: { 200: { description: 'Term sheets listed' } },
      },
      post: {
        summary: 'Draft and issue new investment term sheet',
        tags: ['Term Sheets & E-Sign'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  startupId: { type: 'string' },
                  counterpartyId: { type: 'string' },
                  roundName: { type: 'string' },
                  investmentAmount: { type: 'number' },
                  preMoneyValuation: { type: 'number' },
                  liquidationPreference: { type: 'string' },
                  boardSeats: { type: 'string' },
                  protectiveProvisions: { type: 'array', items: { type: 'string' } },
                },
              },
            },
          },
        },
        responses: { 201: { description: 'Term sheet created' } },
      },
    },
    '/api/deals/term-sheets/{id}/sign': {
      post: {
        summary: 'Submit canvas digital e-signature on term sheet',
        tags: ['Term Sheets & E-Sign'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  signatureDataUrl: { type: 'string', description: 'Base64 Canvas Image' },
                  signerName: { type: 'string' },
                },
              },
            },
          },
        },
        responses: { 200: { description: 'Signature recorded' } },
      },
    },
  },
};

module.exports = swaggerDocument;
