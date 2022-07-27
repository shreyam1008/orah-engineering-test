export type Roll = {
  studentId: number
  type: RollStateType
}

export interface RollInput {
  student_roll_states: { student_id: number; roll_state: RollStateType }[]
}

export type RollStateType = "unmark" | "present" | "absent" | "late"
