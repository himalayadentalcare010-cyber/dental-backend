const { Client } = require('pg');
const connectionString =
  'postgresql://fourgnepal_fourgnepal:fourgnepal_fourgnepal@localhost:5432/fourgnepal';

async function testConnection() {
  const client = new Client({
    connectionString,
  });

  try {
    await client.connect();
    console.log('Connected to the database successfully!');
  } catch (err) {
    console.error('Connection error:', err);
  } finally {
    await client.end();
  }
}

testConnection();
