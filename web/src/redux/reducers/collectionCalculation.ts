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
  // Partial because stats will load in at different times
  stats:
    | CreateTypeWithAddition<
        Partial<CalculationStats>,
        CollectionCalculationInfo
      >[]
    | null;
  loadingProgress: number;
};

export const DEFAULT_COLLECTION_CALCULATION_STATE: CollectionCalculationState =
  {
    stats: null,
    loadingProgress: 0,
  };

export enum CollectionCollectionActions {
  UpdateCollectionDifficulty = 'collectionCollection/UPDATE_COLLECTION_DIFFICULTY',
  UpdateCollectionDiversity = 'collectionCollection/UPDATE_COLLECTION_DIVERSITY',
  UpdateCollectionGrammar = 'collectionCollection/UPDATE_COLLECTION_GRAMMAR',
  UpdateCollectionReadabilityMeasures = 'collectionCollection/UPDATE_COLLECTION_READABILITY_MEASURES',
  UpdateCollectionSlidingWindowStats = 'collectionCollection/UPDATE_COLLECTION_SLIDING_WINDOW_STATS',
  UpdateLoadingProgress = 'collectionCollection/UPDATE_LOADING_PROGRESS',
  ClearCollectionCalculationStats = 'collectionCollection/CLEAR_COLLECTION_CALCULATION_STATS',
}

type WithRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

type UpdateCollectionPayload<CalculationType extends keyof CalculationStats> =
  Pick<CalculationStats, CalculationType> & CollectionCalculationInfo;

type UpdateCollectionDifficultyAction = {
  type: CollectionCollectionActions.UpdateCollectionDifficulty;
  payload: UpdateCollectionPayload<'difficulty'>;
};

type UpdateCollectionDiversityAction = {
  type: CollectionCollectionActions.UpdateCollectionDiversity;
  payload: UpdateCollectionPayload<'diversity'>;
};

type UpdateCollectionGrammarAction = {
  type: CollectionCollectionActions.UpdateCollectionGrammar;
  payload: UpdateCollectionPayload<'grammar'>;
};

type UpdateCollectionReadabilityMeasuresAction = {
  type: CollectionCollectionActions.UpdateCollectionReadabilityMeasures;
  payload: UpdateCollectionPayload<'readability_measures'>;
};

type UpdateCollectionSlidingWindowStatsAction = {
  type: CollectionCollectionActions.UpdateCollectionSlidingWindowStats;
  payload: UpdateCollectionPayload<'sliding_window_stats'>;
};

export type CollectionLoadingProgressPayload = {
  loadingProgress: number;
};

type UpdateLoadingProgressAction = {
  type: CollectionCollectionActions.UpdateLoadingProgress;
  payload: CollectionLoadingProgressPayload;
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
    | UpdateLoadingProgressAction
    | ClearCollectionCalculationStatsAction
): CollectionCalculationState => {
  switch (action.type) {
    case CollectionCollectionActions.UpdateCollectionDifficulty:
      return {
        ...state,
        // this is stupid because we aren't adding to the list, we are just changing what currently exists ;(
        //   stats: state.stats?.map((iter) => {
        //     if (iter.collectionId === action.payload.collectionId) {
        //       return { ...iter, difficulty: action.payload.difficulty };
        //     } else {
        //       return {
        //         difficulty: action.payload.difficulty,
        //         collectionId: action.payload.collectionId,
        //       };
        //     }
        //   }) ?? [
        //     {
        //       ...(state.stats ?? []),
        //       difficulty: action.payload.difficulty,
        //       collectionId: action.payload.collectionId,
        //     },
        //   ],
        // };
        stats: state.stats?.some(
          (iter) => iter.collectionId === action.payload.collectionId
        )
          ? state.stats?.map((iter) => {
              if (iter.collectionId === action.payload.collectionId) {
                return { ...iter, difficulty: action.payload.difficulty };
              } else {
                return iter;
              }
            })
          : [
              ...(state.stats ?? []),
              {
                difficulty: action.payload.difficulty,
                collectionId: action.payload.collectionId,
              },
            ],
      };

    case CollectionCollectionActions.UpdateCollectionDiversity:
      return {
        ...state,
        stats: state.stats?.some(
          (iter) => iter.collectionId === action.payload.collectionId
        )
          ? state.stats?.map((iter) => {
              if (iter.collectionId === action.payload.collectionId) {
                return { ...iter, diversity: action.payload.diversity };
              } else {
                return iter;
              }
            })
          : [
              ...(state.stats ?? []),
              {
                diversity: action.payload.diversity,
                collectionId: action.payload.collectionId,
              },
            ],
      };

    case CollectionCollectionActions.UpdateCollectionGrammar:
      return {
        ...state,

        stats: state.stats?.some(
          (iter) => iter.collectionId === action.payload.collectionId
        )
          ? state.stats?.map((iter) => {
              if (iter.collectionId === action.payload.collectionId) {
                return { ...iter, grammar: action.payload.grammar };
              } else {
                return iter;
              }
            })
          : [
              ...(state.stats ?? []),
              {
                grammar: action.payload.grammar,
                collectionId: action.payload.collectionId,
              },
            ],
      };

    case CollectionCollectionActions.UpdateCollectionReadabilityMeasures:
      return {
        ...state,
        stats: state.stats?.some(
          (iter) => iter.collectionId === action.payload.collectionId
        )
          ? state.stats?.map((iter) => {
              if (iter.collectionId === action.payload.collectionId) {
                return {
                  ...iter,
                  readability_measures: action.payload.readability_measures,
                };
              } else {
                return iter;
              }
            })
          : [
              ...(state.stats ?? []),
              {
                readability_measures: action.payload.readability_measures,
                collectionId: action.payload.collectionId,
              },
            ],
      };

    case CollectionCollectionActions.UpdateCollectionSlidingWindowStats:
      return {
        ...state,
        stats: state.stats?.some(
          (iter) => iter.collectionId === action.payload.collectionId
        )
          ? state.stats?.map((iter) => {
              if (iter.collectionId === action.payload.collectionId) {
                return {
                  ...iter,
                  sliding_window_stats: action.payload.sliding_window_stats,
                };
              } else {
                return iter;
              }
            })
          : [
              ...(state.stats ?? []),
              {
                sliding_window_stats: action.payload.sliding_window_stats,
                collectionId: action.payload.collectionId,
              },
            ],
      };

    // case CollectionCollectionActions.UpdateCollectionDiversity:
    //   return {
    //     ...state,
    //     stats: state.stats?.map((iter) => {
    //       if (iter.collectionId === action.payload.collectionId) {
    //         return { ...iter, diversity: action.payload.diversity };
    //       } else {
    //         return {
    //           diversity: action.payload.diversity,
    //           collectionId: action.payload.collectionId,
    //         };
    //       }
    //     }) ?? [
    //       {
    //         ...(state.stats ?? []),
    //         diversity: action.payload.diversity,
    //         collectionId: action.payload.collectionId,
    //       },
    //     ],
    //   };

    // case CollectionCollectionActions.UpdateCollectionGrammar:
    //   return {
    //     ...state,
    //     stats: state.stats?.map((iter) => {
    //       if (iter.collectionId === action.payload.collectionId) {
    //         return { ...iter, grammar: action.payload.grammar };
    //       } else {
    //         return {
    //           grammar: action.payload.grammar,
    //           collectionId: action.payload.collectionId,
    //         };
    //       }
    //     }) ?? [
    //       {
    //         ...(state.stats ?? []),
    //         grammar: action.payload.grammar,
    //         collectionId: action.payload.collectionId,
    //       },
    //     ],
    //   };

    // case CollectionCollectionActions.UpdateCollectionReadabilityMeasures:
    //   return {
    //     ...state,
    //     stats: state.stats?.map((iter) => {
    //       if (iter.collectionId === action.payload.collectionId) {
    //         return {
    //           ...iter,
    //           readabilityMeasures: action.payload.readabilityMeasures,
    //         };
    //       } else {
    //         return {
    //           readabilityMeasures: action.payload.readabilityMeasures,
    //           collectionId: action.payload.collectionId,
    //         };
    //       }
    //     }) ?? [
    //       {
    //         readabilityMeasures: action.payload.readabilityMeasures,
    //         collectionId: action.payload.collectionId,
    //       },
    //     ],
    //   };

    // case CollectionCollectionActions.UpdateCollectionSlidingWindowStats:
    //   return {
    //     ...state,
    //     stats: state.stats?.map((iter) => {
    //       if (iter.collectionId === action.payload.collectionId) {
    //         return {
    //           ...iter,
    //           slidingWindowStats: action.payload.slidingWindowStats,
    //         };
    //       } else {
    //         return {
    //           slidingWindowStats: action.payload.slidingWindowStats,
    //           collectionId: action.payload.collectionId,
    //         };
    //       }
    //     }) ?? [
    //       {
    //         ...(state.stats ?? []),
    //         slidingWindowStats: action.payload.slidingWindowStats,
    //         collectionId: action.payload.collectionId,
    //       },
    //     ],
    //   };

    // [
    //   {...(state.stats ?? []),
    //     grammar: action.payload.grammar,
    //     collectionId: action.payload.collectionId,
    //   },
    // ],

    // return {
    //   ...state,
    //   // stats: state.stats?.map((stat) => {
    //   //   if (stat.collectionId === action.payload.collectionId) {
    //   //     return {
    //   //       ...stat,
    //   //       difficulty: action.payload.difficulty,
    //   //     };
    //   //   }
    //   //   return stat;
    //   // }) ?? [action.payload.difficulty],
    //   stats: state.stats?.map((stat) => {
    //     if (stat.collectionId === action.payload.collectionId) {
    //       return {
    //         ...stat,
    //         difficulty: action.payload.difficulty,
    //       };
    //     }
    //     return stat;
    //   }) ?? [
    //     {
    //       ...action.payload.difficulty,
    //       collectionId: action.payload.collectionId,
    //     },
    //   ],
    // };

    // case CollectionCollectionActions.UpdateCollectionDiversity:
    //   console.log(
    //     'CollectionCollectionActions.UpdateCollectionDiversity',
    //     action.payload,
    //     state
    //   );
    //   return {
    //     ...state,
    //     // stats: state.stats?.map((stat) => {
    //     //   if (stat.collectionId === action.payload.collectionId) {
    //     //     return {
    //     //       ...stat,
    //     //       diversity: action.payload.diversity,
    //     //     };
    //     //   }
    //     //   return stat;
    //     // }) ?? [action.payload],
    //     stats: state.stats?.map((stat) => {
    //       if (stat.collectionId === action.payload.collectionId) {
    //         return {
    //           ...stat,
    //           diversity: action.payload.diversity,
    //         };
    //       }
    //       return stat;
    //     }) ?? [
    //       {
    //         ...action.payload.diversity,
    //         collectionId: action.payload.collectionId,
    //       },
    //     ],
    //   };

    // case CollectionCollectionActions.UpdateCollectionGrammar:
    //   console.log(
    //     'CollectionCollectionActions.UpdateCollectionGrammar',
    //     action.payload,
    //     state
    //   );
    //   return {
    //     ...state,
    //     // stats: state.stats?.map((stat) => {
    //     //   if (stat.collectionId === action.payload.collectionId) {
    //     //     return {
    //     //       ...stat,
    //     //       grammar: action.payload.grammar,
    //     //     };
    //     //   }
    //     //   return stat;
    //     // }) ?? [action.payload],
    //     stats: state.stats?.map((stat) => {
    //       if (stat.collectionId === action.payload.collectionId) {
    //         return {
    //           ...stat,
    //           grammar: action.payload.grammar,
    //         };
    //       }
    //       return stat;
    //     }) ?? [
    //       {
    //         ...action.payload.grammar,
    //         collectionId: action.payload.collectionId,
    //       },
    //     ],
    //   };

    // case CollectionCollectionActions.UpdateCollectionReadabilityMeasures:
    //   console.log(
    //     'CollectionCollectionActions.UpdateCollectionReadabilityMeasures',
    //     action.payload,
    //     state
    //   );
    //   return {
    //     ...state,
    //     // stats: state.stats?.map((stat) => {
    //     //   if (stat.collectionId === action.payload.collectionId) {
    //     //     return {
    //     //       ...stat,
    //     //       readabilityMeasures: action.payload.readabilityMeasures,
    //     //     };
    //     //   }
    //     //   return stat;
    //     // }) ?? [action.payload],
    //     stats: state.stats?.map((stat) => {
    //       if (stat.collectionId === action.payload.collectionId) {
    //         return {
    //           ...stat,
    //           readabilityMeasures: action.payload.readabilityMeasures,
    //         };
    //       }
    //       return stat;
    //     }) ?? [
    //       {
    //         ...action.payload.readabilityMeasures,
    //         collectionId: action.payload.collectionId,
    //       },
    //     ],
    //   };

    // case CollectionCollectionActions.UpdateCollectionSlidingWindowStats:
    //   console.log(
    //     'CollectionCollectionActions.UpdateCollectionSlidingWindowStats',
    //     action.payload,
    //     state
    //   );
    //   return {
    //     ...state,
    //     // stats: state.stats?.map((stat) => {
    //     //   if (stat.collectionId === action.payload.collectionId) {
    //     //     return {
    //     //       ...stat,
    //     //       slidingWindowStats: action.payload.slidingWindowStats,
    //     //     };
    //     //   }
    //     //   return stat;
    //     // }) ?? [action.payload],
    //     stats: state.stats?.map((stat) => {
    //       if (stat.collectionId === action.payload.collectionId) {
    //         return {
    //           ...stat,
    //           slidingWindowStats: action.payload.slidingWindowStats,
    //         };
    //       }
    //       return stat;
    //     }) ?? [
    //       {
    //         ...action.payload.slidingWindowStats,
    //         collectionId: action.payload.collectionId,
    //       },
    //     ],
    //   };

    case CollectionCollectionActions.UpdateLoadingProgress:
      return {
        ...state,
        loadingProgress: action.payload.loadingProgress + state.loadingProgress,
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
