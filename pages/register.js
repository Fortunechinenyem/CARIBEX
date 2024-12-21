import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      setLoading(false);
      if (!res.ok) throw new Error(data.message);

      router.push("/login");
    } catch (err) {
      setLoading(false);
      setError(err.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center text-white"
      style={{
        backgroundImage: 'url("/images/hero.png")',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
            Register
          </h2>
          {error && (
            <div
              className="mb-4 bg-red-100 text-red-700 border border-red-400 rounded p-3 text-center"
              role="alert"
            >
              {error}
            </div>
          )}
          <form onSubmit={handleRegister}>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
                required
                aria-required="true"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
                aria-required="true"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter a password"
                required
                aria-required="true"
                minLength="6"
              />
            </div>
            <button
              type="submit"
              className={`w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>
          <p className="text-gray-700 text-center mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
