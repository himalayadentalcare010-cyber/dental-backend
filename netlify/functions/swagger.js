const swaggerSpec = require('./../../swagger'); // Adjust path accordingly
exports.handler = async () => {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(swaggerSpec),
  };
};
