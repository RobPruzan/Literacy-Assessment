import { Link } from 'react-router-dom';
import { RootState } from '../../../redux/store';
import { motion } from 'framer-motion';
import { useCompareExcerpts } from '../../hooks/CalculationHooks/useCompareExcerpts';
import { useSelector } from 'react-redux';

const CompareActions = () => {
  const selectedCollections = useSelector(
    ({ selectedCollectionState }: RootState) =>
      selectedCollectionState.selectedCollections
  );
  const { attemptError, handleCompare, sequentialComparisonHelpers } =
    useCompareExcerpts();

  return (
    <div className="w-full">
      {attemptError && <p className="text-red-500">Error: {attemptError}</p>}
      {sequentialComparisonHelpers.difficultyHelper.isLoading && (
        <p className="text-gray-500">Loading...</p>
      )}
      <Link to="/analysis">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1 }}
          onClick={handleCompare}
          className="rounded bg-custom-blood-red w-full text-white p-2  sm:text-base  text-sm "
        >
          Compare
        </motion.button>
      </Link>

      {sequentialComparisonHelpers.difficultyHelper.data?.map((calc, idx) => (
        <p className="text-gray-500" key={`diff map ${idx}`}>
          Difficulty: {calc}
        </p>
      ))}
    </div>
  );
};

export default CompareActions;
