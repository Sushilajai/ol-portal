const RecentActivity = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm col-span-2">

     <h2 className="text-lg font-semibold mb-4">✅ Recent Activity</h2>
      <ul className="space-y-4 text-sm text-gray-600">
        <li>📄 Document UID-3421 uploaded by Officer A</li>
        <li>📄 Case 2021/45 marked Completed by Officer B</li>
        <li>📄 Added 3 new companies by Officer C</li>
      </ul>
    </div>
  );
};

export default RecentActivity;