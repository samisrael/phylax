import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faSpinner,
  faHandHoldingHeart,
  faMap,
  faUsers,
  faExclamationTriangle,
  faCalendar,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ContributionCard from '../components/contributions/ContributionCard';
import ContributionModal from '../components/contributions/ContributionModal';
import { zonesAPI, contributionsAPI } from '../services/api';
import {
  formatDateTime,
  getRiskLevelColor,
  getRiskLevelLabel,
  getStatusColor,
  formatNumber,
} from '../utils/helpers';

export default function ZoneDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [zone, setZone] = useState(null);
  const [contributions, setContributions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isContributionModalOpen, setIsContributionModalOpen] = useState(false);

  useEffect(() => {
    loadZoneData();
  }, [id]);

  const loadZoneData = async () => {
    setIsLoading(true);
    try {
      const [zoneRes, contribRes] = await Promise.all([
        zonesAPI.getZoneById(id),
        contributionsAPI.getContributionsByZoneId(id),
      ]);
      setZone(zoneRes.data);
      setContributions(contribRes.data || []);
    } catch (error) {
      toast.error('Failed to load zone details');
      navigate('/zones');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContributionSuccess = () => {
    loadZoneData();
  };

  if (isLoading) {
    return <LoadingSpinner text="Loading zone details..." />;
  }

  if (!zone) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-600 text-center py-12">Zone not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/zones')}
          className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mb-6"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Zones
        </button>

        {/* Header Card */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2">{zone.name}</h1>
              <p className="flex items-center gap-2 text-primary-100 text-lg">
                <FontAwesomeIcon icon={faMap} />
                {zone.location}
              </p>
            </div>
            <span className={`text-sm font-semibold px-4 py-2 rounded-full ${getStatusColor(
              zone.status
            )}`}>
              {zone.status}
            </span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Description
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {zone.description}
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Population */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="flex items-center gap-2 text-gray-600 mb-2">
                  <FontAwesomeIcon icon={faUsers} className="text-blue-600" />
                  Affected Population
                </p>
                <p className="text-3xl font-bold text-gray-800">
                  {formatNumber(zone.populationEstimate)}
                </p>
              </div>

              {/* Participants */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="flex items-center gap-2 text-gray-600 mb-2">
                  <FontAwesomeIcon icon={faHandHoldingHeart} className="text-danger-600" />
                  Active Helpers
                </p>
                <p className="text-3xl font-bold text-gray-800">
                  {zone.participantCount || 0}
                </p>
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="bg-warning-50 border-2 border-warning-200 rounded-lg p-6">
              <h3 className="flex items-center gap-2 text-xl font-bold text-warning-900 mb-4">
                <FontAwesomeIcon icon={faExclamationTriangle} />
                Risk Assessment
              </h3>

              {/* Risk Score Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-warning-900 font-semibold">
                    Risk Score
                  </span>
                  <span className={`text-2xl font-bold ${getRiskLevelColor(
                    zone.riskScore
                  )}`}>
                    {zone.riskScore.toFixed(2)} / 10
                  </span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${
                      zone.riskScore >= 8
                        ? 'bg-danger-500'
                        : zone.riskScore >= 6
                        ? 'bg-warning-500'
                        : zone.riskScore >= 4
                        ? 'bg-primary-500'
                        : 'bg-success-500'
                    }`}
                    style={{
                      width: `${(zone.riskScore / 10) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Risk Level Badge */}
              <div className="inline-block">
                <span
                  className={`px-4 py-2 rounded-full font-bold text-sm ${
                    zone.riskScore >= 8
                      ? 'bg-danger-200 text-danger-900'
                      : zone.riskScore >= 6
                      ? 'bg-warning-200 text-warning-900'
                      : zone.riskScore >= 4
                      ? 'bg-primary-200 text-primary-900'
                      : 'bg-success-200 text-success-900'
                  }`}
                >
                  {getRiskLevelLabel(zone.riskScore)} Risk
                </span>
              </div>
            </div>

            {/* Contributions Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Recent Contributions
                </h2>
                <span className="text-sm text-gray-600">
                  {contributions.length} contribution{contributions.length !== 1 ? 's' : ''}
                </span>
              </div>

              {contributions.length > 0 ? (
                <div className="space-y-4">
                  {contributions.map((contribution) => (
                    <ContributionCard
                      key={contribution.id}
                      contribution={contribution}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg p-8 text-center">
                  <FontAwesomeIcon
                    icon={faHandHoldingHeart}
                    size="2x"
                    className="text-gray-300 mb-4"
                  />
                  <p className="text-gray-600 text-lg">
                    No contributions yet. Be the first to help!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Quick Actions */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              {/* Statistics */}
              <h3 className="font-bold text-gray-800 mb-4">Zone Statistics</h3>
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Created</span>
                  <span className="font-medium text-gray-800 text-sm">
                    {formatDateTime(zone.createdAt)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Status</span>
                  <span className={`font-bold text-sm ${getStatusColor(zone.status)}`}>
                    {zone.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Risk Level</span>
                  <span className={`font-bold text-sm ${getRiskLevelColor(
                    zone.riskScore
                  )}`}>
                    {getRiskLevelLabel(zone.riskScore)}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setIsContributionModalOpen(true)}
                className="w-full bg-primary-600 text-white font-bold py-3 rounded-lg hover:bg-primary-700 flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faHandHoldingHeart} />
                Make a Contribution
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contribution Modal */}
      <ContributionModal
        zoneId={zone.id}
        isOpen={isContributionModalOpen}
        onClose={() => setIsContributionModalOpen(false)}
        onSuccess={handleContributionSuccess}
      />
    </div>
  );
}
