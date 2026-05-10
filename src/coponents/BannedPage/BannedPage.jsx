
const BannedPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-950 via-red-950/20 to-slate-900 px-4 py-12">
      {/* Background animated circles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-64 h-64 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 right-10 w-72 h-72 bg-red-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="relative z-10 max-w-2xl w-full">
        {/* Card */}
        <div className="bg-gradient-to-b from-white/5 to-white/2 backdrop-blur-md border border-red-500/20 rounded-3xl p-12 shadow-2xl">
          
          {/* Icon with animation */}
          <div className="flex justify-center mb-8">
            <div className="relative w-28 h-28">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 rounded-full opacity-20 blur-xl animate-pulse"></div>
              <div className="relative w-full h-full bg-gradient-to-br from-red-500/20 to-red-600/10 border-2 border-red-500/30 rounded-full flex items-center justify-center">
                <svg className="w-16 h-16 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
            Account Restricted
          </h1>

          {/* Subtitle */}
          <p className="text-center text-red-300/80 text-lg font-semibold mb-6">
            Your access has been suspended
          </p>

          {/* Description */}
          <div className="space-y-4 mb-8">
            <p className="text-center text-gray-300 leading-relaxed">
              Your account has been restricted by our admin team due to a violation of our Community Guidelines or Terms of Service.
            </p>
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
              <p className="text-gray-300 text-sm leading-relaxed">
                <span className="font-semibold text-red-300">What does this mean?</span>
                <br />
                You currently cannot post, upload, or access platform features. We reserve this action to maintain community safety and integrity.
              </p>
            </div>
          </div>

          {/* Info boxes */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                <span className="text-blue-400">ℹ️</span> Ban Duration
              </h3>
              <p className="text-gray-400 text-sm">Permanent until reviewed</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                <span className="text-purple-400">📧</span> Appeal Available
              </h3>
              <p className="text-gray-400 text-sm">Contact our support team</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:support@lifespark.com"
              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-500/20 text-center"
            >
              Contact Support
            </a>
            <a
              href="/"
              className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 text-center"
            >
              Back to Home
            </a>
          </div>

          {/* Footer note */}
          <p className="text-center text-gray-500 text-xs mt-8">
            If you believe this is a mistake, please reach out to our support team with your case details.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BannedPage;