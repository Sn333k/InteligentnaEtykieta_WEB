A simple web-based tool for wirelessly uploading black-and-white images to a E-Ink display connected to a NodeMCU v3 (ESP8266). 
The microcontroller runs as a standalone Wi-Fi Access Point, hosting a basic web interface for uploading .pbm images directly to the display.

**Running WEB**

The easiest and tested way to run is in Visual Studio Code.
Type in terminal:

npm install

npm run build

npm install -g serve

serve -s build -l 3000

And you have a web server under IP addr: 'Your IP':3000

**How to Use**

Power on the ESP8266 — it creates a Wi-Fi AP named epaper-ap with password epaper123

Connect your device (e.g., phone/laptop) to the AP

Start a WEB frontend

Open a browser and go to 'YourIP':3000

Use the upload form to select and submit a .pbm file

The E-Ink display will update with the uploaded image
