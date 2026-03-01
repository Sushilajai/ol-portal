import StatCard from "../components/dashboard/StatCard";
import RecentActivity from "../components/dashboard/RecentActivity";
// import TopQuickActions from "../components/dashboard/TopQuickActions";

const Dashboard = () => {
  return (
    <div className="space-y-6">

      {/* 🔥 Horizontal Quick Actions */}
      {/* <TopQuickActions /> */}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Companies Under Liquidation"
          value="248"
          subtitle="12% from last month"
          type="companies"
          trend="up"
        />

        <StatCard
          title="Total Documents Uploaded"
          value="1,547"
          subtitle="18% from last week"
          type="documents"
          trend="up"
        />

        <StatCard
          title="Pending Document Upload"
          value="23"
          subtitle="3 new today"
          type="pending"
          trend="down"
        />

        <StatCard
          title="Total Amalgamation Cases"
          value="12"
          subtitle="2 processed this week"
          type="amalgamation"
          trend="neutral"
        />
      </div>

      <RecentActivity />
    </div>
  );
};

export default Dashboard;
//export default Dashboard;