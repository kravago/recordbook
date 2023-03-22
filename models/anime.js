"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for companies. */

class Anime {
  /** Create a company (from data), update db, return new company data.
   *
   * data should be { handle, name, description, numEmployees, logoUrl }
   *
   * Returns { handle, name, description, numEmployees, logoUrl }
   *
   * Throws BadRequestError if company already in database.
   * */

  static async create({ anime_id, anime_title, synopsis, image, start_date, end_date, rating, status }) {
    const duplicateCheck = await db.query(
          `SELECT anime_id
           FROM anime
           WHERE anime_id = $1`,
        [anime_id]);

    if (duplicateCheck.rows[0])
      // throw new BadRequestError(`Duplicate company: ${anime_id}`);
      return {"anime": `${anime_id} already exists`};

    const result = await db.query(
          `INSERT INTO anime
           (anime_id, anime_title, synopsis, image, start_date, end_date, rating, status)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           RETURNING anime_id, anime_title, synopsis, image, start_date, end_date, rating, status`,
        [
          anime_id,
          anime_title,
          synopsis,
          image,
          start_date,
          end_date,
          rating,
          status
        ]
    );
    const anime = result.rows[0];

    return anime;
  }
}

module.exports = Anime;
