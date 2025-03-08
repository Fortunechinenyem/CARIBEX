import { useState } from "react";

const SearchCars = () => {
  const [query, setQuery] = useState("");
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setCars([]);

    try {
      // Fetch data from the local JSON file
      const response = await fetch("/cars.json");
      if (!response.ok) {
        throw new Error("Failed to fetch car data");
      }
      const data = await response.json();

      // Filter cars based on the query
      const filteredCars = data.filter(
        (car) =>
          car.make.toLowerCase().includes(query.toLowerCase()) ||
          car.model.toLowerCase().includes(query.toLowerCase())
      );

      setCars(filteredCars);
    } catch (error) {
      setError("An error occurred while searching for cars. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-6">
      <div className="container mx-auto">
        <form onSubmit={handleSearch} className="flex space-x-4">
          <input
            type="text"
            placeholder="Search by car make or model"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-3 rounded border border-gray-300"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.length > 0
            ? cars.map((car) => (
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
              ))
            : !loading && <p className="text-gray-600">No cars found.</p>}
        </div>
      </div>
    </section>
  );
};

export default SearchCars;
