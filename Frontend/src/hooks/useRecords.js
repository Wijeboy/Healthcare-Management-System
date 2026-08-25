import { useEffect, useMemo, useState } from "react";
import { fetchRecords, updateRecordResult, uploadRecord } from "../services/doctorApi";

export function useRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [result, setResult] = useState("All");

  useEffect(() => {
    let mounted = true;
    fetchRecords().then((data) => { if (mounted) { setRecords(data); setLoading(false); } });
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return records.filter((r) => {
      const matchesSearch = q === "" || r.patient.toLowerCase().includes(q) || r.reportName.toLowerCase().includes(q);
      const matchesCategory = category === "All" || r.category === category;
      const matchesResult = result === "All" || r.result === result;
      return matchesSearch && matchesCategory && matchesResult;
    });
  }, [records, search, category, result]);

  async function setRecordResult(id, value) {
    setRecords((prev) => prev.map((r) => (r.id === id ? { ...r, result: value } : r)));
    await updateRecordResult(id, value);
  }

  async function addRecord(payload) {
    const created = await uploadRecord(payload);
    setRecords((prev) => [created, ...prev]);
    return created;
  }

  return { records: filtered, allRecords: records, loading, search, setSearch, category, setCategory, result, setResult, setRecordResult, addRecord };
}
