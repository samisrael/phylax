import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapPin,
  faUsers,
  faExclamationTriangle,
  faCalendar,
} from '@fortawesome/free-solid-svg-icons';
import { formatDate, getRiskLevelColor, getRiskLevelLabel, getStatusColor } from '../../utils/helpers';

export default function ZoneCard({ zone, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer border border-gray-200 hover:border-primary-500"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{zone.name}</h3>
          <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
            <FontAwesomeIcon icon={faMapPin} className="text-primary-600" />
            {zone.location}
          </p>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(zone.status)}`}>
          {zone.status}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {zone.description}
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Risk Score */}
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500 flex items-center gap-1 mb-1">
            <FontAwesomeIcon icon={faExclamationTriangle} />
            Risk Level
          </p>
          <p className={`text-lg font-bold ${getRiskLevelColor(zone.riskScore)}`}>
            {getRiskLevelLabel(zone.riskScore)}
          </p>
          <p className="text-xs text-gray-400">
            Score: {zone.riskScore.toFixed(1)}/10
          </p>
        </div>

        {/* Population */}
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500 flex items-center gap-1 mb-1">
            <FontAwesomeIcon icon={faUsers} />
            Population
          </p>
          <p className="text-lg font-bold text-gray-800">
            {(zone.populationEstimate / 1000).toFixed(1)}k
          </p>
          <p className="text-xs text-gray-400">
            {zone.participantCount || 0} helping
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-gray-200 text-xs text-gray-500 flex items-center gap-2">
        <FontAwesomeIcon icon={faCalendar} />
        Created {formatDate(zone.createdAt)}
      </div>
    </div>
  );
}
