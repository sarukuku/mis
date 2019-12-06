const Month = require('../models/month')
const Topic = require('../models/topic')

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const getMonthName = month => monthNames[month]

const addDefaultTopics = async month => {
  const marketing = await new Topic({ name: 'Marketing' }).save()
  const business = await new Topic({ name: 'Business' }).save()
  const brand = await new Topic({ name: 'Brand' }).save()
  const internal = await new Topic({ name: 'Internal' }).save()
  month.topics = [marketing, business, brand, internal]
}

const createMonth = async (reportId, monthParams) => {
  const month = new Month(monthParams)
  await addDefaultTopics(month)
  await month.save()

  return month
}

module.exports = { createMonth, getMonthName }
