import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faEnvelope,
  faUsers,
  faSpinner,
  faHeart,
  faCalendarDays
} from '@fortawesome/free-solid-svg-icons';
import { Icon } from './Icon';

/**
 * Example component demonstrating Font Awesome icon usage
 * Serves as reference for implementing icons throughout the app
 */
export function IconExample() {
  return (
    <div className="p-8 space-y-8 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900">Font Awesome Icon Examples</h2>

      {/* Example 1: Direct usage */}
      <section className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">1. Direct FontAwesomeIcon Usage</h3>
        <div className="flex items-center gap-4">
          <FontAwesomeIcon icon={faHome} className="text-blue-600" />
          <FontAwesomeIcon icon={faEnvelope} className="text-green-600" size="lg" />
          <FontAwesomeIcon icon={faUsers} className="text-purple-600" size="2x" />
        </div>
      </section>

      {/* Example 2: Using Icon wrapper */}
      <section className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">2. Custom Icon Component</h3>
        <div className="flex items-center gap-4">
          <Icon icon={faHome} className="text-blue-600" />
          <Icon icon={faEnvelope} size="lg" className="text-green-600" />
          <Icon icon={faUsers} size="2x" className="text-purple-600" />
        </div>
      </section>

      {/* Example 3: Icons in buttons */}
      <section className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">3. Icons in Buttons</h3>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <Icon icon={faEnvelope} />
            <span>Contact Us</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
            <Icon icon={faUsers} />
            <span>Join Team</span>
          </button>
        </div>
      </section>

      {/* Example 4: Animated icons */}
      <section className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">4. Animated Icons</h3>
        <div className="flex items-center gap-4">
          <Icon icon={faSpinner} spin className="text-blue-600" size="2x" />
          <Icon icon={faHeart} className="text-red-600 animate-pulse" size="2x" />
        </div>
      </section>

      {/* Example 5: Different sizes */}
      <section className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">5. Different Sizes</h3>
        <div className="flex items-center gap-4">
          <Icon icon={faHome} size="xs" className="text-gray-600" />
          <Icon icon={faHome} size="sm" className="text-gray-600" />
          <Icon icon={faHome} size="lg" className="text-gray-600" />
          <Icon icon={faHome} size="xl" className="text-gray-600" />
          <Icon icon={faHome} size="2x" className="text-gray-600" />
        </div>
      </section>

      {/* Example 6: Replacing emoji pattern */}
      <section className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">6. Info Card Pattern (Replacing Emojis)</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {/* Before */}
          <div className="bg-gray-50 rounded-lg shadow p-6 text-center">
            <p className="text-xs text-gray-500 mb-2">Before (Emoji):</p>
            <div className="text-3xl mb-2">📅</div>
            <h3 className="font-semibold text-gray-900">Every Monday</h3>
            <p className="text-gray-600">8:00 PM - 12:00 AM</p>
          </div>

          {/* After */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <p className="text-xs text-gray-500 mb-2">After (Font Awesome):</p>
            <div className="mb-2">
              <Icon icon={faCalendarDays} size="3x" className="text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Every Monday</h3>
            <p className="text-gray-600">8:00 PM - 12:00 AM</p>
          </div>
        </div>
      </section>

      {/* Code examples */}
      <section className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">Quick Reference</h3>
        <div className="bg-gray-100 p-4 rounded-md font-mono text-sm space-y-2">
          <p className="text-gray-800">// Import the icon</p>
          <p className="text-blue-600">import &#123; faHome &#125; from '@fortawesome/free-solid-svg-icons';</p>
          <p className="text-gray-800 mt-2">// Use directly</p>
          <p className="text-blue-600">&lt;FontAwesomeIcon icon=&#123;faHome&#125; /&gt;</p>
          <p className="text-gray-800 mt-2">// Or use wrapper (recommended)</p>
          <p className="text-blue-600">&lt;Icon icon=&#123;faHome&#125; size="lg" className="text-blue-600" /&gt;</p>
        </div>
      </section>
    </div>
  );
}
