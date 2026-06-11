import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {

  return (

    <div className="max-w-7xl mx-auto px-4 py-12">

      {/* Hero */}

      <div
        className="
          bg-base-200
          rounded-3xl
          text-center
          py-16
          mb-12
        "
      >

        <h1 className="text-5xl font-bold">
          Contact Us
        </h1>

        <p
          className="
            mt-4
            text-base-content/70
          "
        >
          We'd love to hear from you.
          Get in touch with our team.
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

        <div
          className="
            bg-base-100
            shadow-lg
            rounded-2xl
            p-6
            text-center
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

          <h3 className="font-bold text-xl">
            Phone
          </h3>

          <p className="mt-2">
            +880 1712-345678
          </p>

        </div>

        <div
          className="
            bg-base-100
            shadow-lg
            rounded-2xl
            p-6
            text-center
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

          <h3 className="font-bold text-xl">
            Email
          </h3>

          <p className="mt-2">
            support@yourshop.com
          </p>

        </div>

        <div
          className="
            bg-base-100
            shadow-lg
            rounded-2xl
            p-6
            text-center
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

        </div>

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

          <form className="space-y-4">

            <input
              type="text"
              placeholder="Your Name"
              className="
                input
                input-bordered
                w-full
              "
            />

            <input
              type="email"
              placeholder="Your Email"
              className="
                input
                input-bordered
                w-full
              "
            />

            <input
              type="text"
              placeholder="Subject"
              className="
                input
                input-bordered
                w-full
              "
            />

            <textarea
              placeholder="Message"
              className="
                textarea
                textarea-bordered
                w-full
                h-40
              "
            ></textarea>

            <button
              className="
                btn
                btn-primary
                w-full
              "
            >
              Send Message
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
            src="https://www.google.com/maps/embed?pb=!1m18..."
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