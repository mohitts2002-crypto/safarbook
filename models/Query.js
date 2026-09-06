import mongoose from 'mongoose'

const QuerySchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  phone: { type: String, required: true },
  email: { type: String },
  message: { type: String },
}, { timestamps: { createdAt: 'createdAt' } })

export default mongoose.models.Query || mongoose.model('Query', QuerySchema)
