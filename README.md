## script for scrap data from a website and insert it in wp platform

#### Download the script file to your computer.

- 1 install `node js` in your computer.
- 2 Open script in any code editor (vsc) or bash terminal(ubuntu).
- inside the script file in the root main creat file `.env` , pust this inside him

  ```wp_USERNAME=
  wp_PASSWORD=
  API_LINK=

  SCRAPING_URL=
  MG_NAME=
  ```

- 2 https://github.com/WP-API/Basic-Auth
- WP REST API Controller
- TaxoPress

#### add the following code to htaccess

`
RewriteCond %{HTTP:Authorization} ^(.)

RewriteRule ^(.) - [E=HTTP_AUTHORIZATION:%1]

SetEnvIf Authorization "(.\*)" HTTP_AUTHORIZATION=$1
`

#### add meta keyword staticly in the theme header.php
