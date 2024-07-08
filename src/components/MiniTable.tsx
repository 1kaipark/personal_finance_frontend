import React from "react";
import styles from "./table.module.css";
import { FloatToCurrencyString } from "../utils/FloatToCurrencyString";

interface Props {
  monthlyTotals: {
    category: string;
    amount: number;
  }[];
}

const DataTable: React.FC<Props> = ({ monthlyTotals }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th scope="col">CATEGORY</th>
          <th scope="col">AMOUNT</th>
        </tr>
      </thead>
      <tbody>
        {monthlyTotals.map((item, index) => (
          <tr key={index}>
            <td>{item.category}</td>
            <td>
              {FloatToCurrencyString(item.amount)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
