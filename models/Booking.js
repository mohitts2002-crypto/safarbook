import mongoose from 'mongoose'

const BookingSchema = new mongoose.Schema({
  destinationName: { type: String, required: true },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  totalPeople: { type: Number },
  numGirls: { type: Number },
  numBoys: { type: Number }
}, { timestamps: { createdAt: 'createdAt' } })

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema)
