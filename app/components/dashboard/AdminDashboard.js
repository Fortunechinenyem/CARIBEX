import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/cars");
        const data = await res.json();
        setCars(data.cars);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleAction = async (carId, action) => {
    try {
      const res = await fetch(`/api/admin/cars/${carId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMessage(
        `Car ${action === "approve" ? "approved" : "rejected"} successfully.`
      );
      setCars(cars.filter((car) => car._id !== carId)); // Remove processed car
    } catch (err) {
      console.error(err);
      setMessage(err.message || "Failed to update the car status.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      {message && <p className="mb-4 text-center">{message}</p>}
      {loading ? (
        <p>Loading cars...</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Make</th>
              <th className="border px-4 py-2">Model</th>
              <th className="border px-4 py-2">Year</th>
              <th className="border px-4 py-2">Condition</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car._id}>
                <td className="border px-4 py-2">{car.make}</td>
                <td className="border px-4 py-2">{car.model}</td>
                <td className="border px-4 py-2">{car.year}</td>
                <td className="border px-4 py-2">{car.condition}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                    onClick={() => handleAction(car._id, "approve")}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleAction(car._id, "reject")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
