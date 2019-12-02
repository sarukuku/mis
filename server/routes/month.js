const express = require('express');
const router = express.Router();
const Report = require('../models/report');
const Month = require('../models/month');

router.post('/:reportId', async (req, res, next) => {
    const month = new Month(req.body);
    const reportId = req.params.reportId;

    await month.save()
        .then(() => {
            console.log(month);
            Report.update({ _id: reportId }, { $push: { months: month } })
                .then(console.log)
                .catch(console.error)
        });
    const report = await Report.findOne({_id: reportId }).populate('months');
    res.status(200).json(report.months);
});

module.exports = router;
