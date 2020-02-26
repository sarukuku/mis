const express = require('express')
const router = express.Router()
const Report = require('../models/report')
const Month = require('../models/month')
const Topic = require('../models/topic')
const { createMonth } = require('../services/month')

router.post('/topic/:reportId/:monthId', async (req, res, next) => {
  const reportId = req.params.reportId
  const monthId = req.params.monthId
  const newTopic = new Topic(req.body, monthId, reportId)
  await newTopic.save()
  Month.update({ _id: monthId }, { $push: { topics: newTopic } })
    .then(console.log)
    .catch(console.error)

  const report = await Report.findOne({ _id: reportId }).populate({
    path: 'months',
    populate: {
      path: 'topics',
      model: 'Topic'
    }
  })
  res.status(200).json(report.months)
})

router.post('/:reportId', async (req, res, next) => {
  const monthParams = new Month(req.body)
  const reportId = req.params.reportId

  const month = await createMonth(reportId, monthParams)
  await Report.update({ _id: reportId }, { $push: { months: month } })
  const report = await Report.findOne({ _id: reportId }).populate({
    path: 'months',
    populate: {
      path: 'topics',
      model: 'Topic'
    }
  })

  res.status(200).json(report.months)
})

router.delete('/:reportId/:monthId', async (req, res, next) => {
  const reportId = req.params.reportId
  const monthId = req.params.monthId

  const month = await Month.findOne({ _id: monthId })

  // TODO maybe we should return a not found message
  if (!!month) {
    await Report.updateOne({ _id: reportId }, { $pull: { months: { _id: monthId } } })
    await Topic.deleteMany({ _id: { $in: month.topics } })
    await Month.deleteOne({ _id: monthId })
  }

  const report = await Report.findOne({ _id: reportId }).populate({
    path: 'months',
    populate: {
      path: 'topics',
      model: 'Topic'
    }
  })

  res.status(200).json(report.months)
})

module.exports = router
