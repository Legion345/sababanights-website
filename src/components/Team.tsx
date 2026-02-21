import { useData } from "../contexts/DataContext";

export function Team() {
  const { teamMembers } = useData();

  return (
    <section id="team" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-red-900 mb-4">
            Meet Our Team 👥
          </h1>
          <p className="text-xl text-gray-600">
            The passionate people who make our dancing community special
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No team members yet</h3>
              <p className="text-gray-500">Add the first team member to get started!</p>
            </div>
          ) : (
            teamMembers.map((member) => (
              <div key={member.id} className="bg-gray-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                  {member.imageUrl ? (
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-6xl">👤</div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-red-900 mb-1">{member.name}</h3>
                  <p className="text-red-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">{member.bio}</p>
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="inline-flex items-center text-red-600 hover:text-red-800 text-sm"
                    >
                      <span className="mr-2">📧</span>
                      Contact
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
