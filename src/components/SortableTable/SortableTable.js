import React, { useState } from 'react';
import './SortableTable.css';

const SortableTable = ({ data, columns, rowsPerPage, style }) => {
  // State to keep track of the current sort direction and column
  const [sortConfig, setSortConfig] = useState(null);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = rowsPerPage || 10;

  // Function to generate an array of page numbers to display
  const getPageNumbers = () => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const currentPageIndex = currentPage - 1;
    const pageNumbers = [];

    // Calculate the start and end page numbers to display
    let startPage = currentPageIndex - 2;
    let endPage = currentPageIndex + 2;

    if (startPage < 0) {
      startPage = 0;
      endPage = Math.min(totalPages - 1, startPage + 4);
    } else if (endPage >= totalPages) {
      endPage = totalPages - 1;
      startPage = Math.max(0, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i + 1);
    }

    return pageNumbers;
  };

  // Sorting function
  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  // Function to handle column header click for sorting
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Function to change page
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  // Function to handle previous page navigation
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to handle next page navigation
  const goToNextPage = () => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div style={style}>
      <table className="SortableTable">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} onClick={() => requestSort(column.key)}>
                {column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.key}>{item[column.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button className="pagination-button-prev" onClick={goToPreviousPage}>&#9665;</button> {/* Left Arrow */}
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={page === currentPage ? 'active' : ''}
          >
            {page}
          </button>
        ))}
        <button className="pagination-button-next" onClick={goToNextPage}>&#9665;</button> {/* Right Arrow */}
      </div>
    </div>
  );
};

export default SortableTable;
