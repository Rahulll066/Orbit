import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ContentModel, UserModel, LinkModel } from "./db.js";
import z from "zod";
import bcrypt from "bcrypt";
import connectToDB from "./db.js";
import { JWT_SECRET } from "./config.js";
import userMiddleware from "./middleware.js";
import { random } from "./utils.js";
await connectToDB();
const app = express();
app.use(express.json());
app.post('/api/v1/signup', async (req, res) => {
    const signupSchema = z.object({
        username: z.string().min(3),
        password: z.string().min(3)
    });
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ message: "Invalid request", errors: parsed.error });
    }
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 5);
    try {
        await UserModel.create({ username, password: hashedPassword });
        res.json({ message: "Signed up successfully" });
    }
    catch (err) {
        res.status(400).json({ message: "Sign up failed", error: err });
    }
});
app.post('/api/v1/signin', async (req, res) => {
    const schema = z.object({ username: z.string(), password: z.string().min(3) });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json({ message: "Invalid data" });
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user)
        return res.status(403).json({ message: "User not found!" });
    const match = await bcrypt.compare(password, user.password);
    if (!match)
        return res.status(403).json({ message: "Incorrect credentials!" });
    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.json({ token });
});
app.post('/api/v1/content', userMiddleware, async (req, res) => {
    const title = req.body.title;
    const link = req.body.link;
    const type = req.body.type;
    await ContentModel.create({
        title,
        link,
        type,
        //@ts-ignore
        userId: req.userId,
        tags: []
    });
    res.json({ message: "Content added successfully" });
});
app.get('/api/v1/content', userMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate('userId', 'username');
    res.json({ content });
});
app.delete('/api/v1/content', userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;
    await ContentModel.deleteMany({
        _id: contentId,
        //@ts-ignore
        userId: req.userId
    });
    res.json({ message: "Content deleted successfully" });
});
app.post('/api/v1/brain/share', userMiddleware, async (req, res) => {
    const share = req.body.share;
    if (share) {
        const ExistingLink = await LinkModel.findOne({
            // @ts-ignore
            userId: req.userId
        });
        if (ExistingLink) {
            res.json({ hash: ExistingLink.hash });
            return;
        }
        const hash = random(10);
        await LinkModel.create({
            // @ts-ignore
            userId: req.userId,
            hash: hash
        });
        res.json({ hash });
        return;
    }
    // @ts-ignore
    await LinkModel.deleteOne({ userId: req.userId });
    res.json({ message: "Share link removed" });
});
app.get('/api/v1/brain/:shareLink', async (req, res) => {
    const hash = req.params.shareLink;
    const link = await LinkModel.findOne({
        hash
    });
    if (!link) {
        return res.status(404).json({ message: "Link not found" });
    }
    const content = await ContentModel.find({
        userId: link.userId
    });
    const user = await UserModel.findOne({
        _id: link.userId
    });
    res.json({
        username: user?.username,
        content: content
    });
});
app.listen(3000, () => {
    console.log("Server started on port 3000");
});
//# sourceMappingURL=index.js.map