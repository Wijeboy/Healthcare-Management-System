import React, { useEffect, useState } from "react";
import { Mail, Phone, MapPin, GraduationCap, Languages, Save, Pencil, Camera } from "lucide-react";
import { useDoctorProfile } from "../../hooks/useDoctorProfile";

export default function DoctorProfilePage() {
  const { profile, loading, saveProfile } = useDoctorProfile();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (profile) setForm(profile); }, [profile]);

  async function handleSave() {
    setSaving(true);
    await saveProfile({ ...form, education: form.education.map((e) => e.trim()).filter(Boolean) });
    setSaving(false);
    setEditing(false);
  }

  function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((prev) => ({ ...prev, photoUrl: reader.result }));
    reader.readAsDataURL(file);
  }

  if (loading || !form) return <div className="p-8 text-sm text-on-surface-variant">Loading profile\u2026</div>;

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-on-surface">Doctor Profile</h2>
          <p className="mt-1 text-sm text-on-surface-variant">Your professional details as shown to patients and staff.</p>
        </div>
        {!editing ? (
          <button onClick={() => setEditing(true)} className="flex items-center gap-2 rounded-lg border border-outline-variant bg-white px-4 py-2 text-sm font-medium text-on-surface-variant hover:bg-slate-50">
            <Pencil size={15} /> Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => { setForm(profile); setEditing(false); }} className="rounded-lg border border-outline-variant bg-white px-4 py-2 text-sm font-medium text-on-surface-variant hover:bg-slate-50">Cancel</button>
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary hover:bg-primary-container disabled:opacity-50">
              <Save size={15} /> {saving ? "Saving\u2026" : "Save Changes"}
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 rounded-2xl border border-outline-variant bg-white p-6 text-center">
          <div className="relative mx-auto mb-3 h-20 w-20">
            {form.photoUrl ? (
              <img src={form.photoUrl} alt={form.name} className="h-20 w-20 rounded-full object-cover" />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
                {form.name.split(" ").slice(1).map((n) => n[0]).join("")}
              </div>
            )}
            {editing && (
              <label className="absolute bottom-0 right-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-primary text-white ring-2 ring-white hover:bg-primary-container">
                <Camera size={13} />
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              </label>
            )}
          </div>
          {editing ? (
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mb-1 w-full rounded-lg border border-outline-variant px-2 py-1 text-center text-base font-semibold" />
          ) : (
            <p className="text-base font-semibold text-on-surface">{form.name}</p>
          )}
          {editing ? (
            <input value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="mb-4 w-full rounded-lg border border-outline-variant px-2 py-1 text-center text-sm" />
          ) : (
            <p className="text-sm text-on-surface-variant">{form.department}</p>
          )}
          <div className="mt-4 rounded-xl bg-slate-50 p-3 text-left">
            <p className="text-[10px] uppercase text-on-surface-variant">License No.</p>
            {editing ? (
              <input value={form.licenseNo} onChange={(e) => setForm({ ...form, licenseNo: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant bg-white px-2 py-1 text-sm font-semibold" />
            ) : (
              <p className="text-sm font-semibold text-on-surface">{form.licenseNo}</p>
            )}
          </div>
          <div className="mt-2 rounded-xl bg-slate-50 p-3 text-left">
            <p className="text-[10px] uppercase text-on-surface-variant">Experience</p>
            {editing ? (
              <div className="mt-1 flex items-center gap-2">
                <input type="number" min="0" value={form.experienceYears} onChange={(e) => setForm({ ...form, experienceYears: Number(e.target.value) })} className="w-full rounded-lg border border-outline-variant bg-white px-2 py-1 text-sm font-semibold" />
                <span className="shrink-0 text-xs text-on-surface-variant">years</span>
              </div>
            ) : (
              <p className="text-sm font-semibold text-on-surface">{form.experienceYears} years</p>
            )}
          </div>
        </div>

        <div className="col-span-2 space-y-6">
          <div className="rounded-2xl border border-outline-variant bg-white p-6">
            <h3 className="mb-4 text-sm font-semibold text-on-surface">Contact Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 flex items-center gap-1.5 text-[11px] uppercase text-on-surface-variant"><Mail size={12} /> Email</label>
                {editing ? <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-lg border border-outline-variant px-3 py-2 text-sm" /> : <p className="text-sm font-medium text-on-surface">{form.email}</p>}
              </div>
              <div>
                <label className="mb-1 flex items-center gap-1.5 text-[11px] uppercase text-on-surface-variant"><Phone size={12} /> Phone</label>
                {editing ? <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-lg border border-outline-variant px-3 py-2 text-sm" /> : <p className="text-sm font-medium text-on-surface">{form.phone}</p>}
              </div>
              <div>
                <label className="mb-1 flex items-center gap-1.5 text-[11px] uppercase text-on-surface-variant"><MapPin size={12} /> Clinic Room</label>
                {editing ? <input value={form.clinicRoom} onChange={(e) => setForm({ ...form, clinicRoom: e.target.value })} className="w-full rounded-lg border border-outline-variant px-3 py-2 text-sm" /> : <p className="text-sm font-medium text-on-surface">{form.clinicRoom}</p>}
              </div>
              <div>
                <label className="mb-1 flex items-center gap-1.5 text-[11px] uppercase text-on-surface-variant"><Languages size={12} /> Languages</label>
                {editing ? (
                  <input value={form.languages.join(", ")} onChange={(e) => setForm({ ...form, languages: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} className="w-full rounded-lg border border-outline-variant px-3 py-2 text-sm" />
                ) : (
                  <p className="text-sm font-medium text-on-surface">{form.languages.join(", ")}</p>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-outline-variant bg-white p-6">
            <h3 className="mb-2 text-sm font-semibold text-on-surface">About</h3>
            {editing ? <textarea rows={3} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="w-full rounded-lg border border-outline-variant px-3 py-2 text-sm" /> : <p className="text-sm leading-relaxed text-on-surface-variant">{form.bio}</p>}
          </div>

          <div className="rounded-2xl border border-outline-variant bg-white p-6">
            <h3 className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-on-surface"><GraduationCap size={15} /> Education &amp; Qualifications</h3>
            {editing ? (
              <>
                <textarea rows={4} value={form.education.join("\n")} onChange={(e) => setForm({ ...form, education: e.target.value.split("\n") })} className="w-full rounded-lg border border-outline-variant px-3 py-2 text-sm" />
                <p className="mt-1.5 text-[11px] text-on-surface-variant">One qualification per line.</p>
              </>
            ) : (
              <ul className="space-y-1.5 text-sm text-on-surface-variant">
                {form.education.map((e, i) => (
                  <li key={i} className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{e}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
