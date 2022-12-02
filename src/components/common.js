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
    genre: "Genre"
  };
  return localization[item];
};

const convertArtistsArrayToString = (array) => {
  if (array.length === 0) {
    return "";
  }
  return array
    .map((artist, index) =>
      index < array.length - 1 ? `${artist.name}, ` : artist.name
    )
    .join("");
};

const calculateColFlexValue = (rows, col) => {
   
    return rows.reduce((accumSum, val) => accumSum + val[col].toString().length, 0)/rows.length
  
};

const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return (
        seconds == 60 ?
        (minutes+1) + ":00" :
        minutes + ":" + (seconds < 10 ? "0" : "") + seconds
      );
  }

export {
  generateRandomColorString,
  getAvarageRGBValue,
  localize,
  convertArtistsArrayToString,
  calculateColFlexValue,
  millisToMinutesAndSeconds
};
