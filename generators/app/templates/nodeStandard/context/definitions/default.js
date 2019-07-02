module.exports = {
  name: process.env.NODE_CONTEXT_NAME || '<%= contextName %>',
  port: process.env.NODE_CONTEXT_PORT || <%= contextPort %>,
  middlewares: {
    createClient: process.env.NODE_CONTEXT_MIDDLEWARES_CREATE_CLIENT ||
      [
        'check-channel-middleware',
        'check-country-middleware',
        'check-commerce-middleware',
        'validate-body-middleware',
        'create-client-middleware'
      ],
    getClient: process.env.NODE_CONTEXT_MIDDLEWARES_GET_CLIENT ||
      [
        'check-channel-middleware',
        'check-country-middleware',
        'check-commerce-middleware',
        'validate-id-middleware',
        'get-client-middleware'
      ],
    deleteClient: process.env.NODE_CONTEXT_MIDDLEWARES_DELETE_CLIENT ||
      [
        'check-channel-middleware',
        'check-country-middleware',
        'check-commerce-middleware',
        'validate-id-middleware',
        'delete-client-middleware'
      ]
  },
  country: process.env.NODE_CONTEXT_COUNTRY || 'cl',
  commerce: process.env.NODE_CONTEXT_COMMERCE || 'banco',
  channel: process.env.NODE_CONTEXT_CHANNEL || 'web',
  version: process.env.NODE_CONTEXT_VERSION || 'v1'
};
