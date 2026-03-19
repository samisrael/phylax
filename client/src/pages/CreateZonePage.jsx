import CreateZoneForm from '../components/zones/CreateZoneForm';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function CreateZonePage() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/zones')}
          className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mb-6"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Zones
        </button>

        {/* Form */}
        <CreateZoneForm onSuccess={() => navigate('/zones')} />
      </div>
    </div>
  );
}
