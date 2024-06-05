const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const searchURL = 'https://www.shodan.io/search?query=org%3A%22Bracnet%22+product%3A%22MikroTik%22&page=';

  let ipList = [];
  let pageNum = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    try {
      await page.goto(searchURL + pageNum, { waitUntil: 'networkidle2' });

      // Extract IPs/domains
      const ipsOnPage = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.heading a.title'))
          .map(element => element.textContent);
      });

      ipList = ipList.concat(ipsOnPage);

      // Check if there's a next page
      hasNextPage = await page.evaluate(() => {
        return document.querySelector('.pagination a.button:contains("Next")') !== null;
      });

      console.log(`Page ${pageNum} scraped.`);
      pageNum++;
    } catch (error) {
      console.error(`Error on page ${pageNum}:`, error);
      hasNextPage = false;
    }
  }

  await browser.close();

  // Save IPs/domains to file
  fs.writeFileSync('ip_list.txt', ipList.join('\n'));
  console.log('IP addresses/domains have been extracted and saved to ip_list.txt');
})();
