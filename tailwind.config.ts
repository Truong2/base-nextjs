import { type Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import { COLORS } from "./src/constants/colors";

export default {
  content: ["./src/**/*.tsx"],
  darkMode: "class", 
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        lg: "992px",
        "2xl": "1400px",
      },
    },
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2560px',
    },
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'icomoon': ['icomoon'],
        'national': ['var(--font-national)'],
      },
      fontSize: {
        '45': ['45px', { lineHeight: '125%' }],
        '40': ['40px', { lineHeight: '125%' }],
        '36': ['36px', { lineHeight: '125%' }],
        '32': ['32px', { lineHeight: '125%' }],
        '28': ['28px', { lineHeight: '125%' }],
        '24': ['24px', { lineHeight: '125%' }],

        '20': ['20px', { lineHeight: '150%' }],
        '18': ['18px', { lineHeight: '150%' }],
        '16': ['16px', { lineHeight: '150%' }],
        '14': ['14px', { lineHeight: '150%' }],
        '13': ['13px', { lineHeight: '150%' }],
        '12': ['12px', { lineHeight: '150%' }],
        '10': ['10px', { lineHeight: '150%' }],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        button: {
          'main': COLORS.MAIN,
          "second": COLORS.SECOND,
          "white": COLORS.WHITE,
        },
        title: {
          'neutral-900': COLORS.NEUTRAL_900,
        },
        content: {
          'neutral-800': COLORS.NEUTRAL_800,
          'neutral-700': COLORS.NEUTRAL_700,
        },
        input: {
          'neutral-600': COLORS.NEUTRAL_600,
          'neutral-500': COLORS.NEUTRAL_500,
        },
        line: {
          'neutral-400': COLORS.NEUTRAL_400,
        },
        background: {
          'neutral-0': COLORS.NEUTRAL_0,
          'neutral-100': COLORS.NEUTRAL_100,
          'neutral-200': COLORS.NEUTRAL_200,
        },
        notification: {
          'blue': COLORS.BLUE,
          'orange': COLORS.ORANGE,
          'red': COLORS.RED,
          'green': COLORS.GREEN,
          'yellow': COLORS.YELLOW,
        },
      },
      height: {
        screen: "100dvh",
      },
      gridTemplateColumns: {
        fit: "repeat(auto-fit, minmax(432px, 1fr))",
      },
      textShadow: {
        sm: "0 4px 4px var(--tw-shadow-color)",
        DEFAULT: "0px 4px 24px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
        xl: "1px 1px 15px 0px var(--tw-shadow-color)",
      },
      maxWidth: {
        section: "1344px",
      },
      boxShadow: {
        xl: "1px 1px 15px 0px #00000014",
      },
    },
  },
  plugins: [
    require("@tailwindcss/container-queries"),
    require("tailwindcss-animate"),
    "prettier-plugin-tailwindcss",
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value: string) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") },
      );
    }),
  ],
} satisfies Config;
