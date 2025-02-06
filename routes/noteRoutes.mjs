import express from 'express';
import Note from '../models/note.js';
import authenticate from '../middleware/authentication.mjs'; // Import the
// authentication middleware

const router = express.Router();

// Create a Note
router.post('/', authenticate, async (req, res) => {
  try {
    const note = await Note.create({
      user: req.user.id,
      content: req.body.content,
    });
    res.status(201).json(note); // Return newly created note
  } catch (error) {
    res.status(500).json({ error: 'Failed to create note' });
  }
});

// Read All Notes for a User
router.get('/', authenticate, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// Update a Note
router.put('/:id', authenticate, async (req, res) => {
  try {
    const updatedNote = await Note.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id },
        { content: req.body.content },
        { new: true } // Return the updated document
    );

    if (!updatedNote) return res.status(404).json({ error: 'Note not found' });

    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update note' });
  }
});

// Delete a Note
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });

    if (!deletedNote) return res.status(404).json({ error: 'Note not found' });

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

export default router;