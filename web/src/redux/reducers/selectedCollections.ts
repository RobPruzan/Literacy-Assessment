import { CollectionCreateInfo } from '../../services.ts/connections';

export type SelectedCollection = {
  id: number;
  title: string;
  collections: CollectionCreateInfo[];
};

export interface SelectedCollectionsState {
  selectedCollections: SelectedCollection[] | null;
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
    | RemoveCollectionAction
    | AddCollectionAction
    | ResetSelectedCollectionsAction
) => {
  switch (action.type) {
    // case SelectedCollectionsActions.SetSelectedCollections:
    //   return {
    //     ...state,
    //     selectedCollections: [
    //       action.payload.selectedCollections,
    //       state.selectedCollections,
    //     ],
    //   };

    case SelectedCollectionsActions.AddCollection:
      // console.log('incoming add collection action', action.payload);
      // if (
      //   state.selectedCollections?.some(
      //     (excerpt) => excerpt.id === action.payload.collectionInfo.id
      //   )
      // ) {
      //   return state;
      // } else {
      //   return {
      //     ...state,
      //     selectedCollections: [
      //       ...(state.selectedCollections ?? []),
      //       action.payload.collectionInfo,
      //     ],
      //   };
      // }
      console.log(
        'incoming add collection action and curr state',
        state.selectedCollections,
        action.payload.collectionInfo
      );
      return {
        ...state,
        selectedCollections: [
          ...(state.selectedCollections ?? []),
          action.payload.collectionInfo,
        ],
      };

    case SelectedCollectionsActions.ResetSelectedCollections:
      return { ...state, selectedCollections: null };
    default:
      return state;
  }
};
