import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import z from "zod";
import cors from "cors";
import connectToDB from "./db.js";
import { ContentModel, UserModel, LinkModel, FolderModel } from "./db.js";
import userMiddleware from "./middleware.js";
import { random } from "./utils.js";
import { JWT_SECRET } from "./config.js";
await connectToDB();
const app = express();
app.use(cors({
    origin: "https://orbit-zeta-one.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.get("/", (_req, res) => {
    res.send("Orbit backend running");
});
app.get("/health", (_req, res) => {
    res.status(200).json({ status: "OK" });
});
app.post("/api/v1/signup", async (req, res) => {
    const schema = z.object({
        username: z.string().min(3),
        password: z.string().min(3)
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ message: "Invalid data" });
    }
    const { username, password } = parsed.data;
    const hashedPassword = await bcrypt.hash(password, 5);
    try {
        await UserModel.create({ username, password: hashedPassword });
        res.json({ message: "Signed up successfully" });
    }
    catch (err) {
        res.status(400).json({ message: "User already exists" });
    }
});
app.post("/api/v1/signin", async (req, res) => {
    const schema = z.object({
        username: z.string(),
        password: z.string().min(3)
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ message: "Invalid data" });
    }
    const { username, password } = parsed.data;
    const user = await UserModel.findOne({ username });
    if (!user) {
        return res.status(403).json({ message: "User not found" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(403).json({ message: "Incorrect credentials" });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.json({ token });
});
app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const { share } = req.body;
    if (share) {
        const existing = await LinkModel.findOne({
            // @ts-ignore
            userId: req.userId
        });
        if (existing) {
            return res.json({ hash: existing.hash });
        }
        const hash = random(10);
        await LinkModel.create({
            // @ts-ignore
            userId: req.userId,
            hash
        });
        return res.json({ hash });
    }
    // @ts-ignore
    await LinkModel.deleteOne({ userId: req.userId });
    res.json({ message: "Share removed" });
});
app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const { shareLink } = req.params;
    const link = await LinkModel.findOne({ hash: shareLink });
    if (!link) {
        return res.status(404).json({ message: "Link not found" });
    }
    const content = await ContentModel.find({ userId: link.userId });
    const user = await UserModel.findById(link.userId);
    res.json({
        username: user?.username,
        content
    });
});
app.get("/api/v1/folders", userMiddleware, async (req, res) => {
    // @ts-ignore
    const folders = await FolderModel.find({ userId: req.userId });
    res.json({ folders });
});
app.post("/api/v1/folders", userMiddleware, async (req, res) => {
    const { name } = req.body;
    if (!name?.trim()) {
        return res.status(400).json({ message: "Folder name required" });
    }
    const folder = await FolderModel.create({
        name,
        // @ts-ignore
        userId: req.userId
    });
    res.json({ folder });
});
app.put("/api/v1/folders/:id", userMiddleware, async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    // @ts-ignore
    await FolderModel.updateOne({ _id: id, userId: req.userId }, { name });
    res.json({ message: "Folder renamed" });
});
app.delete("/api/v1/folders/:id", userMiddleware, async (req, res) => {
    const { id } = req.params;
    // @ts-ignore
    await FolderModel.deleteOne({ _id: id, userId: req.userId });
    await ContentModel.deleteMany({ folderId: id });
    res.json({ message: "Folder deleted" });
});
app.get("/api/v1/content", userMiddleware, async (req, res) => {
    const { folderId } = req.query;
    const content = await ContentModel.find({
        // @ts-ignore
        userId: req.userId,
        folderId
    });
    res.json({ content });
});
app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const item = await ContentModel.create({
        ...req.body,
        // @ts-ignore
        userId: req.userId,
        tags: []
    });
    res.json({ content: item });
});
app.delete("/api/v1/content/:id", userMiddleware, async (req, res) => {
    const { id } = req.params;
    // @ts-ignore
    await ContentModel.deleteOne({ _id: id, userId: req.userId });
    res.json({ message: "Content deleted" });
});
/* =======================
   START SERVER
   ======================= */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map