import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faHandHoldingHeart,
  faFilter,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/common/LoadingSpinner';
import SearchBar from '../components/common/SearchBar';
import EmptyState from '../components/common/EmptyState';
import ContributionCard from '../components/contributions/ContributionCard';
import useAuthStore from '../store/authStore';
import { contributionsAPI } from '../services/api';

const CONTRIBUTION_TYPES = [
  { value: 'MONEY', label: 'Financial Aid' },
  { value: 'SUPPLIES', label: 'Relief Supplies' },
  { value: 'TRANSPORT', label: 'Transport Support' },
  { value: 'MEDICAL', label: 'Medical Assistance' },
  { value: 'FOOD', label: 'Food & Water' },
  { value: 'WATER', label: 'Clean Water' },
];

export default function ContributionsPage() {
  const [contributions, setContributions] = useState([]);
  const [filteredContributions, setFilteredContributions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const { user } = useAuthStore();

  useEffect(() => {
    if (user?.id) loadContributions();
  }, [user?.id]);

  useEffect(() => {
    filterContributions();
  }, [contributions, searchTerm, typeFilter]);

  const loadContributions = async () => {
    setIsLoading(true);
    try {
      const response = await contributionsAPI.getContributionsByUserId(user.id);
      setContributions(response.data || []);
    } catch (error) {
      toast.error('Failed to load contributions');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterContributions = () => {
    let filtered = contributions;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (c) =>
          c.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (c.description &&
            c.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by type
    if (typeFilter !== 'all') {
      filtered = filtered.filter((c) => c.type === typeFilter);
    }

    setFilteredContributions(filtered);
  };

  if (isLoading) {
    return <LoadingSpinner text="Loading contributions..." />;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            My Contributions
          </h1>
          <p className="text-gray-600">
            Track all your contributions and help efforts
          </p>
        </div>

        {/* Stats */}
        {contributions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 text-sm">Total Contributions</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">
                {contributions.length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 text-sm">Financial Aid</p>
              <p className="text-3xl font-bold text-success-600 mt-1">
                $
                {contributions
                  .filter((c) => c.type === 'MONEY')
                  .reduce((sum, c) => sum + (c.amount || 0), 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 text-sm">Transport Contributions</p>
              <p className="text-3xl font-bold text-primary-600 mt-1">
                {contributions.filter((c) => c.type === 'TRANSPORT').length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 text-sm">Zones Helped</p>
              <p className="text-3xl font-bold text-danger-600 mt-1">
                {new Set(contributions.map((c) => c.zoneId)).size}
              </p>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <SearchBar
                placeholder="Search by type or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
              >
                <option value="all">All Types</option>
                {CONTRIBUTION_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Contributions List */}
        {filteredContributions.length > 0 ? (
          <div className="space-y-4">
            {filteredContributions.map((contribution) => (
              <ContributionCard
                key={contribution.id}
                contribution={contribution}
              />
            ))}
          </div>
        ) : contributions.length === 0 ? (
          <EmptyState
            icon={faHandHoldingHeart}
            title="No contributions yet"
            description="Start making a difference by contributing to disaster-affected zones."
            action={
              <a
                href="/zones"
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium inline-block"
              >
                View Zones
              </a>
            }
          />
        ) : (
          <EmptyState
            icon={faSearch}
            title="No contributions found"
            description="Try adjusting your filters to find what you're looking for."
          />
        )}
      </div>
    </div>
  );
}