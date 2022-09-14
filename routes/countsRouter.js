//---------------------------💔🚬 'Zer0Power 💔🚬---------------------------//
const express = require("express");
const router = express.Router();
config = require("../src/config.json");
axios = require("axios");

//---------------------------💔🚬 'Zer0Power 💔🚬---------------------------//
//Functions
async function GetFirstServerData() {
  const options = {
    method: "get",
    url:
      `https://api.steampowered.com/IGameServersService/GetServerList/v1/?key=${
        config.api
      }&filter=addr${"\\"}` + config.server1,
  };
  let server1Data = await axios(options);
  if (server1Data.data) {
    return server1Data.data.response;
  } else {
    return res.status(408).json({ message: "Api Down" });
  }
}
//===================================================================//
async function GetSecondServerData() {
  const options = {
    method: "get",
    url:
      `https://api.steampowered.com/IGameServersService/GetServerList/v1/?key=${
        config.api
      }&filter=addr${"\\"}` + config.server2,
  };
  let server2Data = await axios(options);
  if (server2Data.data) {
    return server2Data.data.response;
  } else {
    return res.status(408).json({ message: "Api Down" });
  }
}

//---------------------------💔🚬 'Zer0Power 💔🚬---------------------------//
router.get("/", async (req, res) => {
  const data = {};
  //Server1============================================================//
  const server1Data = await GetFirstServerData();
  if (!server1Data.servers)
    return res.status(500).json({ message: "Servers Are Down" });
  const response1 = server1Data.servers.map((server) => {
    const server1 = {};
    server1.port = server.gameport;
    server1.name = server.name;
    server1.players = server.players;
    return server1;
  });

  const server1players = response1
    .map((server) => server.players)
    .reduce((prev, curr) => prev + curr, 0);
  //Server2============================================================//
  const server2Data = await GetSecondServerData();
  if (!server2Data.servers)
    return res.status(500).json({ message: "Servers Are Down" });
  const response2 = server2Data.servers.map((server) => {
    const server2 = {};
    server2.port = server.gameport;
    server2.name = server.name;
    server2.players = server.players;
    return server2;
  });
  const server2players = response2
    .map((server) => server.players)
    .reduce((prev, curr) => prev + curr, 0);
  //ResponseData=======================================================//
  data.totalServers = response1.length + response2.length;
  data.vps1Onlines = response1.length;
  data.vps2Onlines = response2.length;
  data.totalPlayers = server1players + server2players;
  data.vps1Players = server1players;
  data.vps2Players = server2players;

  res.status(200).json(data);
});

module.exports = router;
//---------------------------💔🚬 'Zer0Power 💔🚬---------------------------//
