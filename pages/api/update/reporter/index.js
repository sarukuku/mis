var ObjectID = require('mongodb').ObjectID

export default ({ body: { reporter } }, res) => {
  const MongoClient = require('mongodb').MongoClient
  const uri = 'mongodb+srv://mis_server:Jm8AvdAKF4TMYkJx@mis-fuvmt.gcp.mongodb.net/test?retryWrites=true&w=majority'
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  client.connect(async err => {
    const reports = client.db('data').collection('reports')
    const results = await reports.updateOne(
      { _id: ObjectID(reporter._id) },
      {
        $set: {
          reporter: reporter.reporter,
          months: reporter.months
        }
      }
    )
    res.status(200).json(results)
    client.close()
  })
}
