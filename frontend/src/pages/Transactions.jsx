import React, { useState, useMemo } from "react";
import MainLayout from "../layout/MainLayout";
import "./Transactions.scss";

const Transactions = () => {
  // Dummy data with datetime
  const transactions = [
    { id: 1, datetime: "2025-08-25 10:30 AM", type: "Credit", amount: "+ ₹500", status: "Success" },
    { id: 2, datetime: "2025-08-26 02:15 PM", type: "Debit", amount: "- ₹200", status: "Pending" },
    { id: 3, datetime: "2025-08-27 09:00 AM", type: "Credit", amount: "+ ₹1000", status: "Failed" },
    { id: 4, datetime: "2025-08-28 06:45 PM", type: "Debit", amount: "- ₹350", status: "Success" },
    { id: 5, datetime: "2025-08-29 08:15 PM", type: "Credit", amount: "+ ₹750", status: "Success" },
  ];

  // States
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  // Helpers
  const parseAmount = (amt) => Number(amt.replace(/[^\d.-]/g, ""));
  const parseDate = (dt) => new Date(dt);

  // Filtering
  const filteredData = useMemo(() => {
    return transactions.filter((t) =>
      Object.values(t).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, transactions]);

  // Sorting
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (sortField === "amount") {
        aVal = parseAmount(aVal);
        bVal = parseAmount(bVal);
      } else if (sortField === "datetime") {
        aVal = parseDate(aVal);
        bVal = parseDate(bVal);
      }

      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <MainLayout>
      {/* Page Title */}
      <div className="mb-4">
        <h2 className="gradient-text">Wallet Transactions</h2>
        <p>Track all your wallet activities here.</p>
      </div>

      {/* Card with Table + Filters */}
      <div className="datatable-card">
        <div className="datatable-tools">
          <div className="datatable-left">
            <select
              className="datatable-rows"
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              {[5, 10, 25, 50].map((size) => (
                <option key={size} value={size}>
                  {size} entries per page
                </option>
              ))}
            </select>
          </div>

          <div className="datatable-right">
            <input
              type="text"
              className="datatable-search"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <table className="datatable">
          <thead>
            <tr>
              {["id", "datetime", "type", "amount", "status"].map((field) => (
                <th
                  key={field}
                  onClick={() => handleSort(field)}
                  className={`sortable${sortField === field ? " active" : ""}`}
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                  {sortField === field && (sortOrder === "asc" ? " ▲" : " ▼")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.datetime}</td>
                  <td>
                    <span
                      className={`dt-badge ${
                        row.type === "Credit" ? "success" : "danger"
                      }`}
                    >
                      {row.type}
                    </span>
                  </td>
                  <td>{row.amount}</td>
                  <td>
                    <span
                      className={`dt-badge ${
                        row.status === "Success"
                          ? "success"
                          : row.status === "Pending"
                          ? "warning"
                          : "danger"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="dt-empty">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="datatable-footer">
          <span className="datatable-entries">
            Showing {(currentPage - 1) * rowsPerPage + 1}–
            {Math.min(currentPage * rowsPerPage, sortedData.length)} of {sortedData.length} entries
          </span>
          <div className="datatable-pagination">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`pagination-btn${currentPage === i + 1 ? " active" : ""}`}
                onClick={() => setCurrentPage(i + 1)}
                disabled={currentPage === i + 1}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Transactions;
