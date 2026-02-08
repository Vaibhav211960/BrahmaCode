import React from "react";
import { X } from "lucide-react";

const ProfileEditModal = ({
  isOpen,
  formData,
  onClose,
  onChange,
  onSave,
  loading,
}) => {
  if (!isOpen) return null;

  const fields = [
    { label: "Full Name", name: "name", type: "text", placeholder: "Enter your name" },
    { label: "Email", name: "email", type: "email", placeholder: "Enter your email" },
    { label: "Sport", name: "sport", type: "text", placeholder: "e.g., Track & Field" },
    { label: "Specialization", name: "specialization", type: "text", placeholder: "e.g., 100m Sprint" },
    { label: "Age", name: "age", type: "number", placeholder: "Enter your age" },
    { label: "Height", name: "height", type: "text", placeholder: "e.g., 182 cm" },
    { label: "Weight", name: "weight", type: "text", placeholder: "e.g., 75 kg" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 font-sans">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 p-6 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-2xl font-black text-white">Edit Profile</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-blue-800 p-2 rounded-lg transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={onSave} className="p-6 space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={onChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none font-medium"
                placeholder={field.placeholder}
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={onChange}
              rows="3"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none font-medium resize-none"
              placeholder="Tell us about yourself..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;