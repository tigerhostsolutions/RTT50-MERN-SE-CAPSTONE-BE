import dotenv from 'dotenv';
import express from 'express';
import conn from './config/db.mjs';
import {logger} from './middleware/logger.mjs';
import MaleProfiles from './models/maleProfiles.mjs';
import FemaleProfiles from './models/femaleProfiles.mjs';
import SeedRoutes from './routes/seed_routes.mjs';
import fs from 'fs/promises'; // Import the File System module to read JSON file
import cors from 'cors';
import path from 'path';
import {fileURLToPath} from 'url';

dotenv.config();
const app = express();
const port = process.env.PORT;
conn();

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json());

const MaleProfileRoutes = await import('./routes/maleProfileRoutes.mjs').then(
    module => module.default);
const FemaleProfileRoutes = await import('./routes/femaleProfileRoutes.mjs').then(
    module => module.default);
const LoginRoutes = await import('./routes/loginRoutes.mjs').then(
    module => module.default);
const RegistrationRoutes = await import('./routes/registrationRoutes.mjs').then(
    module => module.default);
// const UserRoutes = await import('./routes/userRoutes.mjs').then(
//     module => module.default);

// Route Definitions
app.use('/bsocial/profiles/male', MaleProfileRoutes);
app.use('/bsocial/profiles/female', FemaleProfileRoutes);
app.use('/bsocial/register', RegistrationRoutes);
app.use('/bsocial/login', LoginRoutes);
// app.use('/bsocial/user', UserRoutes);



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
app.get('/bsocial', async (req, res) => {
  try {
    // // File paths
    // const maleProfilesPath = './data/maleData.json';
    // const femaleProfilesPath = './data/femaleData.json';
    //
    // // Read and parse JSON files concurrently
    // const [maleProfilesRaw, femaleProfilesRaw] = await Promise.all([
    //   fs.readFile(maleProfilesPath, 'utf-8'),
    //   fs.readFile(femaleProfilesPath, 'utf-8')
    // ]);
    //
    // const maleProfilesData = JSON.parse(maleProfilesRaw);
    // const femaleProfilesData = JSON.parse(femaleProfilesRaw);
    //
    // // Render the profileCard view with both data objects
    // res.render('profileCard', {
    //   maleData: maleProfilesData,
    //   femaleData: femaleProfilesData
    // });
    res.send('Hello and Welcome')
  }
  catch (err) {
    // Log errors and respond with a 500 status
    logger.error(`Error loading data: ${err.message}`);
    res.status(500).send('Error loading data.');
  }
});

app.use('/bsocial/', SeedRoutes);// Route seed
//Route to seed all data
app.get('/bsocial/seed/all', async (req, res) => {
  try {
    await Promise.all([
      MaleProfiles.deleteMany({}),
      FemaleProfiles.deleteMany({}),
    ]);
    logger.warn('Delete on all data attempted at startup!');
    console.warn('Delete on all data attempted at startup!');
  }
  catch (e) {
    logger.error(`Error deleting data: ${e.message}`);
  }
});

// Starts the server
app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
