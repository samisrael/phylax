import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShieldAlt,
  faUsers,
  faMap,
  faHandHoldingHeart,
  faArrowRight,
  faLightbulb,
  faHeartbeat,
  faGlobeAmericas,
} from '@fortawesome/free-solid-svg-icons';
import useAuthStore from '../store/authStore';

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar for non-authenticated users */}
      {!isAuthenticated && (
        <nav className="bg-white shadow-md border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faShieldAlt} className="text-primary-600 text-2xl" />
              <span className="text-xl font-bold text-gray-800">Phylax</span>
            </div>
            <div className="space-x-4">
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-2 text-primary-600 font-medium hover:bg-primary-50 rounded-lg"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-6 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700"
              >
                Get Started
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Community-Driven Disaster Response
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Connect communities, coordinate relief efforts, and save lives together
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() =>
                isAuthenticated ? navigate('/dashboard') : navigate('/login')
              }
              className="px-8 py-3 bg-white text-primary-600 font-bold rounded-lg hover:bg-gray-100 flex items-center gap-2"
            >
              Get Started <FontAwesomeIcon icon={faArrowRight} />
            </button>
            <button
              onClick={() =>
                isAuthenticated ? navigate('/zones') : navigate('/login')
              }
              className="px-8 py-3 bg-primary-500 text-white font-bold rounded-lg hover:bg-primary-600 border border-primary-400 flex items-center gap-2"
            >
              View Zones <FontAwesomeIcon icon={faMap} />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Why Choose Phylax?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
              <FontAwesomeIcon
                icon={faUsers}
                size="2x"
                className="text-primary-600 mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Community Power
              </h3>
              <p className="text-gray-600">
                Harness the collective strength of communities to respond faster and more effectively to disasters.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
              <FontAwesomeIcon
                icon={faLightbulb}
                size="2x"
                className="text-primary-600 mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Smart Insights
              </h3>
              <p className="text-gray-600">
                Real-time risk assessment and data-driven insights to guide response strategies.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
              <FontAwesomeIcon
                icon={faHeartbeat}
                size="2x"
                className="text-primary-600 mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Continuous Support
              </h3>
              <p className="text-gray-600">
                All-in-one platform for tracking contributions and managing relief operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { number: '1', title: 'Register', desc: 'Sign up and create your profile' },
              { number: '2', title: 'Explore Zones', desc: 'View affected disaster zones' },
              { number: '3', title: 'Contribute', desc: 'Provide supplies, funds, or volunteer' },
              { number: '4', title: 'Make Impact', desc: 'See your contribution help' },
            ].map((step) => (
              <div key={step.number} className="text-center">
                <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-primary-100 mb-6">
            Join thousands of community members helping disaster-affected areas recover and rebuild.
          </p>
          <button
            onClick={() =>
              isAuthenticated ? navigate('/dashboard') : navigate('/register')
            }
            className="px-8 py-3 bg-white text-primary-600 font-bold rounded-lg hover:bg-gray-100"
          >
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="flex items-center justify-center gap-2 mb-2">
            <FontAwesomeIcon icon={faShieldAlt} className="text-primary-400" />
            <span className="font-bold text-white">Phylax</span>
          </p>
          <p className="text-sm mb-4">
            Empowering communities in disaster response
          </p>
          <p className="text-xs border-t border-gray-700 pt-4">
            Copyright {new Date().getFullYear()} Phylax. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
