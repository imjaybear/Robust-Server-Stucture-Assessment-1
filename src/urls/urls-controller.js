const urls = require("../data/urls-data");
const uses = require("../data/uses-data");

//create function
function create(req, res) {
  const { data: { href } = {} } = req.body;
  const newURL = {
    id: urls.length + 1,
    href,
  };
  urls.push(newURL);
  res.status(201).json({ data: newURL });
}

// Validates href

function hasHref(req, res, next) {
  const { data: { href } = {} } = req.body;
  if (href) {
    return next();
  }
  next({
    status: 400,
    message: "A 'href' property is required",
  });
}

// list urls
function list(req, res) {
  res.json({ data: urls });
}

//URL validator
function urlExists(req, res, next) {
  const urlId = Number(req.params.urlId);
  const foundURL = urls.find((url) => url.id === urlId);

  if (foundURL) {
    res.locals.url = foundURL;
    return next();
  }
  next({
    status: 404,
    message: `Url id not found: ${req.params.urlId}`,
  });
}

// Read function

function read(req, res) {
  const url = res.locals.url;
  const newUse = {
    id: uses.length + 1,
    urlId: url.id,
    time: Date.now(),
  };
  uses.push(newUse);
  res.json({ data: url });
}

// Update Function

function update(req, res) {
  const url = res.locals.url;
  const { data: { href } = {} } = req.body;
  url.href = href;

  res.json({ data: url });
}

module.exports = {
  create: [hasHref, create],
  list,
  read: [urlExists, update],
  update: [urlExists, hasHref, update],
  urlExists,
};
