const fs = require('fs/promises')
const prompt = require('prompt-sync') ()
const puppeteer = require('puppeteer');


const search = prompt("Enter Keyword: eg'Ronaldo'")
console.log(`Searching for news related to ${search}`)


async function headlines(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://apnews.com/hub/world-news?utm_source=apnewsnav&utm_medium=navigation', {timeout: 0});

    // await page.screenshot({path: 'example.png'});

    const heading = await page.evaluate(() => document.title )
    console.log(heading)

    // const worldNews = await page.evaluate(() => Array.from(document.querySelectorAll('.FeedCard div'), (e) => ({
    //     title: e.querySelector('#root > div > main > div.Body > div > article > div > div > a > h2')
    // }) ));

    // console.log(worldNews)

    // const worldNews2 = await page.evaluate(() => {
    //     Array.from(document.querySelectorAll('.FeedCard div'), (e) => ({
    //         title: e.querySelector('#root > div > main > div.Body > div > article > div > div > a > h2')
    //     }))
    // })

    // console.log(worldNews2)

    const TrendingNews = await page.evaluate(() =>{
    return Array.from(document.querySelectorAll("h3.PagePromo-title")).map(x => ({
        title: x.textContent.trim(),
        link: x.querySelector('a') ? x.querySelector('a').href : 'No link found'
    }))
})

const filtered = TrendingNews.filter(article => 
    article.title.toLowerCase().includes(search.toLowerCase())
);

if (filtered.length > 0) {
    const output = filtered.map(a => `${a.title}\n${a.link}`).join("\r\n\n");
    await fs.writeFile('MainHeadlines.txt', output);
    console.log(`Found ${filtered.length} articles about ${search}`);
} else {
    console.log(`Sorry, no news related to ${search}`);
}

    // const TrendingNews2 = await page.evaluate(()=>{
    //     return Array.from(document.querySelectorAll('#root > div > main > div.Body > div > article > div > div > div > ul > li > a > div > div > h4')).map(y => y.textContent)
    // })
    // await fs.writeFile('Sub-Headlines.txt', TrendingNews2.join("\r\n\n"))



    await browser.close();
}

headlines();