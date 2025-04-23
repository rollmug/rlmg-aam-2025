// import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'manage.rlmg.com',
                port: '',
                pathname: '/assets/**/**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8055',
                pathname: '/assets/**/**',
            },
            {
                protocol: 'http',
                hostname: 'directus',
                port: '8055',
                pathname: '/assets/**/**',
            },
            {
                protocol: 'http',
                hostname: 'host.docker.internal',
                port: '8055',
                pathname: '/assets/**/**',
            },
            {
                protocol: 'http',
                hostname: '66.42.81.168',
                port: '',
                pathname: '/assets/**/**',
            }
        ],
    }
};

export default nextConfig;