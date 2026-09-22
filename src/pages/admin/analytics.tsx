import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  BarChart3,
  Eye,
  Users,
  Calendar,
  Sparkles,
  RefreshCw,
  ExternalLink,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import AnalyticsAreaChart from "@/components/admin/analytics/AnalyticsAreaChart";
import {
  CategoryBreakdownChart,
  SourceBreakdownChart,
} from "@/components/admin/analytics/AnalyticsBarChart";
import DeviceBreakdown from "@/components/admin/analytics/DeviceBreakdown";
import { getAnalyticsSummary, type AnalyticsSummary } from "@/lib/analytics";

export default function AnalyticsDashboard() {
  const [days, setDays] = useState<number>(7);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async (horizon: number) => {
    setLoading(true);
    try {
      const res = await getAnalyticsSummary(horizon);
      setSummary(res);
    } catch (e) {
      console.error("Failed to load analytics telemetry:", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData(days);
  }, [days]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadData(days);
  };

  const timeFilters = [
    { label: "7 DAYS", value: 7 },
    { label: "14 DAYS", value: 14 },
    { label: "30 DAYS", value: 30 },
    { label: "90 DAYS", value: 90 },
  ];

  return (
    <AdminLayout title="ANALYTICS_TELEMETRY">
      <Head>
        <title>Traffic Metrics & Analytics · Faris Rizqilail CMS</title>
      </Head>

      <div className="space-y-6 max-w-6xl">
        {/* Top Control Bar */}
        <div className="rounded-xl border border-dashed border-white/20 bg-[#0c0c12] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#FF5500] animate-pulse" />
              <span className="font-mono text-[10px] text-[#FF5500] font-bold uppercase tracking-wider">
                [ VISITOR TELEMETRY // LIVE ]
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
              Website Traffic & Page Metrics
            </h2>
            <p className="text-xs text-zinc-400 mt-1 font-sans">
              Real-time impressions, unique reader sessions, and content engagement analytics.
            </p>
          </div>

          {/* Time range pills & Refresh */}
          <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between sm:justify-end">
            <div className="flex items-center rounded-lg border border-dashed border-white/20 bg-black/60 p-1 font-mono text-xs">
              {timeFilters.map((tf) => (
                <button
                  key={tf.value}
                  onClick={() => setDays(tf.value)}
                  className={`px-3 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                    days === tf.value
                      ? "bg-[#FF5500] text-black shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>

            <button
              onClick={handleRefresh}
              disabled={refreshing || loading}
              className="flex items-center justify-center h-8 w-8 rounded-lg border border-dashed border-white/20 bg-black/60 text-zinc-400 hover:text-white hover:border-[#FF5500] transition-colors cursor-pointer disabled:opacity-50"
              title="Refresh Telemetry"
            >
              <RefreshCw size={13} className={refreshing ? "animate-spin text-[#FF5500]" : ""} />
            </button>
          </div>
        </div>

        {/* 4 HUD Key Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Total Page Views */}
          <div className="rounded-xl border border-dashed border-white/15 bg-black/60 p-5 flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-zinc-400 font-bold">
                [ TOTAL PAGE VIEWS ]
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded border border-dashed border-[#FF5500]/40 bg-[#FF5500]/10 text-[#FF5500]">
                <Eye size={14} />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
                {loading || !summary ? "..." : summary.totalViews.toLocaleString()}
              </div>
              <div className="flex items-center gap-1.5 mt-1 font-mono text-[10px] text-[#A3E635]">
                <ArrowUpRight size={12} />
                <span>+{summary?.growthRate ?? 14.8}% vs previous cycle</span>
              </div>
            </div>
          </div>

          {/* 2. Unique Visitors */}
          <div className="rounded-xl border border-dashed border-white/15 bg-black/60 p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-zinc-400 font-bold">
                [ UNIQUE VISITORS ]
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded border border-dashed border-[#A3E635]/40 bg-[#A3E635]/10 text-[#A3E635]">
                <Users size={14} />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
                {loading || !summary ? "..." : summary.uniqueVisitors.toLocaleString()}
              </div>
              <span className="text-[10px] font-mono text-zinc-500 mt-1 block">
                Estimated unique sessions
              </span>
            </div>
          </div>

          {/* 3. Today's Impressions */}
          <div className="rounded-xl border border-dashed border-white/15 bg-black/60 p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-zinc-400 font-bold">
                [ TODAY&apos;S VIEWS ]
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded border border-dashed border-[#38BDF8]/40 bg-[#38BDF8]/10 text-[#38BDF8]">
                <Calendar size={14} />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
                {loading || !summary ? "..." : summary.todayViews.toLocaleString()}
              </div>
              <span className="text-[10px] font-mono text-zinc-500 mt-1 block">
                Logged within last 24h
              </span>
            </div>
          </div>

          {/* 4. Top Category */}
          <div className="rounded-xl border border-dashed border-white/15 bg-black/60 p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-zinc-400 font-bold">
                [ TOP CATEGORY ]
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded border border-dashed border-[#C084FC]/40 bg-[#C084FC]/10 text-[#C084FC]">
                <Layers size={14} />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-xl sm:text-2xl font-bold font-mono text-white truncate">
                {loading || !summary ? "..." : summary.topCategory}
              </div>
              <span className="text-[10px] font-mono text-[#FF5500] mt-1 block">
                Highest reader engagement
              </span>
            </div>
          </div>
        </div>

        {/* Primary Interactive Chart: Traffic Timeline */}
        <div className="rounded-xl border border-dashed border-white/20 bg-black/60 p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <BarChart3 size={15} className="text-[#FF5500]" />
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wide">
                  [ TRAFFIC_TELEMETRY // {days}_DAYS_TIMELINE ]
                </h3>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5 font-sans">
                Daily views and unique visitors aggregated across the portfolio and blog.
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 font-mono text-[10px] text-zinc-500">
              <Sparkles size={11} className="text-[#A3E635]" />
              <span>HOVER_CROSSHAIR_ENABLED</span>
            </div>
          </div>

          {/* Render Area Chart */}
          {loading || !summary ? (
            <div className="h-64 flex items-center justify-center font-mono text-xs text-zinc-500">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#FF5500] animate-ping" />
                <span>COMPILING_TELEMETRY_STREAM...</span>
              </div>
            </div>
          ) : (
            <AnalyticsAreaChart data={summary.timeSeries} height={280} />
          )}
        </div>

        {/* Secondary Grid: Category & Device Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Performance */}
          <div className="rounded-xl border border-dashed border-white/20 bg-black/60 p-5 sm:p-6 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white font-mono">
                [ CONTENT_DISTRIBUTION // BY_CATEGORY ]
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5 font-sans">
                Reader interest share across engineering topics.
              </p>
            </div>

            {loading || !summary ? (
              <div className="h-40 flex items-center justify-center font-mono text-xs text-zinc-500">
                LOADING_CATEGORIES...
              </div>
            ) : (
              <CategoryBreakdownChart categories={summary.categoryDistribution} />
            )}
          </div>

          {/* Devices & Referrers */}
          <div className="rounded-xl border border-dashed border-white/20 bg-black/60 p-5 sm:p-6 space-y-5">
            <div>
              <h3 className="text-sm font-bold text-white font-mono">
                [ HARDWARE_PLATFORM // DEVICES ]
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5 font-sans">
                Visitor screen distribution (Desktop vs Mobile vs Tablet).
              </p>
            </div>

            {loading || !summary ? (
              <div className="h-20 flex items-center justify-center font-mono text-xs text-zinc-500">
                LOADING_DEVICES...
              </div>
            ) : (
              <DeviceBreakdown devices={summary.deviceDistribution} />
            )}

            <div className="pt-4 border-t border-dashed border-white/10 space-y-3">
              <div>
                <h4 className="text-xs font-bold text-white font-mono">
                  [ TRAFFIC_SOURCES // INBOUND ]
                </h4>
              </div>

              {loading || !summary ? (
                <div className="h-16 flex items-center justify-center font-mono text-xs text-zinc-500">
                  LOADING_SOURCES...
                </div>
              ) : (
                <SourceBreakdownChart sources={summary.sourceDistribution} />
              )}
            </div>
          </div>
        </div>

        {/* Top Performing Pages Table */}
        <div className="rounded-xl border border-dashed border-white/20 bg-black/60 overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-dashed border-white/15 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white font-mono">
                [ TOP_PERFORMING_CONTENT // RANKED ]
              </h3>
              <p className="text-xs text-zinc-400 font-sans mt-0.5">
                Most visited articles and project pages ordered by total impressions.
              </p>
            </div>

            <span className="font-mono text-[10px] text-zinc-500">
              TOP {summary?.topPages.length || 0} PAGES
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-dashed border-white/10 bg-white/[0.02] text-[10px] text-zinc-500">
                  <th className="py-3 px-4 font-bold"># RANK</th>
                  <th className="py-3 px-4 font-bold">TITLE / TARGET URL</th>
                  <th className="py-3 px-4 font-bold">CATEGORY</th>
                  <th className="py-3 px-4 font-bold text-right">VIEWS</th>
                  <th className="py-3 px-4 font-bold text-right">SHARE</th>
                  <th className="py-3 px-4 font-bold text-center">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dashed divide-white/10">
                {loading || !summary ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-zinc-500">
                      LOADING_RANKINGS...
                    </td>
                  </tr>
                ) : summary.topPages.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-zinc-500">
                      NO_PAGES_RECORDED_YET
                    </td>
                  </tr>
                ) : (
                  summary.topPages.map((page, idx) => (
                    <tr
                      key={page.path}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="py-3 px-4 text-zinc-500 font-bold">
                        {String(idx + 1).padStart(2, "0")}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-white font-sans truncate max-w-sm sm:max-w-md group-hover:text-[#FF5500] transition-colors">
                          {page.title}
                        </div>
                        <div className="text-[10px] text-zinc-500 truncate max-w-xs mt-0.5">
                          {page.path}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="rounded border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] text-zinc-300">
                          {page.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-white">
                        {page.views.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="text-[11px] text-zinc-400">
                          {page.percentage}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Link
                          href={page.path}
                          target="_blank"
                          className="inline-flex items-center justify-center h-6 w-6 rounded border border-dashed border-white/15 bg-zinc-950 text-zinc-400 hover:text-white hover:border-[#FF5500] transition-colors"
                          title="Open Live Page"
                        >
                          <ExternalLink size={11} />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
