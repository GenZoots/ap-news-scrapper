# AP News Headline Scraper

This is a small web scraping project i have been working on a while with Node.js and Puppeteer that extracts headlines as well as the linked articles from the Associated Press News Website.

## How It Works

The User is prompted to enter any keyword (e.g: 'Ronaldo', 'War').
The scraper then performs a search through all current world news headlines on AP News and returns any articles matching the keywords. This includes the title and direct link to the article. Results are saved to a text file.

## Built With

- Node.js.
- Puppeteer.
- Prompt-sync.
- fs (Node.js file system module)

## How To Run

1. Clone the repo.
2. Run 'npm install' to install dependencies.
3. Run 'node index.js'.
4. Enter your Keyword when prompted.
5. Check 'MainHeadlines.txt' for results.

## Notes/Disclaimer

This project and concept is for educational purposes only.
Thanks for checking it out.
