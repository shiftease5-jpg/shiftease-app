const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Capture console messages
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
  
  // Capture page errors (unhandled exceptions)
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.toString()));

  console.log('Navigating to http://localhost:5173/packers-and-movers-mumbai...');
  
  try {
    await page.goto('http://localhost:5173/packers-and-movers-mumbai', { waitUntil: 'networkidle2', timeout: 10000 });
  } catch (e) {
    console.log('Navigation error:', e.message);
  }
  
  await browser.close();
})();
