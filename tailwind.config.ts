import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        night:   "#080C18",
        surface: "#0F1524",
        card:    "#131929",
        blue:    "#00C2FF",
        deep:    "#0066FF",
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body:    ["var(--font-dm)", "sans-serif"],
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(18px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        pulse2: {
          "0%,100%": { opacity: "1",  transform: "scale(1)"    },
          "50%":      { opacity: ".4", transform: "scale(0.85)" },
        },
        bounce3: {
          "0%,80%,100%": { transform: "translateY(0)",   opacity: ".4" },
          "40%":          { transform: "translateY(-6px)", opacity: "1"  },
        },
        spin: {
          to: { transform: "rotate(360deg)" },
        },
        strikethrough: {
          to: { transform: "scaleX(1)" },
        },
      },
      animation: {
        fadeUp:        "fadeUp .6s ease both",
        pulse2:        "pulse2 2s ease-in-out infinite",
        bounce3:       "bounce3 1.2s ease-in-out infinite",
        "bounce3-d1":  "bounce3 1.2s ease-in-out .2s infinite",
        "bounce3-d2":  "bounce3 1.2s ease-in-out .4s infinite",
        spin:          "spin .8s linear infinite",
        strikethrough: "strikethrough .5s 1s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
