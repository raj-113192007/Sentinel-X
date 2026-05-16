import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Search, Terminal, Globe, Cpu, Radar, ChevronRight, ExternalLink, MapPin, Activity, Wifi, Lock, Box, Zap } from 'lucide-react';

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
    <div className="container h-20 flex items-center justify-between mx-auto px-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#00D1FF]/20 rounded-lg flex items-center justify-center border border-[#00D1FF]/30">
          <Shield className="text-[#00D1FF]" size={24} />
        </div>
        <span className="text-xl font-bold tracking-tight glow-text">SENTINEL-X</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/40">
        <a href="#dashboard" className="hover:text-[#00D1FF] transition-colors">Recon Tool</a>
        <a href="#features" className="hover:text-[#00D1FF] transition-colors">Modules</a>
        <a href="#about" className="hover:text-[#00D1FF] transition-colors">Founder</a>
        <a href="https://github.com/raj113192007" target="_blank" rel="noopener noreferrer" className="btn-primary">Connect Hub</a>
      </div>
    </div>
  </nav>
);

const App = () => {
  const [ipInput, setIpInput] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [terminalLines, setTerminalLines] = useState([
    { text: 'SENTINEL-X RECON CORE v2.0 READY', type: 'info' },
    { text: 'OPERATOR: raj113192007', type: 'success' },
    { text: 'AWAITING NEURAL LINK...', type: 'info' }
  ]);

  const addTerminalLine = (text, type = 'info') => {
    setTerminalLines(prev => [...prev, { text, type }]);
  };

  const handleIpScan = async () => {
    if (!ipInput) return;
    setLoading(true);
    setScanResult(null);
    addTerminalLine(`INITIALIZING QUANTUM SCAN ON: ${ipInput}`, 'info');

    try {
      const res = await fetch(`http://ip-api.com/json/${ipInput}`);
      const ipData = await res.json();
      
      if (ipData.status === 'success') {
        addTerminalLine(`TARGET INTERCEPTED: ${ipData.city}, ${ipData.country}`, 'success');
        addTerminalLine(`PENETRATING NETWORK LAYERS...`, 'info');
        
        const portRes = await fetch(`http://localhost:3001/scan-ports?target=${ipInput}`);
        const portData = await portRes.json();
        
        setTimeout(() => {
          setScanResult({ ...ipData, openPorts: portData.openPorts });
          setLoading(false);
          addTerminalLine(`RECON SUCCESSFUL. DATA SYNCED.`, 'success');
        }, 1500);
      } else {
        addTerminalLine(`AUTH ERROR: TARGET REJECTED [${ipData.message}]`, 'error');
        setLoading(false);
      }
    } catch (err) {
      addTerminalLine(`CRITICAL FAILURE: BACKEND LINK SEVERED`, 'error');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030308] text-[#E2E8F0] selection:bg-[#00D1FF]/30">
      <div className="bg-mesh" />
      <Navbar />
      
      <section id="dashboard" className="pt-32 pb-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10">
            
            {/* Left: Control Deck */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-4 space-y-8"
            >
              <div className="glass-card p-8">
                <div className="flex items-center gap-3 mb-8">
                  <Zap className="text-[#00D1FF]" size={20} />
                  <h3 className="text-xl font-bold tracking-tight">Command Center</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="relative">
                    <label className="text-[10px] text-white/30 uppercase tracking-[0.2em] block mb-3 font-black">Target Signature</label>
                    <input 
                      type="text" 
                      placeholder="IP Address (e.g. 1.1.1.1)"
                      className="input-cyber"
                      value={ipInput}
                      onChange={(e) => setIpInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleIpScan()}
                    />
                  </div>
                  
                  <button 
                    onClick={handleIpScan}
                    disabled={loading}
                    className="btn-primary w-full flex items-center justify-center gap-2 group"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>EXECUTE RECON <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-5 text-center">
                  <div className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Link Status</div>
                  <div className="text-[#00D1FF] text-sm font-bold flex items-center justify-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#00D1FF] rounded-full animate-pulse" /> ENCRYPTED
                  </div>
                </div>
                <div className="glass-card p-5 text-center">
                  <div className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Global Load</div>
                  <div className="text-white/60 text-sm font-bold">0.04ms</div>
                </div>
              </div>
            </motion.div>

            {/* Right: Data Visualization */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-8"
            >
              <AnimatePresence mode="wait">
                {scanResult ? (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card p-10 border-[#00D1FF]/20 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-6 opacity-10">
                      <Shield size={120} />
                    </div>
                    
                    <div className="flex items-center justify-between mb-10">
                      <div>
                        <h3 className="text-3xl font-black mb-1 glow-text">INTELLIGENCE SYNC</h3>
                        <p className="text-white/30 text-xs tracking-widest uppercase">Target: {ipInput}</p>
                      </div>
                      <div className="w-12 h-12 bg-[#00D1FF]/10 rounded-full flex items-center justify-center text-[#00D1FF]">
                        <Activity size={24} />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                      <div className="space-y-8">
                        <div className="flex items-start gap-4">
                          <MapPin className="text-[#00D1FF] mt-1" size={20} />
                          <div>
                            <div className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Origin Point</div>
                            <div className="text-lg font-bold">{scanResult.city}, {scanResult.country}</div>
                            <div className="text-xs text-white/40">{scanResult.regionName}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <Wifi className="text-[#00D1FF] mt-1" size={20} />
                          <div>
                            <div className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Service Provider</div>
                            <div className="text-lg font-bold">{scanResult.isp}</div>
                            <div className="text-xs text-white/40">{scanResult.as}</div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-8 p-6 bg-white/5 rounded-2xl border border-white/5">
                        <div>
                          <div className="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                            <Terminal size={14} /> Vulnerable Ports
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {scanResult.openPorts && scanResult.openPorts.length > 0 ? (
                              scanResult.openPorts.map(p => (
                                <span key={p} className="px-3 py-1 bg-[#00D1FF]/20 text-[#00D1FF] border border-[#00D1FF]/30 rounded-md text-xs font-bold">
                                  PORT {p}
                                </span>
                              ))
                            ) : (
                              <span className="text-white/20 text-xs italic">No open ports detected in common range.</span>
                            )}
                          </div>
                        </div>
                        <div className="pt-4 border-t border-white/5">
                          <div className="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-1">Coordinate Mapping</div>
                          <div className="text-sm font-mono text-[#00D1FF]">{scanResult.lat}, {scanResult.lon}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="glass-card p-0 overflow-hidden min-h-[500px] flex flex-col">
                    <div className="bg-white/5 p-4 flex items-center justify-between border-b border-white/5">
                      <div className="flex gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
                      </div>
                      <div className="text-[10px] font-bold text-white/20 tracking-widest">SENTINEL_RECON_ENV_V2.0.0</div>
                    </div>
                    <div className="p-8 font-mono text-xs md:text-sm flex-1 custom-scrollbar overflow-y-auto">
                      {terminalLines.map((line, i) => (
                        <div key={i} className="mb-2 flex gap-4">
                          <span className="text-white/10 shrink-0">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
                          <span className={
                            line.type === 'success' ? 'text-[#00D1FF]' : 
                            line.type === 'error' ? 'text-[#FF4B4B]' : 
                            'text-white/50'
                          }>
                            {line.text}
                          </span>
                        </div>
                      ))}
                      {loading && (
                        <div className="flex gap-4">
                          <span className="text-white/10">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
                          <span className="text-[#00D1FF] animate-pulse">ANALYZING TARGET PACKETS...</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </section>

      {/* Features Grid */}
      <section id="features" className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Globe, title: "Global Intel", desc: "Access 200+ countries' ASN and ISP metadata instantly." },
              { icon: Box, title: "Port Auditing", desc: "Advanced socket interrogation for perimeter security." },
              { icon: Shield, title: "Neural Link", desc: "Encrypted reconnaissance paths via KrypZen backbone." }
            ].map((f, i) => (
              <div key={i} className="glass-card p-8 group">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#00D1FF]/10 transition-colors">
                  <f.icon className="text-white/40 group-hover:text-[#00D1FF] transition-colors" size={24} />
                </div>
                <h4 className="text-lg font-bold mb-3">{f.title}</h4>
                <p className="text-sm text-white/30 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Founder */}
      <section id="about" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="glass-card p-10 flex flex-col md:flex-row items-center gap-12 bg-gradient-to-br from-white/[0.03] to-transparent">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00D1FF] to-[#7000FF] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative w-40 h-40 rounded-2xl bg-black border border-white/10 overflow-hidden">
                <img src="/founder.png" alt="Raj Srivastava" className="w-full h-full object-cover grayscale" />
              </div>
            </div>
            <div>
              <div className="text-[#00D1FF] font-mono text-[10px] mb-2 font-black tracking-[0.3em]">CHIEF ARCHITECT</div>
              <h2 className="text-4xl font-black mb-6">Raj Srivastava</h2>
              <p className="text-lg text-white/40 leading-relaxed mb-8 max-w-2xl">
                Redefining digital security through the KrypZen Ecosystem. Sentinel-X is our specialized response to the growing need for rapid, autonomous network reconnaissance.
              </p>
              <div className="flex flex-wrap gap-8">
                <a href="https://github.com/raj113192007" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors flex items-center gap-2 text-sm">
                  <Terminal size={16} /> raj113192007
                </a>
                <a href="https://krypzen.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors flex items-center gap-2 text-sm">
                  <ExternalLink size={16} /> krypzen.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-[10px] text-white/20 uppercase tracking-[0.5em] font-bold">Sentinel-X // KrypZen Group Core</p>
      </footer>
    </div>
  );
};

export default App;
