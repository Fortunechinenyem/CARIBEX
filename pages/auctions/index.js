import AuctionCard from "@/app/components/auction/AuctionCard";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

const AuctionPage = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      const carsCollection = collection(db, "cars");
      const carsSnapshot = await getDocs(carsCollection);
      const carsData = carsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCars(carsData);
    };

    fetchCars();

    const unsubscribe = onSnapshot(collection(db, "cars"), (snapshot) => {
      const updatedCars = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCars(updatedCars);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-semibold text-center mb-8">
        Ongoing Auctions
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <AuctionCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default AuctionPage;
