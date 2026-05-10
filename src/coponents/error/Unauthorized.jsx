import { Link } from "react-router";


const Unauthorized = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-950 via-amber-950/20 to-slate-900 px-4 py-12 overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="relative z-10 max-w-3xl w-full">
        {/* Main Card */}
        <div className="text-center">
          {/* 401 Number */}
          <div className="mb-8">
            <h1 className="text-9xl md:text-[150px] font-black bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent animate-pulse">
              401
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full mt-4"></div>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Unauthorized Access
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-amber-200 mb-2">
            You don't have permission to access this resource.
          </p>

          {/* Description */}
          <div className="bg-gradient-to-r from-white/5 to-white/2 backdrop-blur-md border border-white/10 rounded-2xl p-8 mb-12 mt-8">
            <svg className="w-16 h-16 text-amber-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <p className="text-gray-300 text-lg leading-relaxed">
              This page is restricted. You need to be properly authenticated and authorized to view this content.
            </p>
          </div>

          {/* Info boxes */}
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all duration-300">
              <div className="text-2xl mb-2">🔐</div>
              <h3 className="font-semibold text-white mb-1">Not Authenticated?</h3>
              <p className="text-gray-400 text-sm">Sign in to continue</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all duration-300">
              <div className="text-2xl mb-2">👤</div>
              <h3 className="font-semibold text-white mb-1">Wrong Account?</h3>
              <p className="text-gray-400 text-sm">Try signing in again</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all duration-300">
              <div className="text-2xl mb-2">❓</div>
              <h3 className="font-semibold text-white mb-1">Still Stuck?</h3>
              <p className="text-gray-400 text-sm">Contact support for help</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-amber-500/30"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Sign In
            </Link>

            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>

          {/* Footer note */}
          <p className="text-gray-500 text-sm mt-12">
            If you believe this is an error, please{" "}
            <a href="mailto:sohag2879@gmail.com" className="text-amber-400 hover:text-amber-300 underline">
              contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;