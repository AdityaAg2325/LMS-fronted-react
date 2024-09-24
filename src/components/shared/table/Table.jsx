import React from "react";
import edit from "../../../assets/edit.png";
import './Table.css'
import deleteLogo from "../../../assets/delete.png";
import assignUser from "../../../assets/clipboard.png";
import assignBook from "../../../assets/book.png";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import Tooltip from "../tooltip/Tooltip";

const Table = ({
  onEditClick,
  fields,
  entries,
  type,
  onDeleteClick,
  onAssignClick,
  pageNumber,
  pageSize,
}) => {
  const navigate = useNavigate();

  const handleViewBookClick = (id) => {
    navigate(`/book-history/${id}`);
  };
  const handleViewUserClick = (mobileNumber) => {
    navigate(`/user-history/${mobileNumber}`);
  };

  return (
    <div className="table-container">
      <div className="table-parent">
        <table className="books-table">
          <thead>
            <tr>
              {fields &&
                fields.length &&
                fields.map((item) => <th key={item.index}>{item.title}</th>)}
            </tr>
          </thead>
          <tbody>
            {entries?.map(
              (item, i) =>
                item.role !== "ROLE_ADMIN" && (
                  <tr key={item.index}>
                    {Object.entries(item).map(([key, value]) => {
                      if (key === "id") {
                        return <td>{pageNumber * pageSize + i + 1}</td>;
                      }
                      if (type === "user") {
                        if (key !== "role" && key !== "token") {
                          return (
                            <td>
                              {typeof value === "object" ? value?.name : value}
                            </td>
                          );
                        }
                      } else if (type === "dash-user") {
                        if (key !== "role" && key!=='token') {
                          return (
                            <td>
                              {typeof value === "object" ? value?.name : value}
                            </td>
                          );
                        }
                      } else if (
                        type === "category" ||
                        type === "dash-category"
                      ) {
                        return <td className="category-td">{value}</td>;
                      } else if (type === "book") {
                        if (key !== "image") {
                          return (
                            <td>
                              {typeof value === "object" ? value?.title : value}
                            </td>
                          );
                        }
                      } else if (type === "issuance") {

                        if (key === 'actualReturnTime') {
                          return value ? <td>{new Date(value).toLocaleDateString('en-GB')} {' , '} {new Date(value).toLocaleTimeString()}</td> : <td>NA</td>
                        }
                        

                        if (typeof value === "object") {
                          return key === "user" ? (
                            <td>{value?.name}</td>
                          ) : (
                            <td>{value?.title}</td>
                          );
                        } else {
                          if (
                            key === "issueTime" ||
                            key === "expectedReturnTime"
                          ) {
                            return (
                              <td>
                                {
                                    <div>
                                      {new Date(value).toLocaleDateString('en-GB')} {' , '} {new Date(value).toLocaleTimeString()}
                                    </div>
                                }
                              </td>
                            );
                          } else {
                            return <td>{value}</td>;
                          }
                        }
                      } else if (
                        type === "user-history" ||
                        type === "book-history"
                      ) {

                        if (key === 'actualReturnTime') {
                          return value ? <td>{new Date(value).toLocaleDateString('en-GB')} {' , '} {new Date(value).toLocaleTimeString()}</td> : <td>NA</td>
                        }

                        if (typeof value === "object") {
                          return key === "user" ? (
                            <td>{value?.name}</td>
                          ) : (
                            <td>{value?.title}</td>
                          );
                        } else {
                          if (
                            key === "issueTime" ||
                            key === "expectedReturnTime" 
                          ) {
                              return (
                                <td>
                                  {new Date(value).toLocaleDateString("en-GB")}{" "}
                                  {" , "} {new Date(value).toLocaleTimeString()}
                                </td>
                              );
                          } else {
                            return <td>{value}</td>;
                          }
                        }
                      }
                    })}

                    {type !== "dash-category" && type !== "dash-user" && (
                      <td>
                        <div className="modifications">
                          {type !== "dash-category" &&
                            type !== "book-history" &&
                            type !== "user-history" && (
                              <Tooltip tooltipText="Edit">
                                <img
                                  src={edit}
                                  alt="edit"
                                  className={`edit-logo ${type === 'issuance' && item?.status === 'Returned' ? "disabled" : ""}`}
                                  onClick={() => type === 'issuance' && item?.status === 'Returned' ? {} : onEditClick(item)}
                                ></img>
                              </Tooltip>
                            )}
                          {type !== "issuance" &&
                            type !== "dash-category" &&
                            type !== "book-history" &&
                            type !== "user-history" && (
                              <Tooltip tooltipText="Delete">
                                <img
                                  data-testid={`delete-icon-${item?.id}`}
                                  src={deleteLogo}
                                  alt="delete"
                                  className="edit-logo"
                                  onClick={() => onDeleteClick(item)}
                                ></img>
                              </Tooltip>
                            )}
                          {type === "user" && (
                            <Tooltip tooltipText="Issue Book">
                              <img
                                src={assignBook}
                                alt="assign"
                                className="edit-logo"
                                onClick={() => onAssignClick(item)}
                              ></img>
                            </Tooltip>
                          )}
                          {type === "book" && (
                            <Tooltip tooltipText="Issue Book">
                              <img
                                src={assignUser}
                                alt="assign"
                                className="edit-logo"
                                onClick={() => onAssignClick(item)}
                              ></img>
                            </Tooltip>
                          )}
                        </div>
                      </td>
                    )}
                    {type === "book" && (
                      <td>
                        <div className="view-btn">
                          <Button
                            text="View"
                            className="books-view"
                            onClick={() => handleViewBookClick(item?.id)}
                          />
                        </div>
                      </td>
                    )}
                    {type === "user" && (
                      <td>
                        <div className="view-btn">
                          <Button
                            text="View"
                            className="books-view"
                            onClick={() =>
                              handleViewUserClick(item?.mobileNumber)
                            }
                          />
                        </div>
                      </td>
                    )}
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
