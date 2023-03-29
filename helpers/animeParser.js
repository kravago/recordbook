"use strict";

const parseAnimeData = (data) => {
  const parsedData = {
    'anime_id': data.mal_id,
    'anime_title': data.title_english,
    'synopsis': data.synopsis,
    'image': data.images.jpg.image_url,
    'start_date': data.aired.from,
    'end_date': data.aired.to,
    'rating': data.score,
    'status': data.status 
  }
  return parsedData;
}

module.exports = parseAnimeData;