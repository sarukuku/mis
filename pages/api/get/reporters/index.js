export default (req, res) => {
  const MongoClient = require("mongodb").MongoClient;
  const uri =
    "mongodb+srv://mis_server:Jm8AvdAKF4TMYkJx@mis-fuvmt.gcp.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  client.connect(async err => {
    const reports = client.db("data").collection("reports");
    const results = await reports.find({}).toArray();
    res.status(200).json(results);
    client.close();
  });
};
