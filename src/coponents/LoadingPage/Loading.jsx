

const Loading = ({ message = "Loading, please wait..." }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-sky-900 via-slate-900 to-black">
            <div className="flex flex-col items-center gap-6 bg-gradient-to-b from-white/4 to-white/2 border border-white/5 backdrop-blur-md rounded-2xl p-8 shadow-2xl w-[min(560px,92%)]">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-sky-400 to-indigo-500 rounded-full shadow-lg transform motion-safe:animate-[spin_8s_linear_infinite]">
                        <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                            <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
                            <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    <div className="flex flex-col">
                        <h3 className="text-sky-100 text-lg font-semibold">LifeSpark</h3>
                        <p className="text-sky-200 text-sm">Preparing your experience</p>
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full border-4 border-t-transparent border-sky-400 animate-spin" aria-hidden></div>
                    <p className="mt-4 text-sky-100 text-sm font-medium" role="status" aria-live="polite">{message}</p>
                </div>
            </div>
        </div>
    );
};

export default Loading;