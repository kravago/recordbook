"use strict";

const getSeason = () => {

  // get current year and season
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  let season = null;
  if (month in [1,2,3]){
      season = "winter";
  } else if (month in [4, 5, 6]) {
      season = "spring"
  } else if (month in [7, 8, 9]) {
      season = "summer"
  } else if (month in [10, 11, 12]) {
      season = "fall"
  }

  return {year: year, season: season}
}

module.exports = { getSeason }