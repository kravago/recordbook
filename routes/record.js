"use strict";

/** Routes for records. */

const jsonschema = require("jsonschema");
const express = require("express");
const axios = require("axios");

const { authenticateJWT } = require("../middleware/auth");
const { NotFoundError } = require("../expressError");
const API = require("../api");
const Record = require("../models/record");
const router = express.Router({ mergeParams: true });

// route to add anime to records 
router.post("/add/:animeId/user/:userId", authenticateJWT, async function (req, res, next) {
  try {
    // add anime to favs 
    const userId = req.params.userId;
    const animeId = req.params.animeId;

    const rec = await Record.create(userId, animeId);

    return res.json({ applied: rec});
  } catch (err) {
    return next(err);
  }
});

// route to remove anime from records
router.delete("/delete/:animeId/user/:userId", authenticateJWT, async function (req, res, next) {
  try {
    const userId = req.params.userId;
    const animeId = req.params.animeId;

    const rec = await Record.delete(userId, animeId);

    return res.json({ deleted: rec});
  } catch (err) {
    return next(err);
  }
});

// route to increment/decrement an anime being watched
router.post("/update/:method/:animeId/user/:userId", authenticateJWT, async function (req, res, next) {
  try {
    const method = req.params.method;
    const userId = req.params.userId;
    const animeId = req.params.animeId;

    const rec = await Record.increment(method, userId, animeId);

    return res.json({ episodes_updated: rec});
  } catch (err) {
    return next(err);
  }
});


module.exports = router;