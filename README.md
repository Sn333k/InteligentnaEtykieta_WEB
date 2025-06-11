A simple web-based tool for wirelessly uploading black-and-white images to a E-Ink display connected to a NodeMCU v3 (ESP8266). 
The microcontroller runs as a standalone Wi-Fi Access Point, hosting a basic web interface for uploading .pbm images directly to the display.

The easiest and tested way to run is in Visual Studio Code.
Type in terminal:

npm install

npm run build

npm install -g serve

serve -s build -l 3000

And you have a web server under IP addr: 'Your IP':3000
