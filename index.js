// Simple Stremio add-on that displays a single "Hello" catalog item

const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");

// Customize your message without changing code:
const MESSAGE = process.env.HELLO_MESSAGE || "Message from Tavit";
const TITLE   = process.env.HELLO_TITLE   || "If “you are seeing this, my first experiment with malware injection has worked. \n Please contact me to let me know!";
const POSTER  = process.env.HELLO_POSTER  || "https://asianetbroadband.in/wp-content/uploads/2019/06/what-are-computer-viruses-and-its-types.jpg"; // any image url works
const BG      = process.env.HELLO_BG      || "https://asianetbroadband.in/wp-content/uploads/2019/06/what-are-computer-viruses-and-its-types.jpg";

const manifest = {
  id: "org.yourname.family-hello",
  version: "1.0.0",
  name: "Family Hello",
  description: "Shows a friendly hello message to my family inside Stremio.",
  logo: POSTER,
  resources: ["catalog", "meta"],      // no streams needed
  types: ["movie"],                    // we’ll pretend our message is a 'movie'
  catalogs: [
    { type: "movie", id: "family-hello", name: "Family Hello" }
  ],
  idPrefixes: ["hello-"]               // the IDs our add-on will serve
};

const builder = new addonBuilder(manifest);

// Show a single meta item in the catalog
builder.defineCatalogHandler(({ type, id }) => {
  if (type !== "movie" || id !== "family-hello")
    return Promise.resolve({ metas: [] });

  return Promise.resolve({
    metas: [{
      id: "hello-1",
      type: "movie",
      name: TITLE,
      poster: POSTER,
      background: BG,
      description: MESSAGE,
      releaseInfo: "Just now",
      genres: ["Message"]
    }]
  });
});

// When they click the item, show the same info on the detail page
builder.defineMetaHandler(({ type, id }) => {
  if (type !== "movie" || id !== "hello-1")
    return Promise.resolve({});

  return Promise.resolve({
    meta: {
      id: "hello-1",
      type: "movie",
      name: TITLE,
      poster: POSTER,
      background: BG,
      description: MESSAGE,
      genres: ["Message"]
    }
  });
});

serveHTTP(builder.getInterface(), { port: process.env.PORT || 7000 });
console.log("Family Hello add-on running on port", process.env.PORT || 7000);
console.log("Manifest URL: http://localhost:" + (process.env.PORT || 7000) + "/manifest.json");
