import { StudentListTile } from "staff-app/components/student-list-tile/student-list-tile.component"
import { sortStudents, filterStudents, filterStudentsByRollType } from "staff-app/helpers/students"
import SortOrder from "shared/enums/sort-order"
import SortType from "shared/enums/sort-type"
import { Person } from "shared/models/person"
import React, { useContext } from "react"
import { RollContext } from "shared/context/rollContext"
import FilterRollType from "shared/enums/filter-type"

interface StudentsListProps {
  students: Person[]
  isRollMode: boolean
  sortType: SortType | ""
  sortOrder: SortOrder
  searchTerm: string
  filterRoll: FilterRollType
}

const StudentsList = (props: StudentsListProps) => {
  const { students, isRollMode, sortType, sortOrder, searchTerm, filterRoll } = props

  const { roll } = useContext(RollContext)

  const rollFilteredStudents = React.useMemo(() => (filterRoll ? filterStudentsByRollType(students, filterRoll, roll) : students), [roll, students, filterRoll])
  const searchFilteredStudents = React.useMemo(() => filterStudents(rollFilteredStudents, searchTerm), [rollFilteredStudents, searchTerm])
  const studentsToShow = React.useMemo(() => sortStudents(searchFilteredStudents, sortType, sortOrder), [searchFilteredStudents, sortType, sortOrder])

  return (
    <>
      {studentsToShow.map((student) => (
        <StudentListTile key={student.id} isRollMode={isRollMode} student={student} />
      ))}
    </>
  )
}

export default StudentsList
