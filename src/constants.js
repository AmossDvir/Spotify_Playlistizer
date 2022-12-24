const baseUrl = "http://localhost:3200/";

const routes = {
  home: { url: "/" },
  create: { url: "/create" },
  signUp: { url: "/sign_up" },
  settings: { url: "/settings" },
  analyzer: { url: "/analyze" },
  redirect: { url: "/redirect" },
  playlistView: { url: "/playlists" },
};

const errorCodesLabels = {
  0: "",
  401: "You have entered an invalid username or password",
  400: "User already exists",
  500: "Internal server error",
  429: "Too Many Songs",
  ERR_NETWORK: "Network error",
};

const lowerCaseList = [
  "of",
  "and",
  "as",
  "but",
  "for",
  "if",
  "nor",
  "or",
  "so",
  "yet",
  "a",
  "an",
  "the",
  "as",
  "at",
  "by",
  "for",
  "in",
  "of",
  "off",
  "on",
  "per",
  "to",
  "up",
  "via",
];

export { routes, baseUrl, errorCodesLabels, lowerCaseList };
