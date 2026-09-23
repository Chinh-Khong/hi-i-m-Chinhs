"use client";

import React from "react";
import { Building2, TrendingUp, ShieldCheck, ShoppingBag, Car, Truck, Activity } from "lucide-react";

interface ProjectSchematicProps {
  id: string;
  accentColor: string;
}

export default function ProjectSchematic({ id, accentColor }: ProjectSchematicProps) {
  switch (id) {
    case "ifs-broker-portal":
      return (
        <div className="w-full h-full flex flex-col justify-between p-3.5 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/40 relative">
          <div className="flex items-center justify-between text-[11px] font-mono border-b border-white/10 pb-2">
            <span className="text-cyan-300 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-cyan-400" />
              MORTGAGE BROKER PORTAL
            </span>
            <span className="text-emerald-400 font-semibold">LEAD CONVERSION: 94.8%</span>
          </div>

          <div className="grid grid-cols-3 gap-2 my-2">
            <div className="p-2 rounded-lg bg-slate-900/80 border border-white/10 text-center">
              <div className="text-[9px] font-mono text-slate-400">VALUATION</div>
              <div className="text-xs font-bold text-white mt-0.5">$1.85M SGD</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-900/80 border border-white/10 text-center">
              <div className="text-[9px] font-mono text-slate-400">ELIGIBILITY</div>
              <div className="text-xs font-bold text-emerald-400 mt-0.5">APPROVED</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-900/80 border border-white/10 text-center">
              <div className="text-[9px] font-mono text-slate-400">LTV RATIO</div>
              <div className="text-xs font-bold text-cyan-300 mt-0.5">75% MAX</div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1">
            <span>Next.js • TypeScript • TailwindCSS</span>
            <span className="text-cyan-400">SINGAPORE FINTECH</span>
          </div>
        </div>
      );

    case "ifs-loan-monday":
      return (
        <div className="w-full h-full flex flex-col justify-between p-3.5 bg-gradient-to-br from-slate-900 via-slate-950 to-purple-950/40 relative">
          <div className="flex items-center justify-between text-[11px] font-mono border-b border-white/10 pb-2">
            <span className="text-purple-300 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
              LOAN LIFECYCLE ENGINE
            </span>
            <span className="text-purple-400">AUTOMATED WORKFLOW</span>
          </div>

          {/* Stepper Pipeline */}
          <div className="flex items-center justify-between gap-1 my-2">
            {["Application", "Valuation", "Approval", "Disbursement"].map((step, idx) => (
              <div key={step} className="flex-1 text-center">
                <div className="h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 mb-1" />
                <span className="text-[9px] font-mono text-slate-300 block">{step}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1">
            <span>Next.js • REST Microservices</span>
            <span className="text-emerald-400">STATUS: REPAYMENT ACTIVE</span>
          </div>
        </div>
      );

    case "ifs-factorglobe":
      return (
        <div className="w-full h-full flex flex-col justify-between p-3.5 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/40 relative">
          <div className="flex items-center justify-between text-[11px] font-mono border-b border-white/10 pb-2">
            <span className="text-blue-300 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-blue-400" />
              GLOBAL TRADE &amp; FACTORING
            </span>
            <span className="text-blue-400 font-semibold">WEBFLOW CMS</span>
          </div>

          <div className="grid grid-cols-2 gap-2 my-2">
            <div className="p-2 rounded-lg bg-slate-900/80 border border-white/10">
              <span className="text-[9px] font-mono text-slate-400">TRADE FINANCING</span>
              <div className="text-xs font-bold text-white">Cross-Border Invoices</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-900/80 border border-white/10">
              <span className="text-[9px] font-mono text-slate-400">EXPERIENCE</span>
              <div className="text-xs font-bold text-cyan-300">100% Responsive UI</div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1">
            <span>Webflow • HTML5 • CSS3 • JS</span>
            <span className="text-blue-400">B2B GLOBAL ENTERPRISE</span>
          </div>
        </div>
      );

    case "cho-thuoc-tot":
      return (
        <div className="w-full h-full flex flex-col justify-between p-3.5 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/40 relative">
          <div className="flex items-center justify-between text-[11px] font-mono border-b border-white/10 pb-2">
            <span className="text-emerald-300 flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
              PHARMACEUTICAL B2B MARKET
            </span>
            <span className="text-emerald-400">20+ PHARMACIES LINKED</span>
          </div>

          <div className="grid grid-cols-3 gap-2 my-2 text-center">
            <div className="p-1.5 rounded-lg bg-slate-900/80 border border-white/10">
              <span className="text-[9px] font-mono text-slate-400">DRUG CATALOG</span>
              <div className="text-xs font-bold text-white">5,000+ SKU</div>
            </div>
            <div className="p-1.5 rounded-lg bg-slate-900/80 border border-white/10">
              <span className="text-[9px] font-mono text-slate-400">ORDERS</span>
              <div className="text-xs font-bold text-emerald-300">REAL-TIME</div>
            </div>
            <div className="p-1.5 rounded-lg bg-slate-900/80 border border-white/10">
              <span className="text-[9px] font-mono text-slate-400">INVENTORY</span>
              <div className="text-xs font-bold text-cyan-300">AUTOMATED</div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1">
            <span>React • TypeScript • TailwindCSS</span>
            <span className="text-emerald-400">CHỢ THUỐC TỐT</span>
          </div>
        </div>
      );

    case "ecics-insurance":
      return (
        <div className="w-full h-full flex flex-col justify-between p-3.5 bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950/40 relative">
          <div className="flex items-center justify-between text-[11px] font-mono border-b border-white/10 pb-2">
            <span className="text-amber-300 flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-amber-400" />
              VEHICLE INSURANCE PORTAL
            </span>
            <span className="text-amber-400">FAST ONLINE QUOTATION</span>
          </div>

          <div className="grid grid-cols-2 gap-2 my-2">
            <div className="p-2 rounded-lg bg-slate-900/80 border border-white/10">
              <span className="text-[9px] font-mono text-slate-400">LOOKUP ENGINE</span>
              <div className="text-xs font-bold text-white">Plate &amp; Model Data</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-900/80 border border-white/10">
              <span className="text-[9px] font-mono text-slate-400">PAYMENT GATEWAY</span>
              <div className="text-xs font-bold text-emerald-400">Instant Issuance</div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1">
            <span>Next.js • TypeScript • TailwindCSS</span>
            <span className="text-amber-400">ECICS INSURANCE</span>
          </div>
        </div>
      );

    case "medlink-platform":
      return (
        <div className="w-full h-full flex flex-col justify-between p-3.5 bg-gradient-to-br from-slate-900 via-slate-950 to-pink-950/40 relative">
          <div className="flex items-center justify-between text-[11px] font-mono border-b border-white/10 pb-2">
            <span className="text-pink-300 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-pink-400" />
              SUPPLY CHAIN DISTRIBUTION
            </span>
            <span className="text-pink-400">ENTERPRISE SCALE</span>
          </div>

          <div className="grid grid-cols-3 gap-2 my-2 text-center">
            <div className="p-1.5 rounded-lg bg-slate-900/80 border border-white/10">
              <span className="text-[9px] font-mono text-slate-400">PRODUCERS</span>
              <div className="text-xs font-bold text-white">Pharma Hub</div>
            </div>
            <div className="p-1.5 rounded-lg bg-slate-900/80 border border-white/10">
              <span className="text-[9px] font-mono text-slate-400">LOGISTICS</span>
              <div className="text-xs font-bold text-pink-300">Tracking API</div>
            </div>
            <div className="p-1.5 rounded-lg bg-slate-900/80 border border-white/10">
              <span className="text-[9px] font-mono text-slate-400">QUALITY</span>
              <div className="text-xs font-bold text-emerald-400">Verified</div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1">
            <span>React • TypeScript • SCSS • Postman</span>
            <span className="text-pink-400">MEDLINK NETWORK</span>
          </div>
        </div>
      );

    default:
      return null;
  }
}
