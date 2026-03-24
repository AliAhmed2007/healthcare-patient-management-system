/** @type {import('next').NextConfig} */
const nextConfig = {
  // TypeScript error bypassing is still supported here
  typescript: { 
    ignoreBuildErrors: true 
  },
  
  // React Compiler is now stable and lives at the top level!
  reactCompiler: true,

  images: {
    qualities: [90], 
  },
};

export default nextConfig;