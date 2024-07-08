import React, { useState } from "react";
import { Pagination } from "react-bootstrap";
import styles from "./table.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Expense } from "../models/Expense"

interface Props {
  data: {
    [key: string]: Expense;
  };
  onRowClick: (index: number, title: string) => void;
}

const DataTable: React.FC<Props> = ({ data, onRowClick }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  const handleRowClick = (index: number, title: string) => {
    setSelectedIndex(index);
    onRowClick(index, title);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const dataEntries = Object.entries(data);
  const totalPages = Math.ceil(dataEntries.length / itemsPerPage);
  const displayedData = dataEntries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">DATE</th>
            <th scope="col">CATEGORY</th>
            <th scope="col">TITLE</th>
            <th scope="col">AMOUNT</th>
            <th scope="col">NOTES</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.map(([key, value], index) => {
            const overallIndex = (currentPage - 1) * itemsPerPage + index;
            return (
              <tr
                key={key}
                className={selectedIndex === overallIndex ? "table-active" : ""}
                onClick={() => handleRowClick(overallIndex, value.title)}
              >
                <td>{value.date}</td>
                <td>{value.category}</td>
                <td>{value.title}</td>
                <td>{value.amount}</td>
                <td>{value.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination>
        <Pagination.First onClick={() => handlePageChange(1)} />
        <Pagination.Prev
          onClick={() =>
            handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
          }
        />
        {[...Array(totalPages)].map((_, pageIndex) => (
          <Pagination.Item
            key={pageIndex + 1}
            active={pageIndex + 1 === currentPage}
            onClick={() => handlePageChange(pageIndex + 1)}
          >
            {pageIndex + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() =>
            handlePageChange(
              currentPage < totalPages ? currentPage + 1 : totalPages
            )
          }
        />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} />
      </Pagination>
    </>
  );
};

export default DataTable;
