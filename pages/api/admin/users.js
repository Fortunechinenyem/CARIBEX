import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { verifyAdmin } from "@/middleware/authMiddleware";

export default async function handler(req, res) {
  await verifyAdmin(req, res, async () => {
    if (req.method === "GET") {
      try {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const users = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        res.status(200).json(users);
      } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    } else if (req.method === "DELETE") {
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      try {
        const userRef = doc(db, "users", userId);
        await deleteDoc(userRef);

        res.status(200).json({ message: "User deleted successfully" });
      } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    } else if (req.method === "PUT") {
      const { userId, updatedData } = req.body;

      if (!userId || !updatedData) {
        return res
          .status(400)
          .json({ message: "User ID and data are required" });
      }

      try {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, updatedData);

        res.status(200).json({ message: "User updated successfully" });
      } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  });
}
