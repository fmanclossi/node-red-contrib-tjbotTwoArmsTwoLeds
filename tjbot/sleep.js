/***************************************************************************
* Copyright 2017 IBM
*
*   TJBot Nodes for Node-RED
*
*   By Ferruccio Manclossi (ferruccio_manclossi@it.ibm.com) extending JeanCarl Bisson (@dothewww) works
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
// @param {Int} msec Number of milliseconds to sleep for (1000 msec == 1 sec).
module.exports = function(RED) {
  function TJBotNodeSleep(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    tj.bots[config.botId].sleep(0);

    node.on("input", function(msg) {
      var sleeptime = parseInt(msg.sleeptime||config.sleeptime);
      tj.bots[config.botId].sleep(sleeptime);
      node.send(msg);
    });
  }
  RED.nodes.registerType("tjbot-sleep", TJBotNodeSleep);
}
