import {
  CalculationStats,
  DifficultyCalculation,
  DiversityCalculation,
  GrammarCalculation,
  ReadabilityMeasures,
  SlidingWindowStatsCalculation,
} from '../../services.ts/connections';

export type CreateTypeWithAddition<Original, Addition> = Original & Addition;

export type CollectionCalculationInfo = {
  collectionId: number;
};

export type CollectionCalculationState = {
  stats:
    | CreateTypeWithAddition<CalculationStats, CollectionCalculationInfo>[]
    | null;
};

export const DEFAULT_COLLECTION_CALCULATION_STATE: CollectionCalculationState =
  {
    stats: null,
  };

export enum CollectionCollectionActions {
  UpdateCollectionDifficulty = 'collectionCollection/UPDATE_COLLECTION_DIFFICULTY',
  UpdateCollectionDiversity = 'collectionCollection/UPDATE_COLLECTION_DIVERSITY',
  UpdateCollectionGrammar = 'collectionCollection/UPDATE_COLLECTION_GRAMMAR',
  UpdateCollectionReadabilityMeasures = 'collectionCollection/UPDATE_COLLECTION_READABILITY_MEASURES',
  UpdateCollectionSlidingWindowStats = 'collectionCollection/UPDATE_COLLECTION_SLIDING_WINDOW_STATS',
  ClearCollectionCalculationStats = 'collectionCollection/CLEAR_COLLECTION_CALCULATION_STATS',
}

type UpdateCollectionDifficultyAction = {
  type: CollectionCollectionActions.UpdateCollectionDifficulty;
  payload: { collectionId: number; difficulty: DifficultyCalculation };
};

type UpdateCollectionDiversityAction = {
  type: CollectionCollectionActions.UpdateCollectionDiversity;
  payload: { collectionId: number; diversity: DiversityCalculation };
};

type UpdateCollectionGrammarAction = {
  type: CollectionCollectionActions.UpdateCollectionGrammar;
  payload: { collectionId: number; grammar: GrammarCalculation };
};

type UpdateCollectionReadabilityMeasuresAction = {
  type: CollectionCollectionActions.UpdateCollectionReadabilityMeasures;
  payload: { collectionId: number; readabilityMeasures: ReadabilityMeasures };
};

type UpdateCollectionSlidingWindowStatsAction = {
  type: CollectionCollectionActions.UpdateCollectionSlidingWindowStats;
  payload: {
    collectionId: number;
    slidingWindowStats: SlidingWindowStatsCalculation;
  };
};

type ClearCollectionCalculationStatsAction = {
  type: CollectionCollectionActions.ClearCollectionCalculationStats;
};

export const CollectionCalculationReducer = (
  state: CollectionCalculationState = DEFAULT_COLLECTION_CALCULATION_STATE,
  action:
    | UpdateCollectionDifficultyAction
    | UpdateCollectionDiversityAction
    | UpdateCollectionGrammarAction
    | UpdateCollectionReadabilityMeasuresAction
    | UpdateCollectionSlidingWindowStatsAction
    | ClearCollectionCalculationStatsAction
) => {
  switch (action.type) {
    case CollectionCollectionActions.UpdateCollectionDifficulty:
      return {
        ...state,
        stats: state.stats?.map((stat) => {
          if (stat.collectionId === action.payload.collectionId) {
            return {
              ...stat,
              difficulty: action.payload.difficulty,
            };
          }
          return stat;
        }),
      };

    case CollectionCollectionActions.UpdateCollectionDiversity:
      return {
        ...state,
        stats: state.stats?.map((stat) => {
          if (stat.collectionId === action.payload.collectionId) {
            return {
              ...stat,
              diversity: action.payload.diversity,
            };
          }
          return stat;
        }),
      };

    case CollectionCollectionActions.UpdateCollectionGrammar:
      return {
        ...state,
        stats: state.stats?.map((stat) => {
          if (stat.collectionId === action.payload.collectionId) {
            return {
              ...stat,
              grammar: action.payload.grammar,
            };
          }
          return stat;
        }),
      };

    case CollectionCollectionActions.UpdateCollectionReadabilityMeasures:
      return {
        ...state,
        stats: state.stats?.map((stat) => {
          if (stat.collectionId === action.payload.collectionId) {
            return {
              ...stat,
              readabilityMeasures: action.payload.readabilityMeasures,
            };
          }
          return stat;
        }),
      };

    case CollectionCollectionActions.UpdateCollectionSlidingWindowStats:
      return {
        ...state,
        stats: state.stats?.map((stat) => {
          if (stat.collectionId === action.payload.collectionId) {
            return {
              ...stat,
              slidingWindowStats: action.payload.slidingWindowStats,
            };
          }
          return stat;
        }),
      };

    case CollectionCollectionActions.ClearCollectionCalculationStats:
      return {
        ...state,
        stats: null,
      };

    default:
      return state;
  }
};
export {};

// implement collection calculation
// You are going to give the mutation an option on success handler, just a void function, any function, or generic function
// On success we will dispatch here, it will have information about the collection, and its respective stats
// Strongly utilize the typescript types created for excerptCalculation

// when we actually use this dispatch and the mutations, we will foreach through the collections
// each iteration we will have all the mutations which contain all the calculations for for each excerpt
// we also pass the dispatch, so when they complete they will be stored in redux
// shape of what it might look like

// function difficultyHandler{
// dispatch({
// payload{...},
// type:{...}
// })
// }

// [[1,2,3], [4,5,6]].foreach((collection) => {
// difficulty.mutate(collection.excerpt_ids,difficultyHandler) -> onsuccess stuff inside the mutate which do the dispatching
// diversity.mutate(collection.excerpt_ids, diversityHandler)
// ...
// })

// By design, each specific stat will return at the same time for its collection ("collection 1" has 5 excerpts, the difficulty would all load at the same time for it)
// That means each diagram will load in at the same time for the comparisons
