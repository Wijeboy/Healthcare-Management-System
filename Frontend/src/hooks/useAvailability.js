import { useEffect, useState } from "react";
import { fetchAvailability, updateAvailabilitySlot } from "../api/doctorApi";

export function useAvailability() {
  const [overrides, setOverrides] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchAvailability().then((data) => {
      if (mounted) {
        setOverrides(data);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  function statusFor(day, hour) {
    return overrides[`${day}-${hour}`] || "Available";
  }

  async function setSlotStatus(day, hour, status) {
    setOverrides((prev) => ({ ...prev, [`${day}-${hour}`]: status }));
    await updateAvailabilitySlot(day, hour, status);
  }

  return { loading, statusFor, setSlotStatus };
}
