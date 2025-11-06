const express = require("express");
const router = express.Router();
const controller = require("../controllers/teams.controller");
const upload = require("../middlewares/upload.middleware");
const { requireAuth } = require("../middlewares/auth.middleware");

// 📄 Routes
router.get("/paginated", controller.getTeamsPaginated);
router.get("/", controller.getTeams);
router.get("/:id", controller.getTeam);
router.post("/", requireAuth, upload.single("image"), controller.createTeam);
router.put("/:id", requireAuth, upload.single("image"), controller.updateTeam);
router.delete("/:id", requireAuth, controller.deleteTeam);

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
 *           example: "John Doe"
 *         role:
 *           type: string
 *           example: "Developer"
 *         imageName:
 *           type: string
 *           example: "https://res.cloudinary.com/demo/image/upload/v162889/team-162889.jpg"
 *         publicId:
 *           type: string
 *           example: "teams/team-162889"
 *         mobile:
 *           type: string
 *           nullable: true
 *           example: "+9779812345678"
 *         facebook:
 *           type: string
 *           nullable: true
 *           example: "https://facebook.com/johndoe"
 *         linkedin:
 *           type: string
 *           nullable: true
 *           example: "https://linkedin.com/in/johndoe"
 *         instagram:
 *           type: string
 *           nullable: true
 *           example: "https://instagram.com/johndoe"
 *         twitter:
 *           type: string
 *           nullable: true
 *           example: "https://twitter.com/johndoe"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
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
 *                 example: "Jane Doe"
 *               role:
 *                 type: string
 *                 example: "Designer"
 *               image:
 *                 type: string
 *                 format: binary
 *               mobile:
 *                 type: string
 *                 example: "+9779800000000"
 *               facebook:
 *                 type: string
 *                 example: "https://facebook.com/janedoe"
 *               linkedin:
 *                 type: string
 *                 example: "https://linkedin.com/in/janedoe"
 *               instagram:
 *                 type: string
 *                 example: "https://instagram.com/janedoe"
 *               twitter:
 *                 type: string
 *                 example: "https://twitter.com/janedoe"
 *     responses:
 *       200:
 *         description: Team member created successfully
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
 *         description: Team member data
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
 *                 example: "Jane Doe"
 *               role:
 *                 type: string
 *                 example: "Lead Designer"
 *               image:
 *                 type: string
 *                 format: binary
 *               mobile:
 *                 type: string
 *                 example: "+9779800000000"
 *               facebook:
 *                 type: string
 *                 example: "https://facebook.com/janedoe"
 *               linkedin:
 *                 type: string
 *                 example: "https://linkedin.com/in/janedoe"
 *               instagram:
 *                 type: string
 *                 example: "https://instagram.com/janedoe"
 *               twitter:
 *                 type: string
 *                 example: "https://twitter.com/janedoe"
 *     responses:
 *       200:
 *         description: Team member updated successfully
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
 *         description: Team member deleted successfully
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
 *                     page:
 *                       type: integer
 *                     pageSize:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Internal server error
 */
