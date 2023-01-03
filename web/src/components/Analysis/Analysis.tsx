import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Chart } from '../Chart/Chart';
import InfoCardBar from '../InfoCardBar.tsx/InfoCardBar';
import { AboutNavbar } from '../Navabars/AboutNavbar';

export const Analysis = () => {
  // wont work until the custom hooks are made

  // const calculationStats = useSelector(
  //   ({ calculationState }: RootState) => calculationState.calculationStats
  // );

  return (
    <div>
      <AboutNavbar color={'custom-blue'} />
      <div className="mt-1 border-2  border-y-slate-500 p-2">
        <InfoCardBar />
      </div>
      {/* {calculationStats && calculationStats[0]?.plot_data && (
        <Chart data={calculationStats[0]?.plot_data} />
      )} */}
    </div>
  );
};
