import { useEffect, useState } from "react";

const AdminReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/admin/reports")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched reports:", data);
        if (Array.isArray(data)) {
          setReports(data);
        } else {
          setError("Received data is not in array format.");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching reports.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-semibold text-center mb-8">Reports</h1>
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border-b p-4">Report Name</th>
            <th className="border-b p-4">Details</th>
          </tr>
        </thead>
        <tbody>
          {reports.length > 0 ? (
            reports.map((report) => (
              <tr key={report._id}>
                <td className="border-b p-4">{report.name}</td>
                <td className="border-b p-4">{report.details}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="border-b p-4 text-center">
                No reports found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReports;
