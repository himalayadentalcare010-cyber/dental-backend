const express = require('express');const path = require('path');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const cors = require('cors');

const app = express();
app.use(cors());

// ───────────────────────────────
// Middleware
// ───────────────────────────────
app.use(express.json()); // Parse JSON request bodies

// Static file serving
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Swagger API Docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ───────────────────────────────
// Routes

const bannerRoutes = require('./routes/banner.routes');
const authRoutes = require('./routes/auth.routes');

app.use('/api/auth', authRoutes);
app.use('/api/banners', bannerRoutes);

// ───────────────────────────────
// Start the server
// ───────────────────────────────
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
