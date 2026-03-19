export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getRiskLevelColor = (riskScore) => {
  if (riskScore >= 8) return 'text-red-600';
  if (riskScore >= 6) return 'text-orange-600';
  if (riskScore >= 4) return 'text-yellow-600';
  return 'text-green-600';
};

export const getRiskLevelBgColor = (riskScore) => {
  if (riskScore >= 8) return 'bg-red-100';
  if (riskScore >= 6) return 'bg-orange-100';
  if (riskScore >= 4) return 'bg-yellow-100';
  return 'bg-green-100';
};

export const getRiskLevelLabel = (riskScore) => {
  if (riskScore >= 8) return 'Critical';
  if (riskScore >= 6) return 'High';
  if (riskScore >= 4) return 'Medium';
  return 'Low';
};

export const getStatusColor = (status) => {
  const statusLower = status?.toLowerCase();
  switch (statusLower) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'inactive':
      return 'bg-gray-100 text-gray-800';
    case 'resolved':
      return 'bg-blue-100 text-blue-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const truncateText = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

export const formatNumber = (num) => {
  if (!num) return '0';
  return new Intl.NumberFormat('en-US').format(num);
};
