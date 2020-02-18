const express = require('express')
const router = express.Router()
const Topic = require('../models/topic')
const { sendEvent } = require('../utils/sse')

router.post('/:topicId', async (req, res, next) => {
  const topicId = req.params.topicId
  const { text } = req.body

  const topic = await Topic.findOne({ _id: topicId })
  topic.notes.push(text)
  await topic.save()

  req.app.get('clients').forEach(client => {
    let { id, responder } = client
    let data = {
      action: 'insert',
      type: 'topic',
      id: topicId,
      payload: text
    }
    responder.write(`event: message\n`)
    responder.write(`data: ${JSON.stringify(data)}\n\n`)
  })

  res.status(200).json(topic.notes)
})

router.delete('/:topicId/:indexOfNote', async (req, res, next) => {
  
  const { topicId, indexOfNote } = req.params

  const topic = await Topic.findOne({ _id: topicId })

  topic.notes.splice(indexOfNote, 1)
  topic.save()

  req.app.get('clients').forEach(client => {
    let { id, responder } = client
    let data = {
      action: 'delete',
      type: 'topic',
      id: topicId,
      index: indexOfNote
    }
    
    sendEvent(responder, data)
  })

  res.status(200).json(topic.notes)
})

module.exports = router
