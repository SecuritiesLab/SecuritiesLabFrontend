const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const path = require('path');

const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/get-early-access', changefreq: 'weekly', priority: 0.8 },
  { url: '/signin', changefreq: 'monthly', priority: 0.6 },
  { url: '/signup', changefreq: 'monthly', priority: 0.6 },
  { url: '/termsAndConditions', changefreq: 'yearly', priority: 0.4 },
  { url: '/terms-and-conditions', changefreq: 'yearly', priority: 0.4 },
  { url: '/dashboard', changefreq: 'daily', priority: 1.0 },
  { url: '/otp-verification', changefreq: 'monthly', priority: 0.5 },
  { url: '/forgot-password', changefreq: 'monthly', priority: 0.5 },
  { url: '/reset-password', changefreq: 'monthly', priority: 0.5 },
  { url: '/privacy-policy', changefreq: 'yearly', priority: 0.4 },
];

const generateSitemap = async () => {
  const sitemapStream = new SitemapStream({ hostname: 'https://securitieslab.eu' });
  const writeStream = createWriteStream(path.resolve(__dirname, 'public', 'sitemap.xml'));

  sitemapStream.pipe(writeStream);

  links.forEach((link) => {
    sitemapStream.write(link);
  });

  sitemapStream.end();

  await streamToPromise(sitemapStream);
  console.log('Sitemap generated successfully!');
};

generateSitemap();