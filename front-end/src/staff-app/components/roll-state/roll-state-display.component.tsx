import React from "react"
import styled from "styled-components"
import { RollStateType } from "shared/models/roll"

interface Props {
  rollState: RollStateType
}

const RollStateDisplay: React.FC<Props> = (props) => {
  const { rollState } = props
  return <S.Box bgColor={getBgColor(rollState)}>{getTextName(rollState)}</S.Box>
}

function getBgColor(rollState: RollStateType) {
  switch (rollState) {
    case "unmark":
      return "#fff"
    case "present":
      return "#13943b"
    case "absent":
      return "#9b9b9b"
    case "late":
      return "#f5a623"
    default:
      return "#13943b"
  }
}

function getTextName(rollState: RollStateType) {
  switch (rollState) {
    case "unmark":
      return "Unmarked"
    case "present":
      return "Present"
    case "absent":
      return "Absent"
    case "late":
      return "Late"
    default:
      return ""
  }
}

export default RollStateDisplay
const S = {
  Box: styled.div<{
    bgColor: string
  }>`
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    background-color: ${({ bgColor }) => bgColor};
    border-radius: 5px;
    width: 70px;
    height: 30px;
  `,
}
