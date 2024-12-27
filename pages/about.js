import Navbar from "@/app/components/common/Navbar";
import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <div>
      <Navbar />
      <div
        className="h-[60vh] min-h-screen bg-gray-100 relative bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: 'url("/images/hero.png")',
        }}
        aria-label="Hero section showcasing our car auction platform"
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg">
            Simplifying car auctions with secure and transparent online
            platforms.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-blue-600 mb-4">
              Who We Are
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We are a trusted platform connecting car buyers and sellers. Our
              mission is to make the process of buying and selling cars
              seamless, transparent, and secure. Whether you're a buyer
              searching for the perfect car or a seller looking for a wide
              audience, we've got you covered.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our platform is designed to provide a user-friendly experience,
              ensuring all transactions are smooth and hassle-free. Join us in
              revolutionizing car auctions with cutting-edge technology and a
              customer-first approach.
            </p>
          </div>

          <div>
            <Image
              src="/images/pix1.jpg"
              width={300}
              height={300}
              alt="Overview of car auctions"
              className="rounded-lg shadow-lg w-full"
              priority
            />
          </div>
        </div>
      </div>
      <div className="bg-blue-600 py-12">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to get started?
          </h3>
          <p className="text-white mb-6">
            Explore our auctions or list your car today and experience the ease
            of online car auctions.
          </p>
          <div className="space-x-4">
            <Link
              href="/auctions"
              className="bg-white text-blue-600 px-6 py-3 rounded-md font-bold hover:bg-gray-200"
            >
              View Auctions
            </Link>
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-6 py-3 rounded-md font-bold hover:bg-gray-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
