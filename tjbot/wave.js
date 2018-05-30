/***************************************************************************
* Copyright 2017 IBM
*
*   TJBot Nodes for Node-RED
*
*   By JeanCarl Bisson (@dothewww)
*   More info: https://ibm.biz/node-red-contrib-tjbot
*
*   Licensed under the Apache License, Version 2.0 (the "License");
*   you may not use this file except in compliance with the License.
*   You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
*   Unless required by applicable law or agreed to in writing, software
*   distributed under the License is distributed on an "AS IS" BASIS,
*   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*   See the License for the specific language governing permissions and
****************************************************************************/

var tj = require("./tjbot.js");

module.exports = function(RED) {
  function TJBotNodeWave(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    node.on("input", function(msg) {
      var motion = msg.motion||config.motion;
      var arm = msg.arm||config.arm;

      switch(arm.toLowerCase()) {
       case "leftarm":
        switch(motion.toLowerCase()) {
          case "armback":
            tj.bots[config.botId].leftArmBack();
          break;
          case "lowerarm":
            tj.bots[config.botId].lowerLeftArm();
          break;
          case "raisearm":
            tj.bots[config.botId].raiseLeftArm();
          break;
          case "wave":
            tj.bots[config.botId].waveLeftArm();
          break;
        }
	break;

       case "rightarm":
        switch(motion.toLowerCase()) {
          case "armback":
            tj.bots[config.botId].rightArmBack();
          break;
          case "lowerarm":
            tj.bots[config.botId].lowerRightArm();
          break;
          case "raisearm":
            tj.bots[config.botId].raiseRightArm();
          break;
          case "wave":
            tj.bots[config.botId].waveRightArm();
          break;
        }
	break;

      }

    });
  }
  RED.nodes.registerType("tjbot-wave", TJBotNodeWave);
}
