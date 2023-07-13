// connectionString: "mongodb+srv://Reynald88:JesusLovesMe@cluster0.tdm0q.mongodb.net/Next13?retryWrites=true&w=majority",
      const nextConfig = {
  reactStrictMode: false,
  // exprimental: {
  //   runtime: 'experimental-edge',
  // },
  typescript: {
    ignoreBuildErrors: true,
  },
  serverRuntimeConfig: {
      connectionString: "mongodb+srv://Reynald88:JesusLovesMe@cluster0.maowtb0.mongodb.net/?retryWrites=true&w=majority",
      secret: '7bbc21c9826d9d54a4282aacbe9812f32a1dd1148d9be7246c7cecd7b3157b79c76144eea49b12bb4958db055e53a663d4695863ae73556abc47148d247b3830'
  },
  publicRuntimeConfig: {
      apiUrl: process.env.NODE_ENV === 'development'
          ? 'https://nextjs-spa-01.vercel.app/api' // development api
          : 'https://nextjs-spa-01.vercel.app/api' // production api
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'https://nextjs-spa-01.vercel.app',
        port: '3000'
      },
    ],
  },  
}

module.exports = nextConfig