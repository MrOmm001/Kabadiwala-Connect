import React, { useState } from 'react';
import { 
  Building2, ShieldCheck, MapPin, Phone, Truck, Star, Award, 
  Search, Filter, CheckCircle2, ChevronRight, Clock, ExternalLink, X
} from 'lucide-react';
import { RecyclerFacility } from '../types';
import { AUTHORIZED_RECYCLERS } from '../data/mockData';

interface RecyclerDirectoryProps {
  onSelectRecycler?: (rec: RecyclerFacility) => void;
}

export const RecyclerDirectory: React.FC<RecyclerDirectoryProps> = ({ onSelectRecycler }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMaterialFilter, setSelectedMaterialFilter] = useState('all');
  const [activeBookingRecycler, setActiveBookingRecycler] = useState<RecyclerFacility | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const materials = ['all', 'Cables & Wires', 'CRT & LED TVs', 'PCBs & Motherboards', 'DishTV Antennas', 'Electric Motors'];

  const filteredRecyclers = AUTHORIZED_RECYCLERS.filter((rec) => {
    const matchesSearch = rec.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMaterial = selectedMaterialFilter === 'all' || rec.materialsAccepted.some((m) => m.toLowerCase().includes(selectedMaterialFilter.toLowerCase()));
    return matchesSearch && matchesMaterial;
  });

  const handleConfirmPickup = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setActiveBookingRecycler(null);
    }, 2000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono-code mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>CPCB & MPCB AUTHORIZED DIRECTORY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Authorized Recyclers & Certified Dismantlers
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Connect directly with licensed secondary smelters and metal refineries. Zero middlemen commission.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-3xl bg-[#081810] border border-emerald-900/60 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by facility name, industrial MIDC zone, or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#050C08] border border-emerald-900/80 focus:border-emerald-500 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {materials.map((mat) => (
            <button
              key={mat}
              onClick={() => setSelectedMaterialFilter(mat)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedMaterialFilter === mat
                  ? 'bg-emerald-500 text-black shadow-md'
                  : 'bg-[#050C08] text-slate-400 hover:text-white border border-emerald-950'
              }`}
            >
              {mat === 'all' ? 'All Materials' : mat}
            </button>
          ))}
        </div>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRecyclers.map((facility) => (
          <div
            key={facility.id}
            className="p-6 rounded-3xl bg-[#07170F] border border-emerald-900/70 hover:border-emerald-500/60 transition-all flex flex-col justify-between space-y-4 shadow-xl group"
          >
            <div className="space-y-3">
              {/* Header inside card */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono-code text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    {facility.cpcbRegistrationNo}
                  </span>
                  <h3 className="text-lg font-bold text-white font-display mt-1.5 group-hover:text-emerald-300 transition-colors">
                    {facility.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{facility.location}, {facility.city}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{facility.reliabilityScore}/100</span>
                  </div>
                  <span className="text-[10px] font-mono-code text-slate-400 block mt-1">
                    {facility.distanceKm} KM AWAY
                  </span>
                </div>
              </div>

              {/* Special Offer / High Payout Ticker */}
              {facility.specialOfferRate && (
                <div className="p-2.5 rounded-xl bg-[#0A2216] border border-emerald-500/40 text-xs text-emerald-300 font-medium">
                  ✨ {facility.specialOfferRate}
                </div>
              )}

              {/* Accepted Materials Chips */}
              <div>
                <span className="text-[11px] text-slate-400 font-mono-code block mb-1.5">
                  ACCEPTED MATERIALS:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {facility.materialsAccepted.map((mat, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#050C08] border border-emerald-950 text-slate-300"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Logistics features */}
              <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-emerald-400" />
                  {facility.pickupAvailable ? 'Doorstep Van Pickup' : 'Self Drop-off'}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {facility.operatingHours}
                </span>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="pt-3 border-t border-emerald-950/80 flex items-center justify-between">
              <a
                href={`tel:${facility.phone}`}
                className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{facility.phone}</span>
              </a>

              <button
                onClick={() => setActiveBookingRecycler(facility)}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
              >
                <span>Request Handover</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Pickup Modal */}
      {activeBookingRecycler && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#081810] border border-emerald-500/50 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white font-display">
                Request Handover Pickup
              </h3>
              <button
                onClick={() => setActiveBookingRecycler(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {bookingConfirmed ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-base font-bold text-white">Pickup Dispatched!</h4>
                <p className="text-xs text-slate-300">
                  {activeBookingRecycler.name} has accepted your lot dispatch. An electric tempo weighbridge will arrive within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmPickup} className="space-y-4">
                <div className="p-3 rounded-xl bg-black/50 border border-emerald-950 text-xs">
                  <div className="text-slate-400">Selected Facility:</div>
                  <div className="font-bold text-emerald-300 text-sm">{activeBookingRecycler.name}</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">{activeBookingRecycler.location}</div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Your Operating Address / Scrap Yard
                  </label>
                  <input
                    type="text"
                    defaultValue="Shop 4, Hadapsar Scrap Mandi, Pune"
                    className="w-full bg-[#050C08] border border-emerald-900 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Estimated Lot Weight (KG)
                  </label>
                  <input
                    type="number"
                    defaultValue={35}
                    className="w-full bg-[#050C08] border border-emerald-900 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-900 text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Doorstep calibrate weighing with zero transportation fee!</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-all shadow-lg"
                >
                  Dispatch Weighbridge Pickup
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
