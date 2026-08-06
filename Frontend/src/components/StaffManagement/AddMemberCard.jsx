import React from 'react'
import { UserPlus } from "lucide-react";

const AddMemberCard = () => {
  return (
    <button className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center gap-3 text-slate-500 hover:border-slate-300 hover:bg-slate-50/50 transition-all min-h-[220px]">
      <div className="p-3 bg-slate-100 rounded-xl text-slate-500">
        <UserPlus className="w-6 h-6" />
      </div>
      <span className="text-sm font-semibold text-slate-700">
        Add New Member
      </span>
    </button>
  );
}

export default AddMemberCard