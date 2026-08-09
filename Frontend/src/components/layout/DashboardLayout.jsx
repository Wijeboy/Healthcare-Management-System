import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main
        className="min-h-screen flex flex-col"
        style={{
          marginLeft: '16rem',
          width: 'calc(100% - 16rem)',
        }}
      >
        {/* Top Navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="flex-1">
          <Outlet />
        </div>

        {/* Footer */}
        <footer className="mt-auto py-4 px-6 border-t border-outline-variant bg-surface-container-low flex justify-between items-center text-on-surface-variant">
          <p className="text-sm">
            © 2024 City Hospital Health Management. All rights reserved.
          </p>

          <div className="flex gap-4 text-xs font-semibold tracking-widest uppercase">
            <a
              className="hover:text-primary transition-colors"
              href="#"
            >
              Privacy
            </a>

            <a
              className="hover:text-primary transition-colors"
              href="#"
            >
              Terms
            </a>

            <a
              className="hover:text-primary transition-colors"
              href="#"
            >
              Audit Log
            </a>
          </div>
        </footer>
      </main>
    </div>
  )
}