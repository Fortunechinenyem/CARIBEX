"use client";
import Image from "next/image";
import Navbar from "../app/components/common/Navbar";
import Footer from "@/app/components/common/Footer";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="bg-gray-100 min-h-screen">
        <section
          className="relative bg-cover bg-center text-white py-20"
          style={{
            backgroundImage: 'url("/images/hero.png")',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          <div className="container mx-auto text-center relative z-10">
            <h1 className="text-4xl font-bold mb-4">Find Your Dream Car</h1>
            <p className="text-lg mb-6">
              Explore, bid, and win your next car at unbeatable prices.
            </p>
            <button className="bg-white text-blue-600 px-6 py-3 rounded shadow-md hover:bg-gray-200">
              <Link href="/auctions">Start Bidding</Link>
            </button>
          </div>
        </section>

        <section className="py-6">
          <div className="container mx-auto">
            <form className="flex space-x-4">
              <input
                type="text"
                placeholder="Search by car make or model"
                className="flex-1 px-4 py-3 rounded border border-gray-300"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
              >
                Search
              </button>
            </form>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Featured Auctions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded shadow-md overflow-hidden">
                <Image
                  src="/images/car1.PNG"
                  alt="Car Image"
                  width={500}
                  height={500}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    2018 Toyota Camry
                  </h3>
                  <p className="text-gray-600">Starting Bid: ₦2,500,000</p>
                  <button className="bg-blue-600 text-white px-4 py-2 mt-4 rounded hover:bg-blue-700">
                    <Link href="/auctions">View Auction</Link>
                  </button>
                </div>
              </div>
              <div className="bg-white rounded shadow-md overflow-hidden">
                <Image
                  src="/images/caribex.PNG"
                  alt="Car Image"
                  width={500}
                  height={500}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    2020 Lexus Rx 350
                  </h3>
                  <p className="text-gray-600">Starting Bid: ₦2,500,000</p>
                  <button className="bg-blue-600 text-white px-4 py-2 mt-4 rounded hover:bg-blue-700">
                    <Link href="/auctions">View Auction</Link>
                  </button>
                </div>
              </div>
              <div className="bg-white rounded shadow-md overflow-hidden">
                <Image
                  src="/images/caribex2.PNG"
                  alt="Car Image"
                  width={500}
                  height={500}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    2020 Hyudai Tucson
                  </h3>
                  <p className="text-gray-600">Starting Bid: ₦2,500,000</p>
                  <button className="bg-blue-600 text-white px-4 py-2 mt-4 rounded hover:bg-blue-700">
                    <Link href="/auctions">View Auction</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Home;
