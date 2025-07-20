const sharp = require('sharp');const { PrismaClient } = require('@prisma/client');
const cloudinary = require('../utils/cloudinary');
const { sizePresets, qualityPresets } = require('../constant/constant');

const prisma = new PrismaClient();

const isValidString = (str) => typeof str === 'string' && str.trim().length > 0;

const uploadToCloudinary = async (buffer, filename) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'image',
        folder: 'blogs',
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

exports.createBlog = async (req, res) => {
  try {
    const { title, description, tags, width, height } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ error: 'Image required' });
    if (!isValidString(title) || !isValidString(description)) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const tagArray = typeof tags === 'string' ? tags.split(',').map((t) => t.trim()) : [];

    const quality = qualityPresets['blog'] || 80;

    const buffer = await sharp(file.buffer).jpeg({ quality }).toBuffer();

    const filename = `blog-${Date.now()}`;
    const cloudinaryRes = await uploadToCloudinary(buffer, filename);

    const blog = await prisma.blog.create({
      data: {
        title,
        description,
        tags: tagArray,
        image: cloudinaryRes.secure_url,
        publicId: cloudinaryRes.public_id,
      },
    });

    res.json(blog);
  } catch (error) {
    console.error('createBlog error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getBlogs = async (_, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(blogs);
  } catch (error) {
    console.error('getBlogs error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getBlog = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

    const blog = await prisma.blog.findUniqueOrThrow({ where: { id } });
    res.json(blog);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Blog not found' });
    }
    console.error('getBlog error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

    const { title, description, tags, width, height } = req.body;
    if (!isValidString(title) || !isValidString(description)) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const existing = await prisma.blog.findUniqueOrThrow({ where: { id } });

    let image = existing.image;
    let publicId = existing.publicId;

    const tagArray = typeof tags === 'string' ? tags.split(',').map((t) => t.trim()) : [];

    if (req.file) {
      if (publicId) {
        await cloudinary.uploader.destroy(publicId).catch(() => {});
      }

      const size = sizePresets['blog'] || {
        width: parseInt(width) || 800,
        height: parseInt(height) || 600,
      };

      const buffer = await sharp(req.file.buffer).jpeg({ quality: 80 }).toBuffer();

      const filename = `blog-${Date.now()}`;
      const cloudinaryRes = await uploadToCloudinary(buffer, filename);

      image = cloudinaryRes.secure_url;
      publicId = cloudinaryRes.public_id;
    }

    const updated = await prisma.blog.update({
      where: { id },
      data: {
        title,
        description,
        tags: tagArray,
        image,
        publicId,
      },
    });

    res.json(updated);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Blog not found' });
    }
    console.error('updateBlog error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

    const blog = await prisma.blog.findUniqueOrThrow({ where: { id } });

    if (blog.publicId) {
      await cloudinary.uploader.destroy(blog.publicId).catch(() => {});
    }

    await prisma.blog.delete({ where: { id } });

    res.json({ success: true });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Blog not found' });
    }
    console.error('deleteBlog error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getPaginatedBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.blog.count(),
    ]);

    res.json({
      data: blogs,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('getBlogs error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
