import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapPin,
  faUsers,
  faExclamationTriangle,
  faSpinner,
  faClose,
  faHandHoldingHeart,
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { formatDateTime, getRiskLevelColor, getRiskLevelLabel, getStatusColor } from '../../utils/helpers';
import { contributionsAPI } from '../../services/api';

export default function ZoneDetailModal({ zone, isOpen, onClose, onContribute }) {
  const [contributions, setContributions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && zone?.id) {
      loadContributions();
    }
  }, [isOpen, zone?.id]);

  const loadContributions = async () => {
    setIsLoading(true);
    try {
      const response = await contributionsAPI.getContributionsByZoneId(zone.id);
      setContributions(response.data || []);
    } catch (error) {
      console.error('Error loading contributions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !zone) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold mb-2">{zone.name}</h2>
            <p className="flex items-center gap-2 text-primary-100">
              <FontAwesomeIcon icon={faMapPin} />
              {zone.location}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-primary-600 p-2 rounded-lg"
          >
            <FontAwesomeIcon icon={faClose} size="lg" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status and Basic Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Status</p>
              <p className={`font-semibold text-sm ${getStatusColor(zone.status)}`}>
                {zone.status}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Risk Level</p>
              <p className={`font-bold text-lg ${getRiskLevelColor(zone.riskScore)}`}>
                {getRiskLevelLabel(zone.riskScore)}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Population</p>
              <p className="font-bold text-lg text-gray-800">
                {(zone.populationEstimate / 1000).toFixed(1)}k
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Helpers</p>
              <p className="font-bold text-lg text-primary-600">
                {zone.participantCount || 0}
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {zone.description}
            </p>
          </div>

          {/* Risk Score Details */}
          <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
            <p className="flex items-center gap-2 font-semibold text-warning-900 mb-2">
              <FontAwesomeIcon icon={faExclamationTriangle} />
              Risk Assessment
            </p>
            <div className="w-full bg-gray-300 rounded-full h-2 mb-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  zone.riskScore >= 8
                    ? 'bg-danger-500'
                    : zone.riskScore >= 6
                    ? 'bg-warning-500'
                    : zone.riskScore >= 4
                    ? 'bg-primary-500'
                    : 'bg-success-500'
                }`}
                style={{ width: `${(zone.riskScore / 10) * 100}%` }}
              />
            </div>
            <p className="text-sm text-warning-700">
              Current Risk Score: <strong>{zone.riskScore.toFixed(2)}</strong> / 10
            </p>
          </div>

          {/* Recent Contributions */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Recent Contributions</h3>
            {isLoading ? (
              <div className="flex justify-center py-6">
                <FontAwesomeIcon icon={faSpinner} spin size="lg" className="text-primary-600" />
              </div>
            ) : contributions.length > 0 ? (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {contributions.slice(0, 5).map((contribution) => (
                  <div key={contribution.id} className="bg-gray-50 rounded-lg p-3 text-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <FontAwesomeIcon icon={faHandHoldingHeart} className="text-danger-500" />
                      <span className="font-medium text-gray-800">{contribution.type}</span>
                    </div>
                    <p className="text-gray-600 text-xs">
                      {formatDateTime(contribution.createdAt)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm py-4 text-center">
                No contributions yet. Be the first to help!
              </p>
            )}
          </div>

          {/* Action Button */}
          <button
            onClick={() => {
              onContribute(zone.id);
              onClose();
            }}
            className="w-full bg-primary-600 text-white font-medium py-3 rounded-lg hover:bg-primary-700 flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faHandHoldingHeart} />
            Make a Contribution
          </button>
        </div>
      </div>
    </div>
  );
}
