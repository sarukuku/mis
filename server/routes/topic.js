const express = require('express')
const router = express.Router()
const Topic = require('../models/topic')
const { sendEvent, updateClients } = require('../utils/sse')

router.post('/:topicId', async (req, res, next) => {
  const topicId = req.params.topicId
  const { text, month, reporter } = req.body

  const topic = await Topic.findOne({ _id: topicId })
  topic.notes.push(text)
  await topic.save()

  updateClients(req, topic.notes, 'topic', topicId, month, reporter)

  res.status(200).json(topic.notes)
})

router.delete('/:topicId/:indexOfNote', async (req, res, next) => {
  
  const { topicId, indexOfNote } = req.params
  const { month, reporter } = req.body

  const topic = await Topic.findOne({ _id: topicId })

  topic.notes.splice(indexOfNote, 1)
  topic.save()

  updateClients(req, topic.notes, 'topic', topicId, month, reporter)

  res.status(200).json(topic.notes)
})

module.exports = router
