"use strict";

/** Routes for anime. */

const jsonschema = require("jsonschema");
const express = require("express");
const axios = require("axios");

const Anime = require("../models/anime");
const API = require("../api");
const parseAnimeData = require("../helpers/animeParser");

const { ensureLoggedIn, ensureCorrectUserOrAdmin, authenticateJWT } = require("../middleware/auth");
const { NotFoundError } = require("../expressError");


const router = express.Router({ mergeParams: true });

// search for anime 
// GET /search => [{ anime }, { anime }, ... }]
router.get("/search", ensureLoggedIn, async function (req, res, next) {
  try {
    const animes = await API.getAnimesFromSearch(req.query.q);
    return res.json(animes.data);
  } catch (err) {
    return console.log(err);
  }
});

// look up anime by myanimelist id
// GET /[anime_id] => { anime }
router.get("/id/:anime_id", ensureLoggedIn, async function (req, res, next) {
  try {
    const anime = await API.getAnimeFromId(req.params.anime_id);
    const parsedAnime = parseAnimeData(anime);
    const stored_anime = await Anime.create(parsedAnime);
    return res.json(stored_anime);
  } catch (err) {
    return next(err);
  }
});

// route for getting top anime series
// GET /top_anime => [{ anime }, { anime }, ... }]
router.get("/top_anime", ensureLoggedIn, async function (req, res, next) {
  try {
    const topAnime = await API.getTopAnime();
    return res.json(topAnime.data);
  } catch (err) {
    return next(err);
  }
});

// route for getting the seasonal anime
// GET /current_season => [{ anime }, { anime }, ... }]
router.get("/current_season", ensureLoggedIn, async function (req, res, next) {
  try {
    const currentSeason = await API.getSeasonalAnime();
    return res.json(currentSeason.data);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;