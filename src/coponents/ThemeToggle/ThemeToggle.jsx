import useTheme from "../../hooks/useTheme";
import { HiSun, HiMoon } from "react-icons/hi2";

const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "shopsphere-dark";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
      title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
      className={`btn btn-ghost btn-circle relative overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-base-200 active:scale-95 focus:outline-none ${className}`}
    >
      <div className="relative flex items-center justify-center w-6 h-6">
        <HiSun
          className={`text-2xl text-amber-500 absolute transition-all duration-500 ease-in-out transform ${
            isDark
              ? "opacity-0 rotate-90 scale-50 pointer-events-none"
              : "opacity-100 rotate-0 scale-100"
          }`}
        />
        <HiMoon
          className={`text-2xl text-[#C9B59C] absolute transition-all duration-500 ease-in-out transform ${
            isDark
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-90 scale-50 pointer-events-none"
          }`}
        />
      </div>
    </button>
  );
};

export default ThemeToggle;
