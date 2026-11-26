import { useMemo, useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  LayoutDashboard,
  Sparkles,
  UserCheck,
  XCircle,
} from 'lucide-react';
import { SafePhoto } from '../SafePhoto';

interface DemoProps {
  isMobileViewport: boolean;
  onRequestTemplate: () => void;
}

type BookingStatus = 'Confirmed' | 'Completed' | 'Cancelled';

interface ClinicService {
  id: string;
  name: string;
  duration: string;
  price: number;
  specialist: string;
  detail: string;
  image: string;
}

interface AppointmentRecord {
  id: string;
  clientName: string;
  phone: string;
  serviceId: string;
  serviceName: string;
  price: number;
  date: string;
  slot: string;
  status: BookingStatus;
}

const SPA_HERO_IMAGE = '/src/assets/images/demo_lumiere_spa_1795708681306.jpg';

const SERVICES: ClinicService[] = [
  {
    id: 'hydrafacial',
    name: 'HydraFacial Glass-Skin Ritual',
    duration: '60 mins',
    price: 3499,
    specialist: 'Dr. Meera Kapoor',
    detail: 'Deep hydro-dermabrasion, peptide infusion & LED red-light recovery.',
    image: '/src/assets/images/lumiere_hydrafacial_1795713205927.jpg',
  },
  {
    id: 'laser-sculpt',
    name: 'Cryo-Laser Tone & Sculpt',
    duration: '45 mins',
    price: 4999,
    specialist: 'Dr. Aarav Nair',
    detail: 'Non-invasive collagen stimulation with zero downtime.',
    image: '/src/assets/images/lumiere_laser_sculpt_1795713208160.jpg',
  },
  {
    id: 'botanical-massage',
    name: 'Limestone Botanical Lymphatic Therapy',
    duration: '75 mins',
    price: 2799,
    specialist: 'Sana Rao, LMT',
    detail: 'Warm olive-blossom essential oils & sculpting meridian drainage.',
    image: '/src/assets/images/lumiere_botanical_massage_1795713247578.jpg',
  },
  {
    id: 'derm-consult',
    name: 'Clinical Dermatology Skin Mapping',
    duration: '30 mins',
    price: 1200,
    specialist: 'Dr. Meera Kapoor',
    detail: '3D dermal hydration scan & personalized clinical regimen.',
    image: '/src/assets/images/lumiere_skin_mapping_1795713208812.jpg',
  },
];

const DATES = [
  { id: '2026-11-27', label: 'Tomorrow', short: 'Fri · 27 Nov' },
  { id: '2026-11-28', label: 'Saturday', short: 'Sat · 28 Nov' },
  { id: '2026-11-29', label: 'Sunday', short: 'Sun · 29 Nov' },
  { id: '2026-11-30', label: 'Monday', short: 'Mon · 30 Nov' },
];

const TIME_SLOTS = [
  '10:00 AM',
  '11:30 AM',
  '01:00 PM',
  '02:30 PM',
  '04:00 PM',
  '05:30 PM',
  '07:00 PM',
];

const INITIAL_BOOKINGS: AppointmentRecord[] = [
  {
    id: 'LUM-401',
    clientName: 'Ananya Reddy',
    phone: '+91 98480 22190',
    serviceId: 'hydrafacial',
    serviceName: 'HydraFacial Glass-Skin Ritual',
    price: 3499,
    date: '2026-11-27',
    slot: '11:30 AM',
    status: 'Confirmed',
  },
  {
    id: 'LUM-402',
    clientName: 'Rohan Malhotra',
    phone: '+91 99120 44108',
    serviceId: 'laser-sculpt',
    serviceName: 'Cryo-Laser Tone & Sculpt',
    price: 4999,
    date: '2026-11-27',
    slot: '02:30 PM',
    status: 'Confirmed',
  },
  {
    id: 'LUM-403',
    clientName: 'Priya Menon',
    phone: '+91 97001 88213',
    serviceId: 'botanical-massage',
    serviceName: 'Limestone Botanical Lymphatic Therapy',
    price: 2799,
    date: '2026-11-28',
    slot: '04:00 PM',
    status: 'Completed',
  },
];

export function LumiereClinicDemo({
  isMobileViewport,
  onRequestTemplate,
}: DemoProps) {
  const [activeTab, setActiveTab] = useState<'booking' | 'admin'>('booking');
  const [selectedServiceId, setSelectedServiceId] = useState(SERVICES[0].id);
  const [selectedDate, setSelectedDate] = useState(DATES[0].id);
  const [selectedSlot, setSelectedSlot] = useState<string>('01:00 PM');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [bookings, setBookings] =
    useState<AppointmentRecord[]>(INITIAL_BOOKINGS);
  const [adminFilter, setAdminFilter] = useState<'All' | BookingStatus>('All');
  const [justBooked, setJustBooked] = useState<AppointmentRecord | null>(null);

  const selectedService =
    SERVICES.find((s) => s.id === selectedServiceId) ?? SERVICES[0];

  const bookedSlotsForDate = useMemo(() => {
    return new Set(
      bookings
        .filter((b) => b.date === selectedDate && b.status !== 'Cancelled')
        .map((b) => b.slot),
    );
  }, [bookings, selectedDate]);

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !clientName.trim() ||
      !selectedSlot ||
      bookedSlotsForDate.has(selectedSlot)
    ) {
      return;
    }

    const newRecord: AppointmentRecord = {
      id: `LUM-${404 + bookings.length}`,
      clientName: clientName.trim(),
      phone: clientPhone.trim() || '+91 90000 12345',
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      price: selectedService.price,
      date: selectedDate,
      slot: selectedSlot,
      status: 'Confirmed',
    };

    setBookings((prev) => [newRecord, ...prev]);
    setJustBooked(newRecord);
    setClientName('');
    setClientPhone('');
    const nextOpen = TIME_SLOTS.find(
      (s) => s !== selectedSlot && !bookedSlotsForDate.has(s),
    );
    setSelectedSlot(nextOpen ?? '');
  };

  const updateBookingStatus = (id: string, status: BookingStatus) => {
    setBookings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item)),
    );
  };

  const filteredAdminBookings =
    adminFilter === 'All'
      ? bookings
      : bookings.filter((b) => b.status === adminFilter);

  const activeRevenue = bookings
    .filter((b) => b.status !== 'Cancelled')
    .reduce((sum, b) => sum + b.price, 0);

  return (
    <div className="min-h-full bg-[#F4F6F2] text-[#142921] font-sans">
      {/* Botanical Clinic Header with Live Client / Admin Switcher */}
      <header className="sticky top-0 z-20 border-b border-[#142921]/10 bg-[#F4F6F2]/94 backdrop-blur-md">
        <div
          className={`mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3.5 ${
            isMobileViewport ? '' : 'sm:px-8'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#183A2F] text-[#E6F2EC]">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="text-base font-bold tracking-tight text-[#142921] whitespace-nowrap">
              Lumière Clinic &amp; Spa
            </span>
          </div>

          {/* Interactive Mode Tabs: Client Booking vs Admin Panel */}
          <div className="flex items-center gap-1 rounded-xl border border-[#142921]/12 bg-white p-1">
            <button
              type="button"
              onClick={() => setActiveTab('booking')}
              className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-lg px-3 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'booking'
                  ? 'bg-[#183A2F] text-white'
                  : 'text-[#4B6359] hover:text-[#142921]'
              }`}
            >
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Book Slot</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('admin')}
              className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-lg px-3 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'admin'
                  ? 'bg-[#183A2F] text-white'
                  : 'text-[#4B6359] hover:text-[#142921]'
              }`}
            >
              <LayoutDashboard className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Admin ({bookings.length})</span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`mx-auto max-w-6xl px-4 py-6 ${
          isMobileViewport ? '' : 'sm:px-8 sm:py-8'
        }`}
      >
        {activeTab === 'booking' ? (
          <div className="space-y-6">
            {/* Serene Hero Strip */}
            <div
              className={`grid overflow-hidden rounded-2xl border border-[#142921]/10 bg-white shadow-sm ${
                isMobileViewport ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'
              }`}
            >
              <div
                className={`flex flex-col justify-center p-6 ${
                  isMobileViewport ? '' : 'lg:col-span-6 sm:p-8'
                }`}
              >
                <p className="text-xs font-semibold tracking-[0.18em] text-[#457262] uppercase">
                  Live Slot Engine · Real-Time Sync
                </p>
                <h1 className="mt-2 text-2xl font-bold text-[#142921] sm:text-3xl">
                  Book your clinical sanctuary in under 30 seconds.
                </h1>
                <p className="mt-2.5 text-xs leading-relaxed text-[#4E645B] sm:text-sm">
                  Book any open slot below, then switch to the{' '}
                  <strong>Admin</strong> tab above to manage, complete, or
                  cancel appointments in real time.
                </p>
              </div>
              <div
                className={`relative bg-[#E7ECE8] ${
                  isMobileViewport ? 'h-52' : 'lg:col-span-6'
                }`}
              >
                <SafePhoto
                  src={SPA_HERO_IMAGE}
                  alt="Lumiere Clinic sunlit limestone wellness treatment suite"
                  loading="eager"
                  fallbackClassName="bg-[#183A2F] text-[#E6F2EC]"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {justBooked && (
              <div className="flex flex-col gap-3 rounded-2xl border border-emerald-300 bg-emerald-50 p-4 text-xs text-emerald-950 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                  <div>
                    <p className="font-bold">
                      Appointment Confirmed ({justBooked.id})
                    </p>
                    <p className="mt-0.5 text-emerald-800">
                      {justBooked.clientName} · {justBooked.serviceName} on{' '}
                      {justBooked.date} at {justBooked.slot}. That slot is now
                      automatically locked!
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('admin')}
                  className="min-h-[38px] shrink-0 rounded-lg bg-[#183A2F] px-3.5 text-xs font-semibold text-white cursor-pointer"
                >
                  Inspect in Admin Panel →
                </button>
              </div>
            )}

            {/* Booking Interactive Workspace */}
            <div
              className={`grid gap-6 ${
                isMobileViewport ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'
              }`}
            >
              {/* Step 1: Select Service — With Editorial Skincare / Spa Thumbnails */}
              <div
                className={`rounded-2xl border border-[#142921]/10 bg-white p-5 ${
                  isMobileViewport ? '' : 'lg:col-span-6'
                }`}
              >
                <h2 className="text-base font-bold text-[#142921]">
                  1. Choose Treatment
                </h2>
                <div className="mt-3.5 space-y-2.5">
                  {SERVICES.map((service) => {
                    const active = service.id === selectedServiceId;
                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => setSelectedServiceId(service.id)}
                        className={`flex w-full items-center gap-3.5 rounded-xl border p-3 text-left transition-all cursor-pointer ${
                          active
                            ? 'border-[#183A2F] bg-[#EEF4F0] shadow-xs'
                            : 'border-[#142921]/10 bg-white hover:border-[#457262]/45'
                        }`}
                      >
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-[#142921]/10 bg-[#E8EDE9] sm:h-[72px] sm:w-[72px]">
                          <SafePhoto
                            src={service.image}
                            alt={service.name}
                            fallbackClassName="bg-[#183A2F] text-[#E6F2EC]"
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="truncate text-xs font-bold text-[#142921]">
                                {service.name}
                              </p>
                              <p className="mt-0.5 text-[11px] text-[#566C63]">
                                {service.duration} · {service.specialist}
                              </p>
                            </div>
                            <span className="shrink-0 text-xs font-bold text-[#183A2F] tabular-nums">
                              ₹{service.price.toLocaleString('en-IN')}
                            </span>
                          </div>
                          <p className="mt-1 line-clamp-2 text-[11px] text-[#5C7268]">
                            {service.detail}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2 & 3: Date, Time Slots & Confirm */}
              <div
                className={`rounded-2xl border border-[#142921]/10 bg-white p-5 ${
                  isMobileViewport ? '' : 'lg:col-span-6'
                }`}
              >
                <h2 className="text-base font-bold text-[#142921]">
                  2. Pick Date &amp; Live Time Slot
                </h2>

                <div className="mt-3.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {DATES.map((dateObj) => (
                    <button
                      key={dateObj.id}
                      type="button"
                      onClick={() => {
                        setSelectedDate(dateObj.id);
                        setJustBooked(null);
                      }}
                      className={`rounded-xl border px-2.5 py-2.5 text-center transition-colors cursor-pointer ${
                        selectedDate === dateObj.id
                          ? 'border-[#183A2F] bg-[#183A2F] text-white'
                          : 'border-[#142921]/12 bg-[#F8FAF7] text-[#334A41] hover:border-[#457262]'
                      }`}
                    >
                      <span className="block text-[10px] opacity-80">
                        {dateObj.label}
                      </span>
                      <span className="mt-0.5 block text-xs font-bold">
                        {dateObj.short}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Live Slots Grid */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-[11px] text-[#566C63]">
                    <span className="inline-flex items-center gap-1 font-semibold">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      Available Slots
                    </span>
                    <span>
                      {TIME_SLOTS.length - bookedSlotsForDate.size} open
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {TIME_SLOTS.map((slot) => {
                      const isBooked = bookedSlotsForDate.has(slot);
                      const isSelected = selectedSlot === slot && !isBooked;
                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={isBooked}
                          onClick={() => setSelectedSlot(slot)}
                          className={`min-h-[40px] rounded-xl border px-2 text-xs font-semibold transition-colors ${
                            isBooked
                              ? 'cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400 line-through'
                              : isSelected
                                ? 'border-[#183A2F] bg-[#183A2F] text-white cursor-pointer'
                                : 'border-[#142921]/14 bg-white text-[#142921] hover:border-[#183A2F] cursor-pointer'
                          }`}
                        >
                          {isBooked ? `${slot} · Booked` : slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Client Details Form */}
                <form
                  onSubmit={handleCreateBooking}
                  className="mt-5 space-y-3 border-t border-[#142921]/10 pt-4"
                >
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Full Name *"
                      aria-label="Client full name"
                      className="min-h-[42px] rounded-xl border border-[#142921]/15 bg-[#F8FAF7] px-3.5 text-xs text-[#142921] placeholder:text-[#6B8077] focus:border-[#183A2F] focus:bg-white focus:outline-none"
                    />
                    <input
                      type="tel"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="Phone / WhatsApp"
                      aria-label="Phone number"
                      className="min-h-[42px] rounded-xl border border-[#142921]/15 bg-[#F8FAF7] px-3.5 text-xs text-[#142921] placeholder:text-[#6B8077] focus:border-[#183A2F] focus:bg-white focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!selectedSlot || bookedSlotsForDate.has(selectedSlot)}
                    className="min-h-[46px] w-full rounded-xl bg-[#183A2F] px-5 text-xs font-bold text-white transition-colors hover:bg-[#235243] disabled:opacity-50 cursor-pointer"
                  >
                    Confirm {selectedSlot || 'Slot'} · ₹
                    {selectedService.price.toLocaleString('en-IN')}
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          /* LIVE ADMIN PANEL TAB */
          <div className="space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.16em] text-[#457262] uppercase">
                  Clinic Operations Terminal
                </p>
                <h2 className="mt-1 text-2xl font-bold text-[#142921]">
                  Live Appointments &amp; Slot Manager
                </h2>
              </div>
              <button
                type="button"
                onClick={onRequestTemplate}
                className="min-h-[40px] self-start rounded-xl bg-[#183A2F] px-4 text-xs font-bold text-white hover:bg-[#235243] cursor-pointer sm:self-auto"
              >
                Request Booking System
              </button>
            </div>

            {/* Admin KPI Row */}
            <div
              className={`grid gap-3 ${
                isMobileViewport ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'
              }`}
            >
              <div className="rounded-2xl border border-[#142921]/10 bg-white p-4">
                <p className="text-[11px] font-medium text-[#566C63]">
                  Total Bookings
                </p>
                <p className="mt-1 text-2xl font-bold text-[#142921] tabular-nums">
                  {bookings.length}
                </p>
              </div>
              <div className="rounded-2xl border border-[#142921]/10 bg-white p-4">
                <p className="text-[11px] font-medium text-[#566C63]">
                  Active Pipeline
                </p>
                <p className="mt-1 text-2xl font-bold text-[#183A2F] tabular-nums">
                  ₹{activeRevenue.toLocaleString('en-IN')}
                </p>
              </div>
              <div className="rounded-2xl border border-[#142921]/10 bg-white p-4">
                <p className="text-[11px] font-medium text-[#566C63]">
                  Confirmed
                </p>
                <p className="mt-1 text-2xl font-bold text-emerald-700 tabular-nums">
                  {bookings.filter((b) => b.status === 'Confirmed').length}
                </p>
              </div>
              <div className="rounded-2xl border border-[#142921]/10 bg-white p-4">
                <p className="text-[11px] font-medium text-[#566C63]">
                  Completed
                </p>
                <p className="mt-1 text-2xl font-bold text-sky-700 tabular-nums">
                  {bookings.filter((b) => b.status === 'Completed').length}
                </p>
              </div>
            </div>

            {/* Status Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {(['All', 'Confirmed', 'Completed', 'Cancelled'] as const).map(
                (st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setAdminFilter(st)}
                    className={`min-h-[36px] rounded-lg px-3.5 text-xs font-semibold transition-colors cursor-pointer ${
                      adminFilter === st
                        ? 'bg-[#183A2F] text-white'
                        : 'border border-[#142921]/12 bg-white text-[#4A6258] hover:border-[#183A2F]'
                    }`}
                  >
                    {st}
                  </button>
                ),
              )}
            </div>

            {/* Bookings List */}
            <div className="space-y-3">
              {filteredAdminBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex flex-col justify-between gap-3 rounded-2xl border border-[#142921]/10 bg-white p-4 sm:flex-row sm:items-center"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-bold text-[#457262]">
                        {booking.id}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-bold text-[#142921]">
                        {booking.clientName}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span
                        className={`font-semibold ${
                          booking.status === 'Confirmed'
                            ? 'text-emerald-700'
                            : booking.status === 'Completed'
                              ? 'text-sky-700'
                              : 'text-rose-600'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[#4E645B]">
                      {booking.serviceName} · {booking.date} at {booking.slot} ·{' '}
                      <strong >
                        ₹{booking.price.toLocaleString('en-IN')}
                      </strong>
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {booking.status !== 'Completed' && (
                      <button
                        type="button"
                        onClick={() =>
                          updateBookingStatus(booking.id, 'Completed')
                        }
                        className="inline-flex min-h-[36px] items-center gap-1 rounded-lg border border-emerald-600/30 bg-emerald-50 px-3 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 cursor-pointer"
                      >
                        <UserCheck className="h-3.5 w-3.5" />
                        <span>Complete</span>
                      </button>
                    )}
                    {booking.status !== 'Cancelled' ? (
                      <button
                        type="button"
                        onClick={() =>
                          updateBookingStatus(booking.id, 'Cancelled')
                        }
                        className="inline-flex min-h-[36px] items-center gap-1 rounded-lg border border-rose-500/30 bg-rose-50 px-3 text-xs font-semibold text-rose-700 hover:bg-rose-100 cursor-pointer"
                      >
                        <XCircle className="h-3.5 w-3.5" />
                        <span>Cancel &amp; Free Slot</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          updateBookingStatus(booking.id, 'Confirmed')
                        }
                        className="inline-flex min-h-[36px] items-center gap-1 rounded-lg border border-[#183A2F]/30 bg-[#EEF4F0] px-3 text-xs font-semibold text-[#183A2F] cursor-pointer"
                      >
                        Restore
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
