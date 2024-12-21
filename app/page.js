"use client";
import Navbar from "./components/common/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="bg-gray-100 min-h-screen">
        <section className="bg-blue-600 text-white py-20">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Find Your Dream Car</h1>
            <p className="text-lg mb-6">
              Explore, bid, and win your next car at unbeatable prices.
            </p>
            <button className="bg-white text-blue-600 px-6 py-3 rounded shadow-md hover:bg-gray-200">
              Start Bidding
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
                {/* <img
                  src="/cars/sample-car.jpg"
                  alt="Car Image"
                  className="w-full h-40 object-cover"
                /> */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    2018 Toyota Camry
                  </h3>
                  <p className="text-gray-600">Starting Bid: ₦2,500,000</p>
                  <button className="bg-blue-600 text-white px-4 py-2 mt-4 rounded hover:bg-blue-700">
                    View Auction
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
