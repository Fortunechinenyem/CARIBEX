import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { auth } from "@/lib/firebase";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log("Fetching users...");
        const res = await fetch("/api/admin/users");

        console.log("API Response Status:", res.status);

        const data = await res.json();
        console.log("API Data:", data);

        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("Expected an array but got:", data);
          setUsers([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-6">Manage Users</h1>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="border-b p-4">Name</th>
            <th className="border-b p-4">Email</th>
            <th className="border-b p-4">Role</th>
            <th className="border-b p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border-b p-4">{user.name}</td>
              <td className="border-b p-4">{user.email}</td>
              <td className="border-b p-4">{user.role}</td>
              <td className="border-b p-4">
                <button className="text-red-600 hover:text-red-800">
                  <FaTrashAlt />
                </button>
                <button className="ml-4 text-purple-600 hover:text-blue-800">
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
