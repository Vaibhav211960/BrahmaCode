import React from "react";
import { Trophy } from "lucide-react";

const ProfileSidebar = ({ athlete }) => {
  return (
    <aside className="w-full lg:w-80 space-y-6">
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100/50 p-8 border border-gray-100 text-center">
        <div className="relative inline-block mb-6">
          <img
            src={athlete.img || "https://via.placeholder.com/150"}
            alt="Athlete"
            className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-xl"
          />
          <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-xl shadow-lg border-2 border-white">
            <Trophy size={16} />
          </div>
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-1">
          {athlete.name}
        </h2>
        <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-6">
          {athlete.sport} • {athlete.specialization}
        </p>
        <div
          className={`py-2 px-4 rounded-xl inline-block text-xs font-black uppercase tracking-widest border-2 ${athlete.readiness > 80 ? "bg-emerald-50 border-emerald-100 text-emerald-600" : "bg-red-50 border-red-100 text-red-600"}`}
        >
          {athlete.readiness > 80 ? "Ready to Train" : "Recovery Needed"}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8 text-left">
          <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-[10px] font-black text-gray-400 uppercase">
              Height
            </p>
            <p className="font-bold text-gray-800">{athlete.height}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-[10px] font-black text-gray-400 uppercase">
              Weight
            </p>
            <p className="font-bold text-gray-800">{athlete.weight}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-[10px] font-black text-gray-400 uppercase">
              Age
            </p>
            <p className="font-bold text-gray-800">{athlete.age}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-[10px] font-black text-gray-400 uppercase">
              BMI
            </p>
            <p className="font-bold text-gray-800">{athlete.bmi}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ProfileSidebar;