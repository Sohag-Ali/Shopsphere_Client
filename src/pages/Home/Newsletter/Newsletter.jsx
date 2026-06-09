const Newsletter = () => {
  return (
    <section className="max-w-4xl mx-auto py-20 px-4">

      <div className="bg-base-200 rounded-2xl p-10 text-center">

        <h2 className="text-4xl font-bold">
          Subscribe To Our Newsletter
        </h2>

        <p className="mt-3 text-base-content/70">
          Get updates on new products, exclusive deals and shopping tips.
        </p>

        <form className="mt-8 flex flex-col md:flex-row gap-4 justify-center">

          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full md:w-96"
          />

          <button
            type="submit"
            className="btn btn-primary"
          >
            Subscribe
          </button>

        </form>

      </div>

    </section>
  );
};

export default Newsletter;