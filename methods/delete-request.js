const writeToFile = require("../utils/write-to-file");
module.exports = (req, res) => {
  const baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  let id = req.url.split("/")[3];
  if (id < 0) {
    res.writeHead(400, { "content-type": "application/json" });
    res.end(
      JSON.stringify({ title: " Invalid ID", message: "Id is not valid" })
    );
  } else if (baseUrl === "/api/movies/" && id >= 0) {
    const index = req.movies.findIndex((movie) => {
      return movie._id === id;
    });
    if (index === -1) {
      res.statusCode = 404;
      res.write(
        JSON.stringify({ title: "Not Found", message: "Movies not found" })
      );
      res.end();
    } else {
      req.movies.splice(index, 1);
      writeToFile(req.movies);
      res.writeHead(204, { "Content-Type": "application/json" });
      res.end(JSON.stringify(req.movies));
    }
  }
};
