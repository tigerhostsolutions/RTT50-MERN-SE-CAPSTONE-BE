import mongoose from 'mongoose';

const Note = mongoose.model('Notes', new mongoose.Schema({
  content: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'MemberProfile' }
}));

export default Note;