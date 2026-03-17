import { useState, useRef } from "react";
import { User, Mail, Phone, Briefcase, Save, Upload, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useGlobalState } from "../context/GlobalStateContext";

const Profile = () => {
  const { user } = useAuth();
  const { state, updateUserProfile } = useGlobalState();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const userProfile = state.users.find(u => u.email === user?.email);
  
  const [formData, setFormData] = useState({
    phoneNumber: userProfile?.phoneNumber || "",
    additionalDesignation: userProfile?.additionalDesignation || "",
  });
  
  const [profilePicture, setProfilePicture] = useState<string>(userProfile?.profilePicture || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setProfilePicture(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    if (!userProfile) return;
    
    setIsSaving(true);
    setTimeout(() => {
      updateUserProfile(userProfile.id, {
        phoneNumber: formData.phoneNumber,
        additionalDesignation: formData.additionalDesignation,
        profilePicture: profilePicture,
      });
      setIsSaving(false);
    }, 500);
  };

  if (!user || !userProfile) {
    return <div className="p-6 text-center">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Profile Settings</h1>
          <p className="text-slate-600">Manage your account information and preferences</p>
        </div>

        {/* Profile Picture Section */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Profile Picture</h2>
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                {profilePicture ? (
                  <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="text-white" size={64} />
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <Upload size={20} />
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <p className="text-sm text-slate-600 text-center">
              Click the upload button to change your profile picture
            </p>
          </div>
        </div>

        {/* Read-Only Information */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Account Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
                <User size={16} className="text-blue-600" />
                Full Name
              </label>
              <div className="px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 font-medium">
                {userProfile.name}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Mail size={16} className="text-blue-600" />
                Email Address
              </label>
              <div className="px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 font-medium">
                {userProfile.email}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Briefcase size={16} className="text-blue-600" />
                Role
              </label>
              <div className="px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  {userProfile.role}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Department</label>
              <div className="px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 font-medium">
                {userProfile.department}
              </div>
            </div>
          </div>
        </div>

        {/* Editable Information */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Additional Information</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Phone size={16} className="text-green-600" />
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Briefcase size={16} className="text-purple-600" />
                Additional Designation
              </label>
              <input
                type="text"
                value={formData.additionalDesignation}
                onChange={(e) => setFormData({ ...formData, additionalDesignation: e.target.value })}
                placeholder="e.g., Senior Officer, Team Lead"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all"
              />
            </div>

            <button
              onClick={handleSaveProfile}
              disabled={isSaving}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Save size={20} />
              {isSaving ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
