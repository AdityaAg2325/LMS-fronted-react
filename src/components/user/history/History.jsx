import React from "react";
import UserHOC from "../../shared/HOC/UserHOC";
import Table from "../../shared/table/Table";

const IssuanceAdmin = () => {


  const fields = [
    {
        index: 1,
        title: "Index"
    },
    {
        index: 2,
        title: "Title"
    },
    {
        index: 3,
        title: "Author"
    },
    {
        index: 4,
        title: "Quantity"
    },
    {
        index: 5,
        title: "Modifications"
    },
    {
        index: 6,
        title: "Issuances"
    }
  ]

  const entries = [
    {
      index: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      quantity: 5,
    },
    { index: 2, title: "1984", author: "George Orwell", quantity: 8 },
    {
      index: 3,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      quantity: 3,
    },
    {
        index: 4,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        quantity: 5,
      },
      { index: 5, title: "1984", author: "George Orwell", quantity: 8 },
      {
        index: 6,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        quantity: 3,
      },
      { index: 7, title: "1984", author: "George Orwell", quantity: 8 },
      {
        index: 8,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        quantity: 3,
      },
      { index: 9, title: "1984", author: "George Orwell", quantity: 8 },
      {
        index: 10,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        quantity: 3,
      },
  ];

  return (
    <div className="admin-section">
      <h2 className="admin-page-header">Your Issuances History</h2>
      <div className="admin-page-mid">
      </div>
      <Table fields={fields} entries={entries}/>
    </div>
  );
};

export default UserHOC(IssuanceAdmin);





