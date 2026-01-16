"use client";
import React, { useState, useEffect } from "react";
import {
  DollarSign,
  ShoppingBag,
  Users,
  TrendingUp,
  Store,
  Bike,
  Zap,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  TrendingDown,
  AlertCircle,
  Calendar,
  Layers
} from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import KPICard from "@/components/admin/dashboard/KPICard";
import KPISkeleton from "@/components/admin/dashboard/KPISkeleton";

const performanceData = [
  { name: "Mon", orders: 450, revenue: 2400 },
  { name: "Tue", orders: 600, revenue: 3200 },
  { name: "Wed", orders: 550, revenue: 2800 },
  { name: "Thu", orders: 800, revenue: 4200 },
  { name: "Fri", orders: 950, revenue: 5100 },
  { name: "Sat", orders: 1200, revenue: 6800 },
  { name: "Sun", orders: 1100, revenue: 6200 },
];

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState("Month");

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handlePeriodChange = (val: string) => {
    setIsLoading(true);
    setPeriod(val);
    setTimeout(() => setIsLoading(false), 800);
  };

  return (
    <div className="space-y-10 pb-10 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
            <p className="text-[10px] font-black text-green-600 uppercase tracking-[0.2em]">Platform Live & Operational</p>
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Executive Summary</h1>
          <p className="text-gray-500 font-bold mt-1 text-sm uppercase tracking-widest opacity-70">Real-time health & growth metrics for Shopod.</p>
        </div>

        <div className="flex items-center gap-2 p-1.5 bg-gray-100 rounded-2xl border border-gray-200 shadow-inner">
          {["Day", "Week", "Month"].map((p) => (
            <button
              key={p}
              onClick={() => handlePeriodChange(p)}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${period === p
                  ? "bg-white text-[#1877F2] shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
                }`}
            >
              {p}
            </button>
          ))}
          <div className="w-px h-4 bg-gray-200 mx-2"></div>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Calendar size={18} />
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 px-1">
          <TrendingUp size={16} className="text-[#1877F2]" />
          <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Core Performance Indicators</h2>
        </div>

        {isLoading ? (
          <KPISkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard
              title="Total Revenue"
              value="₹12.45L"
              icon={<DollarSign size={20} />}
              trend="+12.5%"
              isUp={true}
              period={period}
              tooltip="Total platform sales volume after discounts and cancellations."
              href="/admin/transactions"
              color="blue"
            />
            <KPICard
              title="Total Orders"
              value="12,840"
              icon={<ShoppingBag size={20} />}
              trend="+8.2%"
              isUp={true}
              period={period}
              tooltip="Aggregate number of orders placed across all categories."
              href="/admin/orders"
              color="orange"
            />
            <KPICard
              title="Live Orders"
              value="84"
              icon={<Zap size={20} />}
              trend="+18%"
              isUp={true}
              period="Last Hour"
              tooltip="Orders currently in preparation or out for delivery."
              href="/admin/orders?status=active"
              color="purple"
            />
            <KPICard
              title="Total Customers"
              value="45.2K"
              icon={<Users size={20} />}
              trend="+5.1%"
              isUp={true}
              period={period}
              tooltip="Unique registered customers who have placed at least one order."
              href="/admin/customers"
              color="indigo"
            />
            <KPICard
              title="Total Vendors"
              value="1,248"
              icon={<Store size={20} />}
              trend="+4.2%"
              isUp={true}
              period={period}
              tooltip="Active restaurants and grocery partners on the platform."
              href="/admin/vendors"
              color="pink"
            />
            <KPICard
              title="Active Riders"
              value="452"
              icon={<Bike size={20} />}
              trend="-2.1%"
              isUp={false}
              period="Last Hour"
              tooltip="Riders currently online and available for delivery."
              href="/admin/riders"
              color="green"
            />
            <KPICard
              title="Cancelled Orders"
              value="124"
              icon={<TrendingDown size={20} />}
              trend="-15.4%"
              isUp={true} // Decline in cancellation is positive
              period={period}
              tooltip="Orders cancelled by users or vendors. A decrease is positive."
              href="/admin/orders?status=cancelled"
              color="yellow"
            />
            <KPICard
              title="Failed Payments"
              value="45"
              icon={<AlertCircle size={20} />}
              trend="+5.2%"
              isUp={false} // Increase in failed payments is negative
              period={period}
              tooltip="Transactions that were aborted or declined by gateways."
              href="/admin/transactions?status=failed"
              color="red"
            />
          </div>
        )}
      </div>

      {/* Analytics & Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-xl font-black text-gray-900 tracking-tight">Revenue Dynamics</h2>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Growth projection for the {period}.</p>
            </div>
            <button className="flex items-center gap-2 p-2 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <Layers size={18} className="text-gray-400" />
            </button>
          </div>
          <div className="h-[350px] w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1877F2" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#1877F2" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
                <Tooltip
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#1877F2" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-xl font-black text-gray-900 tracking-tight">Operational Logs</h2>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">System-wide event stream.</p>
            </div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
          </div>

          <div className="space-y-7 flex-1">
            <ActivityItem
              type="order"
              title="New Order Received"
              desc="Order #ORD-9872 from Burger King"
              time="2 mins ago"
            />
            <ActivityItem
              type="vendor"
              title="New Vendor Request"
              desc="Pizza Hut (Zone: Mumbai Central)"
              time="14 mins ago"
            />
            <ActivityItem
              type="rider"
              title="Rider Application"
              desc="Rahul Sharma (Zone: Bandra)"
              time="1 hour ago"
            />
            <ActivityItem
              type="alert"
              title="High Demand Alert"
              desc="Increased traffic in South Delhi"
              time="2 hours ago"
            />
          </div>

          <button className="w-full mt-8 py-4 bg-gray-50 text-gray-900 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-100 transition-all border border-gray-100">
            Audit Enterprise Logs
          </button>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ title, desc, time, type }: any) {
  const icons: any = {
    order: <ShoppingCart size={16} className="text-blue-600" />,
    vendor: <Store size={16} className="text-orange-500" />,
    rider: <Bike size={16} className="text-green-500" />,
    alert: <Zap size={16} className="text-purple-600" />
  };

  const bgs: any = {
    order: "bg-blue-50",
    vendor: "bg-orange-50",
    rider: "bg-green-50",
    alert: "bg-purple-50"
  };

  return (
    <div className="flex gap-4 group cursor-pointer">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all group-hover:scale-110 ${bgs[type]}`}>
        {icons[type]}
      </div>
      <div>
        <p className="text-[13px] font-black text-gray-900 leading-none group-hover:text-[#1877F2] transition-colors">{title}</p>
        <p className="text-[11px] font-medium text-gray-500 mt-1.5 line-clamp-1">{desc}</p>
        <p className="text-[9px] text-gray-400 font-black uppercase tracking-tighter mt-1">{time}</p>
      </div>
    </div>
  );
}
