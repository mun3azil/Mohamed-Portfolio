module.exports = {
  globDirectory: "public/",
  globPatterns: [
    "**/*.{js,css,html,png,jpg,jpeg,gif,svg,ico,json,xml,txt}"
  ],
  swDest: "public/sw.js",
  clientsClaim: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'offlineCache',
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 24 * 60 * 60 // 24 hours
        },
        networkTimeoutSeconds: 10
      }
    }
  ]
}; 