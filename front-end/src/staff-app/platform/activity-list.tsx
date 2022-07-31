import React from "react"
import parseDateTime from "shared/helpers/date-parse"
import { RollInput } from "shared/models/roll"
import { Colors } from "shared/styles/colors"
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
}

const ActivityList: React.FC<ActivityListProps> = (props) => {
  const { handleShowData, activitiesData } = props
  return (
    <>
      {activitiesData.activity.map((roll: { date: string; entity: { name: string; id: number } }) => (
        <S.ActivityListContainer key={roll.date}>
          <p>Date: {parseDateTime(roll.date)}</p>
          <p>Roll Name: {roll.entity.name}</p>
          <S.Button onClick={() => handleShowData(roll.entity.id)}>Show Data</S.Button>
        </S.ActivityListContainer>
      ))}
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
  ActivityListContainer: styled.div`
    background-color: white;
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  `,
}
