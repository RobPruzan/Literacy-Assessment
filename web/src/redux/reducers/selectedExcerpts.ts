import { ExcerptInfo } from '../../services.ts/connections';

export interface SelectedExcerptsState {
  selectedExcerpts: ExcerptInfo[] | null;
}

export const DEFAULT_SELECTED_EXCERPTS_STATE: SelectedExcerptsState = {
  selectedExcerpts: null,
};

export enum SelectedExcerptsActions {
  SetSelectedExcerpts = 'selectedExcerpts/SET_SELECTED_EXCERPTS',
  RemoveExcerpt = 'selectedExcerpts/REMOVE_EXCERPT',
  AddExcerpt = 'selectedExcerpts/ADD_EXCERPT',
  ResetSelectedExcerpts = 'selectedExcerpts/RESET_SELECTED_EXCERPTS',
}

interface SetSelectedExcerptsAction {
  type: SelectedExcerptsActions.SetSelectedExcerpts;
  payload: {
    selectedExcerpts: ExcerptInfo[];
  };
}

interface RemoveExcerptAction {
  type: SelectedExcerptsActions.RemoveExcerpt;
  payload: {
    excerptInfo: ExcerptInfo;
  };
}
interface AddExcerptAction {
  type: SelectedExcerptsActions.AddExcerpt;
  payload: {
    excerptInfo: ExcerptInfo;
  };
}
interface ResetSelectedExcerptsAction {
  type: SelectedExcerptsActions.ResetSelectedExcerpts;
}

export const SelectedExcerptsReducer = (
  state: SelectedExcerptsState = DEFAULT_SELECTED_EXCERPTS_STATE,
  action:
    | SetSelectedExcerptsAction
    | RemoveExcerptAction
    | AddExcerptAction
    | ResetSelectedExcerptsAction
) => {
  switch (action.type) {
    case SelectedExcerptsActions.SetSelectedExcerpts:
      return {
        ...state,
        selectedExcerpts: action.payload,
      };
    case SelectedExcerptsActions.RemoveExcerpt:
      return {
        ...state,
        selectedExcerpts: state.selectedExcerpts?.filter(
          (excerpt) => excerpt.id !== action.payload.excerptInfo.id
        ),
      };
    case SelectedExcerptsActions.AddExcerpt:
      console.log('add excerpt', action.payload.excerptInfo);
      if (
        state.selectedExcerpts?.some(
          (excerpt) => excerpt.id === action.payload.excerptInfo.id
        )
      ) {
        return state;
      } else {
        return {
          ...state,
          selectedExcerpts: [
            ...(state.selectedExcerpts ?? []),
            action.payload.excerptInfo,
          ],
        };
      }

    case SelectedExcerptsActions.ResetSelectedExcerpts:
      return { ...state, selectedExcerpts: null };
    default:
      return state;
  }
};
