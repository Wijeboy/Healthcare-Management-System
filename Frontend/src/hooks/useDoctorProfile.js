import { useEffect, useState } from "react";
import { fetchDoctorProfile, updateDoctorProfile } from "../api/doctorApi";

export function useDoctorProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchDoctorProfile().then((data) => {
      if (mounted) {
        setProfile(data);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  async function saveProfile(payload) {
    const updated = await updateDoctorProfile(payload);
    setProfile(updated);
    return updated;
  }

  return { profile, loading, saveProfile };
}
