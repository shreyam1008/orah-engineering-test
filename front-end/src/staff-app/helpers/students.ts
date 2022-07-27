import FilterRollType from "shared/enums/filter-type"
import SortOrder from "shared/enums/sort-order"
import SortType from "shared/enums/sort-type"
import { Person } from "shared/models/person"
import { Roll } from "shared/models/roll"

export const sortStudents = (students: Person[], sortType: SortType | "", sortOrder: SortOrder) => {
  switch (sortType) {
    case SortType.FIRST_NAME:
      return students.sort((student1, student2) => {
        return student1.first_name.localeCompare(student2.first_name) * (sortOrder === SortOrder.DESC ? -1 : 1)
      })

    case SortType.LAST_NAME:
      return students.sort((student1, student2) => {
        return student1.last_name.localeCompare(student2.last_name) * (sortOrder === SortOrder.DESC ? -1 : 1)
      })

    default:
      return students
  }
}

export const filterStudents = (students: Person[], searchTerm: string) => {
  return students.filter((student) => {
    return `${student.first_name} ${student.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  })
}

export const filterStudentsByRollType = (students: Person[], filterRoll: FilterRollType, roll: Roll[]) => {
  if (filterRoll === FilterRollType.ALL) {
    return students
  }

  const studentIds = roll.filter((studentRoll) => studentRoll.type === filterRoll).map((studentRoll) => studentRoll.studentId)

  return students.filter((student) => studentIds.includes(student.id))
}
