const sharp = require('sharp');const { PrismaClient } = require('@prisma/client');
const cloudinary = require('../utils/cloudinary');
const prisma = new PrismaClient();

const uploadToCloudinary = async (buffer, filename) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'image',
        folder: 'testimonials',
        public_id: filename,
      },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });
};

const isValidString = (str) => typeof str === 'string' && str.trim().length > 0;
const isValidRating = (num) => Number.isInteger(num) && num >= 0 && num <= 5;

exports.createTestimonial = async (req, res) => {
  try {
    const { name, rating, role, message } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ error: 'Image is required' });
    if (!isValidString(name) || !isValidString(role) || !isValidString(message)) {
      return res.status(400).json({ error: 'Name, role, and message are required' });
    }
    if (!isValidRating(Number(rating))) {
      return res.status(400).json({ error: 'Rating must be an integer between 0 and 5' });
    }

    const buffer = await sharp(file.buffer).resize(800, 600).jpeg({ quality: 40 }).toBuffer();

    const filename = `testimonial-${Date.now()}`;
    const cloudinaryRes = await uploadToCloudinary(buffer, filename);

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        rating: Number(rating),
        role,
        message,
        image: cloudinaryRes.secure_url,
        publicId: cloudinaryRes.public_id,
      },
    });

    res.json(testimonial);
  } catch (error) {
    console.error('createTestimonial error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getTestimonials = async (_, res) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(testimonials);
  } catch (error) {
    console.error('getTestimonials error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getTestimonialsPaginated = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    if (page < 1 || limit < 1) {
      return res.status(400).json({ error: 'Page and limit must be positive integers' });
    }

    const skip = (page - 1) * limit;

    const [testimonials, total] = await Promise.all([
      prisma.testimonial.findMany({ skip, take: limit, orderBy: { createdAt: 'desc' } }),
      prisma.testimonial.count(),
    ]);

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: testimonials,
    });
  } catch (error) {
    console.error('getTestimonialsPaginated error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getTestimonial = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

    const testimonial = await prisma.testimonial.findUniqueOrThrow({ where: { id } });
    res.json(testimonial);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    console.error('getTestimonial error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateTestimonial = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, rating, role, message } = req.body;

    if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });
    if (!isValidString(name) || !isValidString(role) || !isValidString(message)) {
      return res.status(400).json({ error: 'Name, role, and message are required' });
    }
    if (!isValidRating(Number(rating))) {
      return res.status(400).json({ error: 'Rating must be an integer between 0 and 5' });
    }

    const existing = await prisma.testimonial.findUniqueOrThrow({ where: { id } });

    let image = existing.image;
    let publicId = existing.publicId;

    if (req.file) {
      if (publicId) await cloudinary.uploader.destroy(publicId).catch(() => {});

      const buffer = await sharp(req.file.buffer).resize(800, 600).jpeg({ quality: 80 }).toBuffer();

      const filename = `testimonial-${Date.now()}`;
      const cloudinaryRes = await uploadToCloudinary(buffer, filename);

      image = cloudinaryRes.secure_url;
      publicId = cloudinaryRes.public_id;
    }

    const updated = await prisma.testimonial.update({
      where: { id },
      data: {
        name,
        rating: Number(rating),
        role,
        message,
        image,
        publicId,
      },
    });

    res.json(updated);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    console.error('updateTestimonial error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

    const testimonial = await prisma.testimonial.findUniqueOrThrow({ where: { id } });

    if (testimonial.publicId) {
      await cloudinary.uploader.destroy(testimonial.publicId).catch(() => {});
    }

    await prisma.testimonial.delete({ where: { id } });

    res.json({ success: true });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    console.error('deleteTestimonial error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
