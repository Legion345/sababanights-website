import { useAuth } from "../contexts/AuthContext";

export function SignOutButton() {
  const { signOut, user } = useAuth();

  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm text-gray-600">
        Welcome, {user?.name}!
      </span>
      <button
        onClick={signOut}
        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm"
      >
        Sign Out
      </button>
    </div>
  );
}
