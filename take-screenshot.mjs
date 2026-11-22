import puppeteer from 'puppeteer-core';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: {
      width: 1540,
      height: 1020,
      deviceScaleFactor: 2,
    },
  });

  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1500));

  // Screenshot 1: Full native dashboard
  await page.screenshot({
    path: path.resolve('cook/stills/r01/preview.png'),
  });
  console.log('Saved cook/stills/r01/preview.png');

  // Screenshot 2: Click AlignUI Frame
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const frameBtn = buttons.find(b => b.textContent.includes('AlignUI Frame'));
    if (frameBtn) frameBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({
    path: path.resolve('cook/stills/r01/frame.png'),
  });
  console.log('Saved cook/stills/r01/frame.png');

  // Toggle back to full screen
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const fullBtn = buttons.find(b => b.textContent.includes('Full Screen'));
    if (fullBtn) fullBtn.click();
  });
  await new Promise((r) => setTimeout(r, 500));

  // Screenshot 3: Open "Apply for Leave" modal
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const applyBtn = buttons.find(b => b.textContent.includes('Apply for Leave'));
    if (applyBtn) applyBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({
    path: path.resolve('cook/stills/r01/modal.png'),
  });
  console.log('Saved cook/stills/r01/modal.png');

  await browser.close();
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
