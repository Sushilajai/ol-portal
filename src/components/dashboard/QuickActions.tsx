const QuickActions = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm col-span-1">

      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">Quick Actions</h3>
        <button className="text-sm text-gray-500">+ Add Action</button>
      </div>

      <div className="space-y-3">
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
          + Add New Company
        </button>
        <button className="w-full bg-green-600 text-white py-2 rounded-lg">
          + Submit Document
        </button>
        <button className="w-full bg-purple-600 text-white py-2 rounded-lg">
          + Amalgamation
        </button>
        <button className="w-full bg-orange-500 text-white py-2 rounded-lg">
          + View Daily Reports
        </button>
      </div>
    </div>
  );
};

export default QuickActions;