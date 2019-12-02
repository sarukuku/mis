export default ({ body: { reporter } }, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri =
    'mongodb+srv://mis_server:Jm8AvdAKF4TMYkJx@mis-fuvmt.gcp.mongodb.net/test?retryWrites=true&w=majority';
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  client.connect(async err => {
    const reports = client.db('data').collection('reports');
    const results = await reports.insertOne({
      reporter: reporter,
      months: []
    });
    res.status(201).json(results.insertedId);
    client.close();
  });
};
