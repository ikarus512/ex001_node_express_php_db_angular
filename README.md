# Example Node.js Express.js server

## About

Server uses simple authentication over https with self-signed certificate.

You can login as user=u password=u or sign up as another new user.
Users id/password base saved in local file.

Server (Express.js) provides REST API for to store user's todo items.
Items of current user are stored in memory, or in file (default), or in localhost MySQL, or localhost MongoDB
(this is controlled in file routes_protected_rest_api.js by using ../db/todos_file.js).

## Installation

Run to install packages mentioned in package.json:
<pre>
  npm i
</pre>


## Start:

Run:
<pre>
  node src_server/index.js
</pre>
And open page "https://localhost" in browser.
Browser will warn about problem with certificate (it is self-signed).
