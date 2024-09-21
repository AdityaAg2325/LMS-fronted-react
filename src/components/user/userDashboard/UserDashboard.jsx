import UserHOC from "../../shared/HOC/UserHOC";
import './UserDashboard.css'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Table from '../../shared/table/Table'
import { userHistory } from '../../../service/IssuanceService'
import Paginate from '../../shared/pagination/Paginate'
import { useSelector } from "react-redux";

const UserDashboard = () => {

  const auth = useSelector(state => state.auth)

  const [userHistoryData, setUserHistoryData] = useState([])
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  
  const date = new Date();

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const dayName = daysOfWeek[date.getDay()];
  const monthName = monthsOfYear[date.getMonth()];
  const year = date.getFullYear();
  const todayDate = date.getDate();

    const fields = [
    {
        index: 1,
        title: "Id"
    },
    {
        index: 3,
        title: "Book"
    },
    {
        index: 4,
        title: "Issue time"
    },
    {
        index: 5,
        title: "Expected Return time"
    },
    {
      index: 6,
      title: "Actual Return time"
  },
    {
        index: 7,
        title: "Status"
    },
    {
      index: 8,
      title: "Type"
  }
  ]

      const loadUserHistory = async () => {
        try{
          const data = await userHistory(auth?.mobileNumber, pageNumber, pageSize);
          setUserHistoryData(data?.content);
          setTotalPages(data?.totalPages)
        } catch(error){
          console.log(error);
        }
      }

      useEffect(() => {
        loadUserHistory();
      }, [pageNumber, pageSize]);


  return (
    <div className="admin-section">
      <div className="welcome-admin">
        <div className="welcome-parent">
          <p className="welcome">Welcome</p>
          <p className="admin-name">{auth?.name}!</p>
        </div>
        <p className="admin-date">{dayName}, {monthName} {todayDate}, {year}</p>
      </div>
      <h2 className="admin-page-header" style={{marginTop: '10px'}}>Your History</h2>
      <div className="admin-page-mid">
      </div>
        {userHistoryData && userHistoryData.length>0 ?
        <Table fields={fields} entries={userHistoryData} type={'user-history'} pageNumber={pageNumber} pageSize={pageSize}/> : 
        <div className="no-data-found">No data found</div>}
        <div className="paginate">
        {userHistoryData && userHistoryData.length>0 ?
        <Paginate
          currentPage={pageNumber}
          totalPages={totalPages}
          onPageChange={setPageNumber}
        /> : <div></div>}
      </div>
    </div>
  )
}

export default UserHOC(UserDashboard);





