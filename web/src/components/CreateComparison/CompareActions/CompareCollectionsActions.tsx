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
        className="rounded bg-custom-blood-red w-full text-white p-2  sm:text-base  text-sm "
      >
        Compare
      </motion.button>
      {/* </Link> */}
    </div>
  );
};

export default CompareCollectionsActions;
