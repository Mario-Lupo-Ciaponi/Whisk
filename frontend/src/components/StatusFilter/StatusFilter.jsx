import { useTranslation } from 'react-i18next';
import './StatusFilter.css';

const StatusFilter = ({ selectedStatus = 'all', onStatusChange }) => {
  const { t } = useTranslation();

  const statuses = [
    { value: "", label: t('all', 'All') },
    { value: false, label: t('lostPets', 'Lost Pets') },
    { value: true, label: t('foundPets', 'Found Pets') }
  ];

  return (
    <div className="status-filter-container">
      <div className="status-filter-wrapper">
        <select
          className="status-filter-select"
          value={selectedStatus}
          onChange={onStatusChange}
          aria-label={t('filterStatus', 'Filter by status')}
        >
          {statuses.map((status) => (
            <option key={status.id} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
        <div className="status-filter-arrow">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default StatusFilter;
