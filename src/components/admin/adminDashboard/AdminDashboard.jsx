import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import AdminHOC from "../../shared/HOC/AdminHOC";
import DashCard from "../../shared/dashCard/DashCard";
import book from "../../../assets/bookshelf.png";
import users from "../../../assets/group.png";
import inHouse from "../../../assets/reading.png";
import category from "../../../assets/category.png";
import { useNavigate } from "react-router-dom";
import { fetchAllUsers } from "../../../service/UserService";
import { fetchAllCategories } from "../../../service/CategoryService";
import { fetchAllBooks } from "../../../service/BookService";
import BookCard from "../../shared/bookCard/BookCard";
import Table from "../../shared/table/Table";
import { useSelector } from "react-redux";
import { dashStats } from "../../../service/dashboardService";

const AdminDashboard = ({setLoading}) => {

  const auth = useSelector(state => state.auth);
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(5)
  const [categoryDashList, setCategoryDashList] =useState([])
  const [userDashList, setUserDashList] = useState([])
  const [bookDashList, setBookDashList] = useState([])
  const [dashStatsData, setDashStatsData] = useState({
    totalBooks: 0,
    totalCategories: 0,
    currentIssuances: 0,
    totalUsers: 0
  })

  const date = new Date();

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const dayName = daysOfWeek[date.getDay()];
  const monthName = monthsOfYear[date.getMonth()];
  const year = date.getFullYear();
  const todayDate = date.getDate();


  const navigate = useNavigate();

  const loadCount = async () => {
    const statsData = await dashStats()
    setDashStatsData(statsData)
  }

  useEffect(() => {
    loadCount();
  },[])

  const loadCategories = async () => {
    try{
      setLoading(true)
      const data = await fetchAllCategories(pageNumber, pageSize);
      setCategoryDashList(data?.content)
    } catch(error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }
  const loadUsers = async () => {
    try{
      setLoading(true)
      const data = await fetchAllUsers(pageNumber, pageSize);
      setUserDashList(data?.content)
    } catch(error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  const loadBooks = async () => {
    try{
      setLoading(true)
      const data = await fetchAllBooks(pageNumber, pageSize)
      setBookDashList(data?.content)
    } catch(error){
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=> {
    loadCategories();
    loadUsers();
    loadBooks();
  }, [pageNumber, pageSize]);



  const data = [
    { id: 1, title: "Total Users", number: dashStatsData?.totalUsers, logo: users },
    { id: 2, title: "Total Unique Books", number: dashStatsData?.totalBooks, logo: book },
    { id: 3, title: "Total Categories", number: dashStatsData?.totalCategories, logo: category },
    { id: 4, title: "Active Issuances", number: dashStatsData?.currentIssuances, logo: inHouse },
  ];

  const userFields = [
    {
      index: 1,
      title: "Sr. No."
    },
    {
      index: 2,
      title: "Name"
    },
    {
      index: 3,
      title: "Email"
    },
    {
      index: 4,
      title: "Mobile"
    },
  ]

  const categoryFields = [
    {
      index: 1,
      title: "Index"
    },
    {
      index: 1,
      title: "Name"
    }
  ]

  const handleCategorySeeMoreClick = () => {
    navigate("/categories");
  };

  const handleUserSeeMoreClick = () => {
    navigate("/users");
  };

  return (
    <div className="admin-section">
      <div className="welcome-admin">
        <div className="welcome-parent">
          <p className="welcome">Welcome</p>
          <p className="admin-name">{auth?.name}!</p>
        </div>
        <p className="admin-date">{dayName}, {monthName} {todayDate}, {year}</p>
      </div>
      <div className="main-content">
        {data?.map((data) => (
          <DashCard key={data.id} data={data} />
        ))}
      </div>
      <div className="dash-tables">
        <div className="user-dash-table">
          <p className="user-dash-table-header">Recently Added Users</p>
          <Table fields={userFields} entries={userDashList} type={'dash-user'} pageNumber={0} pageSize={5}/>
          <div className="see-more-container">
          <button className="see-more" onClick={handleUserSeeMoreClick}>
            See more
          </button>
          </div>
        </div>
        <div className="user-dash-table">
          <p className="user-dash-table-header">Recently Added Categories</p>
          <Table fields={categoryFields} entries={categoryDashList} type={'dash-category'} pageNumber={0} pageSize={5}/>
          <div className="see-more-container">
          <button className="see-more" onClick={handleCategorySeeMoreClick}>
            See more
          </button>
          </div>
        </div>
      </div>
      <div className="book-title-parent">
      <div className="book-title">Recently Added Books</div>
      <div className="book-line"></div>
      </div>
      <div className="main-content">
        {bookDashList?.map((data) => (
          <BookCard key={data.id} data={data} />
        ))}
      </div>
    </div>
  );
};

export default AdminHOC(AdminDashboard);
