export default (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const MONGODB_URI = process.env.MONGODB_URI;
  const client = new MongoClient(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  res.status(200).json([
    {
      id: 'mocketymock',
      reporter: 'Hamsterdam',
      months: [
        {
          name: 'November',
          topics: [
            {
              name: 'Recruitment',
              notes: [
                'Cupcake cake pudding tootsie roll',
                'Pudding candy gingerbread. Bear claw candy candy fruitcake carrot cake fruitcake.'
              ]
            }
          ]
        },
        {
          name: 'October',
          topics: [
            {
              name: 'Recruitment',
              notes: [
                'Bear claw candy candy fruitcake carrot cake fruitcake.',
                'Cupcake cake pudding tootsie roll'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'mockery',
      reporter: 'North Pole',
      months: [
        {
          name: 'November',
          topics: [
            {
              name: 'Recruitment',
              notes: [
                'Cupcake cake pudding tootsie roll',
                'Pudding candy gingerbread. Bear claw candy candy fruitcake carrot cake fruitcake.'
              ]
            }
          ]
        },
        {
          name: 'October',
          topics: [
            {
              name: 'Recruitment',
              notes: [
                'Bear claw candy candy fruitcake carrot cake fruitcake.',
                'Cupcake cake pudding tootsie roll'
              ]
            }
          ]
        }
      ]
    }
  ]);
  return;

  client.connect(async err => {
    const reports = client.db('data').collection('reports');
    const results = await reports.find({}).toArray();
    res.status(200).json(results);
    client.close();
  });
};
