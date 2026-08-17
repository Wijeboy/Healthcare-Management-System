import React from "react";
import { AlertTriangle } from "lucide-react";

const MedicalSummaryCard = ({ medical }) => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-bold text-slate-900 leading-tight">
            Medical Summary
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Important clinical information and alerts
          </p>
        </div>
        <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
          <AlertTriangle size={16} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Allergies Box */}
        <div className="bg-amber-50/60 border border-amber-200/60 rounded-xl p-4 text-xs">
          <p className="text-[10px] font-bold text-amber-900 uppercase tracking-wider">
            ALLERGIES
          </p>
          <p className="font-bold text-slate-900 mt-1">{medical.allergies}</p>
          <p className="text-[11px] text-slate-500 mt-1">
            {medical.allergiesNote}
          </p>
        </div>

        {/* Existing Conditions Box */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-xs">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            EXISTING CONDITIONS
          </p>
          <p className="font-bold text-slate-900 mt-1">
            {medical.existingCondition}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            {medical.existingConditionNote}
          </p>
        </div>

        {/* Current Medication Box */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-xs">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            CURRENT MEDICATION
          </p>
          <p className="font-bold text-slate-900 mt-1">
            {medical.currentMedication}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            {medical.currentMedicationNote}
          </p>
        </div>

        {/* Latest Visit Box */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-xs">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            LATEST VISIT TYPE
          </p>
          <p className="font-bold text-slate-900 mt-1">
            {medical.latestVisitType}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            {medical.latestVisitNote}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MedicalSummaryCard;
