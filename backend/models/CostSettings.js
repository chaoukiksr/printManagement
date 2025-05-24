import mongoose from "mongoose";

const costSettingsSchema = new mongoose.Schema({
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
    required: true
  },
  printCost: {
    type: Number,
    required: true,
    default: 5
  },
  paperCost: {
    type: Number,
    required: true,
    default: 0.2
  }
}, { timestamps: true });

// Ensure one settings per faculty
costSettingsSchema.index({ facultyId: 1 }, { unique: true });

const CostSettings = mongoose.models.CostSettings || mongoose.model("CostSettings", costSettingsSchema);
export default CostSettings;
