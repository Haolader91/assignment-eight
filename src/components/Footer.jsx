import Link from "next/link";
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { LiaLinkedin } from "react-icons/lia";
import { BsInstagram } from "react-icons/bs";
import { BiPhone } from "react-icons/bi";
import { IoMail } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#0b132a] text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 m:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* logo */}
          <div className="space-y-4">
            <div className="shrink-0 flex items-center gap-2">
              <Link href="/" className="flex gap-2 items-center">
                <div className="w-8 h-8 bg-indigo-600 flex items-center justify-center font-bold text-lg rounded-lg">
                  S
                </div>
                <span className="text-2xl font-bold text-white tracking-tight">
                  StudyNook
                </span>
              </Link>
            </div>
            <p className="text-sm text-gray-400">
              Your smart way to find and book study rooms in the library.
            </p>
            <div className="flex items-center space-x-5 pt-2">
              <a
                href="#"
                className="hover:text-indigo-400 transition"
                aria-label="Facebook"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="hover:text-indigo-400 transition"
                aria-label="X (Twitter)"
              >
                <FaXTwitter className="w-5 h-5" />
              </a>

              <a
                href="#"
                className="hover:text-indigo-400 transition"
                aria-label="LinkedIn"
              >
                <LiaLinkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="hover:text-indigo-400 transition"
                aria-label="Instagram"
              >
                <BsInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* menu  */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-indigo-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/rooms"
                  className="hover:text-indigo-400 transition"
                >
                  Rooms
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-indigo-400 transition"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
          {/* support */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Support
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-indigo-400 transition"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-indigo-400 transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-indigo-400 transition"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          {/* contact */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <IoMail className="w-4 h-4 text-gray-400" />
                <a
                  href="mailto:hello@studynook.com"
                  className="hover:text-indigo-400 transition"
                >
                  hello@studynook.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <BiPhone className="w-4 h-4 text-gray-400" />
                <a
                  href="tel:+15551234567"
                  className="hover:text-indigo-400 transition"
                >
                  +1 (555) 123-4567
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* copyright */}
        <div className="border-t border-gray-800/60 pt-8 text-center">
          <p className="text-xs text-gray-500">
            &copy; 2026 StudyNook. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
