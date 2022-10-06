import { makeStyles } from '@mui/styles';
import { Container, CardMedia } from '@mui/material/';
import { Box } from '@mui/system';
import { Link, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: 10,
    position: 'sticky',
    top: 0,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#dedede',
    margin: 3,
    '&:hover': {
      color: 'white',
      background: '#f44336',
    },
    cursor: 'pointer',
    color: 'black',
  },
  itemActive: {
    display: 'flex',
    alignItems: 'center',
    padding: 5,
    color: 'white !important',
    backgroundColor: '#f44336',
    margin: 3,
  },
  text: {
    marginLeft: '1rem',
    fontSize: '1rem',
    marginTop: '1rem',
    display: 'flex',
    fontWeight: 'bold',
  },
  intro: {
    marginLeft: '0.5rem',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    display: 'flex',
    padding: 10,
    color: theme.palette.secondary.main,
  },
}));

const Leftbar = () => {
  const { pathname } = useLocation();
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Box
        sx={{
          width: 200,
          height: 200,
        }}
      >
        <CardMedia component="img" alt="logo" />
      </Box>
      <div>
        <p className={classes.intro}>Online Asset Management</p>
      </div>

      {localStorage.getItem('token') ? (
        <Link
          to="/"
          className={pathname === '/' ? classes.itemActive : classes.item}
        >
          <div>
            <p className={classes.text}>Home</p>
          </div>
        </Link>
      ) : (
        <></>
      )}

      {localStorage.getItem('role') === 'Admin' ? (
        <Link
          to="/user-list"
          className={
            pathname.includes('/user-list') ? classes.itemActive : classes.item
          }
        >
          <div>
            <p className={classes.text}>Manage User</p>
          </div>
        </Link>
      ) : (
        <></>
      )}

      {localStorage.getItem('role') === 'Admin' ? (
        <Link
          to="/asset-list"
          className={
            pathname.includes('/asset-list') ? classes.itemActive : classes.item
          }
        >
          <div>
            <p className={classes.text}>Manage Asset</p>
          </div>
        </Link>
      ) : (
        <></>
      )}

      {localStorage.getItem('role') === 'Admin' ? (
        <Link
          to="/assignment-list"
          className={
            pathname.includes('/assignment-list')
              ? classes.itemActive
              : classes.item
          }
        >
          <div>
            <p className={classes.text}>Manage Assignment</p>
          </div>
        </Link>
      ) : (
        <></>
      )}

      {localStorage.getItem('role') === 'Admin' ? (
        <Link
          to="/report"
          className={
            pathname.includes('/report') ? classes.itemActive : classes.item
          }
        >
          <div>
            <p className={classes.text}>Report</p>
          </div>
        </Link>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Leftbar;
