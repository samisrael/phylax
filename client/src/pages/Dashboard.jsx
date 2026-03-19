import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faSpinner,
  faMap,
  faUsers,
  faExclamationTriangle,
  faHandHoldingHeart,
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ZoneCard from '../components/zones/ZoneCard';
import ZoneDetailModal from '../components/zones/ZoneDetailModal';
import ContributionModal from '../components/contributions/ContributionModal';
import { zonesAPI, riskAssessmentAPI } from '../services/api';
import { formatNumber } from '../utils/helpers';
import useAuthStore from '../store/authStore';

export default function Dashboard() {
  const [zones, setZones] = useState([]);
  const [stats, setStats] = useState({
    totalZones: 0,
    activeZones: 0,
    totalPopulation: 0,
    highRiskZones: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedZone, setSelectedZone] = useState(null);
  const [contributionZoneId, setContributionZoneId] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuthStore();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const response = await zonesAPI.getAllZones();
      const zonesData = response.data || [];
      setZones(zonesData);

      // Calculate stats
      const activeZones = zonesData.filter(z => z.status === 'ACTIVE').length;
      const totalPopulation = zonesData.reduce((sum, z) => sum + (z.populationEstimate || 0), 0);
      const highRiskZones = zonesData.filter(z => z.riskScore >= 6).length;

      setStats({
        totalZones: zonesData.length,
        activeZones,
        totalPopulation,
        highRiskZones,
      });
    } catch (error) {
      toast.error('Failed to load dashboard data');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleZoneClick = (zone) => {
    setSelectedZone(zone);
  };

  const handleContributionClick = (zoneId) => {
    setContributionZoneId(zoneId);
  };

  const handleContributionSuccess = () => {
    loadData();
  };

  if (isLoading) {
    return <LoadingSpinner text="Loading dashboard..." />;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Welcome back, {user?.name}
            </h1>
            <p className="text-gray-600">
              Here's an overview of disaster zones and response efforts
            </p>
          </div>
          <button
            onClick={() => navigate('/zones/create')}
            className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700"
          >
            <FontAwesomeIcon icon={faPlus} />
            Create Zone
          </button>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Total Zones */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Zones</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {stats.totalZones}
                </p>
              </div>
              <FontAwesomeIcon
                icon={faMap}
                size="2x"
                className="text-primary-600 opacity-20"
              />
            </div>
          </div>

          {/* Active Zones */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Zones</p>
                <p className="text-3xl font-bold text-success-600 mt-1">
                  {stats.activeZones}
                </p>
              </div>
              <FontAwesomeIcon
                icon={faMap}
                size="2x"
                className="text-success-600 opacity-20"
              />
            </div>
          </div>

          {/* Affected Population */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Affected Population</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {formatNumber(stats.totalPopulation)}
                </p>
              </div>
              <FontAwesomeIcon
                icon={faUsers}
                size="2x"
                className="text-blue-600 opacity-20"
              />
            </div>
          </div>

          {/* High Risk Zones */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">High Risk Zones</p>
                <p className="text-3xl font-bold text-danger-600 mt-1">
                  {stats.highRiskZones}
                </p>
              </div>
              <FontAwesomeIcon
                icon={faExclamationTriangle}
                size="2x"
                className="text-danger-600 opacity-20"
              />
            </div>
          </div>
        </div>

        {/* Recent Zones */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Recent Zones
            </h2>
            <button
              onClick={() => navigate('/zones')}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              View All
            </button>
          </div>

          {zones.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {zones.slice(0, 6).map((zone) => (
                <div key={zone.id} onClick={() => handleZoneClick(zone)}>
                  <ZoneCard zone={zone} onClick={() => handleZoneClick(zone)} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FontAwesomeIcon
                icon={faMap}
                size="3x"
                className="text-gray-300 mb-4"
              />
              <p className="text-gray-600 text-lg">
                No zones yet. Be the first to create one!
              </p>
              <button
                onClick={() => navigate('/zones/create')}
                className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Create the First Zone
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <ZoneDetailModal
        zone={selectedZone}
        isOpen={!!selectedZone}
        onClose={() => setSelectedZone(null)}
        onContribute={handleContributionClick}
      />
      <ContributionModal
        zoneId={contributionZoneId}
        isOpen={!!contributionZoneId}
        onClose={() => setContributionZoneId(null)}
        onSuccess={handleContributionSuccess}
      />
    </div>
  );
}
