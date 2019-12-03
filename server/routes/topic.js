const express = require('express')
const router = express.Router()
const Topic = require('../models/topic')

router.post('/:topicId', async (req, res, next) => {
  const topicId = req.params.topicId
  const { text } = req.body

  const topic = await Topic.findOne({ _id: topicId })
  topic.notes.push(text)
  await topic.save()

  res.status(200).json(topic.notes)
})

router.delete('/:topicId/:note', async (req, res, next) => {
  const { topicId, note } = req.params

  await Topic.updateOne({ _id: topicId }, { $pull: { notes: note } })
  const topic = await Topic.findOne({ _id: topicId })

  res.status(200).json(topic.notes)
})

module.exports = router
