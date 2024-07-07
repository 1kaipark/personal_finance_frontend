import React, { useEffect } from "react";

interface Props {
  title: string;
  text: string;
  onYesClick: () => void;
  onNoClick: () => void;
  isVisible: boolean;
}

const YesNoConfirmation: React.FC<Props> = ({
  title,
  text,
  onYesClick,
  onNoClick,
  isVisible,
}) => {
  const handleYesClick = () => {
    onYesClick();
  };

  const handleNoClick = () => {
    onNoClick();
  };

  useEffect(() => {
    if (isVisible) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isVisible]);

  return (
    <div
      className={`modal ${isVisible ? "show" : ""}`}
      style={{ display: isVisible ? "block" : "none" }}
      tabIndex={-1}
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={handleNoClick}
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <h5 className="modal-title" style={{ paddingLeft: "1rem" }}>
              {title}
            </h5>
          </div>
          <div className="modal-body">
            <p>{text}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleYesClick}
              id="confirm-delete-btn"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YesNoConfirmation;
