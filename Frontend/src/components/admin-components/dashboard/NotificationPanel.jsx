import { useState } from 'react'

const roleNotifications = {
  Admin: [
    { id: 1, icon: 'emergency', title: 'Emergency Alert', message: 'Critical patient admitted to ICU - Bed 12A', time: '2 min ago', type: 'critical', read: false },
    { id: 2, icon: 'event_available', title: 'Appointment Confirmed', message: 'Dr. Sarah Lin confirmed appointment with patient #8823', time: '15 min ago', type: 'info', read: false },
    { id: 3, icon: 'lab_profile', title: 'Lab Results Ready', message: 'Blood work results for Marcus Thorne are available', time: '1 hour ago', type: 'success', read: false },
    { id: 4, icon: 'inventory', title: 'Inventory Low', message: 'Surgical gloves stock below minimum threshold', time: '2 hours ago', type: 'warning', read: true },
    { id: 5, icon: 'person_add', title: 'New Patient Registration', message: 'Elena Rodriguez registered via online portal', time: '3 hours ago', type: 'info', read: true },
  ],
  Doctor: [
    { id: 101, icon: 'event', title: 'New Appointment Request', message: 'Patient John Doe booked consultation for tomorrow at 10:00 AM', time: '5 min ago', type: 'info', read: false },
    { id: 102, icon: 'lab_profile', title: 'Lab Report Completed', message: 'Lipid panel for John Doe uploaded by central lab', time: '30 min ago', type: 'success', read: false },
    { id: 103, icon: 'medication', title: 'Refill Request', message: 'Emily White requested prescription renewal for Albuterol', time: '2 hours ago', type: 'warning', read: false },
  ],
  Patient: [
    { id: 201, icon: 'calendar_clock', title: 'Upcoming Appointment', message: 'Appointment with Dr. Sarah Smith tomorrow at 10:00 AM', time: '10 min ago', type: 'info', read: false },
    { id: 202, icon: 'prescriptions', title: 'New Prescription Ready', message: 'Dr. Sarah Smith prescribed Lisinopril 10mg', time: '1 hour ago', type: 'success', read: false },
    { id: 203, icon: 'receipt_long', title: 'Payment Receipt Available', message: 'Invoice INV-2026-001 ($150.00) paid successfully', time: '1 day ago', type: 'info', read: true },
  ],
};

const typeColors = {
  critical: 'bg-error/10 text-error',
  warning: 'bg-yellow-100 text-yellow-700',
  success: 'bg-secondary/10 text-secondary',
  info: 'bg-primary/10 text-primary',
}

export default function NotificationPanel({ onClose, role = "Admin" }) {
  const currentNotifs = roleNotifications[role] || roleNotifications.Admin;
  const [items, setItems] = useState(currentNotifs);

  const unreadCount = items.filter(n => !n.read).length

  const markAllRead = () => {
    setItems(items.map(n => ({ ...n, read: true })))
  }

  const markAsRead = (id) => {
    setItems(items.map(n => n.id === id ? { ...n, read: true } : n))
  }

  return (
    <div className="absolute right-0 top-12 w-96 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xl z-50 animate-fade-in overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-outline-variant flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-on-surface">Notifications</h3>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 bg-error text-on-error text-xs font-bold rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <button
          className="text-xs font-semibold text-primary hover:underline"
          onClick={markAllRead}
        >
          Mark all read
        </button>
      </div>

      {/* Notification List */}
      <div className="max-h-80 overflow-y-auto">
        {items.map((notif) => (
          <div
            key={notif.id}
            className={`flex items-start gap-3 p-4 border-b border-outline-variant/50 hover:bg-surface-container-low transition-colors cursor-pointer ${
              !notif.read ? 'bg-primary-fixed/20' : ''
            }`}
            onClick={() => markAsRead(notif.id)}
          >
            <div className={`p-2 rounded-lg shrink-0 ${typeColors[notif.type]}`}>
              <span className="material-symbols-outlined text-lg">{notif.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-on-surface truncate">{notif.title}</p>
                {!notif.read && (
                  <span className="w-2 h-2 bg-primary rounded-full shrink-0"></span>
                )}
              </div>
              <p className="text-xs text-on-surface-variant mt-0.5 line-clamp-2">{notif.message}</p>
              <p className="text-xs text-outline mt-1">{notif.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-outline-variant text-center">
        <button className="text-sm font-semibold text-primary hover:underline">
          View All Notifications
        </button>
      </div>
    </div>
  )
}
