// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig

const nextConfig = {
  reactStrictMode: true,
  // content: [
  //   "./pages/**/*.{js,ts,jsx,tsx}",
  //   "./components/**/*.{js,ts,jsx,tsx}",
  // ],
  typescript: {
    ignoreBuildErrors: true,
  },
  serverRuntimeConfig: {
      connectionString: "mongodb://localhost:27017/Core7MongoAngular14",
      secret: '7bbc21c9826d9d54a4282aacbe9812f32a1dd1148d9be7246c7cecd7b3157b79c76144eea49b12bb4958db055e53a663d4695863ae73556abc47148d247b3830'
  },
  publicRuntimeConfig: {
      apiUrl: process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000/api' // development api
          : 'http://localhost:3000/api' // production api
  },
}

module.exports = nextConfig