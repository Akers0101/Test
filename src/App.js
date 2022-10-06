import Topbar from './Layouts/TopBar';
import Leftbar from './Layouts/LeftBar';
import 'antd/dist/antd.min.css';
import { Grid, ThemeProvider } from 'antd';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './Pages/LoginPage/LoginPage';
import AssignmentPage from './Pages/AssignmentPage/AssignmentPage';
import { theme } from './Assets/Styles/theme';
import HomePage from './Pages/HomePage/HomePage';
// import AssetPage from './Pages/AssetPage/AssetPage';
// import PrivateRoute from './Routes/PrivateRoute';
// import AssetDetail from './Pages/AssetPage/AssetDetail';
// import CreateAsset from './Pages/AssetPage/CreateAsset';
// import ManageUser from './Pages/UserPage/ManageUser';
// import UserDetails from './Pages/UserPage/UserDetails';
// import CreateUser from './Pages/UserPage/CreateUser';
// import EditUser from './Pages/UserPage/EditUser';
// import EditAsset from './Pages/AssetPage/EditAsset';
// import CreateAssignment from './Pages/AssignmentPage/CreateAssignment';
// import MyAssignmentDetail from './Pages/HomePage/MyAssignmentDetail';
// import EditAssignment from './Pages/AssignmentPage/EditAssignment';
// import Report from './Pages/ReportPage/Report';
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Topbar />
        <Grid container>
          <Grid item xs={3}>
            <Leftbar />
          </Grid>
          <Grid item xs={9}>
            <Routes>
              <Route element={<PrivateRoute />}>
                {/* <Route path="/asset-list" element={<AssetPage />} />
                <Route path="/assignment-list" element={<AssignmentPage />} />
                <Route path="/asset-list/:id" element={<AssetDetail />} />
                <Route path="/asset-list/edit:id" element={<EditAsset />} /> */}
                <Route path="/" element={<HomePage />} />
                {/* <Route
                  path="/assignment/:id"
                  element={<MyAssignmentDetail />}
                />
                <Route path="/asset-list/create" element={<CreateAsset />} />
                <Route path="/user-list/create" element={<CreateUser />} />
                <Route path="/user-list" element={<ManageUser />} />
                <Route path="/user-list/:id" element={<UserDetails />} />
                <Route path="/user-list/edit:id" element={<EditUser />} />
                <Route
                  path="/assignment-list/create"
                  element={<CreateAssignment />}
                />
                <Route
                  path="/assignment-list/edit:id"
                  element={<EditAssignment />}
                />
                <Route path="/report" element={<Report />} /> */}
              </Route>
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default App;
