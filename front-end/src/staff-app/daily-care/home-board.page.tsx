import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import Button from "@material-ui/core/ButtonBase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { Person } from "shared/models/person"
import { useApi } from "shared/hooks/use-api"
import { ActiveRollOverlay, ActiveRollAction } from "staff-app/components/active-roll-overlay/active-roll-overlay.component"
import SortOrder from "shared/enums/sort-order"
import SortType from "shared/enums/sort-type"
import StudentsList from "./students-list"
import { SortTypeToTextMap, SortOrderToTextMap } from "staff-app/constants/toolbar"
import { RollContext } from "shared/context/rollContext"
import FilterRollType from "shared/enums/filter-type"
import { saveActiveRoll } from "api/save-active-roll"

export const HomeBoardPage: React.FC = () => {
  const [isRollMode, setIsRollMode] = useState(false)

  const [getStudents, data, loadState] = useApi<{ students: Person[] }>({
    url: "get-homeboard-students",
  })
  const { roll, setStudentRoll, setDefaultRoll } = useContext(RollContext)
  const [sortType, setSortType] = useState<SortType | "">("")
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.ASC)

  const [searchTerm, setSearchTerm] = useState<string>("")

  const [filterRoll, setFilterRoll] = useState<FilterRollType>(FilterRollType.ALL)
  useEffect(() => {
    void getStudents()
  }, [getStudents])

  const onToolbarAction = (action: ToolbarAction) => {
    if (action === "roll") {
      setIsRollMode(true)
      data && setStudentRoll(data.students)
    }
  }

  const onActiveRollAction = (action: ActiveRollAction, value?: string) => {
    if (action === "filter") {
      setFilterRoll(value as FilterRollType)
    }

    if (action === "exit") {
      setDefaultRoll()
      setIsRollMode(false)
      setFilterRoll(FilterRollType.ALL)
    }

    if (action === "complete") {
      setIsRollMode(false)
      setFilterRoll(FilterRollType.ALL)
      setSearchTerm("")

      const rollData = roll.map((student) => ({
        student_id: student.studentId,
        roll_state: student.type,
      }))
      const saveRollData = async () => {
        await saveActiveRoll({
          student_roll_states: rollData,
        })
      }

      saveRollData()
      setDefaultRoll()
    }
  }

  return (
    <>
      <S.PageContainer>
        <Toolbar
          setSortType={setSortType}
          sortType={sortType}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onItemClick={onToolbarAction}
        />

        {loadState === "loading" && (
          <CenteredContainer>
            <FontAwesomeIcon icon="spinner" size="2x" spin />
          </CenteredContainer>
        )}

        {loadState === "loaded" && data?.students && (
          <StudentsList
            // send student list from context to students list component
            students={data.students}
            isRollMode={isRollMode}
            sortType={sortType}
            sortOrder={sortOrder}
            searchTerm={searchTerm}
            filterRoll={filterRoll}
          />
        )}

        {loadState === "error" && (
          <CenteredContainer>
            <div>Failed to load</div>
          </CenteredContainer>
        )}
      </S.PageContainer>
      <ActiveRollOverlay isActive={isRollMode} onItemClick={onActiveRollAction} />
    </>
  )
}

type ToolbarAction = "roll" | "sort" | "search" | "complete"

interface ToolbarProps {
  setSortType: (sortType: SortType) => void
  sortType: SortType | ""
  sortOrder: SortOrder
  setSortOrder: (sortType: SortOrder) => void
  onItemClick: (action: ToolbarAction, value?: string) => void
  searchTerm: string
  setSearchTerm: (searchTerm: string) => void
}

const Toolbar: React.FC<ToolbarProps> = (props) => {
  const { setSortType, sortType, sortOrder, onItemClick, setSortOrder, searchTerm, setSearchTerm } = props

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

  const onDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen)
    onItemClick("sort")
  }

  return (
    <S.ToolbarContainer>
      <S.SortContainer>
        <S.Button onClick={onDropdownClick} onBlur={() => setIsDropdownOpen(false)}>
          <FontAwesomeIcon icon="sort" size="sm" />

          <S.SortText>Sort By: {(sortType && SortTypeToTextMap[sortType]) || "N/A"}</S.SortText>

          <S.DropDownMain isActive={isDropdownOpen}>
            <S.DropDownContainer>
              <S.DropDownList onClick={() => setSortType(SortType.FIRST_NAME)}>First name</S.DropDownList>
              <S.DropDownList onClick={() => setSortType(SortType.LAST_NAME)}>Last name</S.DropDownList>
            </S.DropDownContainer>
          </S.DropDownMain>
        </S.Button>

        {sortType && <S.Button onClick={() => setSortOrder(sortOrder === SortOrder.DESC ? SortOrder.ASC : SortOrder.DESC)}>{SortOrderToTextMap[sortOrder]}</S.Button>}
      </S.SortContainer>

      <S.SearchContainer>
        <FontAwesomeIcon icon="search" size="sm" style={{ color: "black", marginLeft: 10 }} />

        <S.Input searchStart={true} type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search" />
      </S.SearchContainer>

      <S.Button onClick={() => onItemClick("roll")}>Start Roll</S.Button>
    </S.ToolbarContainer>
  )
}

const S = {
  PageContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 140px;
  `,
  ToolbarContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    background-color: ${Colors.blue.base};
    padding: 6px 14px;
    font-weight: ${FontWeight.strong};
    border-radius: ${BorderRadius.default};
  `,
  Button: styled(Button)`
    && {
      padding: ${Spacing.u2};
      font-weight: ${FontWeight.strong};
      border-radius: ${BorderRadius.default};
    }
  `,
  SortContainer: styled.div``,
  SortText: styled.div`
    margin-left: ${Spacing.u3};
  `,
  DropDownMain: styled.div<{ isActive: boolean }>`
    position: absolute;
    top: 100%;
    display: ${(props) => (props.isActive ? "block" : "none")};
    background-color: ${Colors.blue.darker};
    width: 200px;
  `,
  DropDownContainer: styled.div``,
  DropDownList: styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #ccc;
    &:hover {
      background-color: ${Colors.blue.base};
    }
  `,
  SearchContainer: styled.div`
    background: #fff;
    border-radius: 5;
    padding: 2;
  `,

  Input: styled.input<{ searchStart: boolean }>`
    width: "100%";
    padding: ${Spacing.u2};
    border: none;
    color: #090909;

    background-color: "#080808";
    font-weight: ${FontWeight.strong};
    transition: margin 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: gray;
    }
  `,
}
