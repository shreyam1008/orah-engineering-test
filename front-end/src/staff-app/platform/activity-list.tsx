import React from "react"
import parseDateTime from "shared/helpers/date-parse"
import { RollInput } from "shared/models/roll"
import { Colors } from "shared/styles/colors"
import filterByDate from "staff-app/helpers/activity"
import styled from "styled-components"

interface ActivityListProps {
  activitiesData: {
    success: boolean
    activity: {
      type: string
      date: string
      entity: {
        id: number
        name: string
        student_roll_states: RollInput
      }
    }[]
  }
  handleShowData: (id: number) => void
  dateFilter?: string
}

const ActivityList: React.FC<ActivityListProps> = (props) => {
  const { handleShowData, activitiesData, dateFilter } = props
  const { activity } = activitiesData
  const [activeRoll, setActiveRoll] = React.useState<number>(0)

  const filteredActivitiesData = React.useMemo(() => (dateFilter ? filterByDate(activity, dateFilter) : activity), [activity, dateFilter])

  const isActive = (type: number) => {
    if (type === activeRoll) {
      return true
    }
    return false
  }

  return (
    <>
      {filteredActivitiesData.length > 0 ? (
        filteredActivitiesData.map((roll: { date: string; entity: { name: string; id: number } }) => (
          <S.ActivityListContainer key={roll.date} isActive={isActive(roll.entity.id)}>
            <p>Date: {parseDateTime(roll.date)}</p>
            <p>Roll Name: {roll.entity.name}</p>
            <S.Button
              onClick={() => {
                setActiveRoll(roll.entity.id)
                handleShowData(roll.entity.id)
              }}
            >
              Show Data
            </S.Button>
          </S.ActivityListContainer>
        ))
      ) : (
        <p>No Roll Data on this date</p>
      )}
    </>
  )
}
export default ActivityList

const S = {
  Button: styled.button`
    background-color: ${Colors.blue.base};
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
  `,
  ActivityListContainer: styled.div<{
    isActive: boolean
  }>`
    background-color: ${(props) => (props.isActive ? "#fff" : "#f1f1f1")};
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  `,
}
