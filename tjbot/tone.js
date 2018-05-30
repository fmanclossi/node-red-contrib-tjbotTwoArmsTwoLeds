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
  function TJBotNodeAnalyzeTone(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    node.on("input", function(msg) {
      var mode = msg.mode||config.tones;
      
      tj.bots[config.botId].analyzeTone(msg.payload).then(function(response) {
        switch(mode.toLowerCase()) {
          case "emotion":
            msg.response = response.document_tone.tone_categories[0];
          break;
          case "language":
            msg.response = response.document_tone.tone_categories[1];
          break;
          case "social":
            msg.response = response.document_tone.tone_categories[2];
          break;
          case "all":
          default:
            msg.response = response;
          break;
        }

        node.send(msg);
      });
    });
  }
  RED.nodes.registerType("tjbot-analyze-tone", TJBotNodeAnalyzeTone);
}
