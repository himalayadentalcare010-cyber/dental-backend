const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;

// REGISTER
exports.register = async (req, res) => {
  const { name, email, password, secretKey } = req.body;

  // Check if secretKey is correct
  if (secretKey !== 'parasdai') {
    return res.status(403).json({ error: 'Invalid secret key' });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
     const user = await prisma.user.findUnique({ where: { email } });
     if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    // if (!JWT_SECRET) {
    //   console.error('JWT_SECRET is undefined!');
    //   return res.status(500).json({ error: 'JWT secret is missing' });
    // }
    // let token;
    // try {
    //   token = jwt.sign({ userId: user.id }, JWT_SECRET);
    // } catch (error) {
    //   res.status(500).json({ error: 'jwt error' });
    // }

    res.status(201).json({ message:"sitaram" });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getMe = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.userId },
    select: { id: true, name: true, email: true },
  });
  res.json(user);
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.error('GetAllUsers error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
