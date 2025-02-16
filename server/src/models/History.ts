import mongoose, { Schema, Document } from "mongoose";

export interface IHistory extends Document {
  placeName: string;
  report: string;
  severity: string;
  preventionMeasures: string;
}

const historySchema: Schema = new Schema({
  placeName: { type: String, required: true },
  report: { type: String, required: true },
  severity: { type: String, required: true },
  preventionMeasures: { type: String, required: true },
});

export default mongoose.model<IHistory>("History", historySchema);
