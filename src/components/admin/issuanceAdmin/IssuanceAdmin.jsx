import React, { useEffect, useState } from "react";
import AdminHOC from "../../shared/HOC/AdminHOC";
import Table from "../../shared/table/Table";
import Toast from "../../shared/toast/Toast";
import Paginate from "../../shared/pagination/Paginate";
import { fetchAllIssuances } from "../../../service/IssuanceService";
import IssuanceModal from "./IssuanceModal";
import searchLogo from "../../../assets/magnifying-glass.png";

const IssuanceAdmin = ({setLoading}) => {

  const [selectedIssuance, setSelectedIssuance] = useState(null)
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [issuanceList, setIssuanceList] = useState([])
  const [pageNumber, setPageNumber] = useState(0)

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

  const [totalPages, settotalPages] = useState(0)

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("");

  const loadIssuances = async () => {
    if(search.length>2 || search.length==0){
    try{
      setLoading(true)
      const data = await fetchAllIssuances(pageNumber, pageSize, search);
      setIssuanceList(data?.content)
      settotalPages(data?.totalPages)
    } catch(error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
}

  const handleOpenModal = (issunace = null) => {
    setSelectedIssuance(issunace);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedIssuance(null);
  };

  const handleEditIssuance = () => {
    loadIssuances();
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value.trim());
  };
  const handleSearchClick = async () => {
    await loadIssuances();
  };

  const fields = [
    {
        index: 1,
        title: "Sr.No."
    },
    {
        index: 2,
        title: "User"
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
  },
  {
    index: 9,
    title: "Actions"
},
  ]


  useEffect(() => {
    const timout = setTimeout(() => {
      if(search.length>2 || search.length==0){
        if(search){
          setPageNumber(0)
        }
          loadIssuances();
        }
      }, 1000)
    return () => clearTimeout(timout);
  }, [search, pageNumber, pageSize]);


  return (
    <div className="admin-section">
      <div className="admin-page-mid">
        <h2 className="admin-page-header">Available Issuances</h2>
        <div className="admin-page-search">
          <div className="search">
            <input
              type="text"
              placeholder="Search By Book or User"
              className="searchbar"
              onChange={handleSearchChange}
            ></input>
            <div className="search-icon" onClick={handleSearchClick}>
            <img src={searchLogo} alt="!" className="search-logo" />
            </div>
          </div>
        </div>
      </div>
      {issuanceList && issuanceList.length>0 ?
      <Table
        onEditClick={handleOpenModal}
        fields={fields}
        entries={issuanceList}
        type={"issuance"}
        pageNumber={pageNumber}
        pageSize={pageSize}
      /> : <div className="no-data-found">No data found</div>}
      <IssuanceModal
        title={"Edit Issuance"}
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        selectedIssuance={selectedIssuance}
        handleEditIssuance={handleEditIssuance}
        setToastMessage={setToastMessage}
        setToastType={setToastType}
        setShowToast={setShowToast}
        setLoading={setLoading}
      />
      <div className="paginate">
        {issuanceList && issuanceList.length>0 ?
        <Paginate
          currentPage={pageNumber}
          totalPages={totalPages}
          onPageChange={setPageNumber}
        /> : <div></div>}
      </div>
      <Toast
        message={toastMessage}
        type={toastType}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};

export default AdminHOC(IssuanceAdmin);
