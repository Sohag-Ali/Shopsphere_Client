import { Link } from "react-router";
import {
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaLinkedinIn,
  
} from "react-icons/fa";
import logo from "../../../assets/home/slogo (2).png";

const Footer = () => {
  return (
   <footer className="bg-base-100 border-t border-base-300 mt-20">

  {/* Top CTA */}
  <div
    className="
      max-w-7xl
      mx-auto
      px-4
      pt-12
    "
  >

    <div
      className="
        rounded-3xl
        bg-gradient-to-r
        from-primary
        to-secondary
        p-8
        md:p-12
        text-primary
        flex
        flex-col
        md:flex-row
        items-center
        justify-between
        gap-6
      "
    >

      <div>

        <h2
          className="
            text-3xl
            md:text-4xl
            font-bold
          "
        >
          Shop Smarter With ShopSphere
        </h2>

        <p className="mt-3 text-base-content/70">
          Discover premium products with
          secure payment and fast delivery.
        </p>

      </div>

      <Link
        to="/shop"
        className="
          btn
          btn-primary
          text-base-content
          rounded-2xl
        "
      >
        Start Shopping
      </Link>

    </div>

  </div>

  {/* Main Footer */}
  <div
    className="
      max-w-7xl
      mx-auto
      px-4
      py-16
    "
  >

    <div
      className="
        grid
        md:grid-cols-2
        lg:grid-cols-4
        gap-10
      "
    >

      {/* Brand */}
   <div>

  <div className="flex items-center gap-3">

    <img
      src={logo}
      alt="ShopSphere Logo"
      className="
        w-14
        h-14
        rounded-full
        object-cover
      "
    />

    <h2
      className="
        text-4xl
        font-black
        text-primary
      "
    >
      ShopSphere
    </h2>

  </div>

  <p
    className="
      mt-4
      text-base-content/70
      leading-7
    "
  >
    Your trusted destination
    for quality products,
    secure shopping and
    fast delivery.
  </p>

</div>

      {/* Links */}
      <div>

        <h3 className="font-bold text-xl mb-5">
          Quick Links
        </h3>

        <div className="flex flex-col gap-3">

          <Link to="/">Home</Link>

          <Link to="/shop">Shop</Link>

          <Link to="/categories">
            Categories
          </Link>

          <Link to="/blog">
            Blog
          </Link>

          <Link to="/contact">
            Contact
          </Link>

        </div>

      </div>

      {/* Support */}
      <div>

        <h3 className="font-bold text-xl mb-5">
          Customer Support
        </h3>

        <div className="flex flex-col gap-3">

          <Link to="/dashboard/my-orders">
            My Orders
          </Link>

          <Link to="/dashboard/wishlist">
            Wishlist
          </Link>

          <a href="#">
            Privacy Policy
          </a>

          <a href="#">
            Return Policy
          </a>

        </div>

      </div>

      {/* Newsletter */}
      <div>

        <h3 className="font-bold text-xl mb-5">
          Stay Updated
        </h3>

        <p
          className="
            text-base-content/70
            mb-4
          "
        >
          Subscribe for offers and
          product updates.
        </p>

        <div className="join w-full">

          <input
            type="email"
            placeholder="Your Email"
            className="
              input
              input-bordered
              join-item
              w-full
            "
          />

          <button
            className="
              btn
              btn-primary
              join-item
            "
          >
            Join
          </button>

        </div>

      </div>

    </div>

    {/* Contact + Social */}
    <div
      className="
        flex
        flex-col
        lg:flex-row
        justify-between
        items-center
        gap-6
        mt-16
        pt-8
        border-t
        border-base-300
      "
    >

      <div
        className="
          flex
          flex-wrap
          gap-6
          text-sm
        "
      >

        <span>
          📞 +8801728918054
        </span>

        <span>
          ✉️ sohag2879@gmail.com
        </span>

        <span>
          📍 Uttara, Dhaka
        </span>

      </div>

      <div className="flex gap-3">

        <a
          href="https://www.facebook.com/share/14bkG6xmEha/"
          className="
            btn
            btn-circle
            btn-outline
          "
        >
          <FaFacebookF />
        </a>

        <a
          href="https://www.instagram.com/sohag___s?igsh=NzZzYXI3Znl1dmRq"
          className="
            btn
            btn-circle
            btn-outline
          "
        >
          <FaInstagram />
        </a>

        <a
          href="https://www.linkedin.com/in/sohag-ali-7b1061284?utm_source=share_via&utm_content=profile&utm_medium=member_android"
          className="
            btn
            btn-circle
            btn-outline
          "
        >
          <FaLinkedinIn />
        </a>

        <a
          href="https://github.com/Sohag-Ali"
          className="
            btn
            btn-circle
            btn-outline
          "
        >
          <FaGithub />
        </a>

      </div>

    </div>

  </div>

  {/* Bottom Bar */}
  <div
    className="
      border-t
      border-base-300
      py-5
      text-center
      text-base-content/60
    "
  >

    © {new Date().getFullYear()}
    ShopSphere • Developed by
    Sohag Ali ❤️

  </div>

</footer>
  );
};

export default Footer;