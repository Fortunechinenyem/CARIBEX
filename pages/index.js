"use client";

import Image from "next/image";

import Footer from "@/app/components/common/Footer";
import Link from "next/link";
import SearchCars from "@/app/components/SearchCars";
import Navbar from "@/app/components/common/Navbar";

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
            <SearchCars />
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Explore by Category
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "SUVs", icon: "/images/hero.png" },
                { name: "Sedans", icon: "/images/pix1.jpg" },
                { name: "Trucks", icon: "/images/hero.png" },
              ].map((category) => (
                <Link
                  key={category.name}
                  href={`/categories/${category.name.toLowerCase()}`}
                  className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl"
                >
                  <Image
                    src={category.icon}
                    alt={category.name}
                    width={64}
                    height={64}
                    className="mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-700">
                    {category.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Featured Auctions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "2018 Toyota Camry",
                  price: "₦2,500,000",
                  img: "/images/car1.PNG",
                },
                {
                  name: "2020 Lexus Rx 350",
                  price: "₦2,500,000",
                  img: "/images/caribex.PNG",
                },
                {
                  name: "2020 Hyundai Tucson",
                  price: "₦2,500,000",
                  img: "/images/caribex2.PNG",
                },
              ].map((car, index) => (
                <div
                  key={index}
                  className="bg-white rounded shadow-md overflow-hidden"
                >
                  <Image
                    src={car.img}
                    alt={car.name}
                    width={500}
                    height={500}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800">
                      {car.name}
                    </h3>
                    <p className="text-gray-600">Starting Bid: {car.price}</p>
                    <button className="bg-blue-600 text-white px-4 py-2 mt-4 rounded hover:bg-blue-700">
                      <Link href="/auctions">View Auction</Link>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-100">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Jane Zeruba",
                  feedback: "The bidding process was seamless and fun!",
                },
                {
                  name: "Ben Khalid",
                  feedback: "I found my dream car at a great price!",
                },
                {
                  name: "Meruwa Crsytal",
                  feedback: "Excellent customer support and verified listings!",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded shadow-md p-4 text-gray-800"
                >
                  <p className="italic">"{testimonial.feedback}"</p>
                  <h3 className="font-bold mt-4">- {testimonial.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-blue-600 text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="mb-6">
              Sign up for our newsletter to get the latest updates on upcoming
              auctions and featured listings.
            </p>
            <form className="flex justify-center space-x-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded border border-gray-300 text-gray-800"
              />
              <button
                type="submit"
                className="bg-white text-blue-600 px-6 py-3 rounded hover:bg-gray-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Home;
