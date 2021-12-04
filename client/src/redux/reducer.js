const initialState = {
   issues: []
};

const reducers = (state = initialState, action) => {
   switch (action.type) {
      case "ADD_ISSUES":
         return {
            ...state,
            issues: [...state.issues, ...action.payloads.issues]
         };
      case "ADD_ISSUE":
         return { ...state, issues: [...state.issues, action.payloads.issue] };
      case "EDIT_ISSUE":
         let updatedIssues = state.issues.map((each) => {
            if (each._id === action.payloads.issue._id) {
               each = action.payloads.issue;
            }
            return each;
         });
         return { ...state, issues: updatedIssues };
      case "REFRESH_STATE":
         return { ...state };
      case "DELETE_ISSUE":
         updatedIssues = state.issues.filter(
            (each) => each._id !== action.payloads.issue._id
         );
         return { ...state, issues: updatedIssues };
      default:
         return state;
   }
};

export default reducers;
