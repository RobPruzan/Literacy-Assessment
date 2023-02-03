import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const CompareExcerptsActions = () => {
  const selectedCollections = useSelector(
    ({ selectedCollectionState }: RootState) =>
      selectedCollectionState.selectedCollections
  );
  // const {
  //   attemptError,
  //   handleCompareExcerpts: handleCompare,
  //   sequentialComparisonHelpers,
  // } = useCompareExcerpts();

  return (
    <div className="w-full">
      {/* {attemptError && <p className="text-red-500">Error: {attemptError}</p>}
      {sequentialComparisonHelpers.difficultyHelper.isLoading && (
        <p className="text-gray-500">Loading...</p>
      )}
      <Link to="/analysis">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1 }}
          onClick={handleCompare}
          className="w-full rounded bg-custom-blood-red p-2 text-sm  text-white  sm:text-base "
        >
          Compare
        </motion.button>
      </Link>

      {sequentialComparisonHelpers.difficultyHelper.data?.map((calc, idx) => (
        <p className="text-gray-500" key={`${calc}`}>
          Difficulty: {calc}
        </p>
      ))} */}
      aa
    </div>
  );
};

export default CompareExcerptsActions;
