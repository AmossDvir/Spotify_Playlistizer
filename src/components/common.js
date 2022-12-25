import { lowerCaseList } from "../constants";

const generateRandomColorString = (alpha = 1) => {
  const randomBetween = (min, max) =>
    min + Math.floor(Math.random() * (max - min + 1));
  const r = randomBetween(0, 255);
  const g = randomBetween(0, 255);
  const b = randomBetween(0, 255);
  const rgb = `rgb(${r},${g},${b}, ${alpha})`; // Collect all to a css color string
  return rgb;
};

const getAvarageRGBValue = (color) => {
  const rgbValues = color
    .match(/\((.*)\)/)
    .pop()
    .split(",")
    .map((value) => parseInt(value.trim()));
  const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;
  return average(rgbValues);
};

const localize = (item) => {
  const localization = {
    title: "Title",
    album: "Album",
    songNumber: "#",
    artists: "Artists",
    duration: "Duration",
    genre: "Genre",
  };
  return localization[item];
};

const convertArtistsArrayToString = (array) => {
  if (!array || array?.length === 0) {
    return "";
  }
  return array
    .map((artist, index) =>
      index < array.length - 1 ? `${artist.name}, ` : artist.name
    )
    .join("");
};

const calculateColFlexValue = (rows, col) => {
  return (
    rows.reduce((accumSum, val) => {
      let value =
        val[col]?.props?.songName ?? val[col]?.props?.value ?? val[col];
      return accumSum + value?.toString().length;
    }, 0) / rows.length
  );
};

const convertMillisToMinutesAndSeconds = (millis) => {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return seconds === 60
    ? minutes + 1 + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

const convertMSToSeconds = (hms) => {
  var [minutes, seconds] = hms.split(":"); // split it at the colons
  // minutes are worth 60 seconds. Hours are worth 60 minutes.
  const secondsNum = Number(minutes) * 60 + Number(seconds);
  return secondsNum;
};


const toTitleCase = (str) => {
  return str.replace(/\p{L}+/gu, function (txt) {
    if (str.indexOf(txt) !== 0 && lowerCaseList.includes(txt.toLowerCase())) {
      return txt.toLowerCase();
    }
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

const removeHTMLTags = (str) => {
  return str.replace(/<[^>]*>/g, '');
};

const modifyArtistSummaryString = (summary) => {
  return removeHTMLTags(summary).replace('Read more on Last.fm', '');
}

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const selectLikelyArtists = (artists) => {
  const selectedArtists = [];
  for (const artist of artists) {
    if (artist.frequency >= 70) {
      // Higher popularity means higher likelihood of being selected
      const likelihood = artist.frequency / 100;
      if (Math.random() < likelihood) {
        selectedArtists.push(artist.name);
      }
    }
    if (selectedArtists.length === 20) {
      break;
    }
  }
  return selectedArtists;
};

export {
  generateRandomColorString,
  getAvarageRGBValue,
  localize,
  convertArtistsArrayToString,
  calculateColFlexValue,
  convertMillisToMinutesAndSeconds,
  convertMSToSeconds,
  toTitleCase,
  removeHTMLTags,
  modifyArtistSummaryString,
  shuffleArray,
  selectLikelyArtists
};
