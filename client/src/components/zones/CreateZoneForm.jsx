import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapPin,
  faFileAlt,
  faUsers,
  faBarChart,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { zonesAPI } from '../../services/api';

export default function CreateZoneForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    populationEstimate: '',
    riskScore: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Zone name is required');
      return false;
    }
    if (!formData.location.trim()) {
      toast.error('Location is required');
      return false;
    }
    if (!formData.description.trim()) {
      toast.error('Description is required');
      return false;
    }
    if (!formData.populationEstimate) {
      toast.error('Population estimate is required');
      return false;
    }
    if (parseInt(formData.populationEstimate) <= 0) {
      toast.error('Population must be greater than 0');
      return false;
    }
    if (!formData.riskScore) {
      toast.error('Risk score is required');
      return false;
    }
    const risk = parseFloat(formData.riskScore);
    if (risk < 0 || risk > 10) {
      toast.error('Risk score must be between 0 and 10');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await zonesAPI.createZone({
        name: formData.name,
        location: formData.location,
        description: formData.description,
        populationEstimate: parseInt(formData.populationEstimate),
        riskScore: parseFloat(formData.riskScore),
      });
      toast.success('Zone created successfully!');
      setFormData({
        name: '',
        location: '',
        description: '',
        populationEstimate: '',
        riskScore: '',
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create zone');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Create New Zone</h2>
        <p className="text-gray-600">
          Register a new affected area to coordinate community response
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Zone Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FontAwesomeIcon icon={faFileAlt} className="mr-2 text-primary-600" />
            Zone Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Downtown Flood Zone"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            disabled={isLoading}
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FontAwesomeIcon icon={faMapPin} className="mr-2 text-primary-600" />
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., New York, NY"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the situation, what help is needed, etc."
          rows="4"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Population Estimate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FontAwesomeIcon icon={faUsers} className="mr-2 text-primary-600" />
            Estimated Population
          </label>
          <input
            type="number"
            name="populationEstimate"
            value={formData.populationEstimate}
            onChange={handleChange}
            placeholder="Number of people affected"
            min="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            disabled={isLoading}
          />
          <p className="text-xs text-gray-500 mt-1">
            Approximate number of people affected in this zone
          </p>
        </div>

        {/* Risk Score */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FontAwesomeIcon icon={faBarChart} className="mr-2 text-primary-600" />
            Risk Score (0-10)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              name="riskScore"
              value={formData.riskScore}
              onChange={handleChange}
              placeholder="0"
              min="0"
              max="10"
              step="0.1"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              disabled={isLoading}
            />
            <span className="flex items-center text-gray-600 font-medium">/ 10</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            0 = Low risk, 10 = Critical risk
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary-600 text-white font-medium py-3 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading && <FontAwesomeIcon icon={faSpinner} spin />}
        {isLoading ? 'Creating Zone...' : 'Create Zone'}
      </button>
    </form>
  );
}
