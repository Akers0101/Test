// import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Popup from '../Components/Modal/Popup';
import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import '../Pages/LoginPage/login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { makeStyles } from '@mui/styles';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  TextField,
  InputAdornment,
  IconButton,
  InputLabel,
} from '@mui/material';
import axios from 'axios';
import './topbar.css';
import { useLocation } from 'react-router-dom';
import { Button } from 'antd';

function Topbar() {
  const styles = makeStyles({
    formcontrol: {
      padding: '0.375rem 0.85rem',
      fontsize: '1rem',
      fontweight: '400',
      lineheight: '1.5',
      backgroundcolor: '#fff',
      backgroundclip: 'padding-box',
      borderradius: ' 0.25rem',
    },
  });
  const token = localStorage.getItem('token');
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopupchange, setOpenPopupchange] = useState(false);
  const [openMessagePopup, setOpenMessagePopup] = useState(false);
  const username = localStorage.getItem('userName');
  const [message, setMessage] = useState();
  const [newPasswordShown, setNewPasswordShown] = useState(false);
  const [oldPasswordShown, setOldPasswordShown] = useState(false);
  const [roadSign, setRoadSign] = useState();
  const [message2, setMessage2] = useState();

  const handleClickShowPasswordold = () =>
    setOldPasswordShown(!oldPasswordShown);
  const handleMouseDownPasswordold = () =>
    setOldPasswordShown(!oldPasswordShown);
  const handleClickShowPassword = () => setNewPasswordShown(!newPasswordShown);
  const handleMouseDownPassword = () => setNewPasswordShown(!newPasswordShown);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [data, setData] = useState({
    username: username,
    oldPassword: '',
    newPassword: '',
  });
  const validate = (data) => {
    // console.log(data.newPassword, data.oldPassword)
    if (data.oldPassword === '' && data.newPassword === '') {
      return false;
    }
    return true;
  };
  useEffect(() => {
    setSubmitDisabled(
      data.oldPassword === '' || data.newPassword === '' ? true : false
    );
  }, [data.newPassword, data.oldPassword]);
  const submit = () => {
    var IsValid = validate(data);
    if (IsValid) {
      axios({
        method: 'PUT',
        url: `${process.env.REACT_APP_Backend_URI}/Users/change-password`,
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          setMessage('Your password has been changed successfully');
          setOpenPopupchange(false);
          setOpenMessagePopup(true);
        })
        .catch((err) => {
          console.error(err.response.data.message);

          setMessage('2');
          setMessage(err.response.data.message);
        });
    } else {
      console.log('somethings wrong');
    }
  };
  const handle = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  // const navigate = useNavigate();
  function onLogoutClicked() {
    localStorage.setItem('token', '');
    localStorage.setItem('role', '');
    localStorage.setItem('userName', '');
    localStorage.setItem('isFirstLogin', '');
    localStorage.setItem('location', '');
    localStorage.setItem('userId', '');

    window.location.reload();
  }
  const user = localStorage.getItem('userName');
  const classes = styles();
  let { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/') {
      setRoadSign('Home');
    } else if (pathname.includes('/user-list')) {
      setRoadSign('Manage User');
    } else if (pathname.includes('/asset-list')) {
      setRoadSign('Manage Asset');
    } else if (pathname.includes('/assignment-list')) {
      setRoadSign('Manage Assignment');
    } else if (pathname.includes('/login')) {
      setRoadSign('Login');
    } else if (pathname.includes('/report')) {
      setRoadSign('Report');
    } else {
      setRoadSign();
    }
  }, [pathname]);

  useEffect(() => {
    if (0 < data.newPassword.length && data.newPassword.length < 8) {
      setMessage('New Password should be 8-255 characters');
      return false;
    } else if (data.newPassword.length > 255) {
      setMessage('New Password should be 8-255 characters');
      return false;
    }
    if (0 < data.oldPassword.length && data.oldPassword.length < 8) {
      setMessage2('Old Password should be 8-255 characters');
      return false;
    } else if (data.oldPassword.length > 255) {
      setMessage2('Old Password should be 8-255 characters');
      return false;
    } else {
      setMessage2('');
      setMessage('');
      return true;
    }
  }, [data.newPassword, data.oldPassword]);
  return (
    <div>
      <AppBar position="static" color="error">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            {roadSign}
          </Typography>
          {!token ? (
            <></>
          ) : (
            <div>
              <Dropdown>
                Hi, {user}
                <Dropdown.Toggle
                  variant="Danger"
                  style={{ color: 'white' }}
                  id={`dropdown-split-variants-basic`}
                />
                <Dropdown.Menu variant="Danger">
                  <Dropdown.Item onClick={() => setOpenPopupchange(true)}>
                    Change Password
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setOpenPopup(true)}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Popup
        title="Are you sure?"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <div className="messageLogOut">
          <p>Do you want to Log out ?</p>
        </div>
        <Button
          type="primary"
          danger
          size={'large'}
          onClick={() => {
            setOpenPopup(false);
            onLogoutClicked();
          }}
        >
          Logout
        </Button>

        <Button
          type="primary"
          size={'large'}
          style={{ marginLeft: 50, maxWidth: '5rem' }}
          onClick={() => {
            setOpenPopup(false);
          }}
        >
          Cancel
        </Button>
      </Popup>
      <div className="App">
        <Popup
          title="Change Password !"
          openPopup={openPopupchange}
          setOpenPopup={setOpenPopupchange}
        >
          <div>
            <InputLabel htmlFor="standard-adornment-password">
              Old Password
            </InputLabel>
            <TextField
              inputProps={{ maxLength: 255 }}
              type={oldPasswordShown ? 'text' : 'password'}
              placeholder="Old Password"
              className={classes.formcontrol}
              id="title"
              name="oldPassword"
              value={data.oldPassword}
              onChange={(e) => handle(e)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPasswordold}
                      onMouseDown={handleMouseDownPasswordold}
                    >
                      {oldPasswordShown ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div style={{ color: 'red' }}>{message2}</div>
          <br />
          <div>
            <InputLabel htmlFor="standard-adornment-password">
              New Password
            </InputLabel>
            <TextField
              inputProps={{ maxLength: 255 }}
              type={newPasswordShown ? 'text' : 'password'}
              placeholder="New Password"
              id="title"
              name="newPassword"
              value={data.newPassword}
              onChange={(e) => handle(e)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {newPasswordShown ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div style={{ color: 'red' }}>{message}</div>
          <br />
          <Button
            style={{ marginRight: 50, maxWidth: '5rem' }}
            disabled={submitDisabled}
            type="primary"
            danger
            size={'large'}
            onClick={() => {
              submit();
            }}
          >
            Save
          </Button>
          <Button
            style={{ maxWidth: '5rem' }}
            type="primary"
            size={'large'}
            onClick={() => {
              setOpenPopupchange(false);
              setData({
                ...data,
                username: username,
                newPassword: '',
                oldPassword: '',
              });
            }}
          >
            Cancel
          </Button>
        </Popup>
        <Popup
          title="Message"
          openPopup={openMessagePopup}
          setOpenPopup={setOpenMessagePopup}
        >
          <div>
            {message}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button
              type="primary"
              danger
              size={'large'}
              onClick={() => {
                setOpenMessagePopup(false);
                window.location.reload();
              }}
            >
              Close
            </Button>
          </div>
        </Popup>
      </div>
    </div>
  );
}

export default Topbar;
