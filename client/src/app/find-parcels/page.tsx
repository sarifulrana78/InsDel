"use client";

import React from 'react';
import Link from 'next/link';

export default function FindParcelsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-8">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="mb-6">
          <Link href="/dashboard" aria-label="Return to Dashboard" className="text-emerald-600 hover:underline font-medium">&larr; Back to Dashboard</Link>
        </div>
        <h1 className="text-3xl font-black mb-6 text-slate-800">Find Available Parcels</h1>
        <p className="text-slate-600 mb-8">Browse the map or list below to find parcels to deliver on your route.</p>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Parcel Card 1 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">Electronics</span>
                <span className="font-black text-lg text-emerald-600">৳ 150</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-800">Used iPhone 12</h3>
              
              <div className="space-y-3 mb-6 flex-grow">
                <div className="flex items-start space-x-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-blue-500"></div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Pickup</p>
                    <p className="text-sm font-medium">Uttara North Metro Station</p>
                  </div>
                </div>
                <div className="border-l-2 border-dashed border-slate-200 ml-1 h-4"></div>
                <div className="flex items-start space-x-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500"></div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Dropoff</p>
                    <p className="text-sm font-medium">Motijheel Metro Station</p>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => alert("Delivery Accepted!")}
                className="w-full bg-slate-900 text-white font-semibold py-3 rounded-lg hover:bg-slate-800 transition-colors"
              >
                Accept Delivery
              </button>
            </div>

            {/* Parcel Card 2 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">Documents</span>
                <span className="font-black text-lg text-emerald-600">৳ 80</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-800">Legal Papers</h3>
              
              <div className="space-y-3 mb-6 flex-grow">
                <div className="flex items-start space-x-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-blue-500"></div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Pickup</p>
                    <p className="text-sm font-medium">Mirpur 10 Metro Station</p>
                  </div>
                </div>
                <div className="border-l-2 border-dashed border-slate-200 ml-1 h-4"></div>
                <div className="flex items-start space-x-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500"></div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Dropoff</p>
                    <p className="text-sm font-medium">Farmgate Metro Station</p>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => alert("Delivery Accepted!")}
                className="w-full bg-slate-900 text-white font-semibold py-3 rounded-lg hover:bg-slate-800 transition-colors"
              >
                Accept Delivery
              </button>
            </div>

            {/* Parcel Card 3 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-full">Clothing</span>
                <span className="font-black text-lg text-emerald-600">৳ 120</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-800">Winter Jackets</h3>
              
              <div className="space-y-3 mb-6 flex-grow">
                <div className="flex items-start space-x-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-blue-500"></div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Pickup</p>
                    <p className="text-sm font-medium">Agargaon Metro Station</p>
                  </div>
                </div>
                <div className="border-l-2 border-dashed border-slate-200 ml-1 h-4"></div>
                <div className="flex items-start space-x-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500"></div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Dropoff</p>
                    <p className="text-sm font-medium">Dhaka University Station</p>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => alert("Delivery Accepted!")}
                className="w-full bg-slate-900 text-white font-semibold py-3 rounded-lg hover:bg-slate-800 transition-colors"
              >
                Accept Delivery
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



