import { spawn } from 'child_process';
import puppeteer from 'puppeteer';

const viteProcess = spawn('npm', ['run', 'dev'], { shell: true });

setTimeout(async () => {
  try {
    console.log('Starting puppeteer...');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
    page.on('pageerror', err => console.log('BROWSER ERROR:', err.toString()));
  
    console.log('Navigating...');
    await page.goto('http://localhost:5173/packers-and-movers-mumbai', { waitUntil: 'networkidle2', timeout: 15000 });
    await browser.close();
  } catch(e) {
    console.log('Script Error:', e);
  }
  viteProcess.kill();
  process.exit();
}, 8000);
