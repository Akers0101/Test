import axios from 'axios';

const login = async (userName, password) => {
  const response = await axios.post(
    `${process.env.REACT_APP_Backend_URI}/Users/Authenticate`,
    {
      userName,
      password,
    }
  );
  if (response.data.token) {
    localStorage.setItem('token', JSON.stringify(response.data));
  }
  return response.data;
};
const authService = {
  login,
};

export default authService;
