import SortOrder from "shared/enums/sort-order";
import SortType from "shared/enums/sort-type";
import { Person } from "shared/models/person";

export const sortStudents = (
    students: Person[],
    sortType: SortType | "",
    sortOrder: SortOrder
  ) => {
    switch (sortType) {
      case SortType.FIRST_NAME:
        return students.sort((student1, student2) => {
        return (student1.first_name.localeCompare(
            student2.first_name
          ))*(sortOrder === SortOrder.DESC ? -1 : 1);
  
   
        });
  
      case SortType.LAST_NAME:
        return students.sort((student1, student2) => {
          return (student1.last_name.localeCompare(
            student2.last_name
          ))*(sortOrder === SortOrder.DESC ? -1 : 1);

        });
  
      default:
        return students;
    }
  };


 export const filterStudents = (students: Person[], searchTerm: string) => {
    return students.filter((student) => {
      return `${student.first_name} ${student.last_name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
  };
  
  