## script for scrap data from a website and insert it in wp platform

#### Setup script in computer

- 1 Download the script file .
- 2 install `node js` in your computer.
- 3 Open script in any code editor (vsc) or bash terminal (ubuntu).
- inside the script file in the root directory creat file `.env` , pust this inside it

  ```
  wp_USERNAME="put wp username"
  wp_PASSWORD="put wp password"
  API_LINK="put your manga link"

  SCRAPING_URL=""
  MG_NAME=""
  ```

- 3 In the code editor run this command to install all dependencies `npm install`.

#### Setup wp website

Install the plugins

- 1 `https://github.com/WP-API/Basic-Auth`
- 2 `WP REST API Controller`
- 3 `TaxoPress` , (we will use this plugins later to add tags to all Comics posts)
- 4 in wp admin page got to Tools => REST API Controller => Comics , and enable it

#### add the following code to htaccess

`
RewriteCond %{HTTP:Authorization} ^(.)

RewriteRule ^(.) - [E=HTTP_AUTHORIZATION:%1]

SetEnvIf Authorization "(.\*)" HTTP_AUTHORIZATION=$1
`

#### add meta keyword staticly in the theme header.php
