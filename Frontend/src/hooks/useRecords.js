import { useEffect, useMemo, useState } from "react";
import { fetchRecords, updateRecordResult, uploadRecord } from "../api/recordsApi";

export function useRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [result, setResult] = useState("All Results");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchRecords()
      .then((data) => { if (mounted) setRecords(data); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return records.filter((r) => {
      const matchesSearch =
        q === "" || r.reportName.toLowerCase().includes(q) || r.patient.toLowerCase().includes(q);
      const matchesCategory = category === "All Categories" || r.category === category;
      const matchesResult = result === "All Results" || r.result === result;
      return matchesSearch && matchesCategory && matchesResult;
    });
  }, [records, search, category, result]);

  async function setRecordResult(id, newResult) {
    setRecords((prev) => prev.map((r) => (r.id === id ? { ...r, result: newResult } : r)));
    await updateRecordResult(id, newResult);
  }

  async function addRecord(payload) {
    const created = await uploadRecord(payload);
    setRecords((prev) => [created, ...prev]);
    return created;
  }

  return {
    records: filtered,
    loading,
    search,
    setSearch,
    category,
    setCategory,
    result,
    setResult,
    setRecordResult,
    addRecord,
  };
}
