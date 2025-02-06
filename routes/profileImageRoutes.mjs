import express from "express";
import RegistrationModel from "../models/registration.mjs";
import multer from 'multer';
import path from 'path';
import {fileURLToPath} from 'url';

const router = express.Router();

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const upload = multer({
    dest: path.join(__dirname, "uploads/"),
});

// API to get profile image by user id
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        // Find the user in the database using _id
        const member = await RegistrationModel.findById(id);

        if (!member || !member.profileImage) {
            return res.status(404).json({
                message: "Profile image not found",
            });
        }

        // Respond with the profileImage URL
        res.json({
            profileImageUrl: member.profileImage,
        });
    } catch (err) {
        console.error("Error fetching profile image:", err);
        res.status(500).json({
            message: "Something went wrong",
        });
    }
});

router.post("/:id", upload.single("profileImage"), async (req, res) => {
    const { id } = req.params;
    const newImagePath = req.file.path;

    try {
        const member = await RegistrationModel.findByIdAndUpdate(
            id,
            { profileImage: newImagePath },
            { new: true }
        );

        if (!member) {
            return res.status(404).json({ message: "Member not found" });
        }

        res.json({ message: "Profile image updated", profileImageUrl: member.profileImage });
    } catch (err) {
        console.error("Error updating profile image:", err);
        res.status(500).json({ message: "Server error" });
    }
});
export default router;