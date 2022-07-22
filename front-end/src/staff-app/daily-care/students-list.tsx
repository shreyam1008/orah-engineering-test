import { StudentListTile } from "staff-app/components/student-list-tile/student-list-tile.component";
import {sortStudents,filterStudents} from 'staff-app/helpers/students'
import SortOrder from "shared/enums/sort-order";
import SortType from "shared/enums/sort-type";
import { Person } from "shared/models/person";
import React from "react";


interface StudentsListProps {
    students: Person[];
    isRollMode: boolean;
    sortType: SortType | "";
    sortOrder: SortOrder;
    searchTerm: string;
  }
  
  const StudentsList = (props: StudentsListProps) => {
    const { students, isRollMode, sortType, sortOrder, searchTerm } = props;
  
    const filteredStudents = React.useMemo(()=>filterStudents(students, searchTerm),[students, searchTerm]);
    const sortedStudents = React.useMemo(()=>sortStudents(filteredStudents, sortType, sortOrder),[filteredStudents, sortType, sortOrder]);
  
    return (
      <>
        {sortedStudents.map((student) => (
          <StudentListTile
            key={student.id}
            isRollMode={isRollMode}
            student={student}
          />
        ))}
      </>
    );
  };
  
  export default StudentsList