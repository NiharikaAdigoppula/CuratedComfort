import React, { useState } from "react";
import { User, Lock, Save, ShieldAlert, KeyRound } from "lucide-react";
import { useBlog } from "../../context/BlogContext";
import AdminDashboardLayout from "./AdminDashboardLayout";

export default function AdminProfile() {
  const { updatePassword } = useBlog();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword.length < 4) {
      alert("New password must be at least 4 characters long!");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirm block do not match perfectly!");
      return;
    }

    const success = updatePassword(oldPassword, newPassword);
    if (success) {
      alert("Password successfully updated! Keep this coordinate secured.");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      alert("Verification failed: The 'Current Password' you provided was incorrect.");
    }
  };

  return (
    <AdminDashboardLayout activeTab="/admin/profile">
      <div className="space-y-6 max-w-xl" id="cms-profile-coordinator">
        
        {/* Title breakdown */}
        <div>
          <h1 className="text-xl font-bold font-serif text-brand-brown-dark font-sans">
            Editorial Password Controls
          </h1>
          <p className="text-xs text-brand-beige-dark">
            Modify credentials to ensure other terminal nodes cannot access the CMS Dashboard coordinates without authorization.
          </p>
        </div>

        {/* Change password action card */}
        <div className="bg-white p-6 rounded-2xl border border-brand-beige-light shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            <h2 className="text-[10.5px] uppercase tracking-wider font-extrabold text-brand-brown-light border-b pb-2.5 border-brand-beige-light/50 flex items-center gap-1.5">
              <KeyRound size={14} className="text-brand-sage-dark" />
              <span>Modify session secrets</span>
            </h2>

            {/* Mock profile row */}
            <div className="bg-brand-cream/40 p-4 rounded-xl flex items-center gap-3.5 border border-brand-beige-light/45 mb-2 select-none">
              <div className="w-10 h-10 rounded-full bg-brand-brown-light text-white flex items-center justify-center font-serif text-base font-bold">
                A
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-brand-badge-dark text-brand-brown-light">Logged Profile Role</span>
                <h3 className="font-serif font-extrabold text-[13.5px] text-brand-brown-dark">Chief Editor (admin)</h3>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-wider font-bold text-brand-brown-light">Current Password</label>
              <input
                type="password"
                required
                placeholder="Fill current password to permit change"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full bg-brand-cream/15 p-2.5 rounded-lg border border-brand-beige-light focus:outline-none focus:ring-1 focus:ring-brand-beige-dark"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider font-bold text-brand-brown-light">New CMS Password</label>
                <input
                  type="password"
                  required
                  placeholder="At least 4 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-brand-cream/15 p-2.5 rounded-lg border border-brand-beige-light focus:outline-none focus:ring-1 focus:ring-brand-beige-dark font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider font-bold text-brand-brown-light">Confirm password block</label>
                <input
                  type="password"
                  required
                  placeholder="Re-type new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-brand-cream/15 p-2.5 rounded-lg border border-brand-beige-light focus:outline-none focus:ring-1 focus:ring-brand-beige-dark font-sans"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="bg-brand-brown-light hover:bg-brand-brown-dark text-brand-cream px-4 py-2.5 rounded-lg font-bold uppercase transition-colors tracking-wider"
              >
                Authenticate password modification
              </button>
            </div>

          </form>
        </div>

      </div>
    </AdminDashboardLayout>
  );
}
