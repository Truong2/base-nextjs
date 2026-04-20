export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Profile</h1>
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="mb-6 flex items-center space-x-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-300">
            <span className="text-2xl text-gray-600">👤</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold">John Doe</h2>
            <p className="text-gray-600">john.doe@example.com</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-3 text-lg font-medium">Personal Information</h3>
            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <p className="text-gray-900">John Doe</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <p className="text-gray-900">john.doe@example.com</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <p className="text-gray-900">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-medium">Account Settings</h3>
            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Member Since
                </label>
                <p className="text-gray-900">January 2024</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Login
                </label>
                <p className="text-gray-900">Today at 2:30 PM</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
