const filterByDate = (activity: any, dateFilter: string) => {
  return activity.filter((item: any) => {
    const date = new Date(item.date).toLocaleDateString()
    const filterDate = new Date(dateFilter).toLocaleDateString()
    return date === filterDate
  })
}

export default filterByDate
