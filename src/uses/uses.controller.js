const uses = require("../data/uses-data");

// List uses

function list(req, res) {
  const { urlId } = req.params;
  res.status(200).json({
    data: res.locals.uses.filter(
      urlId ? (uses) => uses.urlId == Number(urlId) : () => true
    ),
  });
}

// Uses validator

function usesExists(req, res, next) {
  const { useId } = req.params;
  const foundUse = uses.find((use) => use.id === Number(useId));
  if (foundUse) {
    res.locals.use = foundUse;
    return next();
  }
  next({
    status: 404,
    message: `Use id not found ${useId}`,
  });
}
// filters uses by url ID
function findRelevantUses(req, res, next) {
  const { urlId } = req.params;
  const relevantUses = uses;
  if (urlId != undefined) {
    relevantUses = uses.filter((use) => use.urlId === Number(urlId));
  }
  res.locals.uses = relevantUses;
  return next();
}
// Read Function

function read(req, res) {
  res.json({ data: res.locals.use });
}

// Destroy function

function destroy(req, res, next) {
  const { useId } = req.params;
  const index = uses.findIndex((use) => use.id === Number(useId));
  if (index > -1) {
    uses.splice(index, 1);
  }
  res.sendStatus(204);
}

module.exports = {
  list: [findRelevantUses, list],
  read: [usesExists, read],
  delete: [usesExists, destroy],
};
