const facilities = [
  { name: 'ICU Capacity', value: 82, color: 'bg-error' },
  { name: 'Operating Rooms', value: 45, color: 'bg-secondary' },
  { name: 'ER Wait Time', value: 25, displayValue: '12 min', color: 'bg-primary' },
]

export default function FacilityStatus() {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-[0_4px_4px_rgba(0,0,0,0.05)]">
      <h3 className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant mb-6">Facility Status</h3>
      <div className="space-y-4">
        {facilities.map((facility) => (
          <div key={facility.name}>
            <div className="flex justify-between text-sm mb-1">
              <span>{facility.name}</span>
              <span className="font-semibold">{facility.displayValue || `${facility.value}%`}</span>
            </div>
            <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
              <div
                className={`h-full ${facility.color} rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${facility.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
