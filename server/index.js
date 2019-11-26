const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://mis_server:Jm8AvdAKF4TMYkJx@mis-fuvmt.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const db = client.db("data");
  const reports = db.collection("reports");

  // reports.find({}).limit(5).forEach(myDoc => {
  //   console.log(myDoc.listing_url)
  // })

  reports.insertMany([
    { reporter: "Helsinki", months: [] },
    { reporter: "Amsterdam", months: [] },
    { reporter: "New York", months: [] }
  ]);

  client.close();
});

const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    if (pathname === "/api/reports") {
      app.render(req, res, "/b", query);
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(3000, err => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
