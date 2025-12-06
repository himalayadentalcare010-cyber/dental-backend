const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// GET /api/db-test
router.get("", async (req, res) => {
  try {
    // simple query
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      success: true,
      message: "Database Connected Successfully 🎉",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database Connection Failed ❌",
      error: error.message,
    });
  }
});

module.exports = router;
