import { Icon } from './Icon';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-red-900 mb-6">
            Sababa Nights Mostly Couples Israeli Dancing
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Join our vibrant community for an evening of traditional and modern Israeli folk dances. 
            All skill levels welcome!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="mb-2">
                <Icon icon={faCalendarDays} size="3x" className="text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Every Monday</h3>
              <p className="text-gray-600">8:00 PM - 12:00 AM</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="text-3xl mb-2">📍</div>
              <h3 className="font-semibold text-gray-900">Soho Dance LA</h3>
              <p className="text-gray-600">1618 Cotner Ave Los Angeles, CA 90025</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="text-3xl mb-2">💰</div>
              <h3 className="font-semibold text-gray-900">$20 </h3>
              <p className="text-gray-600">First time free!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Makes Our Dancing Special
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🎵</div>
              <h3 className="text-xl font-semibold mb-2">Authentic Music</h3>
              <p className="text-gray-600">
                Dance to traditional and contemporary Israeli music that will transport you to the heart of Israel.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">👨‍🏫</div>
              <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
              <p className="text-gray-600">
                Learn from experienced dancers who are passionate about sharing Israeli culture and traditions.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-2">Welcoming Community</h3>
              <p className="text-gray-600">
                Join a friendly group of dancers who support each other and celebrate the joy of movement together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
