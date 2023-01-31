import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export const MainNavbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {'<logo>'}
          </Typography>
          <div className="Nav__right">
            <Link className="Nav__link mx-2" to="/Analysis">
              Analysis
            </Link>

            <Link className="Nav__link mx-2" to="/">
              About
            </Link>

            <Link className="Nav__link mx-2" to="/">
              Progress
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
