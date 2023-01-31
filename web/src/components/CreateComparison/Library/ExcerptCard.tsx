import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { motion } from 'framer-motion';
import { BsX } from 'react-icons/bs';
import StatsCard from '../../InfoCardBar.tsx/StatsCard';
// import mui button
import { useDispatch } from 'react-redux';

export type ExcerptCardProps = {
  // excerptInfo: ExcerptInfo;
  difficulty?: number;
  diversity?: number;
  text_length: number;
  title: string;
  allowDelete?: boolean;
  sizeMultiplier?: number;
  isMinimal?: boolean;
};
export const ExcerptCard = ({
  title,
  difficulty,

  diversity,
  text_length,

  allowDelete,
  sizeMultiplier = 1,
  isMinimal = false,
}: ExcerptCardProps) => {
  const dispatch = useDispatch();

  return (
    <div className="h-full">
      <motion.div
        // drag
        // dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        // dragElastic={0.1}
        // dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}

        layout
        style={{
          minWidth: '16rem',
          border: '1px solid',
        }}
        className=" relative mx-2  flex min-h-min items-center justify-center rounded-sm border-custom-blood-red bg-white py-1 font-semibold text-custom-blood-red shadow-md hover:shadow-lg "
      >
        <div className="flex h-fit w-full flex-col items-center">
          <div className="text-md m-1  flex justify-center">
            <div className="m-auto text-gray-500">{title}</div>
            <div>
              {isMinimal ? (
                <BsX
                  color="red"
                  size={30}
                  className="absolute top-0 right-0  cursor-pointer fill-red-500 hover:scale-110  hover:fill-red-700 "
                  fontSize="medium"
                  // onClick={() =>
                  //   dispatch({
                  //     type: SelectedExcerptsActions.RemoveExcerpt,
                  //     payload: { excerptInfo: excerptInfo },
                  //   })
                  // }
                />
              ) : (
                <AddCircleOutlineIcon
                  className="hover:cursor-pointer  hover:fill-green-500"
                  sx={{ fill: '#4EFF10' }}
                  // onClick={() =>
                  //   dispatch({
                  //     type: SelectedExcerptsActions.AddExcerpt,
                  //     payload: { excerptInfo: excerptInfo },
                  //   })
                  // }
                />
              )}
            </div>
          </div>
          <StatsCard
            difficulty={difficulty}
            diversity={diversity}
            text_length={text_length}
          />
        </div>
      </motion.div>
    </div>
  );
};
