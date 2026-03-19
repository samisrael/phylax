import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faSpinner,
  faFilter,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/common/LoadingSpinner';
import SearchBar from '../components/common/SearchBar';
import EmptyState from '../components/common/EmptyState';
import ZoneCard from '../components/zones/ZoneCard';
import ZoneDetailModal from '../components/zones/ZoneDetailModal';
import ContributionModal from '../components/contributions/ContributionModal';
import { zonesAPI } from '../services/api';

export default function ZonesPage() {
  const [zones, setZones] = useState([]);
  const [filteredZones, setFilteredZones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedZone, setSelectedZone] = useState(null);
  const [contributionZoneId, setContributionZoneId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadZones();
  }, []);

  useEffect(() => {
    filterZones();
  }, [zones, searchTerm, statusFilter]);

  const loadZones = async () => {
    setIsLoading(true);
    try {
      const response = await zonesAPI.getAllZones();
      setZones(response.data || []);
    } catch (error) {
      toast.error('Failed to load zones');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterZones = () => {
    let filtered = zones;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (zone) =>
          zone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          zone.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          zone.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(
        (zone) => zone.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    setFilteredZones(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleZoneClick = (zone) => {
    setSelectedZone(zone);
  };

  const handleContributionClick = (zoneId) => {
    setContributionZoneId(zoneId);
  };

  const handleContributionSuccess = () => {
    loadZones();
  };

  if (isLoading) {
    return <LoadingSpinner text="Loading zones..." />;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Disaster Zones
            </h1>
            <p className="text-gray-600">
              {filteredZones.length} zone{filteredZones.length !== 1 ? 's' : ''} available
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

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <SearchBar
                placeholder="Search zones by name, location..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="resolved">Resolved</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                }}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faFilter} />
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Zones Grid */}
        {filteredZones.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredZones.map((zone) => (
              <div key={zone.id} onClick={() => handleZoneClick(zone)}>
                <ZoneCard zone={zone} onClick={() => handleZoneClick(zone)} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={faSearch}
            title="No zones found"
            description="Try adjusting your search filters or create a new zone to get started."
            action={
              <button
                onClick={() => navigate('/zones/create')}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
              >
                Create New Zone
              </button>
            }
          />
        )}
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
