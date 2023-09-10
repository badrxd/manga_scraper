const axios = require("axios");
const json = require("./chapters.json");
const fs = require("fs");
require("dotenv").config();

const insertManga = async ({ name }, filePath) => {
  let contents;
  try {
    contents = fs.readFileSync(filePath, "utf8");
    // make the post request*

    requestData = {
      title: name,
      content: `<div>${contents}</div>`,
      status: "publish",
    };
    const response = await axios({
      url: process.env.API_LINK,
      method: "post",
      data: requestData,
      headers: { "X-Requested-With": "XMLHttpRequest" },
      auth: {
        username: process.env.wp_USERNAME,
        password: process.env.wp_PASSWORD,
      },
    });
    return true;
  } catch (error) {
    if (error?.data) {
      console.log(error.data);
    } else {
      console.log(error.message);
    }
    return false;
  }
};

const POST = async () => {
  let respond;
  let filePath;
  for (const e of json) {
    filePath = `./images/${e.name}.txt`;
    respond = await insertManga(e, filePath);
    if (!respond) {
      console.log(`function was stopped in ${e.name}`);
      break;
    }
    if (fs.existsSync(filePath)) {
      // The file exists, so you can proceed with deleting it
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(err);
        }
        console.log(`File (${e.name}.txt) deleted successfully\n`);
      });
    }
    //pause for 10 seconds before the next iteration.
    await new Promise((resolve) =>
      setTimeout(() => {
        console.log(
          `######## ${e.name} done ########\n########################\n`
        );
        resolve();
      }, 3000)
    );
  }
};

POST();
