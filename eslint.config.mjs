import next from "@next/eslint-plugin-next";

export default [
  {
    plugins: {
      "@next/next": next,
    },
    rules: { "react/react-in-jsx-scope": "off" },
  },
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    ignores: ["node_modules/**", ".next/**"],
    extends: ["plugin:@next/next/core-web-vitals"],
  },
];
