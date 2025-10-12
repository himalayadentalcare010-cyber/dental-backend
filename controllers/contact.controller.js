const { PrismaClient } = require('@prisma/client');const prisma = new PrismaClient();
exports.createContact = async (req, res) => {
  try {
    const { name, email, project, message } = JSON(req.body||'{}');

    const contact = await prisma.contact.create({
      data: { name, email, project, message },
    });

    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create contact', details: err.message });
  }
};

// Get all contacts
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contacts', details: err.message });
  }
};

// Get paginated contacts
exports.getPaginatedContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.contact.count(),
    ]);

    res.json({
      data: contacts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contacts', details: err.message });
  }
};

// Get a contact by ID
exports.getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await prisma.contact.findUnique({ where: { id: Number(id) } });

    if (!contact) return res.status(404).json({ error: 'Contact not found' });

    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contact', details: err.message });
  }
};

// Delete a contact
exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.contact.delete({ where: { id: Number(id) } });

    res.json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete contact', details: err.message });
  }
};
