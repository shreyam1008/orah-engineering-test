import React from "react"
import parseDateTime from "shared/helpers/date-parse"
import { Colors } from "shared/styles/colors"
import styled from "styled-components"

interface ActivityListProps {
  activitiesData: any
  handleShowData: (id: number) => void
}

const ActivityList: React.FC<ActivityListProps> = (props) => {
  const { handleShowData, activitiesData } = props
  return (
    <>
      {activitiesData.activity.map((roll: { date: string; entity: { name: string; id: number } }) => (
        <div
          key={roll.date}
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            padding: 10,
            margin: 10,
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
          }}
        >
          <p>Date: {parseDateTime(roll.date)}</p>
          <p>Roll Name: {roll.entity.name}</p>
          <S.Button onClick={() => handleShowData(roll.entity.id)}>Show Data</S.Button>
        </div>
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
}
