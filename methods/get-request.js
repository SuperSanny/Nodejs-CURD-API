module.exports = (req, res) => {
  const baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  let id = req.url.split("/")[3];
  if (req.url === "/api/movies") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(req.movies));
    res.end();
  } else if (id < 0) {
    res.writeHead(400, { "content-type": "application/json" });
    res.end(
      JSON.stringify({ title: " Invalid ID", message: "Id is not valid" })
    );
  } else if (baseUrl === "/api/movies/" && id >= 0) {
    res.setHeader("Content-Type", "application/json");
    let filteredMovies = req.movies.filter((movie) => {
      return movie._id === id;
    });
    if (filteredMovies.length > 0) {
      res.statusCode = 200;
      res.write(JSON.stringify(filteredMovies));
      res.end();
    } else {
      res.statusCode = 404;
      res.write(
        JSON.stringify({ title: "Not Found", message: "Movies not found" })
      );
      res.end();
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ title: "Not Found", message: "Router not found!" })
    );
  }
};
