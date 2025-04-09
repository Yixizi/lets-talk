import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // 允许从这些域名加载外部图片
    domains: [
      "img.clerk.com",
      // 如果还会用到其他外部图床，再加在这里
    ],
    // 或者用 remotePatterns 支持更细粒度控制：
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'img.clerk.com',
    //     port: '',
    //     pathname: '/**',
    //   },
    // ],
  },
};

export default nextConfig;
