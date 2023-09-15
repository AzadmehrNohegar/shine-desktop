/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#FFFFFF",
        primary: "#007AFF",
        success: "#029C53",
        danger: "#FA5252",
        warning: "#FDB913",
        disabled: "#E9EDF0",
        successDesk: "#34C759",
        GDesk: "#6C6C70",
        G1: "#212429",
        G2: "#353A40",
        G3: "#495058",
        G4: "#868D95",
        G5: "#CFD4DA",
        G6: "#DEE1E6",
        G7: "#E9EDF0",
        G8: "#F2F3F7",
        G9: "#F8F9FB",
        G10: "#F2F2F7",
        B1: "#00244B",
        B2: "#03366D",
        B3: "#034694",
        B4: "#2065B1",
        B5: "#3681D3",
        B6: "#52A0F5",
        B7: "#7BBAFF",
        B8: "#A1CEFF",
        B9: "#C8E2FF",
        B10: "#EEF6FF",
        B11: "#F7FBFF",
        R1: "#FFEFEE",
        R2: "#FFC9C9",
        R3: "#FF8788",
        R4: "#FA5252",
        R5: "#DF3130",
      },
      boxShadow: {
        bottom: "0px 2px 16px rgba(0, 0, 0, 0.03)",
        card: "0px 1px 12px rgba(0, 0, 0, 0.06)",
        hue: "0px 1px 8px rgba(54, 129, 211, 0.25)",
        huePrimary: "0px 0px 16px rgba(54, 129, 211, 0.7)",
      },

      fontSize: {
        "2xs": "0.625rem",
        "3xs": "0.5rem",
      },
      maxWidth: {
        "2xs": "10rem",
        card: "210px",
        cardlg: "234px",
        "1/2": "50%",
      },
      height: {
        container: "calc(100vh - 72px)",
      },
      maxHeight: {
        container: "calc(100vh - 110px)",
      },
      minHeight: {
        container: "calc(100vh - 150px)",
      },
      flexBasis: {
        modified: "calc(50% - 0.2rem)",
      },
      keyframes: {
        grow: {
          "0%, 100%": { height: "12px" },
          "50%": { height: "80px" },
        },
      },
      animation: {
        grow: "grow 2.5s ease-in-out infinite",
      },
      transitionProperty: {
        height: "height",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("@headlessui/tailwindcss")],
};
