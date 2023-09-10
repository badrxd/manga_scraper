const puppeteer = require("puppeteer");
const fs = require("fs/promises"); // Use promises version of fs
const json = require("./chapters.json");

const GetImages = async ({ name, link }) => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(40000);
  try {
    await page.goto(link);

    // Wait for the images to load (adjust the selector as needed)
    await page.waitForSelector(".page-break.no-gaps img.wp-manga-chapter-img");

    // Extract image links
    const imageLinks = await page.evaluate(() => {
      const images = Array.from(
        document.querySelectorAll(
          ".page-break.no-gaps img.wp-manga-chapter-img"
        )
      );
      return images.map((image) => {
        const img = image.getAttribute("data-src");
        return `<img src=${img.replace(/\s+/g, "")} alt="image" />`;
      });
    });
    // Define the path to the text file where you want to save the image links
    const textFilePath = `./images/${name}.txt`;
    // Write the image links to the text file
    await fs.writeFile(textFilePath, imageLinks.join("\n"), "utf-8");
    console.log(`Image links saved to ${textFilePath}`);
    return true;
  } catch (error) {
    console.error(`Error: ${error}`);
    return false;
  } finally {
    await browser.close();
  }
};

const GET = async () => {
  let respond;
  for (const e of json) {
    respond = await GetImages(e);
    if (!respond) {
      console.log(`fuction was stoped in ${e.name}`);
      break;
    }
  }
};
GET();
