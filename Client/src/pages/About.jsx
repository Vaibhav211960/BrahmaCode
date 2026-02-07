import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white font-sans selection:bg-blue-500 selection:text-white overflow-hidden">
      
      {/* ENHANCED BACKGROUND EFFECTS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/30 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600/30 rounded-full blur-[150px] animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-emerald-600/20 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '4s'}} />
        {/* Floating particles effect */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* ENHANCED HERO SECTION */}
      <section className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-lg mb-8 hover:bg-white/15 transition-all duration-300 cursor-pointer group">
          <span className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 animate-pulse shadow-lg shadow-green-500/50" />
          <span className="text-sm font-semibold text-slate-200 tracking-wide uppercase bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Grassroots Intelligence</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-tight">
          We See The <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 animate-gradient-x">
            Unseen Potential.
          </span>
        </h1>
        
        <p className="text-lg md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
          The next champion isn't always on the leaderboard. We combine <span className="text-white font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">manual observation</span> with data to uncover talent at the grassroots level.
        </p>
        
        {/* Enhanced CTA Button */}
        <div className="mt-12">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-bold text-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-blue-600/50">
            <span className="relative z-10">Discover More</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
          </button>
        </div>
      </section>

      {/* ENHANCED STATS STRIP - GLASSMORPHISM */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
          {[
            { label: "Schools", value: "50+", color: "from-blue-400 to-cyan-400" },
            { label: "Athletes", value: "10k+", color: "from-purple-400 to-pink-400" },
            { label: "Data Points", value: "1M+", color: "from-emerald-400 to-green-400" },
            { label: "Accuracy", value: "100%", color: "from-orange-400 to-red-400" }
          ].map((stat, i) => (
            <div key={i} className="text-center py-8 group hover:bg-white/10 rounded-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2">
              <div className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300`}>
                {stat.value}
              </div>
              <div className="text-sm uppercase tracking-widest text-slate-400 font-bold group-hover:text-white transition-all duration-300">
                {stat.label}
              </div>
              <div className="mt-2 h-1 w-12 mx-auto bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full group-hover:w-20 transition-all duration-300" />
            </div>
          ))}
        </div>
      </section>

      {/* ENHANCED DUAL SECTION: STORY & VISUAL */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 mb-32">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          
          {/* Enhanced Text Side */}
          <div className="space-y-10">
            <h2 className="text-4xl md:text-6xl font-black leading-tight">
              Data usually ignores the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">Human Element.</span> We don't.
            </h2>
            <div className="space-y-8 text-slate-300 text-xl leading-relaxed font-light">
              <p className="relative pl-6 border-l-2 border-blue-500/50 hover:border-blue-500 transition-colors duration-300">
                <span className="absolute -left-2 top-2 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                Big tech relies on expensive sensors. But at schools and local clubs, the budget isn't there—but the talent is.
              </p>
              <p className="relative pl-6 border-l-2 border-purple-500/50 hover:border-purple-500 transition-colors duration-300">
                <span className="absolute -left-2 top-2 w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '1s'}} />
                We bridge the gap. Our system empowers coaches to input manual observations that algorithms miss: grit, attitude, and tactical awareness. We turn subjective coaching into objective data.
              </p>
            </div>
            
            <div className="pt-6">
              <button className="group relative flex items-center gap-4 text-white font-bold text-lg hover:text-blue-400 transition-all duration-300">
                <span className="relative">
                  Read our methodology
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
                </span>
                <span className="group-hover:translate-x-2 transition-transform duration-300 text-blue-500 group-hover:text-purple-500">→</span>
              </button>
            </div>
          </div>

          {/* Enhanced Visual Side (Abstract Card) */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-3xl blur-3xl opacity-30 group-hover:opacity-40 transition-opacity duration-500" />
            <div className="relative bg-slate-900/90 border border-white/20 p-10 rounded-3xl h-[28rem] flex flex-col justify-between overflow-hidden backdrop-blur-xl hover:border-white/30 transition-all duration-500 group-hover:scale-105">
              <div className="flex justify-between items-start">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-2xl shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  👁️
                </div>
                <div className="bg-gradient-to-r from-green-500/30 to-emerald-500/30 text-green-400 px-4 py-2 rounded-full text-sm font-mono border border-green-500/30 backdrop-blur-sm">
                  LIVE TRACKING
                </div>
              </div>
              
              <div className="space-y-4 my-8">
                <div className="h-3 w-3/4 bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm">
                  <div className="h-full w-2/3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse" />
                </div>
                <div className="h-3 w-full bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm">
                  <div className="h-full w-1/2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}} />
                </div>
                <div className="h-3 w-5/6 bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm">
                  <div className="h-full w-4/5 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full animate-pulse" style={{animationDelay: '1s'}} />
                </div>
              </div>

              <div className="mt-auto">
                <p className="text-slate-500 text-sm font-mono mb-2">OBSERVATION LOG_</p>
                <p className="text-white text-xl font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  "Athlete shows exceptional burst speed in final quarter."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ENHANCED VALUES GRID */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Why Grassroots Matters
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full animate-pulse" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              title: "Accessibility", 
              desc: "Professional tools shouldn't require professional budgets.", 
              color: "from-blue-500 to-cyan-500",
              icon: "M13 10V3L4 14h7v7l9-11h-7z"
            },
            { 
              title: "Hybrid Model", 
              desc: "Merging human intuition with digital tracking.", 
              color: "from-purple-500 to-pink-500",
              icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            },
            { 
              title: "Scalability", 
              desc: "Growing with the athlete from school to semi-pro.", 
              color: "from-emerald-500 to-green-500",
              icon: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
            },
          ].map((item, i) => (
            <div key={i} className="group relative p-10 bg-slate-900/80 border border-white/10 hover:border-white/30 rounded-3xl transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl backdrop-blur-lg overflow-hidden">
              {/* Background gradient effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl mb-8 flex items-center justify-center text-white shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-200 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  {item.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-lg group-hover:text-slate-300 transition-colors duration-300">
                  {item.desc}
                </p>
              </div>
              
              {/* Hover effect border */}
              <div className={`absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} style={{mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude'}} />
            </div>
          ))}
        </div>
      </section>

      {/* ENHANCED FOOTER CTA */}
      <section className="py-32 border-t border-white/10 relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-emerald-900/20" />
         <div className="absolute inset-0">
           {/* Animated background pattern */}
           <div className="absolute inset-0 opacity-10">
             {[...Array(30)].map((_, i) => (
               <div
                 key={i}
                 className="absolute w-2 h-2 bg-white rounded-full animate-twinkle"
                 style={{
                   left: `${Math.random() * 100}%`,
                   top: `${Math.random() * 100}%`,
                   animationDelay: `${Math.random() * 3}s`
                 }}
               />
             ))}
           </div>
         </div>
         <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
           <h2 className="text-5xl md:text-6xl font-black mb-10 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
             Ready to track what matters?
           </h2>
           <button className="group relative px-10 py-5 bg-gradient-to-r from-white to-blue-50 text-slate-950 font-black rounded-full hover:from-blue-50 hover:to-purple-50 transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-3xl">
             <span className="relative z-10">Get Started Now</span>
             <div className="absolute inset-0 bg-gradient-to-r from-white to-blue-50 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
           </button>
         </div>
      </section>

    </div>
  );
};

export default AboutUs;