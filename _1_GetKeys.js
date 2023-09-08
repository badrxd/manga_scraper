const puppeteer = require("puppeteer");
const fs = require("fs/promises"); // Use promises version of fs
require("dotenv").config();

const title = process.env.MG_NAME;

(async () => {
  console.log("Launching browser...\n");
  const browser = await puppeteer.launch({ headless: "new" });
  console.log("Creating new page...\n");
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(60000);

  // Replace the following URL with the actual URL of the page containing the HTML you want to scrape
  const url = process.env.SCRAPING_URL; // Replace with your URL

  try {
    console.log("Requesting url...\n");
    await page.goto(url);

    // Wait for the chapter titles to load (adjust the selector as needed)
    await page.waitForSelector(
      "ul.main.version-chap.no-volumn.active li.wp-manga-chapter a"
    );

    // Extract chapter links
    const chapterLinks = await page.evaluate(() => {
      const links = Array.from(
        document.querySelectorAll(
          "ul.main.version-chap.no-volumn.active li.wp-manga-chapter a"
        )
      );
      return links.map((link) => link.href);
    });

    // Extract numeric parts (including floating-point numbers) from the chapter titles
    const extractedNumbers = await page.evaluate((title) => {
      const links = Array.from(
        document.querySelectorAll(
          "ul.main.version-chap.no-volumn.active li.wp-manga-chapter a"
        )
      );
      const numbers = links.map((link) => {
        // Use a regular expression to extract numeric parts, including floating-point numbers
        const match = link.textContent.match(/\d+(\.\d+)?/);
        return match ? `${title}, chapter ${match[0]}` : null;
      });
      return numbers.filter((number) => number !== null);
    }, title);

    // Create an object to store chapter data
    const chaptersData = [];

    // Combine the chapter numbers and links
    for (
      let i = Math.min(chapterLinks.length, extractedNumbers.length) - 1;
      i >= 0;
      i--
    ) {
      chaptersData.push({
        name: extractedNumbers[i],
        link: chapterLinks[i],
      });
    }
    // Define the path to the JSON file where you want to save the data
    const jsonFilePath = "chapters.json";
    console.log(`Start saving data in ${jsonFilePath}...\n`);

    // Write the data to the JSON file
    await fs.writeFile(
      jsonFilePath,
      JSON.stringify(chaptersData, null, 2),
      "utf-8"
    );
    console.log(`Extracted data saved to ${jsonFilePath}\n`);
  } catch (error) {
    console.error(`Error: ${error}`);
  } finally {
    console.log("Closing browser...\n");
    await browser.close();
  }
})();
