const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middlewares/auth.middleware');

const controller = require('../controllers/banner.controller');

const upload = require('../middlewares/upload.middleware');

router.get('/', controller.getBanners);
router.get('/:id', controller.getBanner);
router.post('/', requireAuth, upload.single('image'), controller.createBanner);
router.put('/:id', requireAuth, controller.updateBanner);
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
