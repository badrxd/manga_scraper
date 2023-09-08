const axios = require("axios");
const json = require("./chapters.json");
const fs = require("fs");
require("dotenv").config();

const insertManga = async ({ name }) => {
  let contents;
  const filePath = `./images/${name}.txt`;
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

const POST = async (params) => {
  let respond;
  for (const e of json) {
    respond = await insertManga(e);
    if (!respond) {
      console.log(`function was stopped in ${e.name}`);
      break;
    }

    //pause for 10 seconds before the next iteration.
    await new Promise((resolve) =>
      setTimeout(() => {
        console.log(`****** ${e.name} done ******\n***********************\n`);
        resolve();
      }, 10000)
    );
  }
};

POST();
