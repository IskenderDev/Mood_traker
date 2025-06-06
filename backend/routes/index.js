import express from 'express';
import UserController from '../controllers/UserController';
import AuthController from '../controllers/AuthController';
import QuoteController from '../controllers/QuoteController';
import JournalController from '../controllers/JournalController';
import ArticleController from '../controllers/ArticleController';
import { authenticateToken } from '../utils/jwt';

const router = express.Router();

// Create a New User
/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/signup', UserController.createUser);

// Login a User
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 */
router.post('/login', AuthController.loginUser);

// Get User Details
/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get user details
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/user', authenticateToken, UserController.getUser);

// Create a New Quote
/**
 * @swagger
 * /quote:
 *   post:
 *     summary: Create a new quote
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               quote:
 *                 type: string
 *               icon:
 *                 type: string
 *               color:
 *                 type: string
 *     responses:
 *       201:
 *         description: Quote created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/quote', authenticateToken, QuoteController.createQuote);

// Get all Quotes
/**
 * @swagger
 * /quotes:
 *   get:
 *     summary: Get all quotes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of quotes retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/quotes', authenticateToken, QuoteController.getQuotes);

// Delete Quotes By Id
/**
 * @swagger
 * /quote/{id}:
 *   delete:
 *     summary: Delete a quote by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quote deleted successfully
 *       404:
 *         description: Quote not found
 */
router.delete('/quote/:id', authenticateToken, QuoteController.deleteQuoteById);

// Create a New Journal
/**
 * @swagger
 * /journal:
 *   post:
 *     summary: Create a new journal entry
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               mood:
 *                 type: object
 *                 properties:
 *                   icon:
 *                     type: string
 *                   name:
 *                     type: string
 *                   value:
 *                     type: integer
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               date:
 *                 type: string
 *     responses:
 *       201:
 *         description: Journal entry created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/journal', authenticateToken, JournalController.createJournal);

// Get all Journals
/**
 * @swagger
 * /journals:
 *   get:
 *     summary: Get all journals
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of journals retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/journals', authenticateToken, JournalController.getAllJournal);

// Get Journal By Id
/**
 * @swagger
 * /journal/{id}:
 *   get:
 *     summary: Get a journal by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Journal retrieved successfully
 *       404:
 *         description: Journal not found
 */
router.get('/journal/:id', authenticateToken, JournalController.getJournalById);

// Update a Journal
/**
 * @swagger
 * /journal/{id}:
 *   put:
 *     summary: Update a journal by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mood:
 *                 type: object
 *                 properties:
 *                   icon:
 *                     type: string
 *                   string:
 *                     type: string
 *                   value:
 *                     type: integer
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               date:
 *                 type: string
 *     responses:
 *       200:
 *         description: Journal updated successfully
 *       404:
 *         description: Journal not found
 */
router.put('/journal/:id', authenticateToken, JournalController.updateJournalById);

// Delete a Journal
/**
 * @swagger
 * /journal/{id}:
 *   delete:
 *     summary: Delete a journal by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Journal deleted successfully
 *       404:
 *         description: Journal not found
 */
router.delete('/journal/:id', authenticateToken, JournalController.deleteJournalById);

// Route to fetch mood data
/**
 * @swagger
 * /moods:
 *   get:
 *     summary: Retrieve all mood data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of mood data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   moodValue:
 *                     type: integer
 *                     description: The mood value.
 *                     example: 5
 *                   date:
 *                     type: string
 *                     description: The date of the mood entry.
 *                     example: "2024-06-22"
 */
router.get('/moods', authenticateToken, JournalController.getMoodData);

// Route to fetch mental health articles
/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Retrieve mental health articles
 *     responses:
 *       200:
 *         description: A list of articles retrieved successfully
 *       400:
 *         description: Invalid input
 */
router.get('/articles', ArticleController.getArticle);

// Route to search for mental health articles
/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Search for mental health articles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               query:
 *                 type: string
 *     responses:
 *       200:
 *         description: A list of articles matching the search query
 *       400:
 *         description: Invalid input
 */
router.post('/articles', ArticleController.getArticleBySearch);


export default router;
