import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDollarSign,
  faBox,
  faTruck,
  faHeartbeat,
  faUtensils,
  faTint,
  faCalendar,
} from '@fortawesome/free-solid-svg-icons';
import { formatDateTime } from '../../utils/helpers';

const CONTRIBUTION_ICONS = {
  MONEY: faDollarSign,
  SUPPLIES: faBox,
  TRANSPORT: faTruck,
  MEDICAL: faHeartbeat,
  FOOD: faUtensils,
  WATER: faTint,
};

const CONTRIBUTION_LABELS = {
  MONEY: 'Financial Aid',
  SUPPLIES: 'Relief Supplies',
  TRANSPORT: 'Transport Support',
  MEDICAL: 'Medical Assistance',
  FOOD: 'Food & Water',
  WATER: 'Clean Water',
};

export default function ContributionCard({ contribution }) {
  const typeKey = contribution.type.toUpperCase();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary-500">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {CONTRIBUTION_LABELS[typeKey] || typeKey}
          </h3>
          <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
            <FontAwesomeIcon icon={faCalendar} />
            {formatDateTime(contribution.createdAt)}
          </p>
        </div>

        {typeKey === 'MONEY' && contribution.amount && (
          <div className="bg-success-100 text-success-800 px-3 py-2 rounded-lg font-semibold">
            ${contribution.amount.toFixed(2)}
          </div>
        )}
      </div>

      {contribution.description && (
        <p className="text-gray-600 text-sm mb-3">{contribution.description}</p>
      )}

      <div className="flex items-center gap-2 text-xs text-gray-500">
        <FontAwesomeIcon
          icon={CONTRIBUTION_ICONS[typeKey] || faBox}
          className="text-danger-500"
        />
        <span>Contribution ID: {contribution.id}</span>
      </div>
    </div>
  );
}