export enum ComparisonTypeStrings {
  Collection = 'collection',
  Excerpt = 'excerpt',
}
export interface ComparisonState {
  comparisonType: ComparisonTypeStrings;
}

export const DEFAULT_COMPARISON_STATE: ComparisonState = {
  comparisonType: ComparisonTypeStrings.Collection,
};

export enum ComparisonActions {
  SET_COMPARISON_TYPE = 'SET_COMPARISON_TYPE',
}

interface SetComparisonTypeAction {
  type: ComparisonActions.SET_COMPARISON_TYPE;
  payload: { comparisonType: ComparisonTypeStrings };
}

export const ComparisonReducer = (
  state: ComparisonState = DEFAULT_COMPARISON_STATE,
  action: SetComparisonTypeAction
) => {
  switch (action.type) {
    case ComparisonActions.SET_COMPARISON_TYPE:
      return {
        ...state,
        comparisonType: action.payload.comparisonType,
      };

    default:
      return state;
  }
};
