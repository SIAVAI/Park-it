import { CiFacebook } from "react-icons/ci";
import { RiTwitterXFill } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineLinkedin } from "react-icons/ai";

function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {/* Column 1: Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul>
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Press
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">Services</h3>
            <ul>
              <li>
                <a href="#" className="hover:underline">
                  Booking
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Account
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul>
              <li>
                <a href="#" className="hover:underline">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Cookies Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div className="">
            <h3 className=" font-bold mb-4 text-white">Follow Us</h3>
            <div className="text-2xl flex justify-center items-center space-x-4">
              <a href="#" className="hover:text-[#00d0b3]">
                <CiFacebook />
              </a>
              <a href="#" className="hover:text-[#00d0b3]">
                <RiTwitterXFill />
              </a>
              <a href="#" className="hover:text-[#00d0b3]">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-[#00d0b3]">
                <AiOutlineLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-8">
          <p className="text-sm hover:text-[#00d0b3]">
            © 2025 Park IT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
