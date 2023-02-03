import { AnyAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { UseMutateFunction } from 'react-query';
import {
  CreateTypeWithAddition,
  CollectionCalculationInfo,
  CollectionCollectionActions,
} from '../../../redux/reducers/collectionCalculation';
import { CalculationActions } from '../../../redux/reducers/excerptCalculation';
import { CalculationStats } from '../../../services.ts/connections';
import { SequentialComparisonHelpersParams } from './useSequentialComparison';

export default function compareExcerptsHelper<
  CalculationData extends CalculationStats[keyof CalculationStats],
  MutateFunction extends UseMutateFunction<
    CalculationData,
    unknown,
    SequentialComparisonHelpersParams,
    unknown
  >,
  UpdateKey extends keyof CreateTypeWithAddition<
    Partial<CalculationStats>,
    CollectionCalculationInfo
  >
>({
  mutateFunction,
  updateKey,
  updateType,
  excerptIds,
  collectionId,
  dispatch,
}: {
  mutateFunction: MutateFunction;
  updateKey: UpdateKey;
  updateType: CollectionCollectionActions | CalculationActions;
  excerptIds: number[];
  collectionId?: number;
  dispatch: Dispatch<AnyAction>;
}) {
  return mutateFunction({
    excerpt_ids: excerptIds,
    successHandler: (data: CalculationData) => {
      collectionId
        ? dispatch({
            type: updateType,
            payload: {
              collectionId: collectionId,
              [updateKey]: data,
            },
          })
        : dispatch({
            type: updateType,
            payload: {
              [updateKey]: data,
            },
          });

      collectionId
        ? dispatch({
            type: CollectionCollectionActions.UpdateLoadingProgress,
            payload: { loadingProgress: 1 },
          })
        : dispatch({
            type: CalculationActions.SetLoadingProgress,
            payload: 1,
          });
    },
  });
}
