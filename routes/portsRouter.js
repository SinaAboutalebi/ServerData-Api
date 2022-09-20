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
  try {
    let server1Data = await axios(options);
  } catch (error) {
    return res.status(408).json({ message: error });
  }
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
  try {
    let server2Data = await axios(options);
  } catch (error) {
    return res.status(408).json({ message: error });
  }
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
    return server1;
  });
  const result1 = [];
  response1.forEach((server) => result1.push(server.port));
  //Server2============================================================//
  const server2Data = await GetSecondServerData();
  if (!server2Data.servers)
    return res.status(500).json({ message: "Servers Are Down" });

  const response2 = server2Data.servers.map((server) => {
    const server2 = {};
    server2.port = server.gameport;
    return server2;
  });
  const result2 = [];
  response2.forEach((server) => result2.push(server.port));
  //ResponseData=======================================================//
  data.vps1Ports = result1;
  data.vps2Ports = result2;

  res.status(200).json(data);
});

module.exports = router;
//---------------------------💔🚬 'Zer0Power 💔🚬---------------------------//
