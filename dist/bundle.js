/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 56:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const cloudinary = (__webpack_require__(416).v2);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dj3uudzl3',
  api_key: process.env.CLOUDINARY_API_KEY || '954562388357852',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'u7Kbe3OUW18Q5bAoE4KthNYlEjo'
});
module.exports = cloudinary;

/***/ }),

/***/ 85:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const express = __webpack_require__(252);
const router = express.Router();
const controller = __webpack_require__(968);
const upload = __webpack_require__(891);
const {
  requireAuth
} = __webpack_require__(790);
router.get('/paginated', controller.getTeamsPaginated);
router.get('/', controller.getTeams);
router.get('/:id', controller.getTeam);
router.post('/', requireAuth, upload.single('image'), controller.createTeam);
router.put('/:id', requireAuth, upload.single('image'), controller.updateTeam);
router.delete('/:id', requireAuth, controller.deleteTeam);
module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Team:
 *       type: object
 *       required:
 *         - name
 *         - role
 *         - image
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         role:
 *           type: string
 *         imageName:
 *           type: string
 *         publicId:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: 1
 *         name: "John Doe"
 *         role: "Developer"
 *         imageName: "team-162889.jpg"
 *         publicId: "teams/team-162889"
 *         createdAt: "2025-07-19T12:34:56Z"
 *         updatedAt: "2025-07-19T12:34:56Z"
 */

/**
 * @swagger
 * /teams:
 *   get:
 *     summary: Get all team members
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: List of team members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Team'
 *       500:
 *         description: Internal server error
 *
 *   post:
 *     summary: Create a team member
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - role
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Team member created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 *
 * /teams/{id}:
 *   get:
 *     summary: Get a team member by ID
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Team ID
 *     responses:
 *       200:
 *         description: Team data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       404:
 *         description: Team not found
 *       500:
 *         description: Internal server error
 *
 *   put:
 *     summary: Update a team member
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Team ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Team member updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       404:
 *         description: Team not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete a team member
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Team ID
 *     responses:
 *       200:
 *         description: Team member deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Team not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /teams/paginated:
 *   get:
 *     summary: Get paginated list of team members
 *     tags: [Teams]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: Number of teams per page
 *     responses:
 *       200:
 *         description: Paginated list of teams
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Team'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       description: Total number of teams
 *                     page:
 *                       type: integer
 *                       description: Current page number
 *                     pageSize:
 *                       type: integer
 *                       description: Number of teams per page
 *                     totalPages:
 *                       type: integer
 *                       description: Total number of pages
 *       400:
 *         description: Invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/***/ }),

/***/ 131:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const express = __webpack_require__(252);
const router = express.Router();
const controller = __webpack_require__(190);

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Contact form submissions
 */

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contact submissions
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: List of contact submissions
 */

router.get('/paginated', controller.getPaginatedContacts);
/**
 * @swagger
 * /contacts/paginated:
 *   get:
 *     summary: Get paginated list of contacts
 *     tags: [Contacts]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number (default is 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of contacts per page (default is 10)
 *     responses:
 *       200:
 *         description: A paginated list of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Contact'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       500:
 *         description: Failed to fetch contacts
 */

router.get('/', controller.getAllContacts);

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Submit a contact form
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - project
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               project:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact created successfully
 */
router.post('/', controller.createContact);

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get a contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Contact found
 *       404:
 *         description: Contact not found
 */
router.get('/:id', controller.getContactById);

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Contact deleted
 *       404:
 *         description: Contact not found
 */
router.delete('/:id', controller.deleteContact);
module.exports = router;

/***/ }),

/***/ 184:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const express = __webpack_require__(252);
const router = express.Router();
const {
  requireAuth
} = __webpack_require__(790);
const upload = __webpack_require__(891);
const controller = __webpack_require__(941);
router.get('/projects/paginated', controller.getPaginatedProjects);
router.get('/', controller.getProjects);
router.get('/:id', controller.getProject);
router.post('/', requireAuth, upload.single('image'), controller.createProject);
router.put('/:id', requireAuth, upload.single('image'), controller.updateProject);
router.delete('/:id', requireAuth, controller.deleteProject);
module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - imageName
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         imageName:
 *           type: string
 *           description: Cloudinary image URL
 *         link:
 *           type: string
 *           nullable: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: 1
 *         name: "Portfolio Website"
 *         description: "A modern portfolio built with React and Tailwind"
 *         imageName: "https://res.cloudinary.com/your-cloud/image/upload/v123/project.jpg"
 *         link: "https://yourportfolio.com"
 *         createdAt: "2024-01-01T00:00:00Z"
 *         updatedAt: "2024-01-02T00:00:00Z"
 */

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: List of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               link:
 *                 type: string
 *                 nullable: true
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Project created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 */

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Get a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Project found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project not found
 *
 *   put:
 *     summary: Update a project by ID
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               link:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Project updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project not found
 *
 *   delete:
 *     summary: Delete a project by ID
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Project deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Project not found
 */

/**
 * @swagger
 * /projects/paginated:
 *   get:
 *     summary: Get paginated list of projects
 *     tags: [Projects]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number (default is 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of projects per page (default is 10)
 *     responses:
 *       200:
 *         description: A paginated list of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Project'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       500:
 *         description: Internal server error
 */

/***/ }),

/***/ 190:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const {
  PrismaClient
} = __webpack_require__(330);
const prisma = new PrismaClient();
exports.createContact = async (req, res) => {
  try {
    const {
      name,
      email,
      project,
      message
    } = req.body;
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        project,
        message
      }
    });
    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({
      error: 'Failed to create contact',
      details: err.message
    });
  }
};

// Get all contacts
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({
      error: 'Failed to fetch contacts',
      details: err.message
    });
  }
};

// Get paginated contacts
exports.getPaginatedContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const [contacts, total] = await Promise.all([prisma.contact.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc'
      }
    }), prisma.contact.count()]);
    res.json({
      data: contacts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    res.status(500).json({
      error: 'Failed to fetch contacts',
      details: err.message
    });
  }
};

// Get a contact by ID
exports.getContactById = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const contact = await prisma.contact.findUnique({
      where: {
        id: Number(id)
      }
    });
    if (!contact) return res.status(404).json({
      error: 'Contact not found'
    });
    res.json(contact);
  } catch (err) {
    res.status(500).json({
      error: 'Failed to fetch contact',
      details: err.message
    });
  }
};

// Delete a contact
exports.deleteContact = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    await prisma.contact.delete({
      where: {
        id: Number(id)
      }
    });
    res.json({
      message: 'Contact deleted successfully'
    });
  } catch (err) {
    res.status(500).json({
      error: 'Failed to delete contact',
      details: err.message
    });
  }
};

/***/ }),

/***/ 252:
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ 288:
/***/ ((module) => {

"use strict";
module.exports = require("sharp");

/***/ }),

/***/ 320:
/***/ ((module) => {

"use strict";
module.exports = require("swagger-ui-express");

/***/ }),

/***/ 330:
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

/***/ 360:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const express = __webpack_require__(252);
const router = express.Router();
const {
  requireAuth
} = __webpack_require__(790);
const upload = __webpack_require__(891);
const controller = __webpack_require__(525);
router.get('/paginated', controller.getPaginatedBlogs);
router.get('/', controller.getBlogs);
router.get('/:id', controller.getBlog);
router.post('/', requireAuth, upload.single('image'), controller.createBlog);
router.put('/:id', requireAuth, upload.single('image'), controller.updateBlog);
router.delete('/:id', requireAuth, controller.deleteBlog);
///hhhhhhhhhhhhhhhh

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - tags
 *         - image
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID
 *         title:
 *           type: string
 *           description: Blog title
 *         description:
 *           type: string
 *           description: Blog content
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Blog tags
 *         image:
 *           type: string
 *           description: Image URL
 *       example:
 *         id: 1
 *         title: "How to Start a Garden"
 *         description: "Beginner tips for starting your first garden."
 *         tags: ["gardening", "beginner", "outdoor"]
 *         image: "https://res.cloudinary.com/your-cloud/image/upload/v123/blog.jpg"
 */

/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Get all blogs
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: List of blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 *       500:
 *         description: Internal server error
 *
 *   post:
 *     summary: Create a new blog
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - tags
 *               - image
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               tags:
 *                 type: string
 *                 description: Comma-separated list of tags
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Blog created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /blogs/{id}:
 *   get:
 *     summary: Get blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Blog data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 *
 *   put:
 *     summary: Update blog by ID
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Blog ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - tags
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               tags:
 *                 type: string
 *                 description: Comma-separated list of tags
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Blog updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete blog by ID
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Blog deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /blogs/paginated:
 *   get:
 *     summary: Get paginated blogs
 *     tags: [Blogs]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Paginated list of blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Blog'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       500:
 *         description: Internal server error
 */

/***/ }),

/***/ 393:
/***/ ((module) => {

const sizePresets = {
  banner: {
    width: 1200,
    height: 600
  },
  testimonial: {
    width: 800,
    height: 400
  },
  blog: {
    width: 1024,
    height: 512
  }
  // add other presets as needed
};
const qualityPresets = {
  banner: 90,
  // higher quality for banner
  testimonial: 70,
  // lower quality for testimonial
  blog: 80 // medium quality for blog
};
module.exports = {
  sizePresets,
  qualityPresets
};

/***/ }),

/***/ 416:
/***/ ((module) => {

"use strict";
module.exports = require("cloudinary");

/***/ }),

/***/ 422:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const path = __webpack_require__(928);
const sharp = __webpack_require__(288);
const {
  PrismaClient
} = __webpack_require__(330);
const cloudinary = __webpack_require__(56);
const {
  sizePresets,
  qualityPresets
} = __webpack_require__(393);
const prisma = new PrismaClient();
const isValidString = str => typeof str === 'string' && str.trim().length > 0;
const uploadToCloudinary = async (buffer, filename) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({
      resource_type: 'image',
      folder: 'banners',
      public_id: filename
    }, (err, result) => {
      if (err) reject(err);else resolve(result);
    });
    stream.end(buffer);
  });
};
exports.createBanner = async (req, res) => {
  try {
    const {
      title,
      description,
      tag,
      width,
      height
    } = req.body;
    const file = req.file;
    if (!file) return res.status(400).json({
      error: 'Image required'
    });
    if (!isValidString(title) || !isValidString(description) || !isValidString(tag)) {
      return res.status(400).json({
        error: 'Title, description, and tag are required'
      });
    }
    const size = sizePresets[tag] || {
      width: parseInt(width) || 800,
      height: parseInt(height) || 400
    };
    const quality = qualityPresets[tag] || 80;
    const buffer = await sharp(file.buffer).resize(size.width, size.height).jpeg({
      quality: quality
    }).toBuffer();
    const filename = `banner-${Date.now()}`;
    const cloudinaryRes = await uploadToCloudinary(buffer, filename);
    const banner = await prisma.banner.create({
      data: {
        title,
        description,
        tag,
        image: cloudinaryRes.secure_url,
        publicId: cloudinaryRes.public_id
      }
    });
    res.json(banner);
  } catch (error) {
    console.error('createBanner error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};
exports.getBanners = async (_, res) => {
  try {
    const banners = await prisma.banner.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(banners);
  } catch (error) {
    console.error('getBanners error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};
exports.getBanner = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({
      error: 'Invalid ID'
    });
    const banner = await prisma.banner.findUniqueOrThrow({
      where: {
        id
      }
    });
    res.json(banner);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        error: 'Banner not found'
      });
    }
    console.error('getBanner error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};
exports.updateBanner = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({
      error: 'Invalid ID'
    });
    const {
      title,
      description,
      tag,
      width,
      height
    } = req.body;
    if (!isValidString(title) || !isValidString(description) || !isValidString(tag)) {
      return res.status(400).json({
        error: 'Title, description, and tag are required'
      });
    }
    const existing = await prisma.banner.findUniqueOrThrow({
      where: {
        id
      }
    });
    let image = existing.image;
    let publicId = existing.publicId;
    if (req.file) {
      // Delete old image from Cloudinary first
      if (publicId) {
        await cloudinary.uploader.destroy(publicId).catch(() => {});
      }
      const size = sizePresets[tag] || {
        width: parseInt(width) || 800,
        height: parseInt(height) || 400
      };
      const buffer = await sharp(req.file.buffer).resize(size.width, size.height).jpeg({
        quality: 80
      }).toBuffer();
      const filename = `banner-${Date.now()}`;
      const cloudinaryRes = await uploadToCloudinary(buffer, filename);
      image = cloudinaryRes.secure_url;
      publicId = cloudinaryRes.public_id;
    }
    const updated = await prisma.banner.update({
      where: {
        id
      },
      data: {
        title,
        description,
        tag,
        image,
        publicId
      }
    });
    res.json(updated);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        error: 'Banner not found'
      });
    }
    console.error('updateBanner error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};
exports.deleteBanner = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({
      error: 'Invalid ID'
    });
    const banner = await prisma.banner.findUniqueOrThrow({
      where: {
        id
      }
    });
    if (banner.publicId) {
      await cloudinary.uploader.destroy(banner.publicId).catch(() => {});
    }
    await prisma.banner.delete({
      where: {
        id
      }
    });
    res.json({
      success: true
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        error: 'Banner not found'
      });
    }
    console.error('deleteBanner error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};
exports.getPaginatedBanners = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    if (page < 1 || limit < 1) {
      return res.status(400).json({
        error: 'Page and limit must be positive integers'
      });
    }
    const skip = (page - 1) * limit;
    const [banners, total] = await Promise.all([prisma.banner.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc'
      }
    }), prisma.banner.count()]);
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
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('getPaginatedBanners error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

/***/ }),

/***/ 450:
/***/ ((module) => {

"use strict";
module.exports = require("swagger-jsdoc");

/***/ }),

/***/ 461:
/***/ ((module) => {

"use strict";
module.exports = require("multer");

/***/ }),

/***/ 525:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const sharp = __webpack_require__(288);
const {
  PrismaClient
} = __webpack_require__(330);
const cloudinary = __webpack_require__(56);
const {
  sizePresets,
  qualityPresets
} = __webpack_require__(393);
const prisma = new PrismaClient();
const isValidString = str => typeof str === 'string' && str.trim().length > 0;
const uploadToCloudinary = async (buffer, filename) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({
      resource_type: 'image',
      folder: 'blogs',
      public_id: filename
    }, (err, result) => {
      if (err) reject(err);else resolve(result);
    });
    stream.end(buffer);
  });
};
exports.createBlog = async (req, res) => {
  try {
    const {
      title,
      description,
      tags,
      width,
      height
    } = req.body;
    const file = req.file;
    if (!file) return res.status(400).json({
      error: 'Image required'
    });
    if (!isValidString(title) || !isValidString(description)) {
      return res.status(400).json({
        error: 'Title and description are required'
      });
    }
    const tagArray = typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : [];
    const quality = qualityPresets['blog'] || 80;
    const buffer = await sharp(file.buffer).jpeg({
      quality
    }).toBuffer();
    const filename = `blog-${Date.now()}`;
    const cloudinaryRes = await uploadToCloudinary(buffer, filename);
    const blog = await prisma.blog.create({
      data: {
        title,
        description,
        tags: tagArray,
        image: cloudinaryRes.secure_url,
        publicId: cloudinaryRes.public_id
      }
    });
    res.json(blog);
  } catch (error) {
    console.error('createBlog error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};
exports.getBlogs = async (_, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(blogs);
  } catch (error) {
    console.error('getBlogs error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};
exports.getBlog = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({
      error: 'Invalid ID'
    });
    const blog = await prisma.blog.findUniqueOrThrow({
      where: {
        id
      }
    });
    res.json(blog);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        error: 'Blog not found'
      });
    }
    console.error('getBlog error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};
exports.updateBlog = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({
      error: 'Invalid ID'
    });
    const {
      title,
      description,
      tags,
      width,
      height
    } = req.body;
    if (!isValidString(title) || !isValidString(description)) {
      return res.status(400).json({
        error: 'Title and description are required'
      });
    }
    const existing = await prisma.blog.findUniqueOrThrow({
      where: {
        id
      }
    });
    let image = existing.image;
    let publicId = existing.publicId;
    const tagArray = typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : [];
    if (req.file) {
      if (publicId) {
        await cloudinary.uploader.destroy(publicId).catch(() => {});
      }
      const size = sizePresets['blog'] || {
        width: parseInt(width) || 800,
        height: parseInt(height) || 600
      };
      const buffer = await sharp(req.file.buffer).jpeg({
        quality: 80
      }).toBuffer();
      const filename = `blog-${Date.now()}`;
      const cloudinaryRes = await uploadToCloudinary(buffer, filename);
      image = cloudinaryRes.secure_url;
      publicId = cloudinaryRes.public_id;
    }
    const updated = await prisma.blog.update({
      where: {
        id
      },
      data: {
        title,
        description,
        tags: tagArray,
        image,
        publicId
      }
    });
    res.json(updated);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        error: 'Blog not found'
      });
    }
    console.error('updateBlog error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};
exports.deleteBlog = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({
      error: 'Invalid ID'
    });
    const blog = await prisma.blog.findUniqueOrThrow({
      where: {
        id
      }
    });
    if (blog.publicId) {
      await cloudinary.uploader.destroy(blog.publicId).catch(() => {});
    }
    await prisma.blog.delete({
      where: {
        id
      }
    });
    res.json({
      success: true
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        error: 'Blog not found'
      });
    }
    console.error('deleteBlog error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};
exports.getPaginatedBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const [blogs, total] = await Promise.all([prisma.blog.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc'
      }
    }), prisma.blog.count()]);
    res.json({
      data: blogs,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('getBlogs error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

/***/ }),

/***/ 577:
/***/ ((module) => {

"use strict";
module.exports = require("cors");

/***/ }),

/***/ 723:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const express = __webpack_require__(252);
const router = express.Router();
const upload = __webpack_require__(891);
const testimonialController = __webpack_require__(748);
router.get('/paginated', testimonialController.getTestimonialsPaginated);
router.post('/', upload.single('image'), testimonialController.createTestimonial);
router.get('/', testimonialController.getTestimonials);
router.get('/:id', testimonialController.getTestimonial);
router.put('/:id', upload.single('image'), testimonialController.updateTestimonial);
router.delete('/:id', testimonialController.deleteTestimonial);
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Testimonials
 *   description: Testimonial management
 */

/**
 * @swagger
 * /testimonials:
 *   get:
 *     summary: Get all testimonials
 *     tags: [Testimonials]
 *     responses:
 *       200:
 *         description: A list of testimonials
 */

/**
 * @swagger
 * /testimonials/{id}:
 *   get:
 *     summary: Get a testimonial by ID
 *     tags: [Testimonials]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The testimonial
 *       404:
 *         description: Not found
 */

/**
 * @swagger
 * /testimonials:
 *   post:
 *     summary: Create a new testimonial
 *     tags: [Testimonials]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               rating:
 *                 type: integer
 *               role:
 *                 type: string
 *               message:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Created
 */

/**
 * @swagger
 * /testimonials/{id}:
 *   put:
 *     summary: Update a testimonial
 *     tags: [Testimonials]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               rating:
 *                 type: integer
 *               role:
 *                 type: string
 *               message:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Not found
 */

/**
 * @swagger
 * /testimonials/{id}:
 *   delete:
 *     summary: Delete a testimonial
 *     tags: [Testimonials]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted
 *       404:
 *         description: Not found
 */
/**
 * @swagger
 * /testimonials/paginated:
 *   get:
 *     summary: Get paginated testimonials
 *     tags: [Testimonials]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number (default 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Number of testimonials per page (default 10)
 *     responses:
 *       200:
 *         description: Paginated list of testimonials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 total:
 *                   type: integer
 *                   example: 45
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       author:
 *                         type: string
 *                       content:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                   example:
 *                     - id: 1
 *                       author: "Jane Doe"
 *                       content: "Great service!"
 *                       createdAt: "2025-07-19T12:34:56Z"
 *                     - id: 2
 *                       author: "John Smith"
 *                       content: "Highly recommend."
 *                       createdAt: "2025-07-20T08:22:30Z"
 *       400:
 *         description: Invalid page or limit query parameter
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Page and limit must be positive integers"
 *       500:
 *         description: Internal server error
 */

/***/ }),

/***/ 729:
/***/ ((module) => {

"use strict";
module.exports = require("bcryptjs");

/***/ }),

/***/ 734:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const {
  PrismaClient
} = __webpack_require__(330);
const jwt = __webpack_require__(829);
const bcrypt = __webpack_require__(729);
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

// REGISTER
exports.register = async (req, res) => {
  const {
    name,
    email,
    password,
    secretKey
  } = req.body;

  // Check if secretKey is correct
  if (secretKey !== 'parasdai') {
    return res.status(403).json({
      error: 'Invalid secret key'
    });
  }
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email
      }
    });
    if (existingUser) {
      return res.status(400).json({
        error: 'Email already exists'
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Server error'
    });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const {
    email,
    password
  } = req.body;
  console.log(email);
  try {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });
    if (!user) return res.status(401).json({
      error: 'Invalid credentials'
    });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({
      error: 'Invalid credentials'
    });
    const token = jwt.sign({
      userId: user.id
    }, JWT_SECRET);
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Server error'
    });
  }
};
exports.getMe = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.userId
    },
    select: {
      id: true,
      name: true,
      email: true
    }
  });
  res.json(user);
};

/***/ }),

/***/ 748:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const sharp = __webpack_require__(288);
const {
  PrismaClient
} = __webpack_require__(330);
const cloudinary = __webpack_require__(56);
const prisma = new PrismaClient();
const uploadToCloudinary = async (buffer, filename) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({
      resource_type: 'image',
      folder: 'testimonials',
      public_id: filename
    }, (err, result) => {
      if (err) reject(err);else resolve(result);
    });
    stream.end(buffer);
  });
};
const isValidString = str => typeof str === 'string' && str.trim().length > 0;
const isValidRating = num => Number.isInteger(num) && num >= 0 && num <= 5;
exports.createTestimonial = async (req, res) => {
  try {
    const {
      name,
      rating,
      role,
      message
    } = req.body;
    const file = req.file;
    if (!file) return res.status(400).json({
      error: 'Image is required'
    });
    if (!isValidString(name) || !isValidString(role) || !isValidString(message)) {
      return res.status(400).json({
        error: 'Name, role, and message are required'
      });
    }
    if (!isValidRating(Number(rating))) {
      return res.status(400).json({
        error: 'Rating must be an integer between 0 and 5'
      });
    }
    const buffer = await sharp(file.buffer).resize(800, 600).jpeg({
      quality: 40
    }).toBuffer();
    const filename = `testimonial-${Date.now()}`;
    const cloudinaryRes = await uploadToCloudinary(buffer, filename);
    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        rating: Number(rating),
        role,
        message,
        image: cloudinaryRes.secure_url,
        publicId: cloudinaryRes.public_id
      }
    });
    res.json(testimonial);
  } catch (error) {
    console.error('createTestimonial error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};
exports.getTestimonials = async (_, res) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(testimonials);
  } catch (error) {
    console.error('getTestimonials error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};
exports.getTestimonialsPaginated = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    if (page < 1 || limit < 1) {
      return res.status(400).json({
        error: 'Page and limit must be positive integers'
      });
    }
    const skip = (page - 1) * limit;
    const [testimonials, total] = await Promise.all([prisma.testimonial.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc'
      }
    }), prisma.testimonial.count()]);
    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: testimonials
    });
  } catch (error) {
    console.error('getTestimonialsPaginated error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};
exports.getTestimonial = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({
      error: 'Invalid ID'
    });
    const testimonial = await prisma.testimonial.findUniqueOrThrow({
      where: {
        id
      }
    });
    res.json(testimonial);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        error: 'Testimonial not found'
      });
    }
    console.error('getTestimonial error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};
exports.updateTestimonial = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const {
      name,
      rating,
      role,
      message
    } = req.body;
    if (isNaN(id)) return res.status(400).json({
      error: 'Invalid ID'
    });
    if (!isValidString(name) || !isValidString(role) || !isValidString(message)) {
      return res.status(400).json({
        error: 'Name, role, and message are required'
      });
    }
    if (!isValidRating(Number(rating))) {
      return res.status(400).json({
        error: 'Rating must be an integer between 0 and 5'
      });
    }
    const existing = await prisma.testimonial.findUniqueOrThrow({
      where: {
        id
      }
    });
    let image = existing.image;
    let publicId = existing.publicId;
    if (req.file) {
      if (publicId) await cloudinary.uploader.destroy(publicId).catch(() => {});
      const buffer = await sharp(req.file.buffer).resize(800, 600).jpeg({
        quality: 80
      }).toBuffer();
      const filename = `testimonial-${Date.now()}`;
      const cloudinaryRes = await uploadToCloudinary(buffer, filename);
      image = cloudinaryRes.secure_url;
      publicId = cloudinaryRes.public_id;
    }
    const updated = await prisma.testimonial.update({
      where: {
        id
      },
      data: {
        name,
        rating: Number(rating),
        role,
        message,
        image,
        publicId
      }
    });
    res.json(updated);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        error: 'Testimonial not found'
      });
    }
    console.error('updateTestimonial error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};
exports.deleteTestimonial = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({
      error: 'Invalid ID'
    });
    const testimonial = await prisma.testimonial.findUniqueOrThrow({
      where: {
        id
      }
    });
    if (testimonial.publicId) {
      await cloudinary.uploader.destroy(testimonial.publicId).catch(() => {});
    }
    await prisma.testimonial.delete({
      where: {
        id
      }
    });
    res.json({
      success: true
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        error: 'Testimonial not found'
      });
    }
    console.error('deleteTestimonial error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

/***/ }),

/***/ 790:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const jwt = __webpack_require__(829);
const JWT_SECRET = process.env.JWT_SECRET;
exports.requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({
    error: 'No token provided'
  });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Invalid token'
    });
  }
};

/***/ }),

/***/ 818:
/***/ ((module) => {

"use strict";
module.exports = require("dotenv");

/***/ }),

/***/ 829:
/***/ ((module) => {

"use strict";
module.exports = require("jsonwebtoken");

/***/ }),

/***/ 891:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const multer = __webpack_require__(461);
const storage = multer.memoryStorage();
const upload = multer({
  storage
});
module.exports = upload;

/***/ }),

/***/ 901:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const express = __webpack_require__(252);
const router = express.Router();
const {
  requireAuth
} = __webpack_require__(790);
const controller = __webpack_require__(422);
const upload = __webpack_require__(891);
router.get('/paginated', controller.getPaginatedBanners);
router.get('/', controller.getBanners);
router.get('/:id', controller.getBanner);
router.post('/', requireAuth, upload.single('image'), controller.createBanner);
router.put('/:id', requireAuth, upload.single('image'), controller.updateBanner);
router.delete('/:id', requireAuth, controller.deleteBanner);
module.exports = router;

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Banner:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - tag
 *         - image
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the banner
 *         title:
 *           type: string
 *           description: Banner title
 *         description:
 *           type: string
 *           description: Banner description
 *         tag:
 *           type: string
 *           description: Banner tag
 *         image:
 *           type: string
 *           description: Filename of the banner image
 *       example:
 *         id: 1
 *         title: "Summer Sale"
 *         description: "Huge discounts on all items"
 *         tag: "sale"
 *         image: "banner1.jpg"
 */

/**
 * @swagger
 * /banners:
 *   get:
 *     summary: Get all banners
 *     tags: [Banners]
 *     responses:
 *       200:
 *         description: List of banners
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Banner'
 *       500:
 *         description: Internal server error
 *
 *   post:
 *     summary: Create a new banner
 *     tags: [Banners]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - tag
 *               - image
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               tag:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Banner created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Banner'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /banners/{id}:
 *   get:
 *     summary: Get banner by ID
 *     tags: [Banners]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Banner ID
 *     responses:
 *       200:
 *         description: Banner data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Banner'
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Banner not found
 *       500:
 *         description: Internal server error
 *
 *   put:
 *     summary: Update banner by ID
 *     tags: [Banners]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Banner ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - tag
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               tag:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Banner updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Banner'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Banner not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete banner by ID
 *     tags: [Banners]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Banner ID
 *     responses:
 *       200:
 *         description: Banner deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Banner not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /banners/paginated:
 *   get:
 *     summary: Get banners with pagination
 *     tags: [Banners]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Paginated list of banners
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Banner'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                       example: 42
 *                     totalPages:
 *                       type: integer
 *                       example: 5
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     pageSize:
 *                       type: integer
 *                       example: 10
 *                     hasNextPage:
 *                       type: boolean
 *                       example: true
 *                     hasPrevPage:
 *                       type: boolean
 *                       example: false
 *       500:
 *         description: Internal server error
 */

/***/ }),

/***/ 928:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 940:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const swaggerJsdoc = __webpack_require__(450);
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Banner API',
      version: '1.0.0',
      description: 'API for managing banners'
    },
    servers: [{
      url: process.env.IS_LOCAL ? process.env.IS_LOCAL : 'https://fourgnepal.onrender.com/api'
    }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    // Apply this security scheme globally (optional)
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./routes/*.js', './controllers/*.js'] // files containing annotations for the OpenAPI spec
};
const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;

/***/ }),

/***/ 941:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const sharp = __webpack_require__(288);
const {
  PrismaClient
} = __webpack_require__(330);
const cloudinary = __webpack_require__(56);
const prisma = new PrismaClient();
const uploadToCloudinary = async (buffer, filename) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({
      resource_type: 'image',
      folder: 'projects',
      public_id: filename
    }, (err, result) => {
      if (err) reject(err);else resolve(result);
    });
    stream.end(buffer);
  });
};
const isValidString = str => typeof str === 'string' && str.trim().length > 0;
exports.createProject = async (req, res) => {
  try {
    const {
      name,
      description,
      link
    } = req.body;
    const file = req.file;
    if (!file) return res.status(400).json({
      error: 'Image required'
    });
    if (!isValidString(name) || !isValidString(description)) {
      return res.status(400).json({
        error: 'Name and description are required'
      });
    }
    const buffer = await sharp(file.buffer).resize(800, 600).jpeg({
      quality: 80
    }).toBuffer();
    const filename = `project-${Date.now()}`;
    const cloudinaryRes = await uploadToCloudinary(buffer, filename);
    const project = await prisma.project.create({
      data: {
        name,
        description,
        link,
        imageName: cloudinaryRes.secure_url,
        publicId: cloudinaryRes.public_id
      }
    });
    res.json(project);
  } catch (error) {
    console.error('createProject error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};
exports.getProjects = async (_, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(projects);
  } catch (error) {
    console.error('getProjects error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};
exports.getPaginatedProjects = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const [projects, total] = await Promise.all([prisma.project.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc'
      } // optional ordering
    }), prisma.project.count()]);
    res.json({
      data: projects,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('getPaginatedProjects error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};
exports.getProject = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({
      error: 'Invalid ID'
    });
    const project = await prisma.project.findUniqueOrThrow({
      where: {
        id
      }
    });
    res.json(project);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        error: 'Project not found'
      });
    }
    console.error('getProject error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};
exports.updateProject = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const {
      name,
      description,
      link
    } = req.body;
    if (isNaN(id)) return res.status(400).json({
      error: 'Invalid ID'
    });
    if (!isValidString(name) || !isValidString(description)) {
      return res.status(400).json({
        error: 'Name and description are required'
      });
    }
    const existing = await prisma.project.findUniqueOrThrow({
      where: {
        id
      }
    });
    let imageName = existing.imageName;
    let publicId = existing.publicId;
    if (req.file) {
      if (publicId) await cloudinary.uploader.destroy(publicId).catch(() => {});
      const buffer = await sharp(req.file.buffer).resize(800, 600).jpeg({
        quality: 80
      }).toBuffer();
      const filename = `project-${Date.now()}`;
      const cloudinaryRes = await uploadToCloudinary(buffer, filename);
      imageName = cloudinaryRes.secure_url;
      publicId = cloudinaryRes.public_id;
    }
    const updated = await prisma.project.update({
      where: {
        id
      },
      data: {
        name,
        description,
        link,
        imageName,
        publicId
      }
    });
    res.json(updated);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        error: 'Project not found'
      });
    }
    console.error('updateProject error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};
exports.deleteProject = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({
      error: 'Invalid ID'
    });
    const project = await prisma.project.findUniqueOrThrow({
      where: {
        id
      }
    });
    if (project.publicId) {
      await cloudinary.uploader.destroy(project.publicId).catch(() => {});
    }
    await prisma.project.delete({
      where: {
        id
      }
    });
    res.json({
      success: true
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        error: 'Project not found'
      });
    }
    console.error('deleteProject error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

/***/ }),

/***/ 968:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const sharp = __webpack_require__(288);
const {
  PrismaClient
} = __webpack_require__(330);
const cloudinary = __webpack_require__(56);
const prisma = new PrismaClient();
const uploadToCloudinary = async (buffer, filename) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({
      resource_type: 'image',
      folder: 'teams',
      public_id: filename
    }, (err, result) => {
      if (err) reject(err);else resolve(result);
    });
    stream.end(buffer);
  });
};
const isValidString = str => typeof str === 'string' && str.trim().length > 0;
exports.createTeam = async (req, res) => {
  try {
    const {
      name,
      role
    } = req.body;
    const file = req.file;
    if (!file) return res.status(400).json({
      error: 'Image is required'
    });
    if (!isValidString(name) || !isValidString(role)) {
      return res.status(400).json({
        error: 'Name and role are required'
      });
    }
    const buffer = await sharp(file.buffer).jpeg({
      quality: 80
    }).toBuffer();
    const filename = `team-${Date.now()}`;
    const cloudinaryRes = await uploadToCloudinary(buffer, filename);
    const team = await prisma.team.create({
      data: {
        name,
        role,
        imageName: cloudinaryRes.secure_url,
        publicId: cloudinaryRes.public_id
      }
    });
    res.json(team);
  } catch (error) {
    console.error('createTeam error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};
exports.getTeams = async (_, res) => {
  try {
    const teams = await prisma.team.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(teams);
  } catch (error) {
    console.error('getTeams error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};
exports.getTeam = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({
      error: 'Invalid ID'
    });
    const team = await prisma.team.findUniqueOrThrow({
      where: {
        id
      }
    });
    res.json(team);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        error: 'Team not found'
      });
    }
    console.error('getTeam error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};
exports.getTeamsPaginated = async (req, res) => {
  try {
    // Parse query parameters for pagination, with defaults
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    if (page < 1 || pageSize < 1) {
      return res.status(400).json({
        error: 'Page and pageSize must be positive integers'
      });
    }
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    // Fetch paginated teams
    const [teams, totalCount] = await Promise.all([prisma.team.findMany({
      skip,
      take,
      orderBy: {
        createdAt: 'desc'
      }
    }), prisma.team.count()]);
    res.json({
      data: teams,
      pagination: {
        total: totalCount,
        page,
        pageSize,
        totalPages: Math.ceil(totalCount / pageSize)
      }
    });
  } catch (error) {
    console.error('getTeamsPaginated error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};
exports.updateTeam = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const {
      name,
      role
    } = req.body;
    if (isNaN(id)) return res.status(400).json({
      error: 'Invalid ID'
    });
    if (!isValidString(name) || !isValidString(role)) {
      return res.status(400).json({
        error: 'Name and role are required'
      });
    }
    const existing = await prisma.team.findUniqueOrThrow({
      where: {
        id
      }
    });
    let imageName = existing.imageName;
    let publicId = existing.publicId;
    if (req.file) {
      if (publicId) await cloudinary.uploader.destroy(publicId).catch(() => {});
      const buffer = await sharp(req.file.buffer).jpeg({
        quality: 80
      }).toBuffer();
      const filename = `team-${Date.now()}`;
      const cloudinaryRes = await uploadToCloudinary(buffer, filename);
      imageName = cloudinaryRes.secure_url;
      publicId = cloudinaryRes.public_id;
    }
    const updated = await prisma.team.update({
      where: {
        id
      },
      data: {
        name,
        role,
        imageName,
        publicId
      }
    });
    res.json(updated);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        error: 'Team not found'
      });
    }
    console.error('updateTeam error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};
exports.deleteTeam = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({
      error: 'Invalid ID'
    });
    const team = await prisma.team.findUniqueOrThrow({
      where: {
        id
      }
    });
    if (team.publicId) {
      await cloudinary.uploader.destroy(team.publicId).catch(() => {});
    }
    await prisma.team.delete({
      where: {
        id
      }
    });
    res.json({
      success: true
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        error: 'Team not found'
      });
    }
    console.error('deleteTeam error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

/***/ }),

/***/ 989:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const express = __webpack_require__(252);
const path = __webpack_require__(928);
(__webpack_require__(818).config)();
const swaggerUi = __webpack_require__(320);
const swaggerSpec = __webpack_require__(940);
const cors = __webpack_require__(577);
const app = express();
app.use(cors({
  origin: ['https://4gnepal.com.np', 'http://localhost:5173'],
  // allow both production and dev
  credentials: true // if you send cookies or auth headers
}));

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

const blogsRoutes = __webpack_require__(360);
const projectRoutes = __webpack_require__(184);
const bannerRoutes = __webpack_require__(901);
const authRoutes = __webpack_require__(997);
const teamRoutes = __webpack_require__(85);
const testimonialRoutes = __webpack_require__(723);
const contactRoutes = __webpack_require__(131);
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
module.exports = app;

/***/ }),

/***/ 997:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const express = __webpack_require__(252);
const router = express.Router();
const controller = __webpack_require__(734);

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: user@example.com
 *         password:
 *           type: string
 *           format: password
 *           example: securePassword123
 *
 *     RegisterInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - secretKey
 *       properties:
 *         name:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           example: john@example.com
 *         password:
 *           type: string
 *           format: password
 *           example: strongpassword123
 *         secretKey:
 *           type: string
 *           example:  hbGciOiJIUzI1NiIsInR5cCI6IkpX
 *
 *     AuthResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: 123
 *             email:
 *               type: string
 *               example: user@example.com
 *             name:
 *               type: string
 *               example: John Doe
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user (requires secretKey)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Bad request or user already exists
 *       403:
 *         description: Invalid secret key
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthInput'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */

router.post('/register', controller.register);
router.post('/login', controller.login);
module.exports = router;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(989);
/******/ 	
/******/ })()
;