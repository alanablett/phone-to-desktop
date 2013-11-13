# Phone To Desktop
This simple proof of concept allows one browser to connect to and 'control' another through a very simple socket.io and node.js app. It was inspired by the great work at http://www.diplomatic-cover.com.

## Installation
Before running this experiment you'll need to download and install node.js from http://nodejs.org.

* Clone this repo
* Install dependancies with `npm install`
* Run the server from the root of the project with `node server.js`

Now open a browser window and navigate to http://localhost:8082. You should see the 'desktop' view with a url provided. This url can be entered into the other device or browser to control the existing window.

## Debugging
I recommend the excellent node-inspector found at https://github.com/node-inspector/node-inspector. Once set-up, you'll be able to pause, inspect and edit your node.js code just like normal javascript.

## Warnings
This is my first stab at both node.js and socket.io. It also only took a few hours to complete so I would certainly tidy things up if I were to go production level with this. This is only meant to serve as a proof of concept.