import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      fetch("/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch user data");
          return res.json();
        })
        .then((data) => setUser(data))
        .catch((err) => {
          console.error(err);
          router.push("/login");
        });
    }
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      {user.role === "seller" ? (
        <p>Welcome, Seller! You can upload your car here.</p>
      ) : (
        <p>Welcome, Buyer! You can view the available auctions.</p>
      )}
    </div>
  );
};

export default Dashboard;
