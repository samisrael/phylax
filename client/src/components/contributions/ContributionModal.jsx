import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faClose,
  faHandHoldingHeart,
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { contributionsAPI } from '../../services/api';

const CONTRIBUTION_TYPES = [
  { id: 'MONEY', label: 'Financial Aid' },
  { id: 'SUPPLIES', label: 'Relief Supplies' },
  { id: 'TRANSPORT', label: 'Transport Support' },
  { id: 'MEDICAL', label: 'Medical Assistance' },
  { id: 'FOOD', label: 'Food & Water' },
  { id: 'WATER', label: 'Clean Water' },
];

export default function ContributionModal({ zoneId, isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    type: '',
    amount: '',
    description: '',
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
    if (!formData.type) {
      toast.error('Please select a contribution type');
      return false;
    }
    if (formData.type === 'MONEY' && !formData.amount) {
      toast.error('Please enter an amount');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await contributionsAPI.createContribution({
        zoneId,
        type: formData.type,
        amount: formData.type === 'MONEY' ? parseFloat(formData.amount) : null,
        description: formData.description,
      });
      toast.success('Thank you for your contribution!');
      setFormData({ type: '', amount: '', description: '' });
      onClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create contribution');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-danger-500 to-danger-600 text-white p-6 flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FontAwesomeIcon icon={faHandHoldingHeart} />
            Make a Contribution
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-danger-700 p-2 rounded-lg"
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How would you like to help?
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              disabled={isLoading}
            >
              <option value="">Select contribution type...</option>
              {CONTRIBUTION_TYPES.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Amount for MONEY */}
          {formData.type === 'MONEY' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (USD)
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="100"
                min="1"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                disabled={isLoading}
              />
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Details (Optional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="e.g., I can deliver supplies on Friday..."
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              disabled={isLoading}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary-600 text-white font-medium py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading && <FontAwesomeIcon icon={faSpinner} spin />}
            {isLoading ? 'Submitting...' : 'Submit Contribution'}
          </button>
        </form>
      </div>
    </div>
  );
}