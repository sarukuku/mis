const express = require('express');
const router = express.Router();
const Report = require('../models/report');

router.post('/', async (req, res, next) => {
  const report = new Report(req.body);
  const result = await report.save();
  res.status(200).json(result);
});
router.get('/', (req, res) => {
  Report.find({}, (err, reports) => {
    res.json(reports);
  });
});
router.get('/:id', (req, res, next) => {
  Report.findById(req.params.id, (err, photo) => {
    if (err) res.status(500).send(err);
    else req.photo = photo;
    next();
  });
});
// router
//   .get('/:id', (req, res) => {
//     return res.json(req.report);
//   })
//   .put('/:id', (req, res) => {
//     Object.keys(req.body).map(key => {
//       req.report[key] = req.body[key];
//     });
//     req.report.save();
//     res.json(req.report);
//   });
module.exports = router;
