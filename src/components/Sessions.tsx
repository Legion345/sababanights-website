import { useData } from "../contexts/DataContext";

export function Sessions() {
  const { sessions } = useData();

  return (
    <section id="sessions" className="bg-gradient-to-br from-red-100 to-red-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-red-900 mb-4">
            Partner Dancing - Session/Teaching Schedule
          </h1>
          <p className="text-xl text-gray-600">
            Join us for exciting Israeli folk dance sessions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.length === 0 ? (
            <div className="col-span-full text-center py-12">
            </div>
          ) : (
            sessions.map((session) => (
              <div key={session.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold text-red-900 mb-2">{session.title}</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center">
                    <span className="text-lg mr-2">📅</span>
                    <span>{session.date}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg mr-2">⏰</span>
                    <span>{session.time}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg mr-2">📍</span>
                    <span>{session.location}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg mr-2">👨‍🏫</span>
                    <span>{session.instructor}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg mr-2">📊</span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">
                      {session.level}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 mt-4">{session.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
