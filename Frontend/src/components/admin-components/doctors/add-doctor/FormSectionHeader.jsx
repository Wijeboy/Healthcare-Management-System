import React from 'react'

const FormSectionHeader = ({ number, title, description }) => {
  return (
    <div className="flex items-start gap-3.5 mb-6">
      <div className="w-8 h-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center font-bold text-sm shrink-0">
        {number}
      </div>
      <div>
        <h3 className="text-base font-bold text-slate-900 leading-tight">
          {title}
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">{description}</p>
      </div>
    </div>
  );
};

export default FormSectionHeader