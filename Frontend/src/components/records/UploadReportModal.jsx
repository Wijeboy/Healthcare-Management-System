import { useState } from 'react'

export default function UploadReportModal({ onClose }) {
  const [patient, setPatient] = useState('Imasha Lankeshi')
  const [reportName, setReportName] = useState('')
  const [category, setCategory] = useState('Lab Report')
  const [result, setResult] = useState('Normal')
  const [doctor, setDoctor] = useState('Dr. Nimal Perera')
  const [file, setFile] = useState(null)

  function handleSubmit(event) {
    event.preventDefault()

    console.log({
      patient,
      reportName,
      category,
      result,
      doctor,
      file,
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">

      <div className="w-full max-w-[450px] rounded-3xl bg-white p-8 shadow-2xl">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-800">
            Upload Report
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined">
              close
            </span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Patient */}
          <div>
            <label className="mb-2 block text-sm text-slate-400">
              Patient
            </label>

            <select
              value={patient}
              onChange={(event) => setPatient(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-700 outline-none focus:border-primary"
            >
              <option>Imasha Lankeshi</option>
              <option>Kavindu Perera</option>
              <option>Sanduni Rathnayake</option>
              <option>Dinuka Wickramasinghe</option>
            </select>
          </div>

          {/* Report Name */}
          <div>
            <label className="mb-2 block text-sm text-slate-400">
              Report Name
            </label>

            <input
              type="text"
              value={reportName}
              onChange={(event) => setReportName(event.target.value)}
              placeholder="e.g. Liver Function Test"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-300 focus:border-primary"
            />
          </div>

          {/* Category + Result */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Category
              </label>

              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-700 outline-none focus:border-primary"
              >
                <option>Lab Report</option>
                <option>Scan / Imaging</option>
                <option>Prescriptions</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Result
              </label>

              <select
                value={result}
                onChange={(event) => setResult(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-700 outline-none focus:border-primary"
              >
                <option>Normal</option>
                <option>Abnormal</option>
              </select>
            </div>
          </div>

          {/* Doctor */}
          <div>
            <label className="mb-2 block text-sm text-slate-400">
              Doctor
            </label>

            <select
              value={doctor}
              onChange={(event) => setDoctor(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-700 outline-none focus:border-primary"
            >
              <option>Dr. Nimal Perera</option>
              <option>Dr. Sunimal Silva</option>
              <option>Dr. Kasun Fernando</option>
              <option>Dr. Anoma Jayasuriya</option>
            </select>
          </div>

          {/* File Upload */}
          <div>
            <label className="mb-2 block text-sm text-slate-400">
              File
            </label>

            <label className="flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-white px-4 text-center transition hover:border-primary">

              <span className="material-symbols-outlined mb-3 text-3xl text-slate-400">
                upload
              </span>

              <span className="text-sm text-slate-500">
                {file
                  ? file.name
                  : 'Click to choose a file (PDF, JPG, PNG)'}
              </span>

              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(event) =>
                  setFile(event.target.files?.[0] || null)
                }
                className="hidden"
              />
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-1">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-container"
            >
              Save Report
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}