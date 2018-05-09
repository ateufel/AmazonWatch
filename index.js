const puppeteer = require('puppeteer');

(async() => {
	try {
		const browser = await puppeteer.launch({headless: false});
		const page = await browser.newPage();
		await page.setViewport({width: 1920, height: 1080});

		//open amazon
		await page.goto('https://www.amazon.de', {waitUntil: 'networkidle2'});

		//open login page
		page.click('#nav-link-yourAccount');
		await page.waitForNavigation();

		//enter user details and login
		await page.type('#ap_email', process.env.AW_EMAIL);
		await page.type('#ap_password', process.env.AW_PASSWORD);
		await page.click('#signInSubmit');
		await page.waitForNavigation();

		//open article link
		await page.goto('https://www.amazon.de/gp/product/B07BFRLV6X', {waitUntil: 'networkidle2'});

		//TODO from here, loop until the item is bought

		//activate one click buy
		const oneClickSignIn = await page.$('#oneClickSignIn');
		if (oneClickSignIn) {
			await page.click('#oneClickSignIn', {waitUntil: 'networkidle2'});
		}

		//wait for the one click buy button
		await page.waitFor(3000);

		const oneClickBuyButton = await page.$('#oneClickBuyButton');
		if (oneClickBuyButton) {
			//order it nao!
			await page.click('#oneClickBuyButton', {waitUntil: 'networkidle2'});
		} else {
			//TODO repeat after x seconds - without login
			//page.reload();
		}

		//await browser.close();
	} catch (err) {
		console.log(err);
	}
})();
