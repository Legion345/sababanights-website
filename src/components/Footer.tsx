export function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">🕺 Israeli Dancing Night 💃</h3>
            <p className="text-blue-200">
              Bringing the joy and tradition of Israeli folk dance to our community, 
              one step at a time.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-blue-200">
              <li>📅 Weekly Sessions</li>
              <li>👥 Meet Our Team</li>
              <li>📧 Contact Us</li>
              <li>🎵 Dance Styles</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Session Info</h4>
            <div className="text-blue-200 space-y-2">
              <p>📍 Community Center</p>
              <p>📅 Every Thursday</p>
              <p>⏰ 7:30 PM - 10:00 PM</p>
              <p>💰 $15 per session</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
          <p>&copy; 2024 Israeli Dancing Night. Made with ❤️ for our dancing community.</p>
        </div>
      </div>
    </footer>
  );
}
