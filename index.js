const puppeteer = require('puppeteer');

(async() => {
	try {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto('https://www.amazon.de', {waitUntil: 'networkidle2'});

		console.log('go to login');

		await Promise.all([
			page.waitForNavigation({waitUntil: 'networkidle2'}),
			page.click('#nav-link-yourAccount')
		]);

		console.log('enter userdata and hit enter');

		await page.$eval('#ap_email', (el, value) => el.value = value, process.env.AW_EMAIL);
		await page.$eval('#ap_password', (el, value) => el.value = value, process.env.AW_PASSWORD);

		await Promise.all([
			page.waitForNavigation({waitUntil: 'networkidle2'}),
			page.keyboard.press('Enter')
		]);

		console.log('open link to preorder item');

		await page.goto('https://www.amazon.de/dp/B079135TGP/', {waitUntil: 'networkidle2'});

		console.log('check for preorder button');

		const notifyButton = await page.$('#oneClickBuyButton');

		if (notifyButton) {
			//TODO order it!
			console.log('order it!');
			await page.click('#oneClickBuyButton', {waitUntil: 'networkidle2'});
		} else {
			//TODO repeat after x seconds - without login
			//page.reload();
		}

		await browser.close();
	} catch (err) {
		console.log(err);
	}
})();
