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
router.post("/add", authenticateJWT, async function (req, res, next) {
  try {
    // add anime to favs 
    const userId = req.body.userId;
    const animeId = req.body.animeId;

    const rec = await Record.create(userId, animeId);

    return res.json({ recordAdded: rec});
  } catch (err) {
    return next(err);
  }
});

// route to remove anime from records
router.delete("/delete", authenticateJWT, async function (req, res, next) {
  try {
    const userId = req.body.userId;
    const animeId = req.body.animeId;

    const rec = await Record.delete(userId, animeId);

    return res.json({ deleted: rec});
  } catch (err) {
    return next(err);
  }
});

// route to increment/decrement an anime being watched
// TODO: make a check it doesnt go beyond the max episodes
router.post("/episodes", authenticateJWT, async function (req, res, next) {
  try {
    const episodes = req.body.episodes;
    const userId = req.body.userId;
    const animeId = req.body.animeId;

    const rec = await Record.updateEpisodes(episodes, userId, animeId);

    return res.json({ episodes_updated: rec});
  } catch (err) {
    return next(err);
  }
});

router.post("/score", authenticateJWT, async function (req, res, next) {
  try {
    const score = req.body.score;
    const userId = req.body.userId;
    const animeId = req.body.animeId;

    const rec = await Record.updateScore(score, userId, animeId);

    return res.json({ scoreUpdated: rec});
  } catch (err) {
    return next(err);
  }
});


module.exports = router;