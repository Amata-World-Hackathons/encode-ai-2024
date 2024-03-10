const API_ROOT = "http://localhost:8000";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        ...(config.resolve?.fallback || {}),
        fs: false,
        path: false,
        os: false,
        perf_hooks: false,
      },
    };

    return config;
  },
  async rewrites() {
    return [
      {
        source: "/files/:path*",
        destination: `${API_ROOT}/files/:path*`,
      },
      {
        source: "/graphql",
        destination: `${API_ROOT}/graphql`,
      },
    ];
  },
};

export default nextConfig;
