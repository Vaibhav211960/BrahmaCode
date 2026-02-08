import React from "react";
import { Bell, Edit3, X, Mail } from "lucide-react";
import HeaderNotifications from "./HeaderNotifications";

const DashboardLayout = ({
  children,
  athleteName,
  onEditProfile,
  coachInvitations,
  showCoachInvitations,
  setShowCoachInvitations,
  dropdownRef,
  onAcceptInvitation,
  onDeclineInvitation,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 relative">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Welcome back, {athleteName}
            </h1>
            <p className="text-gray-600 mt-2">
              Track your performance and stay connected
            </p>
          </div>

          <div className="flex items-center gap-3">
            <HeaderNotifications
              coachInvitations={coachInvitations}
              showCoachInvitations={showCoachInvitations}
              setShowCoachInvitations={setShowCoachInvitations}
              dropdownRef={dropdownRef}
              onAcceptInvitation={onAcceptInvitation}
              onDeclineInvitation={onDeclineInvitation}
            />

            <button
              onClick={onEditProfile}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-700 rounded-xl transition-all"
            >
              <Edit3 className="w-5 h-5" />
              <span className="hidden md:inline">Edit Profile</span>
            </button>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;