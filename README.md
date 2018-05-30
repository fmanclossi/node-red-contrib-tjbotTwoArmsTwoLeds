# Node-RED nodes for TJBot with two arms and 2 LEDs

Node-RED nodes that can be used with a modified TJBot running on a Raspberry Pi.
This project extends the excellent work performed by ![TJBot team](https://github.com/ibmtjbot/tjbot) and ![JeanCarl Besson](https://github.com/jeancarl/node-red-contrib-tjbot).

This nodes require https://github.com/fmanclossi/tjbotTwoArmsTwoLEDs (a modified library for TJBot with two arms and two LEDs).

Please follow (uncomfortable) install instructions.

Nodes include:

* analyze tone - analyzes the tone (emotion, language, and social tones) of the payload using the Watson Tone Analyzer service
* converse - analyzes natural language using the Watson Conversation service
* listen - uses the connected microphone to transcribe speech using Watson Speech to Text service
* (extended) see - classifies a photo taken using the camera via Watson Visual Recognition service. Added face recognition feature
* (extended) shine - controls the LEDs to shine a color
* speak - uses the connected speaker to play speech from the Watson Text to Speech service
* take photo - captures a photo taken using the camera
* translate - translates content via the Watson Language Translator service
* (extended) wave - controls the servo to wave the left or right arm
* (new) sleep - take a snap!

![changes](/examples/Nodes%20changed.jpg)

# Examples

![Faccina (little face)](/examples/Faccina_Alarm.mp4) - HC-SR04 Ultrasonic sensor is managed by node-red-node-pisrf available in Node-Red palette (it requires Physical PINs values, not GPIO). Could be useful to install node-red-contrib-camerapi, too.

... more examples will be available soon :)

# Installation

1-Install modified TJBot library as described in https://github.com/fmanclossi/tjbotTwoArmsTwoLEDs (to be enhanced). 

2-Upgrade Node-RED preinstalled with Raspbian Jessie using the command below.

```

bash <(curl -sL https://raw.githubusercontent.com/node-red/raspbian-deb-package/master/resources/update-nodejs-and-nodered)

```

3-Setup Node-Red to run when the Pi boots up, run:

```

sudo systemctl enable nodered.service

```

4-Then, install TJBot nodes from EXPANDED TJBot Nodes repository:

```

cd .node-red

mkdir nodes

cd nodes

git clone https://github.com/fmanclossi/node-red-contrib-tjbotTwoArmsTwoLeds

cd node-red-contrib-tjbotTwoArmsTwoLeds

npm install

mv  node_modules/tjbot/lib/tjbot.js node_modules/tjbot/lib/tjbot.js.orig #just in case you want to go back to official distro

cp /home/pi/Desktop/tjbotTwoArmsTwoLEDs/lib/tjbot.js node_modules/tjbot/lib/ #change path if it’s not on Desktop

sudo nano /lib/systemd/system/nodered.service # some TJBot actions has to run as root so change User from pi to root

sudo systemctl daemon-reload

node-red-start # check node-red environment. Settings file should be at /root/.node-red/settings.js 

node-red-stop

mkdir /home/pi/Desktop/httpStatic # place to host static content from top level URL

sudo nano /root/.node-red/settings.js. # Modify /root/.node-red/settings.js to point to the original Node-RED directory uncommenting and setting userDir and nodesDir variables as 

	userDir: '/home/pi/.node-red/’,

	nodesDir: '/home/pi/.node-red/nodes’,

	httpStatic: ‘/home/pi/Desktop/httpStatic/’

node-red-start

```

# Contributions

Contributions and enhancements are welcomed. Please create a pull request.
