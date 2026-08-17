export default function StatsCard({ icon, value, label, trend, trendType = 'positive', iconBg = 'bg-primary/10', iconColor = 'text-primary', pulse = false }) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-[0_4px_4px_rgba(0,0,0,0.05)] transition-all hover:shadow-md hover:scale-[1.01] group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${iconBg} ${iconColor}`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        {pulse ? (
          <div className="w-2 h-2 rounded-full bg-error animate-pulse"></div>
        ) : trend ? (
          <span className={`text-sm font-medium ${
            trendType === 'positive' ? 'text-secondary' : 
            trendType === 'negative' ? 'text-error' : 'text-on-surface-variant'
          }`}>
            {trend}
          </span>
        ) : null}
      </div>
      <div className="text-2xl font-semibold text-on-surface leading-8 tracking-tight">{value}</div>
      <div className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant mt-1">{label}</div>
    </div>
  )
}
