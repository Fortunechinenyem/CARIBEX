"use client";
import Image from "next/image";
import Footer from "@/app/components/common/Footer";
import Link from "next/link";
import SearchCars from "@/app/components/SearchCars";
import Navbar from "@/app/components/common/Navbar";
import ExploreCategories from "@/app/components/ExploreCategory";
import { motion } from "framer-motion";

const Home = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <>
      <Navbar />
      <main className="bg-gray-100 min-h-screen">
        {/* Hero Section */}
        <section
          className="relative bg-cover bg-center text-white py-32"
          style={{
            backgroundImage: 'url("/images/hero.png")',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="container mx-auto text-center relative z-10">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-5xl font-bold mb-6"
            >
              Find Your Dream Car
            </motion.h1>
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-xl mb-8"
            >
              Explore, bid, and win your next car at unbeatable prices.
            </motion.p>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/auctions"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300"
              >
                Start Bidding
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Search Cars Section */}
        <section className="py-12">
          <div className="container mx-auto">
            <SearchCars />
          </div>
        </section>

        {/* Explore Categories Section */}
        <section className="py-12 bg-gray-50">
          <ExploreCategories />
        </section>

        {/* Featured Auctions Section */}
        <section className="py-12">
          <div className="container mx-auto">
            <motion.h2
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-3xl font-bold text-gray-800 mb-8 text-center"
            >
              Featured Auctions
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
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
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <Image
                    src={car.img}
                    alt={car.name}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {car.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Starting Bid: {car.price}
                    </p>
                    <Link
                      href="/auctions"
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                      View Auction
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto text-center">
            <motion.h2
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-3xl font-bold text-gray-800 mb-8"
            >
              What Our Users Say
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
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
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white rounded-lg shadow-lg p-6 text-gray-800"
                >
                  <p className="italic">"{testimonial.feedback}"</p>
                  <h3 className="font-bold mt-4">- {testimonial.name}</h3>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-12 bg-blue-600 text-white">
          <div className="container mx-auto text-center">
            <motion.h2
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-3xl font-bold mb-4"
            >
              Stay Updated
            </motion.h2>
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-lg mb-6"
            >
              Sign up for our newsletter to get the latest updates on upcoming
              auctions and featured listings.
            </motion.p>
            <motion.form
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-3 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-200 transition duration-300"
              >
                Subscribe
              </button>
            </motion.form>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Home;
