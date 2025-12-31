import React, { useState } from "react";
import { Mail, Phone, Lock, Building2, Info, FileText } from "lucide-react";
import { createServiceProvider } from "../../../../../api/adminApis";

const CreateNewSP = () => {
  const [formData, setFormData] = useState({
    name: "King Technology",
    about: "We build scalable enterprise solutions...",
    description:
      "We build scalable enterprise solutions with cutting-edge technology, serving clients globally since 2015.",
    email: "amr_imad@hotmail.com",
    phone_number: "+1 (555) 123-4567",
    password: "Aa@123456",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createServiceProvider(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen  bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">
        {/* Header Section */}
        <div className="bg-slate-900 px-8 py-10 text-white">
          <h2 className="text-3xl font-light tracking-tight">
            Company Profile
          </h2>
          <p className="text-slate-400 mt-2 font-light">
            Update your organization's global identity and security settings.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Company Name (Full Width) */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Building2 size={16} className="text-indigo-500" /> Company Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none bg-slate-50/50"
              placeholder="e.g. King Technology"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Mail size={16} className="text-indigo-500" /> Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Phone size={16} className="text-indigo-500" /> Phone Number
              </label>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
              />
            </div>
          </div>

          {/* About (Short Text) */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Info size={16} className="text-indigo-500" /> Tagline / About
            </label>
            <input
              name="about"
              value={formData.about}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
            />
          </div>

          {/* Description (Textarea) */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <FileText size={16} className="text-indigo-500" /> Full
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none resize-none"
            />
          </div>

          {/* Password Section (Highlighted) */}
          <div className="pt-4 border-t border-slate-100">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Lock size={16} className="text-indigo-500" /> Security Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none bg-slate-50/50"
              />
            </div>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewSP;
