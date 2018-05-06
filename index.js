const puppeteer = require('puppeteer');

(async() => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://www.amazon.de', {waitUntil: 'networkidle2'});

	const [response] = await Promise.all([
		page.waitForNavigation({waitUntil: 'networkidle2'}),
		page.click('#nav-link-yourAccount'),
	]);
	const test = await page.$('#ap_email');
	console.log(test);

	await browser.close();
})();
