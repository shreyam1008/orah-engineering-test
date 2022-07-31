import { StudentListTile } from "staff-app/components/student-list-tile/student-list-tile.component"
import { Person } from "shared/models/person"
import React from "react"
import { RollStateType } from "shared/models/roll"

interface StudentsListProps {
  students: Person[]
  rolls: { student_id: number; roll_state: RollStateType }[]
}

const StudentsList = (props: StudentsListProps) => {
  const { students, rolls } = props

  const studentsToShow = students

  const getRollDisplayType = (studentId: number): RollStateType => {
    const roll = rolls.find((roll) => roll.student_id === studentId)
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
