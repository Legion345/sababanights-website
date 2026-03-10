import { useMemo } from 'react';
import { Icon } from './Icon';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { useData } from '../contexts/DataContext';
import flyerImg from '../assets/images/flyer.png';

export function Hero() {
  const { sessions } = useData();

  const upcomingMondays = useMemo(() => {
    const mondays = [];
    const today = new Date();
    const day = today.getDay(); // 0=Sun, 1=Mon...
    const daysUntilMonday = day === 1 ? 0 : (8 - day) % 7;
    const next = new Date(today);
    next.setDate(today.getDate() + daysUntilMonday);
    for (let i = 0; i < 3; i++) {
      const d = new Date(next);
      d.setDate(next.getDate() + i * 7);
      mondays.push(d);
    }
    return mondays;
  }, []);

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

      {/* Upcoming Events Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Flyer */}
            <div>
              <img src={flyerImg} alt="Event flyer" className="w-full rounded-lg shadow-lg" />
            </div>
            {/* Upcoming events */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Events</h2>
              <div className="space-y-8">
                {upcomingMondays.map((date) => (
                  <div key={date.toISOString()}>
                    <h3 className="text-lg font-semibold text-red-900 mb-2">
                      {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </h3>
                    <ul className="space-y-1">
                      {sessions.map((s) => (
                        <li key={s.id} className="flex justify-between text-gray-700">
                          <span>{s.title}</span>
                          <span className="text-gray-500 ml-4 whitespace-nowrap">{s.time}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
