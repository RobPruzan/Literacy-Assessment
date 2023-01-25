import { Collection } from '../../services.ts/connections';

export type SelectedCollection = {
  id: number;
  title: string;
  collections: Collection[];
};

export type SelectedCollectionsState = {
  selectedCollections: Collection[] | null;
};

export const DEFAULT_SELECTED_COLLECTIONS_STATE: SelectedCollectionsState = {
  selectedCollections: null,
};

export enum SelectedCollectionsActions {
  SetSelectedCollections = 'selectedCollections/SET_SELECTED_COLLECTIONS',
  RemoveCollection = 'selectedCollections/REMOVE_COLLECTIONS',
  AddCollection = 'selectedCollections/ADD_COLLECTION',
  ResetSelectedCollections = 'selectedCollections/RESET_SELECTED_COLLECTIONS',
}
interface RemoveCollectionAction {
  type: SelectedCollectionsActions.RemoveCollection;
  payload: {
    collectionInfo: Collection;
  };
}
interface AddCollectionAction {
  type: SelectedCollectionsActions.AddCollection;
  payload: {
    collectionInfo: Collection;
  };
}
interface ResetSelectedCollectionsAction {
  type: SelectedCollectionsActions.ResetSelectedCollections;
}

export const SelectedCollectionsReducer = (
  state = DEFAULT_SELECTED_COLLECTIONS_STATE,
  action:
    | RemoveCollectionAction
    | AddCollectionAction
    | ResetSelectedCollectionsAction
): SelectedCollectionsState => {
  switch (action.type) {
    case SelectedCollectionsActions.AddCollection:
      if (
        state.selectedCollections?.some(
          (excerpt) => excerpt.id === action.payload.collectionInfo.id
        )
      ) {
        return state;
      }

      return {
        selectedCollections: [
          ...(state.selectedCollections ?? []),
          action.payload.collectionInfo,
        ],
      };

    case SelectedCollectionsActions.RemoveCollection:
      return {
        selectedCollections:
          state.selectedCollections?.filter(
            (collection) => collection.id !== action.payload.collectionInfo.id
          ) ?? [],
      };

    case SelectedCollectionsActions.ResetSelectedCollections:
      return { ...state, selectedCollections: null };
    default:
      return state;
  }
};
