import { useTranslation } from "react-i18next";
import "./DateSort.css";

const DateSort = ({ selectedOrder = "-posted_on", onOrderChange }) => {
  const { t } = useTranslation();

  const orders = [
    { value: "-posted_on", label: t("newestFirst", "Newest First") },
    { value: "posted_on", label: t("oldestFirst", "Oldest First") },
  ];

  return (
    <div className="date-sort-container">
      <div className="date-sort-wrapper">
        <select
          className="date-sort-select"
          value={selectedOrder}
          onChange={onOrderChange}
          aria-label={t("sortByDate", "Sort by date")}
        >
          {orders.map((order) => (
            <option key={order.value} value={order.value}>
              {order.label}
            </option>
          ))}
        </select>
        <div className="date-sort-arrow">
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DateSort;
