import Month from './month/month'

function sortMonths(months) {
  return months.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateA.getTime() >= dateB.getTime() ? -1 : 1
  })
}

const Report = ({ location, months }) => {
  months = sortMonths(months)
  return (
    <div className="location">
      <h2>{location.reporter}</h2>
      <div className="months">
        {months.map(month => (
          <Month key={month.name} reportId={location.id} month={month} />
        ))}
      </div>
    </div>
  )
}

export default Report
