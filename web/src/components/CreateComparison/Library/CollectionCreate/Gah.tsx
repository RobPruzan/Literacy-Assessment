// import * as React from 'react';

// import Menu, { MenuProps } from '@mui/material/Menu';
// import { alpha, styled } from '@mui/material/styles';

// import { ExcerptCard } from '../ExcerptCard';
// import { ExcerptInfo } from '../../../../services.ts/connections';
// import { FcSearch } from 'react-icons/fc';
// import { HighlightOff } from '@mui/icons-material';
// import { SearchBar } from '../SearchBar';

// const StyledMenu = styled((props: MenuProps) => (
//   <Menu
//     elevation={0}
//     anchorOrigin={{
//       vertical: 'bottom',
//       horizontal: 'right',
//     }}
//     transformOrigin={{
//       vertical: 'top',
//       horizontal: 'right',
//     }}
//     {...props}
//   />
// ))(({ theme }) => ({
//   '& .MuiPaper-root': {
//     borderRadius: 6,
//     marginTop: theme.spacing(1),
//     minWidth: 180,
//     color:
//       theme.palette.mode === 'light'
//         ? 'rgb(55, 65, 81)'
//         : theme.palette.grey[300],
//     boxShadow:
//       'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
//     '& .MuiMenu-list': {
//       padding: '4px 0',
//     },
//     '& .MuiMenuItem-root': {
//       '& .MuiSvgIcon-root': {
//         fontSize: 18,
//         color: theme.palette.text.secondary,
//         marginRight: theme.spacing(1.5),
//       },
//       '&:active': {
//         backgroundColor: alpha(
//           theme.palette.primary.main,
//           theme.palette.action.selectedOpacity
//         ),
//       },
//     },
//   },
// }));
// const CustomizedMenus = ({
//   activePopUp,
//   setActivePopUp,
//   collectionId,
//   excerptsInfo,
// }: Props) => {
//   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div>
//       <button
//         id="demo-customized-button"
//         aria-controls={open ? 'demo-customized-menu' : undefined}
//         aria-haspopup="true"
//         aria-expanded={open ? 'true' : undefined}
//         onClick={handleClick}
//       >
//         {!(activePopUp === collectionId) && (
//           <FcSearch
//             size={27}
//             className="  transition duration-300 ease-in-out hover:scale-125 hover:fill-slate-500 hover:shadow-2xl float-left"
//             onClick={() => setActivePopUp(collectionId)}
//           />
//         )}
//       </button>
//       {/* <div
//         className={`
//       ${open ? 'block' : 'hidden'}`}
//       >
//         <div className="   bg-white flex justify-center shadow-lg rounded-sm sm:p-4 h-96 p-0  min-w-fit max-w-full  w-72 overflow-y-auto border-2 border-custom-blood-red ">
//           <div className="flex flex-col">
//             <HighlightOff
//               sx={{ fill: 'red' }}
//               className="hover:cursor-pointer hover:scale-110 hover:fill-red-700 float-left mb-2 overflow-x-auto"
//               onClick={() => {
//                 collectionId === activePopUp && setActivePopUp(-1);
//               }}
//             />
//             <SearchBar />

//             {excerptsInfo?.map((excerptInfo) => (
//               <div className="flex justify-center mb-3">
//                 {collectionId === excerptInfo.excerpt.collection.id && (
//                   <ExcerptCard
//                     difficulty={excerptInfo.difficulty}
//                     diversity={excerptInfo.diversity}
//                     text_length={excerptInfo.text_length}
//                     title={excerptInfo.excerpt.title}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div> */}
//       <StyledMenu
//         id="demo-customized-menu"
//         MenuListProps={{
//           'aria-labelledby': 'demo-customized-button',
//         }}
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//       >
//         <div className="   bg-white flex justify-center shadow-lg rounded-sm sm:p-4 h-96 p-0  min-w-fit max-w-full  w-72 overflow-y-auto border-2 border-custom-blood-red ">
//           <div className="flex flex-col">
//             <HighlightOff
//               sx={{ fill: 'red' }}
//               className="hover:cursor-pointer hover:scale-110 hover:fill-red-700 float-left mb-2 overflow-x-auto"
//               onClick={() => {
//                 collectionId === activePopUp && setActivePopUp(-1);
//               }}
//             />
//             <SearchBar />

// {excerptsInfo?.map((excerptInfo) => (
//   <div className="flex justify-center mb-3">
//     {collectionId === excerptInfo.excerpt.collection.id && (
//       <ExcerptCard
//         difficulty={excerptInfo.difficulty}
//         diversity={excerptInfo.diversity}
//         text_length={excerptInfo.text_length}
//         title={excerptInfo.excerpt.title}
//       />
//     )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </StyledMenu>
//     </div>
//   );
// };

import * as React from 'react';

import Menu, { MenuProps } from '@mui/material/Menu';
import { alpha, styled } from '@mui/material/styles';

import { ExcerptCard } from '../ExcerptCard';
import { ExcerptInfo } from '../../../../services.ts/connections';
// export default CustomizedMenus;
import { FcSearch } from 'react-icons/fc';
import { SearchBar } from '../SearchBar';

type Props = {
  activePopUp: number;
  setActivePopUp: React.Dispatch<React.SetStateAction<number>>;
  collectionId: number;
  excerptsInfo: ExcerptInfo[];
};

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export const NO_ACTIVE_POPUP = -1;

export default function CustomizedMenus({
  activePopUp,
  collectionId,
  excerptsInfo,
  setActivePopUp,
}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setActivePopUp(collectionId);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setActivePopUp(NO_ACTIVE_POPUP);
  };

  return (
    <>
      <button
        className=" float-left transition duration-300 ease-in-out hover:scale-125 hover:fill-slate-500 hover:shadow-2xl "
        onClick={handleClick}
      >
        <FcSearch size={27} />
      </button>
      <div
        className={`${
          open ? 'block' : 'hidden'
        }  w-full flex justify-start h-full`}
      >
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <div className="flex justify-center items-start mb-3 h-96 flex-col">
            {excerptsInfo.length > 0 ? (
              excerptsInfo.map(
                (excerptInfo) =>
                  collectionId === excerptInfo.excerpt.collection.id && (
                    <>
                      <SearchBar />
                      <ExcerptCard
                        difficulty={excerptInfo.difficulty}
                        diversity={excerptInfo.diversity}
                        text_length={excerptInfo.text_length}
                        title={excerptInfo.excerpt.title}
                      />
                    </>
                  )
              )
            ) : (
              <p
                className="text-center text-xl text-gray-600  w-36
              "
              >
                No excerpts found
              </p>
            )}
          </div>
        </StyledMenu>
      </div>
    </>
  );
}
