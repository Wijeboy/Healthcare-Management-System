import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import EmergencyCall from '../patient-components/EmergencyCall'

export default function DashboardLayout() {
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar onEmergencyCall={() => setShowEmergencyModal(true)} />
      
      {/* Main Content */}
      <main className="ml-64 min-h-screen flex flex-col">
        {/* Top Navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="flex-1">
          <Outlet />
        </div>

        {/* Footer */}
        <footer className="mt-auto py-4 px-6 border-t border-outline-variant bg-surface-container-low flex justify-between items-center text-on-surface-variant text-sm">
          <p>© 2024 CareConnect Health Systems. All rights reserved.</p>
          <div className="flex gap-4 text-xs font-semibold tracking-widest uppercase">
            <a className="hover:text-primary transition-colors" href="#">Privacy</a>
            <a className="hover:text-primary transition-colors" href="#">Terms</a>
            <a className="hover:text-primary transition-colors" href="#">Audit Log</a>
          </div>
        </footer>
      </main>

      {/* Emergency Call Modal */}
      <EmergencyCall
        isOpen={showEmergencyModal}
        onClose={() => setShowEmergencyModal(false)}
      />
    </div>
  )
}

