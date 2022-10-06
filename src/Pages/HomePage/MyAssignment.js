import { Button } from 'antd';
import { makeStyles } from '@mui/styles';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomNoRowsOverlay from '../../Components/NoRowsOverlay/CustomNoRowsOverlay';
import Custompagination from '../../Components/Pagination/CustomPagination';
import CheckIcon from '@mui/icons-material/Check';
import Popup from '../../Components/Modal/Popup';
import moment from 'moment';
import ClearIcon from '@mui/icons-material/Clear';

const styles = makeStyles({
  table: {
    // boxShadow: "2px 2px 5px -1px rgba(0,0,0,0.75)",
    width: 'cover',
    margin: '25px 50px 0 50px',
  },
});
const MyAssignment = () => {
  const token = localStorage.getItem('token');
  const userID = localStorage.getItem('userId');
  const [gridData, setGridData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectionModel, setSelectionModel] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopup2, setOpenPopup2] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    setLoading(true);

    const response = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_Backend_URI}/Assignment/get-by-user-id?userId=${userID}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    setGridData(response.data);
    setLoading(false);
  };

  const modifiedData = gridData
    .filter((item) => {
      return (
        item.assignmentState === 'Waiting For Acceptance' ||
        item.assignmentState === 'Returned' ||
        item.assignmentState === 'Accepted'
      );
    })
    .map(({ ...item }) => ({
      ...item,
      key: item.assignmentId,
      assignedDate: moment(item.assignedDate).format('DD/MM/YYYY'),
      assignmentState: item.assignmentState.replace(/([a-z])([A-Z])/g, '$1 $2'),
    }));
  const classes = styles();
  const columns = [
    {
      headerName: 'ID',
      field: 'assignmentId',
    },
    {
      headerName: 'Asset Code',
      field: 'assetCode',
      width: 125,
    },
    {
      headerName: 'Asset Name',
      field: 'assetName',
      width: 200,
    },
    {
      headerName: 'Assigned To',
      field: 'assignedToUserName',
      width: 180,
    },
    {
      headerName: 'Assigned By',
      field: 'assignedByUserName',
      width: 180,
    },
    {
      headerName: 'Assigned Date',
      field: 'assignedDate',
      width: 150,
    },
    {
      headerName: 'State',
      field: 'assignmentState',
      width: 250,
    },
    {
      headerName: 'Actions',
      field: 'actions',
      width: 150,
      sortable: false,
      disableColumnMenu: true,

      renderCell: (item) => {
        return (
          <div>
            <Button
              disabled={
                (item.row.assignmentState === 'Waiting For Acceptance'
                  ? false
                  : true) || item.row.isDisable
              }
              shape="round"
              size={'large'}
              color="error"
              onClick={(event) => {
                setOpenPopup(true);
                setSelectedItem(item);
                event.stopPropagation();
              }}
            >
              <CheckIcon />
            </Button>
            &nbsp;&nbsp;
            <Button
              disabled={
                (item.row.assignmentState === 'Waiting For Acceptance'
                  ? false
                  : true) || item.row.isDisable
              }
              shape="round"
              size={'large'}
              color="error"
              onClick={(event) => {
                setOpenPopup2(true);
                setSelectedItem(item);
                event.stopPropagation();
              }}
            >
              <ClearIcon />
            </Button>
          </div>
        );
      },
    },
  ];

  const toggleStatusAccepted = async (value) => {
    const filteredData = [...gridData].map((item) => {
      if (item.assignmentId === value.id) {
        return {
          ...item,
          isDisable: !item.isDisable,
          assignmentState: 'Accepted',
        };
      }
      return item;
    });
    await setGridData(filteredData);

    await axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_Backend_URI}/Assignment/apccept?assignmetnId=${value.id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const toggleStatusRejected = async (value) => {
    const filteredData = [...gridData].map((item) => {
      if (item.assignmentId === value.id) {
        return {
          ...item,
          isDisable: !item.isDisable,
          assignmentState: 'Rejected',
        };
      }
      return item;
    });
    await setGridData(filteredData);

    await axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_Backend_URI}/Assignment/reject?assignmentId=${value.id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <div>
      <div className="header-component-text">
        <p>My Assignment</p>
      </div>
      <div className={classes.table}>
        <DataGrid
          sortingOrder={['desc', 'asc']}
          pagination
          autoHeight
          {...gridData}
          columns={columns}
          rows={modifiedData}
          pageSize={10}
          rowsPerPageOptions={[10]}
          loading={loading}
          components={{
            Pagination: Custompagination,
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
          getRowId={(row) => row.assignmentId}
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
            navigate(`./assignment/${newSelectionModel}`);
          }}
          selectionModel={selectionModel}
        />
      </div>

      <Popup
        title="Are you sure?"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <div>
          <p>Do you want to accept this assignment ?</p>
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          type="primary"
          danger
          size={'large'}
          onClick={() => {
            setOpenPopup(false);
            setGridData();
            setSelectedItem(null);
            toggleStatusAccepted(selectedItem);
          }}
        >
          Accept
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          type="primary"
          size={'large'}
          onClick={() => {
            setOpenPopup(false);
          }}
        >
          Cancel
        </Button>
      </Popup>

      <Popup
        title="Are you sure?"
        openPopup={openPopup2}
        setOpenPopup={setOpenPopup2}
      >
        <div>
          <p>Do you want to reject this assignment ?</p>
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          type="primary"
          danger
          size={'large'}
          onClick={() => {
            setOpenPopup2(false);
            setGridData();
            setSelectedItem(null);
            toggleStatusRejected(selectedItem);
          }}
        >
          Reject
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          type="primary"
          size={'large'}
          onClick={() => {
            setOpenPopup2(false);
          }}
        >
          Cancel
        </Button>
      </Popup>
    </div>
  );
};

export default MyAssignment;
