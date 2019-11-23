
# THIS STARTS THE NODEJS SERVER ( on port :3000 )
cd /js/server
npm install express
npm install socket.io
node server.js

# open a new cmd, to serve the index.html files ( on port :80 )
npm install http-server
cd to the root folder of blaze
http-server -p 80 "absolute:path/to/blaze"

now open up a browser and go to localhost:80