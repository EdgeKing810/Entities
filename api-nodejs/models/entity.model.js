import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const entitySchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  tagline: { type: String, required: false, default: '' },
  category: { type: String, required: true },
  modified: { type: Date, required: true, default: new Date() },
});

const Entity = mongoose.model('entities', entitySchema);
export default Entity;
