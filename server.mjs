import dotenv from 'dotenv';
import express from 'express';
import conn from './config/db.mjs';
import {logger} from './middleware/logger.mjs';
import MemberProfiles from './models/memberProfiles.mjs';
import SeedRoutes from './routes/seed_routes.mjs';
import cors from 'cors';
import path from 'path';
import {fileURLToPath} from 'url';
import Registration from './models/registration.mjs';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
conn();

app.use(cors({ origin: 'http://localhost:5173', credentials: true, }))
app.use(express.json());

const MemberRoutes = await import('./routes/memberRoutes.mjs').then(
    module => module.default);
const LoginRoutes = await import('./routes/loginRoutes.mjs').then(
    module => module.default);
const RegistrationRoutes = await import('./routes/registrationRoutes.mjs').then(
    module => module.default);
const DashboardRoutes = await import('./routes/dashboardRoute.mjs').then(
    module => module.default);

// Route Definitions
app.use('/member_profiles', MemberRoutes);
app.use('/register', RegistrationRoutes);
app.use('/login', LoginRoutes);
app.use('/dashboard', DashboardRoutes);

// Set configuration settings - key/value pairs
app.set('public', './public'); // .static files are located
app.set('views', './views'); // .ejs files are located
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static('views'));
app.use(express.static('public'));

// Simulate __dirname in ES module
const __filename = fileURLToPath(import.meta.url); // Get the file's full path
const __dirname = path.dirname(__filename); // Get the file's directory path
app.use('/data', express.static(path.join(__dirname, 'data')));
// need for css to work on home route
app.use('/public', express.static(path.join(__dirname, 'public')));

// Route Home
app.get('/', async (req, res) => {
  try {
    const registrants = await Registration.find().sort({ createdAt: -1 });
    res.render('home', {registrants});
  }
  catch (err) {
    // Log errors and respond with a 500 status
    logger.error(`Error loading data: ${err.message}`);
    res.status(500).send('Error loading data.');
  }
});

// app.use('/', SeedRoutes);// Route seed
// //Route to seed all data
// app.get('/seed/all', async (req, res) => {
//   try {
//     await Promise.all([
//       MemberProfiles.deleteMany({}),
//     ]);
//     logger.warn('Delete on all data attempted at startup!');
//     console.warn('Delete on all data attempted at startup!');
//   }
//   catch (e) {
//     logger.error(`Error deleting data: ${e.message}`);
//   }
// });

// Starts the server
app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
