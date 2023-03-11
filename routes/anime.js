"use strict";

/** Routes for anime. */

const jsonschema = require("jsonschema");
const express = require("express");
const axios = require("axios");

const { ensureLoggedIn, authenticateJWT } = require("../middleware/auth");
const { NotFoundError } = require("../expressError");
const API = require("../api");
const db = require("../db");
const router = express.Router({ mergeParams: true });

// route to search for anime 
// GET / => { anime, anime, ... }
router.get("/search", authenticateJWT, async function (req, res, next) {
  try {
    console.log(req.params.q);
    const animes = await API.getAnimesFromSearch(req.query.q);
    return res.json(animes);
  } catch (err) {
    return console.log(err);
  }
});

// route for looking up anime 
// GET /[anime_id] => { anime }
router.get("/id/:anime_id", authenticateJWT, async function (req, res, next) {
  try {
    const anime = await API.getAnimeFromId(req.params.anime_id);
    return res.json(anime);
  } catch (err) {
    return next(err);
  }
});

// route for getting top anime series
// GET /topanime => { anime, anime, ...}
router.get("/topanime", authenticateJWT, async function (req, res, next) {
  try {
    const topAnime = await API.getTopAnime();
    return res.json(topAnime);
  } catch (err) {
    return next(err);
  }
});

// route for getting the seasonal anime
// GET /seasonalanime => { anime, anime, ...}
router.get("/seasonalanime", authenticateJWT, async function (req, res, next) {
  try {
    const topAnime = await API.getSeasonalAnime();
    return res.json(topAnime);
  } catch (err) {
    return next(err);
  }
});


// route to add anime to records 
router.get("/favorite/:animeId/user/:userId", authenticateJWT, async function (req, res, next) {
  try {
    // add anime to favs 
    const userId = req.params.userId;
    const animeId = req.params.animeId;

    // check favorite exists
    // const check1 = await db.query(
    //   `SELECT anime_id
    //   FROM records
    //   WHERE anime_id = $1 AND uid = $2`, [animeId, userId]
    // )
    // const existingRecord = check1.rows[0];
    
    // if (record) throw new NotFoundError(`No record: ${animeId}`);

    await db.query(
      `INSERT INTO records (uid, anime_id)
       VALUES ($1, $2)`, [userId, animeId]      
    );
    return res.json({ applied: animeId});
  } catch (err) {
    return next(err);
  }
});
// route to remove anime from records

// route to increment an anime being watched

// route to decrement an anime being watched


module.exports = router;