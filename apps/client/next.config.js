/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'manager-app.sgp1.digitaloceanspaces.com',
      'sgp1.digitaloceanspaces.com',
      'avatars.githubusercontent.com',
      'cloudflare-ipfs.com',
      'picsum.photos',
    ],
  },
}

module.exports = nextConfig
