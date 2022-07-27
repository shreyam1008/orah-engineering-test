import React, { createContext, useState } from "react"
import { Person } from "shared/models/person"
import { Roll, RollStateType } from "shared/models/roll"

type RollCountType = {
  present: number
  absent: number
  late: number
  total: number
}

type RollContextType = {
  roll: Roll[]
  saveRoll: (studentId: Number, roll: RollStateType) => void
  getRollType: (studentId: Number) => RollStateType
  setStudentRoll: (roll: Person[]) => void
  rollCount: RollCountType
}

const defaultRoll: Roll[] = []

const defaultRollContext: RollContextType = {
  roll: defaultRoll,
  saveRoll: () => {},
  getRollType: () => "unmark",
  setStudentRoll: () => {},
  rollCount: {
    present: 0,
    absent: 0,
    late: 0,
    total: 0,
  },
}

export const RollContext = createContext<RollContextType>(defaultRollContext)

export const RollProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [roll, setRoll] = useState<Roll[]>(defaultRoll)

  const rollCount = {
    present: roll.filter((r) => r.type === "present").length,
    absent: roll.filter((r) => r.type === "absent").length,
    late: roll.filter((r) => r.type === "late").length,
    total: roll.filter((r) => r.type === "present").length + roll.filter((r) => r.type === "absent").length + roll.filter((r) => r.type === "late").length,
  }

  const saveRoll = (studentId: Number, rollType: RollStateType) => {
    setRoll(
      roll.map((r) => {
        if (r.studentId === studentId) {
          r.type = rollType
        }
        return r
      })
    )
  }

  const getRollType = (studentId: Number) => {
    const student = roll.find((r) => r.studentId === studentId)
    return student ? student.type : "unmark"
  }

  const setStudentRoll = (roll: Person[]) => {
    const studentRoll: Roll[] = roll.map((r) => {
      return {
        studentId: r.id,
        type: "unmark",
      }
    })

    setRoll(studentRoll)
  }

  return <RollContext.Provider value={{ roll, setStudentRoll, saveRoll, getRollType, rollCount }}>{children}</RollContext.Provider>
}

export default RollProvider
