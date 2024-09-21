import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Table from '../../shared/table/Table'
import AdminHOC from '../../shared/HOC/AdminHOC'
import { userHistory } from '../../../service/IssuanceService'
import Paginate from '../../shared/pagination/Paginate'

const UserHistory = ({setLoading}) => {

  const {mobileNumber} = useParams();

  const [userHistoryData, setUserHistoryData] = useState([])
  const [pageNumber, setPageNumber] = useState(0);
  
  let height = window.innerHeight;

  const pageSizeByHeight = () => {

  if(height>=1024){
    return 11
  }else if (height<=1024){
    return 10
  }}
  const [pageSize, setPageSize] = useState(pageSizeByHeight());
  const handleResize = () => {
    height = window.innerHeight;
    const newSize = pageSizeByHeight();
    setPageSize(newSize);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [height]);

  const [totalPages, setTotalPages] = useState(0);
  

    const fields = [
    {
        index: 1,
        title: "Sr. No."
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
          setLoading(true)
          const data = await userHistory(mobileNumber, pageNumber, pageSize);
          setUserHistoryData(data?.content);
          setTotalPages(data?.totalPages)
        } catch(error){
          console.log(error);
        } finally {
          setLoading(false)
        }
      }

      useEffect(() => {
        loadUserHistory();
      }, [pageNumber, pageSize]);


  return (
    <div className="admin-section">
      <h2 className="admin-page-header" style={{marginTop: '10px'}}>User's History</h2>
      <div className="admin-page-mid">
      </div>
        {userHistoryData && userHistoryData.length>0 ? 
        <Table fields={fields} entries={userHistoryData} type={'user-history'} pageNumber={pageNumber} pageSize={pageSize}/> :
        <div className='no-data-found'>No data found</div>}
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

export default AdminHOC(UserHistory)