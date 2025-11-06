const sharp = require("sharp");
const { PrismaClient } = require("@prisma/client");
const cloudinary = require("../utils/cloudinary");
const prisma = new PrismaClient();

// 🔹 Helper: Upload image to Cloudinary
const uploadToCloudinary = async (buffer, filename) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "teams",
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

// 🔹 Helper: Validate non-empty strings
const isValidString = (str) => typeof str === "string" && str.trim().length > 0;

// 🧩 CREATE TEAM
exports.createTeam = async (req, res) => {
  try {
    const { name, role, mobile, facebook, linkedin, instagram, twitter } =
      req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ error: "Image is required" });
    if (!isValidString(name) || !isValidString(role)) {
      return res.status(400).json({ error: "Name and role are required" });
    }

    const buffer = await sharp(file.buffer).jpeg({ quality: 80 }).toBuffer();

    const filename = `team-${Date.now()}`;
    const cloudinaryRes = await uploadToCloudinary(buffer, filename);

    const team = await prisma.team.create({
      data: {
        name,
        role,
        imageName: cloudinaryRes.secure_url,
        publicId: cloudinaryRes.public_id,
        mobile: isValidString(mobile) ? mobile : null,
        facebook: isValidString(facebook) ? facebook : null,
        linkedin: isValidString(linkedin) ? linkedin : null,
        instagram: isValidString(instagram) ? instagram : null,
        twitter: isValidString(twitter) ? twitter : null,
      },
    });

    res.json(team);
  } catch (error) {
    console.error("createTeam error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// 🧩 GET ALL TEAMS
exports.getTeams = async (_, res) => {
  try {
    const teams = await prisma.team.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(teams);
  } catch (error) {
    console.error("getTeams error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// 🧩 GET SINGLE TEAM
exports.getTeam = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

    const team = await prisma.team.findUniqueOrThrow({ where: { id } });
    res.json(team);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Team not found" });
    }
    console.error("getTeam error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// 🧩 PAGINATED TEAMS
exports.getTeamsPaginated = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    if (page < 1 || pageSize < 1) {
      return res
        .status(400)
        .json({ error: "Page and pageSize must be positive integers" });
    }

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const [teams, totalCount] = await Promise.all([
      prisma.team.findMany({ skip, take, orderBy: { createdAt: "desc" } }),
      prisma.team.count(),
    ]);

    res.json({
      data: teams,
      pagination: {
        total: totalCount,
        page,
        pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    });
  } catch (error) {
    console.error("getTeamsPaginated error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// 🧩 UPDATE TEAM
exports.updateTeam = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, role, mobile, facebook, linkedin, instagram, twitter } =
      req.body;

    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
    if (!isValidString(name) || !isValidString(role)) {
      return res.status(400).json({ error: "Name and role are required" });
    }

    const existing = await prisma.team.findUniqueOrThrow({ where: { id } });

    let imageName = existing.imageName;
    let publicId = existing.publicId;

    if (req.file) {
      if (publicId) await cloudinary.uploader.destroy(publicId).catch(() => {});
      const buffer = await sharp(req.file.buffer)
        .jpeg({ quality: 80 })
        .toBuffer();
      const filename = `team-${Date.now()}`;
      const cloudinaryRes = await uploadToCloudinary(buffer, filename);
      imageName = cloudinaryRes.secure_url;
      publicId = cloudinaryRes.public_id;
    }

    const updated = await prisma.team.update({
      where: { id },
      data: {
        name,
        role,
        imageName,
        publicId,
        mobile: isValidString(mobile) ? mobile : null,
        facebook: isValidString(facebook) ? facebook : null,
        linkedin: isValidString(linkedin) ? linkedin : null,
        instagram: isValidString(instagram) ? instagram : null,
        twitter: isValidString(twitter) ? twitter : null,
      },
    });

    res.json(updated);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Team not found" });
    }
    console.error("updateTeam error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// 🧩 DELETE TEAM
exports.deleteTeam = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

    const team = await prisma.team.findUniqueOrThrow({ where: { id } });

    if (team.publicId) {
      await cloudinary.uploader.destroy(team.publicId).catch(() => {});
    }

    await prisma.team.delete({ where: { id } });
    res.json({ success: true });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Team not found" });
    }
    console.error("deleteTeam error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
