#### install wp plugins :

- https://github.com/WP-API/Basic-Auth
- WP REST API Controller
- TaxoPress

#### add the following code to htaccess

`
RewriteCond %{HTTP:Authorization} ^(.)

RewriteRule ^(.) - [E=HTTP_AUTHORIZATION:%1]

SetEnvIf Authorization "(.\*)" HTTP_AUTHORIZATION=$1
`

#### add meta keyword staticly in the theme header.php
