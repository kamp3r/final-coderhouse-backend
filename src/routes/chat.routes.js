const router = require('express').Router();
const messages = require('../app/controllers/messages');
const { loggerError } = require('../config/log4js');

/**
 * @swagger
 * tags:
 *   name: Auth
 */
/**
 * @openapi
 * /chat/:
 *   get:
 *     summary: 'Get all messages '
 *     description: Return all messages from DB
 *     tags: [Chat]
 *     responses:
 *       200:
 *         description: All messages retrieved successfully
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: user email
 *               body:
 *                 type: string
 *                 description: body of message
 *               type:
 *                 type: string
 *                 description: Type of user, can be USER or SYSTEM
 *               fyh:
 *                 type: string
 *                 example: 12/08/2022 10:30:24
 *                 description: Date of message
 */

router.get('/', async (req, res) => {
  try {
    const message = await messages.list();
    if (message.length) return res.status(200).json(message);
    throw new Error('Messages not found');
  } catch (error) {
    loggerError.error(error.message);
    res.json({ status: 'error' });
  }
});

/**
 * @openapi
 * /chat/{email}:
 *   get:
 *     summary: 'Get all messages by email user'
 *     tags: [Chat]
 *     description: Get messages by email
 *     parameters:
 *     - name: 'email'
 *       in: 'path'
 *       description: 'Email address to retrieve from the database'
 *     responses:
 *       200:
 *         description: 'Chat retrieved successfully'
 *       404:
 *         description: 'Not found chats with email address'
 */

router.get('/:email', async (req, res) => {
  try {
    const message = await messages.listId(req.params.email);
    if (!message.length) {
      throw new Error('Messages not found');
    }
    return res.status(200).json(message);
  } catch (error) {
    loggerError.error(error.message);
    res.status(404).json({ status: 'error' });
  }
});

module.exports = router;
