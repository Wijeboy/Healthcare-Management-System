const alerts = [
  {
    id: 1,
    type: 'critical',
    icon: 'warning',
    title: 'Blood Supply Low',
    description: 'Type O- negative stocks below safety threshold.',
  },
  {
    id: 2,
    type: 'warning',
    icon: 'schedule',
    title: 'Maintenance Scheduled',
    description: 'MRI Scanner #2 scheduled for maintenance tomorrow at 6:00 AM.',
  },
]

export default function SystemAlerts() {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-[0_4px_4px_rgba(0,0,0,0.05)]">
      <h3 className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant mb-4">System Alerts</h3>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`flex items-start gap-4 p-2 rounded-lg border ${
              alert.type === 'critical'
                ? 'bg-error-container/20 border-error/10'
                : 'bg-surface-container-low border-outline-variant'
            }`}
          >
            <span className={`material-symbols-outlined ${
              alert.type === 'critical' ? 'text-error' : 'text-on-surface-variant'
            }`}>
              {alert.icon}
            </span>
            <div className="flex-1">
              <p className={`text-sm font-semibold ${
                alert.type === 'critical' ? 'text-on-error-container' : 'text-on-surface'
              }`}>
                {alert.title}
              </p>
              <p className={`text-xs ${
                alert.type === 'critical' ? 'text-on-error-container/80' : 'text-on-surface-variant'
              }`}>
                {alert.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
