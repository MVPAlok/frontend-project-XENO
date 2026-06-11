const fs = require('fs');
let content = fs.readFileSync('src/LandingPage.jsx', 'utf8');

// Fix the logo string
content = content.replace(/<img alt="Xeno AI Logo" className="h-9 w-9 object-contain drop-shadow-md"[\s\S]*?\/>/, 
  `<img alt="Xeno AI Logo" className="h-9 w-9 object-contain drop-shadow-md"\n              src="data:image/png;base64,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" />`
);

// Add the floating elements
const originalVideoBlock = `            {/* Video Mockup Frame */}
            <div className="relative w-full max-w-4xl flex items-center justify-center mt-4 min-h-[450px] reveal z-20">
              <div className="relative z-10 w-full floating-2">
                <div className="absolute -inset-4 bg-gradient-to-tr from-primary to-pink-400 rounded-3xl blur-2xl opacity-20"></div>
                <video 
                  src={heroVideo}
                  className="w-full h-auto rounded-3xl shadow-2xl border-4 border-white/40 object-cover aspect-video"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                ></video>
              </div>
            </div>`;

const newVideoBlock = \`            {/* Video Mockup Frame */}
            <div className="relative w-full max-w-4xl flex items-center justify-center mt-4 min-h-[450px] reveal z-20">
              <div className="relative z-10 w-full floating-2">
                <div className="absolute -inset-4 bg-gradient-to-tr from-primary to-pink-400 rounded-3xl blur-2xl opacity-20"></div>
                <video 
                  src={heroVideo}
                  className="w-full h-auto rounded-3xl shadow-2xl border-4 border-white/40 object-cover aspect-video"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                ></video>
              </div>

              {/* Floating Avatar 1 */}
              <div className="absolute top-[5%] -left-[5%] z-20 reveal-fly" style={{'--fly-x': '-300px', '--fly-y': '-200px', '--fly-rot': '-180deg', transitionDelay: '300ms'}}>
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" className="human-avatar w-20 h-20 floating-1 rounded-full object-cover border-2 border-white shadow-lg" alt="Creative Director" />
              </div>

              {/* Floating Avatar 2 */}
              <div className="absolute bottom-[10%] -left-[2%] z-20 reveal-fly" style={{'--fly-x': '-250px', '--fly-y': '250px', '--fly-rot': '-90deg', transitionDelay: '500ms'}}>
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" className="human-avatar w-16 h-16 floating-3 rounded-full object-cover border-2 border-white shadow-lg" alt="Marketing Lead" />
              </div>

              {/* Floating Avatar 3 */}
              <div className="absolute top-[10%] -right-[8%] z-20 reveal-fly" style={{'--fly-x': '300px', '--fly-y': '-150px', '--fly-rot': '180deg', transitionDelay: '400ms'}}>
                  <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop" className="human-avatar w-24 h-24 floating-2 rounded-full object-cover border-2 border-white shadow-lg" style={{animationDelay: '-2s'}} alt="Content Creator" />
              </div>

              {/* Glassmorphic UI Card */}
              <div className="absolute bottom-[5%] -right-[8%] z-30 reveal-fly" style={{'--fly-x': '300px', '--fly-y': '300px', '--fly-rot': '45deg', transitionDelay: '600ms'}}>
                  <div className="glass-card p-5 w-64 floating-1 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white" style={{animationDelay: '-3s'}}>
                      <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                              <span className="material-symbols-outlined">favorite</span>
                          </div>
                          <div>
                              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Campaign Emotion</p>
                              <p className="text-sm font-black text-gray-900">Highly Engaging</p>
                          </div>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-green-400 to-emerald-500 w-[92%] h-full rounded-full"></div>
                      </div>
                  </div>
              </div>

              {/* AI Generation Card */}
              <div className="absolute top-[40%] -left-[12%] z-30 reveal-fly hidden md:block" style={{'--fly-x': '-400px', '--fly-y': '0px', '--fly-rot': '-45deg', transitionDelay: '700ms'}}>
                  <div className="glass-card p-4 w-56 floating-3 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white">
                      <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center text-white">
                              <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
                          </div>
                          <p className="text-sm font-bold text-gray-900 leading-tight">Generating assets...</p>
                      </div>
                  </div>
              </div>
            </div>\`;

content = content.replace(originalVideoBlock, newVideoBlock);
fs.writeFileSync('src/LandingPage.jsx', content);
