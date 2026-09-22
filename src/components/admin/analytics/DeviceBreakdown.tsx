import React from "react";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import type { DeviceTraffic } from "@/lib/analytics";

interface DeviceBreakdownProps {
  devices: DeviceTraffic[];
}

export default function DeviceBreakdown({ devices }: DeviceBreakdownProps) {
  const getDeviceIcon = (device: string) => {
    switch (device) {
      case "mobile":
        return Smartphone;
      case "tablet":
        return Tablet;
      case "desktop":
      default:
        return Monitor;
    }
  };

  const getDeviceLabel = (device: string) => {
    switch (device) {
      case "mobile":
        return "Mobile Phones";
      case "tablet":
        return "Tablets";
      case "desktop":
      default:
        return "Desktop / Laptops";
    }
  };

  return (
    <div className="space-y-4 font-mono">
      {/* Visual Multi-Segment Bar */}
      <div className="h-3 w-full rounded-sm overflow-hidden flex border border-dashed border-white/20 p-[1px] bg-black">
        {devices.map((d) => {
          const bg =
            d.device === "desktop"
              ? "bg-[#38BDF8]"
              : d.device === "mobile"
              ? "bg-[#A3E635]"
              : "bg-[#FCD34D]";
          return (
            <div
              key={d.device}
              className={`${bg} h-full transition-all duration-500`}
              style={{ width: `${d.percentage}%` }}
              title={`${d.device}: ${d.percentage}%`}
            />
          );
        })}
      </div>

      {/* Grid of Devices */}
      <div className="grid grid-cols-3 gap-2">
        {devices.map((d) => {
          const Icon = getDeviceIcon(d.device);
          const accentColor =
            d.device === "desktop"
              ? "#38BDF8"
              : d.device === "mobile"
              ? "#A3E635"
              : "#FCD34D";

          return (
            <div
              key={d.device}
              className="rounded-lg border border-dashed border-white/10 bg-white/[0.02] p-3 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <Icon size={14} style={{ color: accentColor }} />
                <span className="text-[10px] text-zinc-400 font-bold">
                  {d.percentage}%
                </span>
              </div>
              <div className="mt-2">
                <div className="text-sm font-bold text-white">
                  {d.views.toLocaleString()}
                </div>
                <div className="text-[9px] text-zinc-500 truncate mt-0.5">
                  {getDeviceLabel(d.device)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
