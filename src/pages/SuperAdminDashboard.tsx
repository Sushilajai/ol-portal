import { Building2, DollarSign, Truck, Target } from "lucide-react";
import { useGlobalState } from "../context/GlobalStateContext";

const SuperAdminDashboard = () => {
  const { getMetrics } = useGlobalState();
  const metrics = getMetrics();

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-600">System overview and key metrics</p>
        </div>

        {/* Primary Metrics - 4 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Total Companies Card */}
          <div className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-blue-200 hover:border-blue-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-blue-600 p-4 rounded-lg group-hover:bg-blue-700 transition-colors">
                  <Building2 className="text-white" size={28} />
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-blue-700 bg-blue-200 px-3 py-1 rounded-full">Total</span>
                </div>
              </div>
              <p className="text-5xl font-bold text-blue-900 mb-2">{metrics.totalCompanies}</p>
              <p className="text-blue-700 text-sm font-medium mb-4">Companies Under Liquidation</p>
              <div className="space-y-3 pt-4 border-t border-blue-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-700">Active</span>
                  <span className="text-lg font-bold text-blue-900">{metrics.activeCompanies}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-700">Dissolved</span>
                  <span className="text-lg font-bold text-blue-900">{metrics.dissolvedCompanies}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Health Card */}
          <div className="group bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-emerald-200 hover:border-emerald-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-emerald-600 p-4 rounded-lg group-hover:bg-emerald-700 transition-colors">
                  <DollarSign className="text-white" size={28} />
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-200 px-3 py-1 rounded-full">Revenue</span>
                </div>
              </div>
              <p className="text-5xl font-bold text-emerald-900 mb-2">₹{(metrics.totalPaidBills / 100000).toFixed(1)}L</p>
              <p className="text-emerald-700 text-sm font-medium mb-4">Total Collected</p>
              <div className="space-y-3 pt-4 border-t border-emerald-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-emerald-700">Paid Bills</span>
                  <span className="text-lg font-bold text-emerald-900">{metrics.totalPaidBills > 0 ? '✓' : '—'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-emerald-700">Pending</span>
                  <span className="text-lg font-bold text-emerald-900">₹{(metrics.totalUnpaidBills / 100000).toFixed(1)}L</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dispatch Status Card */}
          <div className="group bg-gradient-to-br from-violet-50 to-violet-100 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-violet-200 hover:border-violet-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-violet-600 p-4 rounded-lg group-hover:bg-violet-700 transition-colors">
                  <Truck className="text-white" size={28} />
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-violet-700 bg-violet-200 px-3 py-1 rounded-full">Logistics</span>
                </div>
              </div>
              <p className="text-5xl font-bold text-violet-900 mb-2">{metrics.dispatchedItems}</p>
              <p className="text-violet-700 text-sm font-medium mb-4">Items Dispatched</p>
              <div className="space-y-3 pt-4 border-t border-violet-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-violet-700">Pending</span>
                  <span className="text-lg font-bold text-violet-900">{metrics.pendingDispatches}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-violet-700">Delivered</span>
                  <span className="text-lg font-bold text-violet-900">{metrics.deliveredItems}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Liquidation Status Card */}
          <div className="group bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-amber-200 hover:border-amber-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-amber-600 p-4 rounded-lg group-hover:bg-amber-700 transition-colors">
                  <Target className="text-white" size={28} />
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-amber-700 bg-amber-200 px-3 py-1 rounded-full">Cases</span>
                </div>
              </div>
              <p className="text-5xl font-bold text-amber-900 mb-2">{metrics.activeCompanies}</p>
              <p className="text-amber-700 text-sm font-medium mb-4">Active Cases</p>
              <div className="space-y-3 pt-4 border-t border-amber-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-amber-700">In Progress</span>
                  <span className="text-lg font-bold text-amber-900">{metrics.activeCompanies}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-amber-700">Completed</span>
                  <span className="text-lg font-bold text-amber-900">{metrics.dissolvedCompanies}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-8">Summary Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="group">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 group-hover:shadow-md transition-all duration-300 border border-blue-200">
                <p className="text-4xl font-bold text-blue-700 mb-2">{metrics.totalCompanies}</p>
                <p className="text-sm text-slate-600">Total Companies</p>
              </div>
            </div>
            <div className="group">
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-6 group-hover:shadow-md transition-all duration-300 border border-emerald-200">
                <p className="text-4xl font-bold text-emerald-700 mb-2">₹{(metrics.totalPaidBills / 100000).toFixed(1)}L</p>
                <p className="text-sm text-slate-600">Revenue Collected</p>
              </div>
            </div>
            <div className="group">
              <div className="bg-gradient-to-br from-violet-50 to-violet-100 rounded-lg p-6 group-hover:shadow-md transition-all duration-300 border border-violet-200">
                <p className="text-4xl font-bold text-violet-700 mb-2">{metrics.dispatchedItems + metrics.deliveredItems}</p>
                <p className="text-sm text-slate-600">Total Dispatches</p>
              </div>
            </div>
            <div className="group">
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-6 group-hover:shadow-md transition-all duration-300 border border-amber-200">
                <p className="text-4xl font-bold text-amber-700 mb-2">{metrics.activeCompanies}</p>
                <p className="text-sm text-slate-600">Active Cases</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;