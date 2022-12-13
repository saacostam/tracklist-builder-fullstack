import puppeteer from 'puppeteer'

async function scrap(req, res){
    const testURL = 'https://www.1001tracklists.com/tracklist/2ds623xk/maxim-lany-electronic-groove-podcast-919-2022-12-12.html';

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto( testURL );

    const tracks = await page.evaluate(() => {
        return document.querySelector('.trackValue')
    });

    let trackNames = [];

    for (key in tracks){
        const track = tracks[key];
        trackNames.push( track.textContent );
    }

    browser.close();

    res.status(200).json({
        'msg':`Scraping data from ${testURL}`,
        data : trackNames,
    });
}

export {scrap};