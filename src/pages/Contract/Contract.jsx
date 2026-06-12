import { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import useTitle from "../../hooks/useTitle";

const Contact = () => {
    useTitle("Contact Us");
  const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [subject, setSubject] = useState("");
const [message, setMessage] = useState("");
const handleSubmit = (e) => {
  e.preventDefault();

  const whatsappMessage = `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
  `;

  const whatsappUrl =
    `https://wa.me/8801728918054?text=${encodeURIComponent(
      whatsappMessage
    )}`;

  window.open(
    whatsappUrl,
    "_blank"
  );

  setName("");
  setEmail("");
  setSubject("");
  setMessage("");
};
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Hero */}

      <div
        className="
          bg-base-200
          rounded-3xl
          text-center
          py-6
          mb-12
        "
      >
        <h1 className="text-5xl font-bold">Contact Us</h1>

        <p
          className="
            mt-4
            text-base-content/70
          "
        >
          We'd love to hear from you. Get in touch with our team.
        </p>
      </div>

      {/* Contact Info */}

      <div
        className="
          grid
          md:grid-cols-3
          gap-6
          mb-12
        "
      >
        <a
          href="https://wa.me/8801728918054?text=Hello%20Sohag,%20I%20would%20like%20to%20know%20more%20about%20your%20services."
          target="_blank"
          rel="noopener noreferrer"
          className="
    block
    bg-base-100
    shadow-lg
    rounded-2xl
    p-6
    text-center
    hover:shadow-2xl
    hover:-translate-y-1
    transition-all
    duration-300
    cursor-pointer
  "
        >
          <FaPhoneAlt
            className="
      text-primary
      text-3xl
      mx-auto
      mb-4
    "
          />

          <h3 className="font-bold text-xl">WhatsApp</h3>

          <p className="mt-2">+880 1728918054</p>
        </a>

        <a
          href="mailto:sohag2879@gmail.com?subject=Contact%20from%20ShopSphere&body=Hello%20Sohag,"
          className="
    block
    bg-base-100
    shadow-lg
    rounded-2xl
    p-6
    text-center
    hover:shadow-2xl
    hover:-translate-y-1
    transition-all
    duration-300
    cursor-pointer
  "
        >
          <FaEnvelope
            className="
      text-primary
      text-3xl
      mx-auto
      mb-4
    "
          />

          <h3 className="font-bold text-xl">Email</h3>

          <p className="mt-2">sohag2879@gmail.com</p>
        </a>

        <a
  href="https://www.google.com/maps/place/Uttara+Sector-12+Society/@23.872198,90.3807587,17.75z/data=!4m6!3m5!1s0x3755c40ed3c3c18b:0x9521b4915bd8ee05!8m2!3d23.873372!4d90.3796786!16s%2Fg%2F11c6sq_dyf?entry=ttu&g_ep=EgoyMDI2MDYwMy4xIKXMDSoASAFQAw%3D%3Dhttps://www.google.com/maps/search/?api=1&query=Uttara+Sector+12+Road+6B+Dhaka+Bangladesh"
  target="_blank"
  rel="noopener noreferrer"
  className="
    block
    bg-base-100
    shadow-lg
    rounded-2xl
    p-6
    text-center
    hover:shadow-2xl
    hover:-translate-y-1
    transition-all
    duration-300
    cursor-pointer
  "
>
  <FaMapMarkerAlt
    className="
      text-primary
      text-3xl
      mx-auto
      mb-4
    "
  />

  <h3 className="font-bold text-xl">
    Address
  </h3>

  <p className="mt-2">
    Dhaka, Bangladesh
  </p>
</a>
      </div>

      {/* Form + Map */}

      <div
        className="
          grid
          lg:grid-cols-2
          gap-8
        "
      >
        {/* Contact Form */}

        <div
          className="
            bg-base-100
            shadow-xl
            rounded-3xl
            p-8
          "
        >
          <h2
            className="
              text-3xl
              font-bold
              mb-6
            "
          >
            Send Message
          </h2>

          <form
  onSubmit={handleSubmit}
  className="space-y-4"
>
  <input
    type="text"
    placeholder="Your Name"
    value={name}
    onChange={(e) =>
      setName(e.target.value)
    }
    className="input input-bordered w-full"
    required
  />

  <input
    type="email"
    placeholder="Your Email"
    value={email}
    onChange={(e) =>
      setEmail(e.target.value)
    }
    className="input input-bordered w-full"
    required
  />

  <input
    type="text"
    placeholder="Subject"
    value={subject}
    onChange={(e) =>
      setSubject(e.target.value)
    }
    className="input input-bordered w-full"
    required
  />

  <textarea
    placeholder="Message"
    value={message}
    onChange={(e) =>
      setMessage(e.target.value)
    }
    className="textarea textarea-bordered w-full h-40"
    required
  />

  <button
    type="submit"
    className="btn btn-primary w-full"
  >
    Send via WhatsApp
  </button>
</form>
        </div>

        {/* Map */}

        <div
          className="
            rounded-3xl
            overflow-hidden
            shadow-xl
          "
        >
          <iframe
            title="map"
            src="https://maps.google.com/maps?q=Uttara%20Sector%2012%20Dhaka&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            className="min-h-[500px]"
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* FAQ */}

      <div className="mt-16">
        <h2
          className="
            text-4xl
            font-bold
            text-center
            mb-8
          "
        >
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          <div
            className="
              collapse
              collapse-arrow
              bg-base-100
              shadow
            "
          >
            <input type="radio" name="faq" />

            <div className="collapse-title font-semibold">
              How long does delivery take?
            </div>

            <div className="collapse-content">
              Delivery usually takes 2-5 business days.
            </div>
          </div>

          <div
            className="
              collapse
              collapse-arrow
              bg-base-100
              shadow
            "
          >
            <input type="radio" name="faq" />

            <div className="collapse-title font-semibold">
              Can I return a product?
            </div>

            <div className="collapse-content">
              Yes, within 7 days of delivery.
            </div>
          </div>

          <div
            className="
              collapse
              collapse-arrow
              bg-base-100
              shadow
            "
          >
            <input type="radio" name="faq" />

            <div className="collapse-title font-semibold">
              Do you offer cash on delivery?
            </div>

            <div className="collapse-content">
              Yes, Cash On Delivery is available.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
