import React, { useState, useEffect } from 'react';
import photo from "../assets/spot.png"
import { 
  Play, Trophy, Users, Target, Shield, Zap, 
  BarChart3, ChevronRight, Star, Activity, Sparkles, 
  CheckCircle, Smartphone, Cloud, Heart, LineChart, TargetIcon
} from 'lucide-react';

const Home = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleNavigation = (section) => {
    if (section === 'yolo-test') {
      window.location.href = '/yolo-test';
    } else if (section === 'coach-sheet') {
      window.location.href = '/coach-sheet';
    }
  };

  const metrics = [
    { value: "10K+", label: "Athletes Tracked", icon: Users },
    { value: "98%", label: "Accuracy", icon: Target },
    { value: "500+", label: "Teams Worldwide", icon: Cloud },
    { value: "24/7", label: "Support", icon: Shield }
  ];

  const testimonials = [
    {
      name: "Coach Marcus Rodriguez",
      role: "Head Coach, NCAA Division I",
      quote: "ArenaFitCheck transformed our recruitment process. The AI-driven insights helped us identify talents we would have otherwise missed.",
      score: "92/100",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Dr. Sarah Chen",
      role: "Sports Scientist",
      quote: "The injury prevention analytics reduced our athletes' downtime by 65%. Game-changing technology for modern sports.",
      score: "88/100",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "James Wilson",
      role: "Director, Elite Academy",
      quote: "From grassroots to professional levels, ArenaFitCheck delivers consistent, reliable performance data we trust.",
      score: "95/100",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  const techStack = [
    { name: "React 18", icon: "⚛️", color: "bg-blue-100 text-blue-800" },
    { name: "TensorFlow", icon: "🤖", color: "bg-orange-100 text-orange-800" },
    { name: "WebRTC", icon: "📹", color: "bg-green-100 text-green-800" },
    { name: "Cloud AI", icon: "☁️", color: "bg-purple-100 text-purple-800" }
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-16 md:pb-12  bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className={`transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Elevate Athletic
                <span className="block leading-14 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  Performance
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-10 max-w-xl leading-relaxed font-semibold">
                “ArenaFitCheck combines advanced technology and sports science to deliver professional-grade performance analytics for modern coaching.”
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => handleNavigation('yolo-test')}
                  className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <Play className="w-5 h-5 mr-3" />
                  Start Your Journy
                  <ChevronRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
              </div>
            </div>
            
            {/* Right - Clean Image ONLY */}
            <div className={`relative transition-all duration-700 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              {/* Main Image ONLY */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={photo}
                  alt="Athlete performing sprint test"
                  className="w-full h-[500px] object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent"></div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Professional Tools for
              <span className="py-2 block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                Modern Coaching
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive analytics suite designed by sports scientists and elite coaches
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              {
                title: "YOLO Test System",
                description: "10 standardized fitness assessments with real-time AI analysis",
                icon: <TargetIcon className="w-8 h-8" />,
                features: ["Vertical Jump", "Sprint Timing", "Endurance Tests", "Agility Scoring"],
                color: "from-blue-500 to-cyan-500",
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                action: () => handleNavigation('yolo-test')
              },
              {
                title: "Coach Dashboard Pro",
                description: "Complete team management with advanced analytics",
                icon: <LineChart className="w-8 h-8" />,
                features: ["Team Analytics", "Progress Tracking", "Custom Reports", "Export Tools"],
                color: "from-green-500 to-emerald-500",
                image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                action: () => handleNavigation('coach-sheet')
              },
              {
                title: "Injury Prevention AI",
                description: "Predictive analytics for athlete health management",
                icon: <Heart className="w-8 h-8" />,
                features: ["Load Monitoring", "Recovery Tracking", "Risk Assessment", "Preventive Alerts"],
                color: "from-purple-500 to-pink-500",
                image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                action: () => {}
              }
            ].map((feature, idx) => (
              <div 
                key={idx}
                className="group bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer hover:border-blue-200"
                onClick={feature.action}
              >
                {/* Feature Image ONLY */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                {/* Feature Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                  
                  <div className="space-y-3 mb-8">
                    {feature.features.map((item, idx) => (
                      <div key={idx} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className="group inline-flex items-center text-blue-600 font-semibold hover:text-blue-700">
                    Learn More
                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Trusted by Elite
              <span className="block py-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                Programs Worldwide
              </span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img 
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-blue-600">{testimonial.role}</div>
                  </div>
                </div>
                
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-600 italic mb-6 leading-relaxed">"{testimonial.quote}"</p>
                
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">Platform Score</div>
                    <div className="text-2xl font-bold text-gray-900">{testimonial.score}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-8 opacity-75">
            {["NCAA", "PROFESSIONAL", "ACADEMY", "INTERNATIONAL"].map((badge, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl font-bold text-gray-300 mb-2">{badge}</div>
                <div className="text-sm text-gray-500">Partner</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Background Image ONLY */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Athlete background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/80 to-blue-900/90"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-8 shadow-xl">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to Elevate Your
            <span className="block py-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Athletic Program?
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join thousands of coaches worldwide who trust ArenaFitCheck for professional performance analytics
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => handleNavigation('yolo-test')}
              className="group inline-flex items-center justify-center px-12 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold text-lg rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <Play className="w-6 h-6 mr-3" />
              Start Mock
              <ChevronRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="mt-16 pt-8 border-t border-white/20">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-4 mb-6 md:mb-0">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
                  <div className="text-white font-bold text-xl">AFC</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-white">ArenaFitCheck</div>
                  <div className="text-gray-400 text-sm">Sports Performance Analytics</div>
                </div>
              </div>
              
              <div className="text-gray-400 text-sm">
                © {new Date().getFullYear()} ArenaFitCheck. Made for the hackathon.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;