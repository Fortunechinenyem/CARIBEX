import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import formidable from "formidable-serverless";
import { v4 as uuidv4 } from "uuid";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const form = new formidable.IncomingForm();
  form.uploadDir = "./public/uploads";
  form.keepExtensions = true;

  try {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "File upload error" });
      }

      const { make, model, year, condition, mileage, price } = fields;

      const carImages = Object.values(files).map((file) => file.path);

      const carData = {
        make,
        model,
        year: parseInt(year, 10),
        condition,
        mileage: parseInt(mileage, 10),
        price: parseFloat(price),
        images: carImages,
        status: "Pending",
        createdAt: new Date(),
      };

      const carsCollection = collection(db, "cars");
      await addDoc(carsCollection, carData);

      return res.status(201).json({ message: "Car uploaded successfully!" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
