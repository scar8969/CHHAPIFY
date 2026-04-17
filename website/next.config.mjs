/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Don't bundle playwright — emit require('playwright-core') at runtime instead
      config.externals.push({
        'playwright': 'commonjs playwright-core',
      });
    }
    return config;
  },
};

export default nextConfig;
