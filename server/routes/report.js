const express = require('express')
const router = express.Router()
const Report = require('../models/report')
const { createMonth, getMonthName } = require('../services/month')

router.post('/', async (req, res, next) => {
  const report = new Report(req.body)
  const result = await report.save()
  res.status(200).json(result)
})

router.get('/', async (req, res) => {
  const { nMonths } = req.query

  const reports = await Report.find({}).populate({
    path: 'months',
    populate: {
      path: 'topics',
      model: 'Topic'
    }
  })

  for (let report of reports) {
    await checkMonths(report, nMonths)
  }

  res.json(reports)
})

router.get('/:id', (req, res, next) => {
  Report.findById(req.params.id, (err, photo) => {
    if (err) res.status(500).send(err)
    else req.photo = photo
    next()
  })
})

router.delete('/:id', (req, res, next) => {
  Report.findByIdAndDelete(req.params.id)
    .then(res.status(204).end())
    .catch(console.error)
})

const checkMonths = async (report, nMonths) => {
  const { id, months } = report
  let windowDate = new Date()
  windowDate.setMonth(windowDate.getMonth() - nMonths)

  let indexMonthReport = 0
  let indexMonthWindow = 0

  while (!!months[indexMonthReport] && months[indexMonthReport].date.getMonth() < windowDate.getMonth()) {
    indexMonthReport++
  }

  while (indexMonthWindow < nMonths) {
    const monthReport = months[indexMonthReport]

    if (!!monthReport && windowDate.getMonth() === monthReport.date.getMonth()) {
      indexMonthReport++
    } else if (!monthReport || monthReport.date.getMonth() > windowDate.getMonth()) {
      months.splice(
        indexMonthReport,
        0,
        await createMonth(id, { name: `${getMonthName(windowDate.getMonth())} ${windowDate.getFullYear()}`, date: windowDate })
      )
      indexMonthReport++
    }

    indexMonthWindow++
    windowDate.setMonth(windowDate.getMonth() + 1)
  }
  report.save()

  return months
}

module.exports = router
