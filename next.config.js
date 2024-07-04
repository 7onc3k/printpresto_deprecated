/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['fastly.picsum.photos', 'jpzkldagjsnbhrqkwvtl.supabase.co'],
  },
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
}

module.exports = nextConfig
