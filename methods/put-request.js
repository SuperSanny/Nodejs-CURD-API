const requestBodyParser = require("../utils/body-parser");
const writeToFile = require("../utils/write-to-file");
module.exports = async (req, res) => {
  const baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  let id = req.url.split("/")[3];
  if (id < 0) {
    res.writeHead(400, { "content-type": "application/json" });
    res.end(
      JSON.stringify({ title: " Invalid ID", message: "Id is not valid" })
    );
  } else if (baseUrl === "/api/movies/" && id >= 0) {
    try {
      let body = await requestBodyParser(req);
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
        req.movies[index] = { id, ...body };
        writeToFile(req.movies);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(req.movies[index]));
      }
    } catch (err) {
      console.log(err);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          title: "Validation Error",
          message: "UUID is not valid",
        })
      );
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ title: "Not Found", message: "Router not found!" })
    );
  }
};
