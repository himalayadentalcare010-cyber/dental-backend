const path = require("path");
const sharp = require("sharp");
const { PrismaClient } = require("@prisma/client");
const cloudinary = require("../utils/cloudinary");
const { sizePresets, qualityPresets } = require("../constant/constant");

const prisma = new PrismaClient();

const isValidString = (str) => typeof str === "string" && str.trim().length > 0;

const uploadToCloudinary = async (buffer, filename) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "banners",
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

exports.createBanner = async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "Images required" });
    }

    const createdBanners = [];

    for (const file of files) {
      const buffer = await sharp(file.buffer)
        .jpeg({ quality: 80 }) // fixed quality
        .toBuffer();

      const filename = `banner-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 8)}`;

      const cloudinaryRes = await uploadToCloudinary(buffer, filename);

      const banner = await prisma.banner.create({
        data: {
          image: cloudinaryRes.secure_url,
          publicId: cloudinaryRes.public_id,
        },
      });

      createdBanners.push(banner);
    }

    return res.json({
      success: true,
      message: "Banners uploaded successfully",
      data: createdBanners,
    });
  } catch (error) {
    console.error("createBanner error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getBanners = async (_, res) => {
  try {
    const banners = await prisma.banner.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(banners);
  } catch (error) {
    console.error("getBanners error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getBanner = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

    const banner = await prisma.banner.findUniqueOrThrow({
      where: { id },
    });

    res.json(banner);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Banner not found" });
    }
    console.error("getBanner error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateBanner = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

    const { title, description, tag, width, height } = req.body;
    if (
      !isValidString(title) ||
      !isValidString(description) ||
      !isValidString(tag)
    ) {
      return res
        .status(400)
        .json({ error: "Title, description, and tag are required" });
    }

    const existing = await prisma.banner.findUniqueOrThrow({ where: { id } });

    let image = existing.image;
    let publicId = existing.publicId;

    if (req.file) {
      // Delete old image from Cloudinary first
      if (publicId) {
        await cloudinary.uploader.destroy(publicId).catch(() => {});
      }

      const size = sizePresets[tag] || {
        width: parseInt(width) || 800,
        height: parseInt(height) || 400,
      };

      const buffer = await sharp(req.file.buffer)
        .jpeg({ quality: 80 })
        .toBuffer();

      const filename = `banner-${Date.now()}`;
      const cloudinaryRes = await uploadToCloudinary(buffer, filename);

      image = cloudinaryRes.secure_url;
      publicId = cloudinaryRes.public_id;
    }

    const updated = await prisma.banner.update({
      where: { id },
      data: { title, description, tag, image, publicId },
    });

    res.json(updated);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Banner not found" });
    }
    console.error("updateBanner error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

    const banner = await prisma.banner.findUniqueOrThrow({ where: { id } });

    if (banner.publicId) {
      await cloudinary.uploader.destroy(banner.publicId).catch(() => {});
    }

    await prisma.banner.delete({ where: { id } });
    res.json({ success: true });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Banner not found" });
    }
    console.error("deleteBanner error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getPaginatedBanners = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (page < 1 || limit < 1) {
      return res
        .status(400)
        .json({ error: "Page and limit must be positive integers" });
    }

    const skip = (page - 1) * limit;

    const [banners, total] = await Promise.all([
      prisma.banner.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.banner.count(),
    ]);

    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: banners,
      pagination: {
        totalItems: total,
        totalPages,
        currentPage: page,
        pageSize: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("getPaginatedBanners error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
