"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowRight, CheckCircle, Mail, MapPin, Scissors, Briefcase, Truck, Users } from "lucide-react";

type Role = "designer" | "vendor" | "partner" | "collab" | "";

export default function IntakePage() {
  const [role, setRole] = useState<Role>("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        body: JSON.stringify({ role, ...data }),
      });
      if (res.ok) setSubmitted(true);
    } catch (err) {
      alert("ERROR: System failed to transmit application. Please check connection.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F4F4F4] text-black flex flex-col items-center justify-center p-6 font-mono">
        <CheckCircle className="mb-6 text-black" size={60} strokeWidth={1} />
        <h1 className="text-3xl italic uppercase tracking-tighter font-bold">Entry_Confirmed</h1>
        <p className="text-[10px] text-black/50 uppercase tracking-[0.4em] mt-4 text-center">Your details have been recorded in the Avioré Archive.</p>
        <button onClick={() => window.location.reload()} className="mt-12 text-[10px] underline tracking-widest uppercase font-bold">Submit Another Entry</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F4F4] text-black font-mono selection:bg-black selection:text-white flex flex-col lg:flex-row">
      
      {/* --- SIDEBAR: ATELIER IDENTITY --- */}
      <aside className="w-full lg:w-[420px] lg:h-screen lg:sticky lg:top-0 bg-white border-r border-black/10 p-8 md:p-12 flex flex-col justify-between">
        <div className="space-y-16">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter uppercase italic leading-none">AVIORÈ<br />CAREERS</h2>
            <div className="h-1 w-12 bg-black" />
            <p className="text-[10px] tracking-[0.4em] text-black/50 uppercase font-bold">External_Affairs_Portal</p>
          </div>

          <div className="space-y-10">
            <div className="space-y-3">
              <span className="text-[9px] uppercase tracking-[0.3em] text-black/30 font-bold flex items-center gap-2 italic">
                <MapPin size={12} strokeWidth={3} /> Atelier_Location
              </span>
              <p className="text-[11px] uppercase font-bold">Lagos, Nigeria // Global Logistics</p>
            </div>

            <div className="space-y-3">
              <span className="text-[9px] uppercase tracking-[0.3em] text-black/30 font-bold flex items-center gap-2 italic">
                <Mail size={12} strokeWidth={3} /> Formal_Contact
              </span>
              <p className="text-[11px] uppercase font-bold underline">aviore.careers@gmail.com</p>
            </div>

            <div className="space-y-3">
              <span className="text-[9px] uppercase tracking-[0.3em] text-black/30 font-bold flex items-center gap-2 italic">
                <Briefcase size={12} strokeWidth={3} /> Purpose
              </span>
              <p className="text-[11px] uppercase font-bold leading-relaxed text-black/60">
                A centralized intake for creative talent, textile sourcing, and commercial partnerships.
              </p>
            </div>
          </div>
        </div>

        <div className="text-[9px] text-black/30 uppercase tracking-[0.3em] font-bold">
          AVIORÉ © 2026 // Archive_Systems
        </div>
      </aside>

      {/* --- MAIN CONTENT: FASHION PILLARS --- */}
      <main className="flex-1 p-8 md:p-24 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <header className="mb-24 space-y-6">
            <span className="text-[10px] border-[1.5px] border-black px-3 py-1 uppercase tracking-widest font-black italic">Active_Sourcing</span>
            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">Intake <br /> Form</h1>
          </header>

          <form onSubmit={handleSubmit} className="space-y-32">
            
            {/* SEGMENT 01: PILLAR SELECTION */}
            <div className="space-y-10">
              <div className="flex items-center gap-4">
                <span className="text-2xl font-black italic border-b-4 border-black">01</span>
                <h3 className="text-[12px] uppercase tracking-[0.6em] font-black italic">Select_Your_Pillar</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: "designer", label: "Fashion Designer", icon: <Scissors size={14} /> },
                  { id: "vendor", label: "Fabric Vendor", icon: <Truck size={14} /> },
                  { id: "partner", label: "Production Partner", icon: <Briefcase size={14} /> },
                  { id: "collab", label: "Brand Collaboration", icon: <Users size={14} /> },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setRole(item.id as Role)}
                    className={`p-6 border flex items-center justify-between text-[11px] uppercase tracking-widest transition-all duration-500 font-bold ${
                      role === item.id ? "bg-black text-white border-black scale-[1.02]" : "bg-white text-black border-black/10 hover:border-black"
                    }`}
                  >
                    {item.label}
                    {item.icon}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {role && (
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-32">
                  
                  {/* SEGMENT 02: CORE DETAILS */}
                  <div className="space-y-12">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-black italic border-b-4 border-black">02</span>
                      <h3 className="text-[12px] uppercase tracking-[0.6em] font-black italic">Primary_Identification</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <input required name="fullName" placeholder="FULL NAME / TRADING NAME" className="bg-transparent border-b-2 border-black/10 p-4 text-[11px] uppercase font-bold outline-none focus:border-black transition-colors" />
                      <input required name="email" type="email" placeholder="OFFICIAL EMAIL" className="bg-transparent border-b-2 border-black/10 p-4 text-[11px] uppercase font-bold outline-none focus:border-black transition-colors" />
                      <input required name="phone" placeholder="WHATSAPP_CONTACT" className="bg-transparent border-b-2 border-black/10 p-4 text-[11px] uppercase font-bold outline-none focus:border-black transition-colors" />
                      <input required name="location" placeholder="CITY / COUNTRY" className="bg-transparent border-b-2 border-black/10 p-4 text-[11px] uppercase font-bold outline-none focus:border-black transition-colors" />
                    </div>
                  </div>

                  {/* SEGMENT 03: PILLAR SPECIFIC AUDIT */}
                  <div className="space-y-12 pb-12">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-black italic border-b-4 border-black">03</span>
                      <h3 className="text-[12px] uppercase tracking-[0.6em] font-black italic">Sector_Specific_Audit</h3>
                    </div>
                    
                    <div className="space-y-12">
                      {role === "designer" && (
                        <>
                          <input required name="portfolio" placeholder="PORTFOLIO LINK (SAMPLES / DESIGNS)" className="w-full bg-white border border-black/10 p-6 text-[11px] font-bold focus:border-black outline-none uppercase" />
                          <input required name="specialty" placeholder="CORE SPECIALIZATION (E.G. TAILORING, PATTERN MAKING, KNITS)" className="w-full bg-white border border-black/10 p-6 text-[11px] font-bold focus:border-black outline-none uppercase" />
                          <textarea required name="exp" placeholder="BRIEF OVERVIEW OF PREVIOUS ROLES OR BRAND EXPERIENCE" className="w-full bg-white border border-black/10 p-6 text-[11px] h-32 font-bold focus:border-black outline-none uppercase" />
                        </>
                      )}

                      {role === "vendor" && (
                        <>
                          <input required name="textiles" placeholder="PRIMARY TEXTILE TYPES (E.G. DENIM, ORGANIC COTTON, SILK)" className="w-full bg-white border border-black/10 p-6 text-[11px] font-bold focus:border-black outline-none uppercase" />
                          <input required name="moq" placeholder="MINIMUM ORDER QUANTITY (MOQ)" className="w-full bg-white border border-black/10 p-6 text-[11px] font-bold focus:border-black outline-none uppercase" />
                          <input required name="catalog" placeholder="LINK TO DIGITAL FABRIC CATALOGUE" className="w-full bg-white border border-black/10 p-6 text-[11px] font-bold focus:border-black outline-none uppercase" />
                        </>
                      )}

                      {role === "partner" && (
                        <>
                          <input required name="units" placeholder="MONTHLY GARMENT CAPACITY (UNIT COUNT)" className="w-full bg-white border border-black/10 p-6 text-[11px] font-bold focus:border-black outline-none uppercase" />
                          <input required name="machines" placeholder="EQUIPMENT LIST (E.G. OVERLOCK, COVERSTITCH, HEAT PRESS)" className="w-full bg-white border border-black/10 p-6 text-[11px] font-bold focus:border-black outline-none uppercase" />
                          <textarea required name="clients" placeholder="LIST PREVIOUS BRANDS OR CLOTHING COMPANIES PRODUCED FOR" className="w-full bg-white border border-black/10 p-6 text-[11px] h-32 font-bold focus:border-black outline-none uppercase" />
                        </>
                      )}

                      {role === "collab" && (
                        <>
                          <input required name="handle" placeholder="INSTAGRAM / WEBSITE / PORTFOLIO" className="w-full bg-white border border-black/10 p-6 text-[11px] font-bold focus:border-black outline-none uppercase" />
                          <textarea required name="proposal" placeholder="DESCRIBE YOUR COLLABORATION CONCEPT OR BRAND ALIGNMENT" className="w-full bg-white border border-black/10 p-6 text-[11px] h-40 font-bold focus:border-black outline-none uppercase" />
                        </>
                      )}
                    </div>
                  </div>

                  <button 
                    disabled={loading}
                    className="w-full py-10 bg-black text-white flex items-center justify-center gap-6 text-[12px] uppercase tracking-[0.8em] font-black hover:bg-[#111] transition-all duration-700 disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="animate-spin text-white" size={20} /> : "Finalize_Submission"}
                    {!loading && <ArrowRight size={18} />}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </main>
    </div>
  );
}