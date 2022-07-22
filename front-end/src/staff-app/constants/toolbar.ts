import SortOrder from "shared/enums/sort-order";
import SortType from "shared/enums/sort-type";

export const SortOrderToTextMap = {
    [SortOrder.ASC]: "ASC (A-Z)",
    [SortOrder.DESC]: "DESC (Z-A)",
  };
  
  export  const SortTypeToTextMap = {
    [SortType.FIRST_NAME]: "First Name",
    [SortType.LAST_NAME]: "Last Name",
  };