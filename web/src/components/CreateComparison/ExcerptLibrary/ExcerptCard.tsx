import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { BsX } from 'react-icons/bs';
import { ExcerptInfo } from '../../../services.ts/connections';
// import mui button
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { IoRemoveSharp } from 'react-icons/io5';
import { SelectedExcerptsActions } from '../../../redux/reducers/selectedExcerpts';
import StatsCard from '../../InfoCardBar.tsx/StatsCard';
import { useDispatch } from 'react-redux';

export type ExcerptCardProps = {
  excerptInfo: ExcerptInfo;
  allowDelete?: boolean;
  sizeMultiplier?: number;
  isMinimal?: boolean;
};
export const ExcerptCard = ({
  excerptInfo,
  allowDelete,
  sizeMultiplier = 1,
  isMinimal = false,
}: ExcerptCardProps) => {
  const dispatch = useDispatch();

  return (
    <div
      style={{
        minWidth: '16rem',
        border: '1px solid',
      }}
      className=" bg-white py-1 text-custom-blood-red font-semibold rounded-sm mx-2 min-h-min shadow-md border-custom-blood-red hover:shadow-lg flex justify-center items-center relative "
    >
      <div className="flex flex-col w-full items-center ">
        <div className="m-1 text-md  flex justify-center">
          <div className="m-auto text-gray-500">
            {excerptInfo.excerpt.title}
          </div>
          <div>
            {isMinimal ? (
              <BsX
                color="red"
                size={30}
                className="cursor-pointer hover:fill-red-700 hover:scale-110  absolute top-0 right-0  fill-red-500 "
                fontSize="medium"
                onClick={() =>
                  dispatch({
                    type: SelectedExcerptsActions.RemoveExcerpt,
                    payload: { excerptInfo: excerptInfo },
                  })
                }
              />
            ) : (
              <AddCircleOutlineIcon
                className="hover:cursor-pointer  hover:fill-green-500"
                sx={{ fill: '#4EFF10' }}
                onClick={() =>
                  dispatch({
                    type: SelectedExcerptsActions.AddExcerpt,
                    payload: { excerptInfo: excerptInfo },
                  })
                }
              />
            )}
          </div>
        </div>
        <StatsCard excerptInfo={excerptInfo} />
      </div>
    </div>
  );
};
