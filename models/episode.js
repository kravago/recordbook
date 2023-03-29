"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for companies. */

class Episode {

  static async create(anime_id, episode_id, episode_data) {
    // insert an episode into the database
    
    const result = await db.query(
          `INSERT INTO episode
           (anime_id, episode_id, episode_title, aired, recap, filler, synopsis)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           RETURNING anime_id, episode_id, episode_title, aired, recap, filler, synopsis`,
        [
          anime_id,
          episode_id,
          episode_data.data.title,
          episode_data.data.aired,
          episode_data.data.recap,
          episode_data.data.filler,
          episode_data.data.synopsis
        ]
    );
    const episode = result.rows[0];

    return episode;
  }

  // static async getEpisode(anime_id, episode_id) {
  //   // fetch episode from the database  
  // }
}

module.exports = Episode;
