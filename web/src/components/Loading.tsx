import Spinner from 'react-bootstrap/Spinner';
import InfoCardBar from './InfoCardBar.tsx/InfoCardBar';
import { AboutNavbar } from './Navabars/AboutNavbar';

const Loading = () => {
  return (
    <div>
      <AboutNavbar color={'custom-blood-red'} />
      <div className="mt-1 border-2  border-y-slate-500 p-2">
        <InfoCardBar />
      </div>
      <div className="h-screen items-center justify-center">
        <Spinner className="m-3" animation="grow" />
        <Spinner className="m-3" animation="grow" />
        <Spinner className="m-3" animation="grow" />
        <Spinner className="m-3" animation="grow" />
      </div>
    </div>
  );
};

export default Loading;
