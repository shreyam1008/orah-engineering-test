import { StudentListTile } from "staff-app/components/student-list-tile/student-list-tile.component"
import { sortStudents, filterStudents, filterStudentsByRollType } from "staff-app/helpers/students"
import SortOrder from "shared/enums/sort-order"
import SortType from "shared/enums/sort-type"
import { Person } from "shared/models/person"
import React, { useContext } from "react"
import { RollContext } from "shared/context/rollContext"
import FilterRollType from "shared/enums/filter-type"
import { RollInput, RollStateType } from "shared/models/roll"

interface StudentsListProps {
  students: Person[]
  rolls: Array<any>
}

const StudentsList = (props: StudentsListProps) => {
  const { students, rolls } = props

  const studentsToShow = students

  const getRollDisplayType = (studentId: number): RollStateType => {
    const roll = rolls.find((roll: any) => roll.student_id === studentId)
    return roll ? roll.roll_state : "unmark"
  }

  return (
    <>
      {studentsToShow.map((student) => (
        <StudentListTile key={student.id} student={student} isRollDisplayMode={true} rollDisplayType={getRollDisplayType(student.id)} />
      ))}
    </>
  )
}

export default StudentsList
