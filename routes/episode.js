"use strict";

/** Routes for anime. */

const jsonschema = require("jsonschema");
const express = require("express");
const axios = require("axios");

const Episode = require("../models/episode");
const API = require("../api");
const parseAnimeData = require("../helpers/animeParser");

const { ensureLoggedIn} = require("../middleware/auth");
const { NotFoundError } = require("../expressError");


const router = express.Router({ mergeParams: true });

// episode routes

// GET /all/:anime_id
// get all episodes for an anime
router.get("/all/:anime_id", ensureLoggedIn, async function (req, res, next) {
  try {
    const anime_id = req.params.anime_id;
    const episodes = await API.getEpisodes(anime_id);
    return res.json(episodes.data);
  } catch (err) {
    return next(err);
  }
});

// GET /anime/:anime_id/episode/:episode_id
// get specific episode from an anime 
router.get("/anime/:anime_id/episode/:episode_id", ensureLoggedIn, async function (req, res, next) {
  try {
    const anime_id = req.params.anime_id;
    const episode_id = req.params.episode_id;
    const episode_data = await API.getEpisode(anime_id, episode_id);
    console.log(episode_data);
    // await Episode.create(anime_id, episode_id, res.data);
    return res.json(episode_data);
  } catch (err) {
    return next(err);
  }
});


module.exports = router;