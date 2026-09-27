"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function NewRequestPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'electronics',
    declaredValueBDT: '',
    pickupLocation: '',
    dropoffLocation: '',
    recipientName: '',
    recipientPhone: '',
    payoutBDT: '',
    legalDeclarationAccepted: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Connect to backend API
    console.log('Submitting form:', formData);
    setTimeout(() => {
      alert('Delivery request created successfully!');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="mb-6">
          <Link href="/dashboard" aria-label="Return to Dashboard" className="text-emerald-600 hover:underline font-medium">&larr; Back to Dashboard</Link>
        </div>
        <h1 className="text-3xl font-black mb-6 text-slate-800">New Delivery Request</h1>
        <p className="text-slate-600 mb-8">Fill out the details below to post a new parcel delivery request.</p>
        
<form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-slate-700">Parcel Title</label>
              <input type="text" id="title" name="title" required value={formData.title} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="e.g. Used iPhone 12" />
            </div>
            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-medium text-slate-700">Category</label>
              <select id="category" name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all">
                <option value="electronics">Electronics</option>
                <option value="documents">Documents</option>
                <option value="clothing">Clothing</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
            <textarea id="description" name="description" required value={formData.description} onChange={handleChange} rows={3} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="Describe the item(s) being sent"></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="pickupLocation" className="block text-sm font-medium text-slate-700">Pickup Location (Metro Station)</label>
              <input type="text" id="pickupLocation" name="pickupLocation" required value={formData.pickupLocation} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="e.g. Uttara North" />
            </div>
            <div className="space-y-2">
              <label htmlFor="dropoffLocation" className="block text-sm font-medium text-slate-700">Dropoff Location (Metro Station)</label>
              <input type="text" id="dropoffLocation" name="dropoffLocation" required value={formData.dropoffLocation} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="e.g. Motijheel" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="recipientName" className="block text-sm font-medium text-slate-700">Recipient Name</label>
              <input type="text" id="recipientName" name="recipientName" required value={formData.recipientName} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="Name of person receiving" />
            </div>
            <div className="space-y-2">
              <label htmlFor="recipientPhone" className="block text-sm font-medium text-slate-700">Recipient Phone</label>
              <input type="tel" id="recipientPhone" name="recipientPhone" required value={formData.recipientPhone} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="01XXXXXXXXX" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="declaredValueBDT" className="block text-sm font-medium text-slate-700">Declared Value (BDT)</label>
              <input type="number" id="declaredValueBDT" name="declaredValueBDT" required value={formData.declaredValueBDT} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="Estimated value of parcel" />
            </div>
            <div className="space-y-2">
              <label htmlFor="payoutBDT" className="block text-sm font-medium text-slate-700">Commuter Payout (BDT)</label>
              <input type="number" id="payoutBDT" name="payoutBDT" required value={formData.payoutBDT} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="Amount commuter will earn" />
            </div>
          </div>

          <div className="flex items-start space-x-3 pt-4 border-t border-slate-200">
            <input type="checkbox" id="legalDeclarationAccepted" name="legalDeclarationAccepted" required checked={formData.legalDeclarationAccepted} onChange={handleChange} className="mt-1 h-5 w-5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500" />
            <label htmlFor="legalDeclarationAccepted" className="text-sm text-slate-600">
              I declare that this parcel does not contain any illegal, hazardous, or prohibited items. I accept full legal responsibility for the contents of this parcel.
            </label>
          </div>

          <div className="pt-6">
            <button type="submit" disabled={isSubmitting || !formData.legalDeclarationAccepted} className="w-full bg-slate-900 text-white font-semibold py-3 px-6 rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              {isSubmitting ? 'Creating Request...' : 'Post Delivery Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}



