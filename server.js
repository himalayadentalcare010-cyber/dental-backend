const express = require('express');
const path = require('path');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const cors = require('cors');

const app = express();
app.use(
  cors({
    origin: ['https://4gnepal.com.np', 'http://localhost:5173'], // allow both production and dev
    credentials: true, // if you send cookies or auth headers
  })
);

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

const blogsRoutes = require('./routes/blogs.routes');
const projectRoutes = require('./routes/project.routes');

const bannerRoutes = require('./routes/banner.routes');
const authRoutes = require('./routes/auth.routes');
const teamRoutes = require('./routes/teams.routes');
const testimonialRoutes = require('./routes/testimonials.routes');
const contactRoutes = require('./routes/contact.routes');

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/blogs', blogsRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/contacts', contactRoutes);

// ───────────────────────────────
// Start the server
// ───────────────────────────────
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
