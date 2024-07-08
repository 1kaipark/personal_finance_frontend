import React from "react";

interface Props {
  heights: { category: string; amount: string }[];
  sum: string;
}

const BarChart: React.FC<Props> = ({ heights, sum }) => {
  return (
    <div className="barchart-container">
      {heights.map((item, index) => (
        <div
          key={index}
          className="progress"
          role="progressbar"
          aria-label={`${item.category} progress`}
          aria-valuenow={parseFloat(item.amount) * 100}
          aria-valuemin={0}
          aria-valuemax={100}
          style={{ height: "40px", margin: "10px", padding: "0px" }}
          id="proggybar"
        >
          <div
            className="progress-bar"
            id="proggybar"
            style={{ width: `${parseFloat(item.amount) * 100}%` }}
          >
            {item.category}
          </div>
        </div>
      ))}
      <p className='total-spending'>total spendings: ${sum}</p>
    </div>
  );
};

export default BarChart;
