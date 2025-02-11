import DataTable from "./DataTable";
import React from "react";
import { useState } from "react";

interface Props {
  // for table view
  data: {
    [key: string]: {
      date: string;
      category: string;
      title: string;
      amount: number;
      notes: string;
    };
  };
  onRowClick: (index: number, title: string) => void;
  onDeleteButtonClick: (index: string, title: string) => void;
  onDownloadButtonClick: () => void;
}

const AllExpensesView: React.FC<Props> = ({
  data,
  onRowClick,
  onDeleteButtonClick,
  onDownloadButtonClick,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null); // we'll need to pass the index to the delete button to eventually make the API call
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  // handler for selecting table row
  const handleRowClick = (index: number, title: string) => {
    onRowClick(index, title);
    setSelectedIndex(index);
    setSelectedTitle(title);
  };

  const handleDeleteButtonClick = () => {
    if (selectedIndex !== null) {
      onDeleteButtonClick(selectedIndex.toString(), selectedTitle);
    } else {
      alert("Please select an expense to delete.")
    }
  };

  const handleDownloadButtonClick = () => {
    onDownloadButtonClick();
  };

  return (
    <div className="container-fluid">
      <h1 className="header">all expenses</h1>
      <button
        type="button"
        className="btn btn-info"
        onClick={handleDeleteButtonClick}
      >
        DELETE EXPENSE
      </button>
      <DataTable data={data} onRowClick={handleRowClick} />
      <button
        type="button"
        className="btn btn-info"
        onClick={handleDownloadButtonClick}
      >
        DOWNLOAD DATA
      </button>
    </div>
  );
};

export default AllExpensesView;
