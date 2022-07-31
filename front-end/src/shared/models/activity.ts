import { RollApi } from "shared/models/roll"

export interface Activity {
  type: "roll"
  date: Date
  entity: RollApi
}
