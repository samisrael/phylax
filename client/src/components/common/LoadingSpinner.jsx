import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function LoadingSpinner({ text = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <FontAwesomeIcon icon={faSpinner} spin size="2x" className="text-primary-600 mb-4" />
      <p className="text-gray-600 font-medium">{text}</p>
    </div>
  );
}

export default LoadingSpinner;
export { LoadingSpinner };
