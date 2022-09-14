//---------------------------💔🚬 'Zer0Power 💔🚬---------------------------//
//Packages
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const Routes = require("./routes/index");

const app = express();
//---------------------------💔🚬 'Zer0Power 💔🚬---------------------------//

app.use(bodyParser.json());
app.use(cors());

app.listen(2010, () => {
    console.log('[📶]Server Is Running Properly ....\n[ℹ️]Port : 2010');
});

app.use("/", Routes);
//---------------------------💔🚬 'Zer0Power 💔🚬---------------------------//