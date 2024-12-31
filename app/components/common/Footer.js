import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-600 text-white font-bold py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-4">About Us</h3>
          <p className="text-gray-400">
            Your trusted platform for finding and purchasing cars through secure
            auctions.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/auctions" className="hover:text-blue-400">
                Auctions
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-400">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-400">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/tracking" className="hover:text-blue-400">
                Tracking
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-blue-400">
                Login
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Email: support@caribex.com</li>
            <li>Phone: +123 456 7890</li>
            <li>Address: Lagos, Nigeria</li>
          </ul>
          <div className="flex space-x-4 mt-4">
            <Link
              href="https://twitter.com"
              target="_blank"
              className="hover:text-blue-400"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7.77V9a10.66 10.66 0 01-9-5s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </Link>
            <Link
              href="https://facebook.com"
              target="_blank"
              className="hover:text-blue-400"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.99 3.657 9.128 8.437 9.878v-6.987H7.898v-2.891h2.539v-2.2c0-2.507 1.493-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.464h-1.26c-1.243 0-1.63.771-1.63 1.562v1.869h2.773l-.443 2.891h-2.33V21.9C18.343 21.128 22 16.99 22 12z" />
              </svg>
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              className="hover:text-blue-400"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.054 1.796.24 2.215.403a4.412 4.412 0 011.583.865c.413.413.754.915.865 1.583.163.419.35 1.045.403 2.215.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.796-.403 2.215a4.412 4.412 0 01-.865 1.583c-.413.413-.915.754-1.583.865-.419.163-1.045.35-2.215.403-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.796-.24-2.215-.403a4.412 4.412 0 01-1.583-.865 4.412 4.412 0 01-.865-1.583c-.163-.419-.35-1.045-.403-2.215C2.212 15.584 2.2 15.2 2.2 12s.012-3.584.07-4.85c.054-1.17.24-1.796.403-2.215a4.412 4.412 0 01.865-1.583A4.412 4.412 0 015.12 2.803c.419-.163 1.045-.35 2.215-.403 1.266-.058 1.65-.07 4.85-.07zm0-2.2c-3.284 0-3.697.014-4.988.072-1.288.058-2.175.27-2.99.62a6.676 6.676 0 00-2.406 1.707 6.676 6.676 0 00-1.707 2.406c-.35.815-.562 1.702-.62 2.99C2.014 8.303 2 8.716 2 12s.014 3.697.072 4.988c.058 1.288.27 2.175.62 2.99a6.676 6.676 0 001.707 2.406 6.676 6.676 0 002.406 1.707c.815.35 1.702.562 2.99.62 1.291.058 1.704.072 4.988.072s3.697-.014 4.988-.072c1.288-.058 2.175-.27 2.99-.62a6.676 6.676 0 002.406-1.707 6.676 6.676 0 001.707-2.406c.35-.815.562-1.702.62-2.99.058-1.291.072-1.704.072-4.988s-.014-3.697-.072-4.988c-.058-1.288-.27-2.175-.62-2.99a6.676 6.676 0 00-1.707-2.406 6.676 6.676 0 00-2.406-1.707c-.815-.35-1.702-.562-2.99-.62C15.697.014 15.284 0 12 0z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-8">
        © {new Date().getFullYear()} Caribex. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
