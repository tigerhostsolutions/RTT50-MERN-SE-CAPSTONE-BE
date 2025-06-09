import express from 'express';
import authenticate from '../middleware/authentication.mjs'; // Import the
// authentication middleware

import Note from '../models/note.mjs'; // Example Mongoose model

const router = express.Router();

// Get all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find(); // Fetch all notes, no user filtering
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch notes.' });
  }
});

// Create a new note
router.post('/', async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required.' });
  }

  try {
    const newNote = await Note.create({
      title,
      content,
    });
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create note.' });
  }
});

// Update a note
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const updatedNote = await Note.findByIdAndUpdate(
        id,
        { title, content },
        { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found.' });
    }

    res.json(updatedNote);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update note.' });
  }
});

// Delete a note
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found.' });
    }

    res.json({ message: 'Note deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete note.' });
  }
});


//
// // Create a Note
// router.post('/', authenticate, async (req, res) => {
//   try {
//     const note = await Note.create({
//       user: req.user.id,
//       content: req.body.content,
//     });
//     res.status(201).json(note); // Return newly created note
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to create note' });
//   }
// });
//
// // Read All Notes for a User
// router.get('/', authenticate, async (req, res) => {
//   try {
//     const notes = await Note.find({ user: req.user.id });
//     res.status(200).json(notes);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch notes' });
//   }
// });
//
// // Update a Note
// router.put('/:id', authenticate, async (req, res) => {
//   try {
//     const updatedNote = await Note.findOneAndUpdate(
//         { _id: req.params.id, user: req.user.id },
//         { content: req.body.content },
//         { new: true } // Return the updated document
//     );
//
//     if (!updatedNote) return res.status(404).json({ error: 'Note not found' });
//
//     res.status(200).json(updatedNote);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to update note' });
//   }
// });
//
// // Delete a Note
// router.delete('/:id', authenticate, async (req, res) => {
//   try {
//     const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });
//
//     if (!deletedNote) return res.status(404).json({ error: 'Note not found' });
//
//     res.status(200).json({ message: 'Note deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to delete note' });
//   }
// });

export default router;
