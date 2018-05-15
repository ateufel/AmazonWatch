const puppeteer = require('puppeteer');

if (!process.argv[2]) {
	console.log('amazon url missing');
	process.exit(1);
}

if (!process.env.AW_EMAIL || !process.env.AW_PASSWORD) {
	console.log('user credentials missing');
	process.exit(1);
}

const amazonURL = process.argv[2];

(async() => {
	try {
		const browser = await puppeteer.launch({headless: true});
		const page = await browser.newPage();
		//await page.setViewport({width: 1920, height: 1080});

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
		await page.goto(amazonURL, {waitUntil: 'networkidle2'});

		//loop until the item is bought
		while (true) {
			//activate one click buy
			const oneClickSignIn = await page.$('#oneClickSignIn');
			if (oneClickSignIn) {
				await page.click('#oneClickSignIn');
				//wait for the one click buy button
				await page.waitForSelector('#oneClickBuyButton');
			}

			const oneClickBuyButton = await page.$('#oneClickBuyButton');
			if (oneClickBuyButton) {
				//order it nao!
				await page.click('#oneClickBuyButton', {waitUntil: 'networkidle2'});
				await browser.close();
				break;
			}

			//wait 5 seconds to repeat
			await page.waitFor(5000);
			await page.reload({waitUntil: 'networkidle2'});
		}
	} catch (err) {
		console.log(err);
	}
})();
