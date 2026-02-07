import React from 'react';
import { Activity, ShieldCheck, BarChart3, ArrowRight, Users, Trophy, TrendingUp, Star, Zap, Target, Award, CheckCircle } from 'lucide-react';

const Home = () => {
  const handleNavigation = (section) => {
    if (section === 'yolo-test') {
      window.location.href = '/yolo-test';
    } else if (section === 'coach-sheet') {
      window.location.href = '/coach-sheet';
    }
  };

  return (
    <div className="min-h-screen font-sans">
      {/* Hero Section with Full Background Image */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1536922246289-88c42f957773?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Athlete running on track"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
        </div>

        {/* Animated Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-screen blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-cyan-500/20 rounded-full mix-blend-screen blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-white">
              {/* Logo */}
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-2xl">
                  <ShieldCheck className="w-7 h-7 text-white" />
                </div>
                <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                  ArenaFeetCheck
                </span>
              </div>

              {/* Tagline */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
                <Star className="w-4 h-4 mr-2 text-yellow-400" />
                <span className="text-sm font-medium text-white">Revolutionizing Grassroots Sports</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Elite Performance
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400">
                  Data Analytics
                </span>
              </h1>

              {/* Description */}
              <p className="text-xl text-gray-200 mb-10 max-w-xl leading-relaxed">
                Transform raw athletic potential into measurable excellence with our 
                AI-powered platform. No expensive sensors required—just pure data-driven insights.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => handleNavigation('yolo-test')}
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center">
                    Start YOLO Test
                    <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={20} />
                  </span>
                </button>
                
                <button className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                  <span className="relative">Watch Demo</span>
                  <div className="ml-3 w-6 h-6 rounded-full border-2 border-white/50 group-hover:border-white transition-colors flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-8 border-t border-white/20">
                {[
                  { value: '10K+', label: 'Athletes Assessed', icon: Users },
                  { value: '95%', label: 'Accuracy Rate', icon: Target },
                  { value: '40%', label: 'Injury Reduction', icon: Activity },
                  { value: '4.9/5', label: 'Coach Rating', icon: Star }
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center group">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-white/10 mb-3 group-hover:bg-white/20 transition-colors">
                        <Icon className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-300">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column - Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* YOLO Test Card */}
              <div 
                onClick={() => handleNavigation('yolo-test')}
                className="group relative bg-gradient-to-br from-gray-900/90 to-gray-900/70 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer hover:shadow-2xl"
              >
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">YOLO Test</h3>
                <p className="text-gray-300 text-sm mb-4">Comprehensive 10-test fitness assessment with instant AI analysis</p>
                <div className="flex items-center text-blue-400 text-sm font-medium">
                  <span>Explore Tests</span>
                  <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={16} />
                </div>
              </div>

              {/* Trial Run Card */}
              <div className="group relative bg-gradient-to-br from-gray-900/90 to-gray-900/70 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-red-500/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer hover:shadow-2xl">
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Trial Run</h3>
                <p className="text-gray-300 text-sm mb-4">Load management & injury prevention analytics</p>
                <div className="flex items-center text-red-400 text-sm font-medium">
                  <span>Monitor Athletes</span>
                  <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={16} />
                </div>
              </div>

              {/* Coach Sheet Card */}
              <div 
                onClick={() => handleNavigation('coach-sheet')}
                className="group relative bg-gradient-to-br from-gray-900/90 to-gray-900/70 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-green-500/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer hover:shadow-2xl"
              >
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Coach Sheet</h3>
                <p className="text-gray-300 text-sm mb-4">Real-time team management dashboard</p>
                <div className="flex items-center text-green-400 text-sm font-medium">
                  <span>View Dashboard</span>
                  <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={16} />
                </div>
              </div>

              {/* Demo Card */}
              <div className="group relative bg-gradient-to-br from-gray-900/90 to-gray-900/70 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer hover:shadow-2xl">
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Live Demo</h3>
                <p className="text-gray-300 text-sm mb-4">See the platform in action with sample data</p>
                <div className="flex items-center text-purple-400 text-sm font-medium">
                  <span>Request Demo</span>
                  <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-300 text-sm font-medium mb-6">
              <CheckCircle className="w-4 h-4 mr-2" />
              Trusted by 500+ Academies Worldwide
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Everything You Need for 
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                Modern Athlete Management
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "YOLO Test Suite",
                description: "10 standardized fitness tests including vertical jump, sprint times, and endurance assessments with instant AI-powered analysis.",
                features: ["AI-Powered Analysis", "Real-time Scoring", "Historical Tracking", "Progress Reports"],
                Icon: TrendingUp,
                color: "from-blue-500 to-cyan-500",
                buttonText: "Run Assessment"
              },
              {
                title: "Trial Run Analytics",
                description: "Advanced load management and wellness tracking to prevent injuries and optimize training intensity for each athlete.",
                features: ["Load Management", "Recovery Tracking", "Injury Alerts", "Wellness Monitoring"],
                Icon: Activity,
                color: "from-red-500 to-pink-500",
                buttonText: "Monitor Athletes"
              },
              {
                title: "Coach Sheet Pro",
                description: "Comprehensive dashboard for managing entire teams, identifying talent trends, and making data-driven decisions.",
                features: ["Team Analytics", "Performance Trends", "Talent Identification", "Custom Reports"],
                Icon: BarChart3,
                color: "from-green-500 to-emerald-500",
                buttonText: "Access Dashboard"
              }
            ].map((feature, index) => (
              <div key={index} className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-2xl">
                <div className={`absolute -top-6 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center shadow-xl`}>
                  <feature.Icon className="w-7 h-7 text-white" />
                </div>
                
                <div className="pt-8 text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{feature.description}</p>
                  
                  <div className="space-y-3 mb-8">
                    {feature.features.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-center text-gray-300">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => handleNavigation(index === 0 ? 'yolo-test' : index === 2 ? 'coach-sheet' : '')}
                    className="group inline-flex items-center justify-center px-6 py-3 text-white bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300 border border-gray-600"
                  >
                    {feature.buttonText}
                    <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Transforming 
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                Athlete Development
              </span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "The YOLO Test gave us insights into our athletes that traditional methods missed. Our injury rates dropped by 65%.",
                name: "Coach Marcus Lee",
                role: "Director, Velocity Athletics",
                image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              },
              {
                quote: "Finally, a platform that bridges the gap between sports science and practical coaching. Game-changing technology.",
                name: "Dr. Sarah Chen",
                role: "Sports Scientist, Elite Performance",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              },
              {
                quote: "The Coach Sheet dashboard has become our single source of truth for all performance data. Incredibly intuitive.",
                name: "James Wilson",
                role: "Head Coach, Future Stars Academy",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              }
            ].map((testimonial, index) => (
              <div key={index} className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-cyan-500/30 transition-all duration-300">
                <div className="absolute -top-4 left-8">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-500/50">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="flex mb-6 pt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <p className="text-gray-300 italic mb-8 leading-relaxed">"{testimonial.quote}"</p>
                
                <div className="border-t border-gray-700 pt-6">
                  <div className="font-bold text-white text-lg">{testimonial.name}</div>
                  <div className="text-sm text-cyan-400">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-8 shadow-2xl">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Start Your Free
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
              Performance Journey
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join elite academies worldwide in building the next generation of athletes with data-driven insights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => handleNavigation('yolo-test')}
              className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center">
                Start Free Trial
                <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={20} />
              </span>
            </button>
            
            <button className="group inline-flex items-center justify-center px-10 py-5 text-lg font-semibold text-white border-2 border-white/30 rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
              <span className="relative">Book a Demo</span>
              <div className="ml-3 w-6 h-6 rounded-full border-2 border-white/50 group-hover:border-white transition-colors flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </button>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/20">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-3 mb-6 md:mb-0">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">ArenaFeetCheck</span>
              </div>
              
              <div className="text-gray-400 text-sm">
                © {new Date().getFullYear()} ArenaFeetCheck. Revolutionizing sports analytics.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;