const parseDateTime = (dateTime: string) => {
  const dateObj = new Date(dateTime)
  const date = dateObj.toLocaleDateString()
  const time = dateObj.toLocaleTimeString()
  return `${date} ${time}`
}

export default parseDateTime
