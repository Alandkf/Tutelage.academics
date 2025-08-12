/**
 * PostCSS configuration
 * Configures the PostCSS plugins used in the project
 */
const config = {
  plugins: {
    // Process Tailwind CSS directives
    "@tailwindcss/postcss": {},
    // Add vendor prefixes to CSS rules
    autoprefixer: {},
  },
};

export default config;
