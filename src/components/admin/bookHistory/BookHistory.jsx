import React, { useEffect, useState } from 'react'
import Table from '../../shared/table/Table'
import AdminHOC from '../../shared/HOC/AdminHOC'
import { bookHistory } from '../../../service/IssuanceService';
import { useParams } from 'react-router-dom';
import Paginate from '../../shared/pagination/Paginate';

const BookHistory = ({setLoading}) => {
  
  const {id} = useParams();

  const [bookHistoryData, setBookHistoryData] = useState([])
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
        title: "User"
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

  const loadBookHistory = async () => {
    try{
      setLoading(true)
      const data = await bookHistory(id, pageNumber, pageSize);
      setBookHistoryData(data?.content);
      setTotalPages(data?.totalPages)
    } catch(error){
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBookHistory();
  }, [pageNumber, pageSize]);


  return (
    <div className="admin-section">
      <h2 className="admin-page-header" style={{marginTop: '10px'}}>Book's History</h2>
      <div className="admin-page-mid">
      </div>
        {bookHistoryData && bookHistoryData.length>0 ? 
        <Table fields={fields} entries={bookHistoryData} type={'book-history'} pageNumber={pageNumber} pageSize={pageSize}/> :
        <div className='no-data-found'>No data found</div>}
        <div className="paginate">
        {bookHistoryData && bookHistoryData.length>0 ?
        <Paginate
          currentPage={pageNumber}
          totalPages={totalPages}
          onPageChange={setPageNumber}
        /> : <div></div>}
      </div>
    </div>
  )
}

export default AdminHOC(BookHistory)