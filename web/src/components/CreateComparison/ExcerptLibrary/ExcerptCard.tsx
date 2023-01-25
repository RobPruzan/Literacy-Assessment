import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { BsX } from 'react-icons/bs';
import StatsCard from '../../InfoCardBar.tsx/StatsCard';
import { motion } from 'framer-motion';
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
        layout
        style={{
          minWidth: '16rem',
          border: '1px solid',
        }}
        className=" bg-white py-1  text-custom-blood-red font-semibold rounded-sm mx-2 min-h-min shadow-md border-custom-blood-red hover:shadow-lg flex justify-center items-center relative "
      >
        <div className="flex flex-col w-full items-center h-fit">
          <div className="m-1 text-md  flex justify-center">
            <div className="m-auto text-gray-500">{title}</div>
            <div>
              {isMinimal ? (
                <BsX
                  color="red"
                  size={30}
                  className="cursor-pointer hover:fill-red-700 hover:scale-110  absolute top-0 right-0  fill-red-500 "
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
