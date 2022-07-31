import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Spacing } from "shared/styles/styles"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useApi } from "shared/hooks/use-api"
import StudentList from "./student-list"
import ActivityList from "./activity-list"
import { Person } from "shared/models/person"
import { RollInput } from "shared/models/roll"

interface ActivityType {
  type: string
  date: string
  entity: {
    id: number
    name: string
    student_roll_states: RollInput
  }
}
export const ActivityPage: React.FC = () => {
  const [currentRoll, setCurrentRoll] = useState<ActivityType>({
    type: "",
    date: "",
    entity: {} as any,
  })

  const [getStudentData, studentData, StudentDataLoadState] = useApi<{ students: Person[] }>({
    url: "get-homeboard-students",
  })

  const [getActivitiesData, activitiesData, ActivitiesDataLoadState] = useApi<{
    activity: ActivityType[]
    success: boolean
  }>({
    url: "get-activities",
  })

  useEffect(() => {
    void getStudentData()
    void getActivitiesData()
  }, [getStudentData, getActivitiesData])

  const handleShowData = (id: number) => {
    const currentRollList = activitiesData?.activity.filter((item) => item.entity.id === id)
    console.log("currentRoll", currentRoll)

    if (currentRollList) {
      setCurrentRoll(currentRollList[0])
    }
  }

  if (!activitiesData) {
    return (
      <S.Container>
        <CenteredContainer>
          <FontAwesomeIcon icon="spinner" size="2x" spin />
        </CenteredContainer>
      </S.Container>
    )
  }

  return (
    <S.Container>
      {StudentDataLoadState === "loading" && ActivitiesDataLoadState === "loading" && (
        <CenteredContainer>
          <FontAwesomeIcon icon="spinner" size="2x" spin />
        </CenteredContainer>
      )}
      {StudentDataLoadState === "loaded" && ActivitiesDataLoadState === "loaded" && (
        <S.AttendenceContainer>
          <S.ActivityContainer>{activitiesData?.activity.length > 0 && <ActivityList activitiesData={activitiesData} handleShowData={handleShowData} />}</S.ActivityContainer>
          <S.StudentContainer>
            {currentRoll.entity.id ? (
              <>
                <h1>Roll Details</h1>
                <StudentList rolls={currentRoll.entity.student_roll_states as any} students={studentData?.students as Person[]} />
              </>
            ) : (
              <p>No Roll Data</p>
            )}
          </S.StudentContainer>
        </S.AttendenceContainer>
      )}
      {StudentDataLoadState === "error" && ActivitiesDataLoadState === "error" && (
        <CenteredContainer>
          <div>Failed to load</div>
        </CenteredContainer>
      )}
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: ${Spacing.u2} auto 0;
  `,
  AttendenceContainer: styled.div`
    display: flex;
    width: 100%;
    margin-top: 20px;
  `,
  ActivityContainer: styled.div`
    flex: 0.3;
  `,
  StudentContainer: styled.div`
    flex: 0.7;
    margin-left: 20px;
  `,
}
