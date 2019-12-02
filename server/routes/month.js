const express = require('express');
const router = express.Router();
const Report = require('../models/report');
const Month = require('../models/month');

router.post('/:reportId', async (req, res, next) => {
    const month = new Month(req.body);

    const result = await month.save()
        .then(() => {
            console.log(month);
            Report.update({ _id: req.params.reportId}, { $push: { months: month } })
                .then(console.log)
                .catch(console.error)
        });
    res.status(200).json(result);
});

router.get('/', (req, res) => {
    Report.find({}, (err, reports) => {
        res.json(reports);
    });
});



module.exports = router;
