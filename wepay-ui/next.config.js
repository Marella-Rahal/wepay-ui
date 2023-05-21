/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    mapbox_key:
      "pk.eyJ1IjoibWFyZWxsYSIsImEiOiJjbGZ2Z2djODUwNzFlM2ZvNzVnYmx1aXRjIn0.STHXakMgCnQ_N-oi5zHO8g",
    server_url:"http://localhost:5000"  
  },
};

// http://localhost:5000
// https://wepay-ali-aldayoub.onrender.com
// https://wepay-ali-aldayoub.cyclic.app

module.exports = nextConfig;
