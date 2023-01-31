import { motion } from 'framer-motion';
import useCompareCollections from '../../hooks/CalculationHooks/useCompareCollections';

type Props = {};

const CompareCollectionsActions = (props: Props) => {
  const { handleCompareCollections } = useCompareCollections();
  return (
    <div className="w-full">
      {/* <Link to="/analysis"> */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1 }}
        onClick={handleCompareCollections}
        className="w-full rounded bg-custom-blood-red p-2 text-sm  text-white  sm:text-base "
      >
        Compare
      </motion.button>
      {/* </Link> */}
    </div>
  );
};

export default CompareCollectionsActions;
