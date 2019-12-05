const path = require('path');
const puppeteer = require('puppeteer');

(async function () {
	console.log('Launch Chromium');
	const browser = await puppeteer.launch();
	console.log('Open a new page');
	const page = await browser.newPage();
	await page.setJavaScriptEnabled(false);
	console.log('Load sample page');
	await page.setViewport({
		width: 758,
		height: 477,
	})
	await page.goto(path.join(process.cwd(), 'static/sample.html'));
	console.log('Take a screenshot');
	await page.screenshot({
		path: 'screenshot.png',
	});
	console.log('Print to PDF');
	await page.pdf({
		printBackground: true,
		width: '8.5in',
		height: '5.5in',
		margin: {
			top: '0.15in',
			bottom: '0.15in',
			left: '0.3in',
			right: '0.3in',
		},
		path: 'sample.pdf',
	});
	console.log('Close Chromium');
	await browser.close();
}());
