import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default async function handler(req, res) {
  console.log("Incoming Request:", req.method);

  if (req.method === "GET") {
    try {
      console.log("Fetching users from Firestore...");
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);

      console.log("Users found:", usersSnapshot.docs.length);

      const users = usersSnapshot.docs.map((doc) => {
        console.log("User Data:", doc.id, doc.data());
        return { id: doc.id, ...doc.data() };
      });

      res.status(200).json(users);
    } catch (error) {
      console.error("🔥 Error fetching users:", error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
