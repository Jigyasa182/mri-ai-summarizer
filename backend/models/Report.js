const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    reportText: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    bodyPart: {
      type: String,
    },
    aiSummary: {
      observations: [String],
      simplifiedSummary: String,
      importantNotes: String,
      terminology: [
        {
          term: String,
          meaning: String,
        },
      ],
      disclaimer: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", ReportSchema);
