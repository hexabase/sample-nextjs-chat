/** @type {import('next').NextConfig} */

// async rewrites = () => {
//   return [
//     {
//       source: "/signalr/hub",
//       destination: "http://localhost:5006/hub"
//     }
//   ]
// }

// const nextConfig = {
//   experimental: {
//     appDir: true,
//   },
//   rewrites: [
//     {
//       source: "/signalr/hub",
//       destination: "http://localhost:5006/hub"
//     }    
//   ]
//   // rewrites
// }

// module.exports = nextConfig

module.exports = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: "/hub/:path*",
        destination: `https://pubsub.hexabase.com/hub/:path*`
      },
      {
        source: "/api/:path*",
        destination: `https://api.hexabase.com/api/v0/:path*`
      }      
    ]    
  }
}