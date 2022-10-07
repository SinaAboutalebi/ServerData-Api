//---------------------------💔🚬 'Zer0Power 💔🚬---------------------------//
const express = require("express");
const router = express.Router();
config = require("../src/config.json");
axios = require("axios");
//---------------------------💔🚬 'Zer0Power 💔🚬---------------------------//
//Functions

async function getServerData(ip, port) {
  const options = {
    method: "get",
    url:
      `https://api.steampowered.com/IGameServersService/GetServerList/v1/?key=${
        config.api
      }&filter=addr${"\\"}` + ip,
  };

  let serverList = await axios(options);
  var svListArray = serverList.data.response.servers;
  var found = svListArray.find((item) => item.gameport == port);
  return found;
}
//---------------------------💔🚬 'Zer0Power 💔🚬---------------------------//

router.get("/", async (req, res) => {
  var ip = req.query.ip;
  var port = req.query.port;
  if (!ip || !port) {
    return res.status(400).json({ message: "Invalid query" });
  } else {
    try {
      let data = await getServerData(ip, port);
      if (data) {
        res.status(200).json(data);
      } else {
        return res.status(404).json({ message: "Server not found" });
      }
    } catch (error) {
      return res.status(408).json({ message: "Api Down" });
    }
  }
});

module.exports = router;
//---------------------------💔🚬 'Zer0Power 💔🚬---------------------------//
