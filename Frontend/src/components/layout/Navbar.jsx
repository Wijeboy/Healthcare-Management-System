import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NotificationPanel from '../dashboard/NotificationPanel'

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)

  const notifRef = useRef(null)
  const navigate = useNavigate()

  // Close notification panel when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target)
      ) {
        setShowNotifications(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () =>
      document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-outline-variant bg-surface-bright px-6 shadow-sm">

      {/* Search Bar */}
      <div className="flex max-w-xl flex-1 items-center">
        <div
          className={`relative w-full transition-shadow ${
            searchFocused ? 'shadow-md' : ''
          }`}
        >
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
            search
          </span>

          <input
            className="w-full rounded-lg border border-outline-variant bg-surface-container-low py-2 pl-12 pr-4 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Search patients, records, or doctors..."
            type="text"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="ml-6 flex items-center gap-4">

        {/* Notifications */}
        <div
          className="relative"
          ref={notifRef}
        >
          <button
            type="button"
            className="relative rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high active:scale-95"
            onClick={() =>
              setShowNotifications(!showNotifications)
            }
          >
            <span className="material-symbols-outlined">
              notifications
            </span>

            <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full border-2 border-surface-bright bg-error"></span>
          </button>

          {showNotifications && (
            <NotificationPanel
              onClose={() =>
                setShowNotifications(false)
              }
            />
          )}
        </div>

        {/* Settings */}
        <button
          type="button"
          onClick={() =>
            navigate('/dashboard/settings')
          }
          className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high active:scale-95"
          aria-label="System settings"
        >
          <span className="material-symbols-outlined">
            settings
          </span>
        </button>

        {/* User Avatar */}
        <div className="h-8 w-8 cursor-pointer overflow-hidden rounded-full border border-outline-variant bg-primary transition-all hover:ring-2 hover:ring-primary/30">
          <img
            className="h-full w-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnLJCOUvN9NTMproKybuatmgcMylLaHHCZsoZXJpYLSlOr19EfXpssX76nzX3EsZUwkqaC7Wx48fqgywH739BZIXMqCB8lz8nJ6CxLB68AxGszo_gnZ1yqTVaN37xtzO9SHhOEzF3SkpfjoqLfL2UBAQVC5FfUfYfVTfjca-7V5p1utTNWmgnloQsYcFxNHgS0x1dqkNaVZCGc5Y6cYx_JL3TtZ8PO3LhgeR-pNcVyxTpN0IxdzPnSN4fzsP2Ayx1BM9I6cDs83EY"
            alt="Admin Avatar"
          />
        </div>

      </div>
    </header>
  )
}