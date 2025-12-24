import e from 'express';
import mongoose, { Model, Schema } from 'mongoose';
import { required } from 'zod/mini';
import { MONGO_URI } from './config.js';
const connectToDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB successfully');
    }
    catch (err) {
        console.error('MongoDB connection error:', err);
    }
};
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const contentSchema = new Schema({
    title: { type: String, required: true },
    link: { type: String },
    tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    folderId: { type: mongoose.Types.ObjectId, ref: 'Folder', required: true }
});
const LinkSchema = new Schema({
    hash: String,
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true }
});
const folderSchema = new Schema({
    name: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true }
});
export const FolderModel = mongoose.model("Folder", folderSchema);
export const LinkModel = mongoose.model('Links', LinkSchema);
export const ContentModel = mongoose.model('Content', contentSchema);
export const UserModel = mongoose.model('User', userSchema);
export default connectToDB;
//# sourceMappingURL=db.js.map