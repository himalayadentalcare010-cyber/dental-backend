const sharp = require('sharp');
const { PrismaClient } = require('@prisma/client');
const cloudinary = require('../utils/cloudinary');
const prisma = new PrismaClient();

const uploadToCloudinary = async (buffer, filename) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'image',
        folder: 'projects',
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

exports.createProject = async (req, res) => {
  try {
    const { name, description, link } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ error: 'Image required' });
    if (!isValidString(name) || !isValidString(description)) {
      return res.status(400).json({ error: 'Name and description are required' });
    }

    const buffer = await sharp(file.buffer).resize(800, 600).jpeg({ quality: 80 }).toBuffer();

    const filename = `project-${Date.now()}`;
    const cloudinaryRes = await uploadToCloudinary(buffer, filename);

    const project = await prisma.project.create({
      data: {
        name,
        description,
        link,
        imageName: cloudinaryRes.secure_url,
        publicId: cloudinaryRes.public_id,
      },
    });

    res.json(project);
  } catch (error) {
    console.error('createProject error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getProjects = async (_, res) => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects);
  } catch (error) {
    console.error('getProjects error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getPaginatedProjects = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }, // optional ordering
      }),
      prisma.project.count(),
    ]);

    res.json({
      data: projects,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('getPaginatedProjects error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getProject = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

    const project = await prisma.project.findUniqueOrThrow({ where: { id } });
    res.json(project);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Project not found' });
    }
    console.error('getProject error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, description, link } = req.body;

    if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });
    if (!isValidString(name) || !isValidString(description)) {
      return res.status(400).json({ error: 'Name and description are required' });
    }

    const existing = await prisma.project.findUniqueOrThrow({ where: { id } });

    let imageName = existing.imageName;
    let publicId = existing.publicId;

    if (req.file) {
      if (publicId) await cloudinary.uploader.destroy(publicId).catch(() => {});

      const buffer = await sharp(req.file.buffer).resize(800, 600).jpeg({ quality: 80 }).toBuffer();

      const filename = `project-${Date.now()}`;
      const cloudinaryRes = await uploadToCloudinary(buffer, filename);

      imageName = cloudinaryRes.secure_url;
      publicId = cloudinaryRes.public_id;
    }

    const updated = await prisma.project.update({
      where: { id },
      data: {
        name,
        description,
        link,
        imageName,
        publicId,
      },
    });

    res.json(updated);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Project not found' });
    }
    console.error('updateProject error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

    const project = await prisma.project.findUniqueOrThrow({ where: { id } });

    if (project.publicId) {
      await cloudinary.uploader.destroy(project.publicId).catch(() => {});
    }

    await prisma.project.delete({ where: { id } });

    res.json({ success: true });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Project not found' });
    }
    console.error('deleteProject error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
