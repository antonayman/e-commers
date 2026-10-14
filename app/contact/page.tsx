'use client';

import React, { useState } from 'react';
import { Mail, Compass, Send, CheckCircle } from 'lucide-react';
import { useUIStore } from '@/lib/store/useUIStore';
import FloatingBlobs from '@/components/animations/FloatingBlobs';

export default function ContactPage() {
  const { setCursorType, addNotification } = useUIStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('general');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && message.trim()) {
      setSubmitted(true);
      addNotification('Transmission Sent', 'Your secure memo has been dispatched.', 'success');
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const handleHover = (hovering: boolean) => {
    setCursorType(hovering ? 'hover' : 'default');
  };

  return (
    <div className="relative min-h-screen pb-20">
      <FloatingBlobs />

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        
        {/* ================= PAGE HEADER ================= */}
        <div className="py-12 border-b border-border/60">
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
            COMMUNICATION ROUTING
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mt-2 text-foreground">
            Contact Syndicate
          </h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-xl font-light">
            Dispatch a secure message thread directly to our core administration nodes or customer query division.
          </p>
        </div>

        {/* ================= CONTENT COLUMNS ================= */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Contact Coordinates Cards */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-5 rounded-2xl bg-secondary/15 border border-border glass space-y-3 font-mono">
              <span className="inline-flex items-center gap-1 text-[10px] text-accent font-bold uppercase tracking-wider">
                <Compass className="h-4 w-4" /> BIOMETRIC HQ
              </span>
              <h4 className="font-display font-bold text-sm text-foreground">SECTOR 9 SHIELD NODE</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                404 Cyberpunk Lane, Sector 9 <br />
                Neo Tokyo District, JP
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-secondary/15 border border-border glass space-y-3 font-mono">
              <span className="inline-flex items-center gap-1 text-[10px] text-accent font-bold uppercase tracking-wider">
                <Mail className="h-4 w-4" /> PRIVATE CHANNELS
              </span>
              <h4 className="font-display font-bold text-sm text-foreground">ENCRYPTED MEMOS</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                General Support: core@neural.net <br />
                Sales Drops: drops@neural.net
              </p>
            </div>
          </div>

          {/* RIGHT: Contact Form */}
          <div className="lg:col-span-8 bg-secondary/15 border border-border glass p-6 sm:p-8 rounded-3xl space-y-6">
            <h3 className="font-display text-xl font-bold tracking-wide text-foreground">
              Dispatch Secure Memo
            </h3>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-accent/10 border border-accent/30 text-center space-y-3 animate-in zoom-in-95 duration-200">
                <CheckCircle className="h-10 w-10 text-accent mx-auto stroke-1 animate-pulse" />
                <h4 className="font-display font-bold text-foreground text-base">Transmission Successful</h4>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  Your memo was registered in our administration ledger. Neural agents will formulate replies shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[10px] text-muted-foreground uppercase block mb-1">Identity Tag (Name)</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[10px] text-muted-foreground uppercase block mb-1">Neural Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="operative@domain.net"
                      className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[10px] text-muted-foreground uppercase block mb-1">Subject Sector</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-xs font-semibold text-foreground focus:outline-none focus:border-accent"
                    onMouseEnter={() => handleHover(true)}
                    onMouseLeave={() => handleHover(false)}
                  >
                    <option value="general">General Support</option>
                    <option value="drops">Special Drops Info</option>
                    <option value="logistics">Drone Air Delivery Logistics</option>
                    <option value="refunds">Claims & Swaps</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono text-[10px] text-muted-foreground uppercase block mb-1">Memo Contents</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Formulate your request message here..."
                    className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-accent"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-accent text-slate-950 hover:bg-white hover:text-black font-display font-bold text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-1.5 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                  onMouseEnter={() => handleHover(true)}
                  onMouseLeave={() => handleHover(false)}
                >
                  <Send className="h-4 w-4" /> DISPATCH MEMO TRANSMISSION
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
