import Link from "next/link";

const FeaturedCars = ({ cars }) => {
  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Featured Cars</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div
            key={car.id}
            className="border rounded-md p-4 shadow hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {car.name}
            </h3>
            <p className="text-gray-600 mb-4">{car.description}</p>
            <Link
              href={`/auctions/${car.id}`}
              className="text-blue-600 hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCars;
