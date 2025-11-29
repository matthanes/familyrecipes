import nextConfig from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**", "public/~partytown/**", ".cache/**"],
  },
  ...nextConfig,
];

export default eslintConfig;
