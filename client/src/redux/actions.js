import store from "./store";

const reducers = {
  addIssues: "ADD_ISSUES",
  addIssue: "ADD_ISSUE",
  refresh: "REFRESH_STATE",
  updateIssue: "UPDATE_ISSUE",
  createBackup: "BACKUP_ISSUES",
  filterIssues: "FILTER_ISSUES",
  deleteIssue: "DELETE_ISSUE",
};

const fetchAllIssues = () => {
  return store.getStates().issues;
};

const addIssue = () => {
    
}

const exported = {
  fetchAllIssues,
};

export default exported;
