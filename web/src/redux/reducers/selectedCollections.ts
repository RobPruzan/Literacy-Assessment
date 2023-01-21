import { CollectionCreateInfo } from '../../services.ts/connections';

export interface SelectedCollectionsState {
  selectedCollections: CollectionCreateInfo[] | null;
}

export const DEFAULT_SELECTED_COLLECTIONS_STATE: SelectedCollectionsState = {
  selectedCollections: null,
};

export enum SelectedCollectionsActions {
  SetSelectedCollections = 'selectedCollections/SET_SELECTED_COLLECTIONS',
  RemoveCollection = 'selectedCollections/REMOVE_COLLECTIONS',
  AddCollection = 'selectedCollections/ADD_COLLECTION',
  ResetSelectedCollections = 'selectedCollections/RESET_SELECTED_COLLECTIONS',
}

interface SetSelectedCollectionsAction {
  type: SelectedCollectionsActions.SetSelectedCollections;
  payload: {
    selectedCollections: CollectionCreateInfo[];
  };
}

interface RemoveCollectionAction {
  type: SelectedCollectionsActions.RemoveCollection;
  payload: {
    collectionInfo: CollectionCreateInfo;
  };
}
interface AddCollectionAction {
  type: SelectedCollectionsActions.AddCollection;
  payload: {
    collectionInfo: CollectionCreateInfo;
  };
}
interface ResetSelectedCollectionsAction {
  type: SelectedCollectionsActions.ResetSelectedCollections;
}

export const SelectedCollectionsReducer = (
  state: SelectedCollectionsState = DEFAULT_SELECTED_COLLECTIONS_STATE,
  action:
    | SetSelectedCollectionsAction
    | RemoveCollectionAction
    | AddCollectionAction
    | ResetSelectedCollectionsAction
) => {
  switch (action.type) {
    case SelectedCollectionsActions.SetSelectedCollections:
      return {
        ...state,
        selectedCollections: action.payload,
      };
    case SelectedCollectionsActions.RemoveCollection:
      return {
        ...state,
        selectedCollections: state.selectedCollections?.filter(
          (excerpt) => excerpt.id !== action.payload.collectionInfo.id
        ),
      };
    case SelectedCollectionsActions.AddCollection:
      if (
        state.selectedCollections?.some(
          (excerpt) => excerpt.id === action.payload.collectionInfo.id
        )
      ) {
        return state;
      } else {
        return {
          ...state,
          selectedCollections: [
            ...(state.selectedCollections ?? []),
            action.payload.collectionInfo,
          ],
        };
      }

    case SelectedCollectionsActions.ResetSelectedCollections:
      return { ...state, selectedCollections: null };
    default:
      return state;
  }
};
