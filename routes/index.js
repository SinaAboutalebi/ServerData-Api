//---------------------------💔🚬 'Zer0Power 💔🚬---------------------------//
const express = require('express');
const router = express.Router();
//---------------------------💔🚬 'Zer0Power 💔🚬---------------------------//
const serverRouter = require('./serversRouter');
router.use('/servers', serverRouter)

const countsRouter = require('./countsRouter');
router.use('/counts', countsRouter)

const portsRouter = require('./portsRouter');
router.use('/ports', portsRouter)

module.exports = router;
//---------------------------💔🚬 'Zer0Power 💔🚬---------------------------//