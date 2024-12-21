"use client";
import { Logo } from "@/public/images";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-xl font-bold text-blue-600">
          <Link href="/">
            <Image src={Logo} alt="logo" width={100} height={100} />
          </Link>
        </div>

        <ul className="hidden md:flex items-center space-x-6">
          <li>
            <Link
              href="/auctions"
              className="text-gray-700 hover:text-blue-600 flex items-center"
            >
              <span>📦</span>
              <span className="ml-2">Auctions</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/seller"
              className="text-gray-700 hover:text-blue-600 flex items-center"
            >
              <span>📊</span>
              <span className="ml-2">Seller Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/admin"
              className="text-gray-700 hover:text-blue-600 flex items-center"
            >
              <span>⚙️</span>
              <span className="ml-2">Admin Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/tracking"
              className="text-gray-700 hover:text-blue-600 flex items-center"
            >
              <span>🚚</span>
              <span className="ml-2">Tracking</span>
            </Link>
          </li>
        </ul>

        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search for cars..."
            className="border rounded-md px-4 py-2 w-64"
          />
          <button className="absolute right-2 top-2 text-gray-500">🔍</button>
        </div>

        <div className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          <Link href="/login">Login</Link>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 hover:text-blue-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="space-y-4 py-4 px-6">
            <li>
              <Link
                href="/auctions"
                className="text-gray-700 hover:text-blue-600 flex items-center"
              >
                <span>📦</span>
                <span className="ml-2">Auctions</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/seller"
                className="text-gray-700 hover:text-blue-600 flex items-center"
              >
                <span>📊</span>
                <span className="ml-2">Seller Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/admin"
                className="text-gray-700 hover:text-blue-600 flex items-center"
              >
                <span>⚙️</span>
                <span className="ml-2">Admin Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/tracking"
                className="text-gray-700 hover:text-blue-600 flex items-center"
              >
                <span>🚚</span>
                <span className="ml-2">Tracking</span>
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-md block text-center"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
