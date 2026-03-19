import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMapPin, faShieldAlt } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="flex items-center gap-2 font-bold text-gray-800 mb-3">
              <FontAwesomeIcon icon={faShieldAlt} className="text-primary-600" />
              About Phylax
            </h3>
            <p className="text-sm text-gray-600">
              Community-driven disaster response platform connecting people to help and support affected zones.
            </p>
          </div>
          <div>
            <h3 className="flex items-center gap-2 font-bold text-gray-800 mb-3">
              <FontAwesomeIcon icon={faMapPin} className="text-primary-600" />
              Quick Links
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>
                <Link to="/zones" className="hover:text-primary-600">
                  View Zones
                </Link>
              </li>
              <li>
                <Link to="/contributions" className="hover:text-primary-600">
                  Contributions
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-primary-600">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="flex items-center gap-2 font-bold text-gray-800 mb-3">
              <FontAwesomeIcon icon={faHeart} className="text-danger-600" />
              Support
            </h3>
            <p className="text-sm text-gray-600">
              Join our community to help in disaster response and support affected areas.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          <p>
            Copyright {new Date().getFullYear()} Phylax. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
