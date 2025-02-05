import express from 'express';
import Note from '../models/note.mjs';

const router = express.Router();

// CREATE a Note
router.post('/notes', async (req, res) => {
  try {
    const { content, userId } = req.body;
    const note = new Note({ content, userId });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: 'Error creating the note.', details: err.message });
  }
});

// READ Notes for a specific user
router.get('/notes/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const notes = await Note.find({ userId });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching notes.', details: err.message });
  }
});

// UPDATE a Note
router.put('/notes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const note = await Note.findByIdAndUpdate(id, { content }, { new: true });
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ error: 'Error updating the note.', details: err.message });
  }
});

// DELETE a Note
router.delete('/notes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Note.findByIdAndDelete(id);
    res.status(200).json({ message: 'Note deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting the note.', details: err.message });
  }
});

export default router;