import ScrollReveal from "../../../coponents/Motion/ScrollReveal";
import { motion } from "framer-motion";

const Newsletter = () => {
  return (
    <section className="max-w-4xl mx-auto py-12 px-4">
      <ScrollReveal className="bg-base-100 border border-base-300 shadow-xl rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-base-content">
            Subscribe To Our Newsletter
          </h2>

          <p className="mt-3 text-base-content/70 max-w-lg mx-auto">
            Get instant updates on new product drops, flash deals, and exclusive VIP discount vouchers directly to your inbox.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 flex flex-col md:flex-row gap-3 justify-center items-center max-w-lg mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="input input-bordered w-full rounded-xl focus:outline-none focus:border-primary"
              required
            />

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full md:w-auto">
              <button
                type="submit"
                className="btn btn-primary w-full md:w-auto rounded-xl px-8 shadow-md text-base-content font-semibold"
              >
                Subscribe
              </button>
            </motion.div>
          </form>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default Newsletter;