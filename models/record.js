"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for companies. */

class Record {

  static async create(userId, animeId) {
    // check if record exists and throw an error if it does
    const check1 = await db.query(
      `SELECT anime_id
      FROM records
      WHERE anime_id = $1 AND uid = $2`, [animeId, userId]
    )
    const existingRecord = check1.rows[0];
    
    if (existingRecord) throw new NotFoundError(`No record: ${animeId}`);

    const result = await db.query(
      `INSERT INTO records (uid, anime_id)
      VALUES ($1, $2)
      RETURNING uid`,
      [userId, animeId]
    );
    return result.rows[0].uid;
  }

  static async delete(userId, animeId) {
    const result = await db.query(
      `DELETE
       FROM records
       WHERE uid = $1 AND anime_id = $2
       RETURNING uid`,
       [userId, animeId]
    );
    const record = result.rows[0];
    if (!record) throw new NotFoundError(`No record: ${animeId}`);
    return record.uid;
  }

  static async increment(method, userId, animeId) {
    // get the current amount of episodes
    const rec = await db.query(
      `SELECT episodes_watched
      FROM records
      WHERE uid = $1 AND anime_id = $2`,
      [userId, animeId]
    );
    let newEpisodeCt = rec.rows[0].episodes_watched;
    if (method === 'add') {
      newEpisodeCt += 1;
    } else if (method === 'sub') {
      newEpisodeCt -= 1;
    }
    const result = await db.query(
      `UPDATE records
       SET episodes_watched = $1
       WHERE uid = $2 AND anime_id = $3
       RETURNING episodes_watched`,
       [newEpisodeCt, userId, animeId]
    );
    const record = result.rows[0];
    if (!record) throw new NotFoundError(`No record: ${animeId}`);
    return record.episodes_watched;
  }
}


module.exports = Record;
