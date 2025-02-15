import mongoose, { Schema, Document } from 'mongoose';

// Define the IUser interface for TypeScript
interface IUser extends Document {
  name: string;
  selection: string;
  email: string;
  location: string;
  password:string;
  teamId?: mongoose.Types.ObjectId;
}

// Define the schema for the User model
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  selection: { type: String, required: true },  // Now it's a plain string
  email: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  password: { type: String, required: true },
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
});

// Export the User model
export default mongoose.model<IUser>('User', UserSchema);
