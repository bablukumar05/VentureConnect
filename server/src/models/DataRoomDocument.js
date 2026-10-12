const mongoose = require('mongoose');

const dataRoomDocumentSchema = new mongoose.Schema(
  {
    startup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Startup',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ['Financials', 'Legal', 'IP & Patents', 'Cap Table', 'Due Diligence', 'Contracts'],
      default: 'Due Diligence',
    },
    fileUrl: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      default: 'pdf',
    },
    fileSize: {
      type: String,
      default: '1.2 MB',
    },
    isLocked: {
      type: Boolean,
      default: true,
    },
    accessRequests: [
      {
        investor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        status: {
          type: String,
          enum: ['pending', 'approved', 'rejected'],
          default: 'pending',
        },
        requestedAt: {
          type: Date,
          default: Date.now,
        },
        expiresAt: {
          type: Date,
        },
        watermarkText: {
          type: String,
        },
      },
    ],
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('DataRoomDocument', dataRoomDocumentSchema);
