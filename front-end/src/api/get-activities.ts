import { httpMock } from "shared/helpers/http-mock"
import { get, LocalStorageKey } from "shared/helpers/local-storage"
import { ApiResponse } from "shared/interfaces/http.interface"
import { Activity } from "shared/models/activity"
import { RollApi } from "shared/models/roll"

export async function getActivities(): Promise<ApiResponse<{ activity: Activity[] }>> {
  try {
    const rolls = get<RollApi[]>(LocalStorageKey.rolls) || []

    await httpMock({ randomFailure: true })
    return {
      success: true,
      activity: buildActivities(rolls),
    }
  } catch (error) {
    return {
      success: false,
      error: {},
    }
  }
}

function buildActivities(inputs: RollApi[]): Activity[] {
  return inputs.map((item) => ({
    type: "roll",
    entity: item,
    date: item.completed_at,
  }))
}
