import React from 'react';
import Link from 'next/link';

/**
 * Main Dashboard component for Ushol Mama logistics.
 */
export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black mb-6">Welcome to Ushol Mama Dashboard</h1>
        <p className="text-slate-600">Your one-stop dashboard for crowdsourced logistics.</p>
        
        <div className="mt-8 grid w-full grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-bold mb-4">Post a Parcel</h2>
            <p className="text-sm text-slate-500 mb-4">Send an item across Dhaka city quickly and securely.</p>
            <Link href="/new-request" aria-label="Create a new parcel delivery request" className="inline-block px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-colors">
              New Request
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-bold mb-4">Available Deliveries</h2>
            <p className="text-sm text-slate-500 mb-4">Find parcels on your route and earn cash.</p>
            <Link href="/find-parcels" aria-label="Find available parcels to deliver" className="inline-block px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-colors">
              Find Parcels
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}




