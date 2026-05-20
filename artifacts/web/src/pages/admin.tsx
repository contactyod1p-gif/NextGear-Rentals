import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  useListBookings,
  useGetBookingStats,
  useDeleteBooking,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { getListBookingsQueryKey, getGetBookingStatsQueryKey } from "@workspace/api-client-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import AdminLoginGate from "@/components/AdminLoginGate";

type SortKey = "bookingDate" | "fullName" | "selectedVehicle" | "rentalDays";
type SortDir = "asc" | "desc";

const VEHICLE_COLORS: Record<string, string> = {
  "Mahindra Thar":   "#facc15",
  "Toyota Innova":   "#60a5fa",
  "Hyundai Creta":   "#a78bfa",
  "Toyota Fortuner": "#34d399",
  "Mercedes GLC":    "#f97316",
  "Kia Carens":      "#f472b6",
};

function StatCard({
  label,
  value,
  sub,
  icon,
  accent,
  loading,
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ReactNode;
  accent: string;
  loading?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-2xl border border-white/8 bg-white/[0.03] p-5 overflow-hidden"
    >
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ background: `radial-gradient(ellipse 80% 60% at 0% 0%, ${accent}12 0%, transparent 70%)` }}
      />
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">{label}</p>
          {loading ? (
            <div className="h-8 w-20 rounded-lg bg-white/6 animate-pulse" />
          ) : (
            <p className="text-3xl font-black text-white">{value}</p>
          )}
          {sub && <p className="text-xs text-zinc-500 mt-1">{sub}</p>}
        </div>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
        >
          <span style={{ color: accent }}>{icon}</span>
        </div>
      </div>
    </motion.div>
  );
}

function DeleteConfirmModal({
  name,
  onConfirm,
  onCancel,
  loading,
}: {
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.93, opacity: 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#111010] p-6"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: "0 0 40px rgba(239,68,68,0.12), 0 24px 48px rgba(0,0,0,0.5)" }}
      >
        <div className="w-11 h-11 rounded-xl bg-red-500/15 border border-red-500/25 flex items-center justify-center mb-4">
          <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        <h3 className="text-base font-bold text-white mb-1">Delete booking?</h3>
        <p className="text-sm text-zinc-400 mb-6">
          This will permanently remove the booking for <span className="text-white font-medium">{name}</span>. This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border border-white/10 py-2.5 text-sm font-semibold text-zinc-400 hover:text-white hover:border-white/20 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 rounded-xl bg-red-500 hover:bg-red-400 disabled:opacity-60 py-2.5 text-sm font-bold text-white transition-all"
          >
            {loading ? "Deleting…" : "Delete"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

const CustomTooltipArea = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-[#111] px-3 py-2 text-xs shadow-xl">
      <p className="text-zinc-400 mb-0.5">{label}</p>
      <p className="text-yellow-400 font-bold">{payload[0].value} booking{payload[0].value !== 1 ? "s" : ""}</p>
    </div>
  );
};

const CustomTooltipBar = ({ active, payload }: { active?: boolean; payload?: { value: number; name: string }[] }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-[#111] px-3 py-2 text-xs shadow-xl">
      <p className="text-zinc-300 font-semibold">{payload[0].name}</p>
      <p className="text-yellow-400 font-bold">{payload[0].value} booking{payload[0].value !== 1 ? "s" : ""}</p>
    </div>
  );
};

export default function AdminDashboard() {
  const { isAuthenticated, login, logout } = useAdminAuth();

  if (!isAuthenticated) {
    return <AdminLoginGate onLogin={login} />;
  }

  return <AdminDashboardInner onLogout={logout} />;
}

function AdminDashboardInner({ onLogout }: { onLogout: () => void }) {
  const qc = useQueryClient();

  const { data: bookings = [], isLoading: loadingBookings } = useListBookings();
  const { data: stats, isLoading: loadingStats } = useGetBookingStats();
  const { mutateAsync: deleteBooking, isPending: deleting } = useDeleteBooking();

  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("bookingDate");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; name: string } | null>(null);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return bookings
      .filter(
        (b) =>
          b.fullName.toLowerCase().includes(q) ||
          b.phoneNumber.toLowerCase().includes(q) ||
          b.selectedVehicle.toLowerCase().includes(q)
      )
      .sort((a, b) => {
        let av: string | number = a[sortKey] ?? "";
        let bv: string | number = b[sortKey] ?? "";
        if (sortKey === "bookingDate") {
          av = new Date(av as string).getTime();
          bv = new Date(bv as string).getTime();
        }
        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
  }, [bookings, search, sortKey, sortDir]);

  const timelineData = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const b of bookings) {
      const d = new Date(b.bookingDate);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      counts[key] = (counts[key] ?? 0) + 1;
    }
    return Object.entries(counts)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, count]) => ({
        month: new Date(month + "-01").toLocaleDateString("en-IN", { month: "short", year: "2-digit" }),
        count,
      }));
  }, [bookings]);

  const vehicleData = useMemo(
    () =>
      (stats?.vehicleBreakdown ?? []).map((v) => ({
        name: v.vehicle,
        count: v.count,
        color: VEHICLE_COLORS[v.vehicle] ?? "#facc15",
      })),
    [stats]
  );

  const topVehicle = vehicleData.sort((a, b) => b.count - a.count)[0]?.name ?? "—";

  const thisMonth = useMemo(() => {
    const now = new Date();
    return bookings.filter((b) => {
      const d = new Date(b.bookingDate);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;
  }, [bookings]);

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      await deleteBooking({ id: deleteTarget.id });
      await qc.invalidateQueries({ queryKey: getListBookingsQueryKey() });
      await qc.invalidateQueries({ queryKey: getGetBookingStatsQueryKey() });
    } finally {
      setDeleteTarget(null);
    }
  }

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return <span className="text-zinc-700 ml-1">↕</span>;
    return <span className="text-yellow-400 ml-1">{sortDir === "asc" ? "↑" : "↓"}</span>;
  }

  const thClass = "px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-zinc-500 cursor-pointer select-none hover:text-zinc-300 transition-colors whitespace-nowrap";
  const tdClass = "px-4 py-3.5 text-sm text-zinc-300 whitespace-nowrap";

  return (
    <>
      <AnimatePresence>
        {deleteTarget && (
          <DeleteConfirmModal
            name={deleteTarget.name}
            onConfirm={handleDelete}
            onCancel={() => setDeleteTarget(null)}
            loading={deleting}
          />
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-[#08090a] text-white">
        <div
          className="sticky top-0 z-40 border-b border-white/6"
          style={{ background: "rgba(8,9,10,0.90)", backdropFilter: "blur(12px)" }}
        >
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a href="/" className="text-lg font-black tracking-tight">
                Next<span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg,#facc15,#f59e0b)" }}>Gear</span>
              </a>
              <span className="text-zinc-700">/</span>
              <span className="text-sm font-semibold text-zinc-400">Admin</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-green-400/25 bg-green-400/10 px-2.5 py-1 text-xs font-semibold text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Live
              </span>
              <button
                onClick={() => {
                  qc.invalidateQueries({ queryKey: getListBookingsQueryKey() });
                  qc.invalidateQueries({ queryKey: getGetBookingStatsQueryKey() });
                }}
                className="ml-2 text-xs font-semibold text-zinc-500 hover:text-white border border-white/8 hover:border-white/20 rounded-full px-3 py-1.5 transition-all"
              >
                Refresh
              </button>
              <button
                onClick={onLogout}
                className="text-xs font-semibold text-zinc-500 hover:text-red-400 border border-white/8 hover:border-red-500/30 rounded-full px-3 py-1.5 transition-all flex items-center gap-1.5"
                title="Sign out of admin"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign out
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-2xl font-black text-white">Bookings Dashboard</h1>
            <p className="text-sm text-zinc-500 mt-0.5">Real-time overview of all NextGear Rentals reservations</p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Total Bookings"
              value={stats?.totalBookings ?? 0}
              icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
              accent="#facc15"
              loading={loadingStats}
            />
            <StatCard
              label="This Month"
              value={thisMonth}
              sub="bookings in current month"
              icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>}
              accent="#60a5fa"
              loading={loadingBookings}
            />
            <StatCard
              label="Avg Rental Days"
              value={stats ? `${Number(stats.averageRentalDays).toFixed(1)}d` : "—"}
              sub="per booking"
              icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              accent="#34d399"
              loading={loadingStats}
            />
            <StatCard
              label="Top Vehicle"
              value={topVehicle.split(" ").slice(-1)[0]}
              sub={topVehicle !== "—" ? topVehicle : undefined}
              icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3l14 9-14 9V3z" /></svg>}
              accent="#f97316"
              loading={loadingStats}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-3 rounded-2xl border border-white/8 bg-white/[0.02] p-6"
            >
              <h2 className="text-sm font-bold text-white mb-1">Bookings Over Time</h2>
              <p className="text-xs text-zinc-500 mb-5">Monthly booking volume</p>
              {loadingBookings ? (
                <div className="h-48 rounded-xl bg-white/4 animate-pulse" />
              ) : timelineData.length === 0 ? (
                <div className="h-48 flex items-center justify-center text-sm text-zinc-600">No booking data yet</div>
              ) : (
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={timelineData} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
                    <defs>
                      <linearGradient id="areaGold" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#facc15" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#facc15" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#71717a" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: "#71717a" }} axisLine={false} tickLine={false} allowDecimals={false} />
                    <Tooltip content={<CustomTooltipArea />} />
                    <Area
                      type="monotone"
                      dataKey="count"
                      stroke="#facc15"
                      strokeWidth={2}
                      fill="url(#areaGold)"
                      dot={{ fill: "#facc15", strokeWidth: 0, r: 3 }}
                      activeDot={{ r: 5, fill: "#facc15" }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="lg:col-span-2 rounded-2xl border border-white/8 bg-white/[0.02] p-6"
            >
              <h2 className="text-sm font-bold text-white mb-1">Vehicle Breakdown</h2>
              <p className="text-xs text-zinc-500 mb-5">Bookings by vehicle type</p>
              {loadingStats ? (
                <div className="h-48 rounded-xl bg-white/4 animate-pulse" />
              ) : vehicleData.length === 0 ? (
                <div className="h-48 flex items-center justify-center text-sm text-zinc-600">No data yet</div>
              ) : (
                <>
                  <ResponsiveContainer width="100%" height={160}>
                    <BarChart data={vehicleData} margin={{ top: 0, right: 0, bottom: 0, left: -32 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="name" tick={false} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: "#71717a" }} axisLine={false} tickLine={false} allowDecimals={false} />
                      <Tooltip content={<CustomTooltipBar />} />
                      <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                        {vehicleData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} fillOpacity={0.85} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="mt-3 space-y-1.5">
                    {vehicleData.map((v) => (
                      <div key={v.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: v.color }} />
                          <span className="text-xs text-zinc-400 truncate max-w-[120px]">{v.name}</span>
                        </div>
                        <span className="text-xs font-bold text-white">{v.count}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-5 border-b border-white/6">
              <div>
                <h2 className="text-sm font-bold text-white">All Bookings</h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  {filtered.length} of {bookings.length} record{bookings.length !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="relative w-full sm:w-64">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="search"
                  placeholder="Search name, phone, vehicle…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 pl-8 pr-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-yellow-400/40 focus:ring-1 focus:ring-yellow-400/15 transition-all"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              {loadingBookings ? (
                <div className="p-6 space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-12 rounded-xl bg-white/4 animate-pulse" style={{ animationDelay: `${i * 80}ms` }} />
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div className="py-16 text-center text-sm text-zinc-600">
                  {search ? `No bookings matching "${search}"` : "No bookings yet — they'll appear here once submitted."}
                </div>
              ) : (
                <table className="w-full min-w-[640px]">
                  <thead>
                    <tr className="border-b border-white/6">
                      <th className={thClass} onClick={() => toggleSort("fullName")}>
                        Name <SortIcon col="fullName" />
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-zinc-500 whitespace-nowrap">
                        Phone
                      </th>
                      <th className={thClass} onClick={() => toggleSort("selectedVehicle")}>
                        Vehicle <SortIcon col="selectedVehicle" />
                      </th>
                      <th className={thClass} onClick={() => toggleSort("rentalDays")}>
                        Days <SortIcon col="rentalDays" />
                      </th>
                      <th className={thClass} onClick={() => toggleSort("bookingDate")}>
                        Booked On <SortIcon col="bookingDate" />
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-widest text-zinc-500">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence initial={false}>
                      {filtered.map((b, i) => (
                        <motion.tr
                          key={b.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ delay: i * 0.03 }}
                          className="border-b border-white/4 hover:bg-white/[0.025] transition-colors group"
                        >
                          <td className={tdClass}>
                            <div className="flex items-center gap-2.5">
                              <div
                                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                                style={{
                                  background: `${VEHICLE_COLORS[b.selectedVehicle] ?? "#facc15"}20`,
                                  color: VEHICLE_COLORS[b.selectedVehicle] ?? "#facc15",
                                }}
                              >
                                {b.fullName.charAt(0).toUpperCase()}
                              </div>
                              <span className="font-medium text-white">{b.fullName}</span>
                            </div>
                          </td>
                          <td className={`${tdClass} text-zinc-400 font-mono text-xs`}>{b.phoneNumber}</td>
                          <td className={tdClass}>
                            <span
                              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
                              style={{
                                background: `${VEHICLE_COLORS[b.selectedVehicle] ?? "#facc15"}15`,
                                color: VEHICLE_COLORS[b.selectedVehicle] ?? "#facc15",
                                border: `1px solid ${VEHICLE_COLORS[b.selectedVehicle] ?? "#facc15"}25`,
                              }}
                            >
                              {b.selectedVehicle}
                            </span>
                          </td>
                          <td className={tdClass}>
                            <span className="font-semibold text-white">{b.rentalDays}</span>
                            <span className="text-zinc-500 ml-1 text-xs">day{b.rentalDays !== 1 ? "s" : ""}</span>
                          </td>
                          <td className={`${tdClass} text-zinc-400`}>
                            {new Date(b.bookingDate).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </td>
                          <td className="px-4 py-3.5 text-right">
                            <button
                              onClick={() => setDeleteTarget({ id: b.id, name: b.fullName })}
                              className="opacity-0 group-hover:opacity-100 text-xs font-semibold text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-400/30 rounded-lg px-2.5 py-1.5 transition-all"
                            >
                              Delete
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </>
  );
}
