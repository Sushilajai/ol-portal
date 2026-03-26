import { useState } from "react";
import { User, Mail, Briefcase, Lock, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleUpdatePassword = () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      alert("Please fill all password fields");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    // Show success toast
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);

    // Reset form
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  if (!user) {
    return <div className="p-4 sm:p-6 lg:p-8 text-center">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">Profile Settings</h1>
          <p className="text-slate-600 text-sm sm:text-base">Manage your account information</p>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="bg-slate-200 text-slate-800 hover:bg-slate-300 px-4 py-2 rounded-lg font-medium mb-6 flex items-center gap-2 w-max shadow-sm transition-all duration-200 active:scale-95"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Account Overview */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">Account Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
                <User size={16} className="text-blue-600" />
                Full Name
              </label>
              <div className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 font-medium">
                {user.name}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Mail size={16} className="text-blue-600" />
                Email Address
              </label>
              <div className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 font-medium">
                {user.email}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Briefcase size={16} className="text-blue-600" />
                Role
              </label>
              <div className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  {user.role}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Department</label>
              <div className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 font-medium">
                {user.role === "AccountsAdmin" ? "Accounts" : user.role === "TD_Admin" ? "Target & Dividend" : user.role === "DispatchClerk" ? "Dispatch" : "Administration"}
              </div>
            </div>
          </div>
        </div>

        {/* Change Password Accordion */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden">
          {/* Accordion Header */}
          <button
            onClick={() => setIsPasswordOpen(!isPasswordOpen)}
            className="w-full px-6 sm:px-8 py-6 flex items-center justify-between hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <Lock size={24} className="text-purple-600 flex-shrink-0" />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Change Password</h2>
            </div>
            {isPasswordOpen ? (
              <ChevronUp size={24} className="text-slate-600 flex-shrink-0" />
            ) : (
              <ChevronDown size={24} className="text-slate-600 flex-shrink-0" />
            )}
          </button>

          {/* Accordion Content */}
          {isPasswordOpen && (
            <div className="border-t border-slate-200 px-6 sm:px-8 py-6 space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Current Password</label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  placeholder="Enter your current password"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">New Password</label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  placeholder="Enter your new password"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Confirm New Password</label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  placeholder="Confirm your new password"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all"
                />
              </div>

              <button
                onClick={handleUpdatePassword}
                className="w-full py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <Lock size={20} />
                Update Password
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg font-semibold animate-fade-in-up">
          ✓ Password updated successfully
        </div>
      )}
    </div>
  );
};

export default Profile;
