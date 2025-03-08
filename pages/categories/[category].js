import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CategoryPage = () => {
  const router = useRouter();
  const { category } = router.query;
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (category) {
      fetch("/cars.json")
        .then((response) => response.json())
        .then((data) => {
          const filteredCars = data.filter((car) => {
            if (category === "suvs") {
              return [
                "CX-5",
                "X5",
                "Outback",
                "RX 350",
                "Grand Cherokee",
                "XC90",
              ].includes(car.model);
            } else if (category === "sedans") {
              return [
                "Camry",
                "Civic",
                "A4",
                "Model 3",
                "Altima",
                "Elantra",
              ].includes(car.model);
            } else if (category === "trucks") {
              return [
                "Silverado",
                "Sierra",
                "1500",
                "F-150",
                "Tacoma",
                "Ranger",
              ].includes(car.model);
            }
            return false;
          });
          setCars(filteredCars);
          setLoading(false);
        });
    }
  }, [category]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded shadow-md overflow-hidden"
            >
              <img
                src={car.image || "/images/default-car.png"}
                alt={`${car.make} ${car.model}`}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">
                  {car.make} {car.model}
                </h3>
                <p className="text-gray-600">Year: {car.year}</p>
                <p className="text-gray-600">Price: ${car.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;
