import React from 'react';
import { Heart, Calendar, BarChart2, Droplet } from 'lucide-react';
import { AppPage } from '../types';

interface HomeProps {
  navigateTo: (page: AppPage) => void;
}

export const Home: React.FC<HomeProps> = ({ navigateTo }) => {
  return (
    <div className="animate-fade-in">
      {/* Hero section */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Your Personal <span className="text-teal-600">Wellness</span> Journey
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              Track your cycle, understand your emotions, and receive personalized care suggestions in a safe, judgment-free space.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigateTo('track')}
                className="btn-primary"
              >
                Start Tracking
              </button>
              
              <button
                onClick={() => navigateTo('about')}
                className="btn-secondary"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Comprehensive Wellness Tracking
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our holistic approach combines emotional awareness with period tracking to support your complete health journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card p-8 hover:bg-gradient-to-br from-teal-50 to-emerald-50">
              <div className="bg-teal-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 transform transition-transform group-hover:scale-110">
                <Heart className="text-teal-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Mood Tracking</h3>
              <p className="text-gray-600">
                Log your emotions with our intelligent tracker that validates and supports your feelings.
              </p>
            </div>
            
            <div className="card p-8 hover:bg-gradient-to-br from-teal-50 to-emerald-50">
              <div className="bg-teal-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 transform transition-transform group-hover:scale-110">
                <Calendar className="text-teal-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Symptom Logging</h3>
              <p className="text-gray-600">
                Track physical symptoms to better understand your body's unique patterns.
              </p>
            </div>
            
            <div className="card p-8 hover:bg-gradient-to-br from-teal-50 to-emerald-50">
              <div className="bg-teal-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 transform transition-transform group-hover:scale-110">
                <Droplet className="text-teal-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Care Suggestions</h3>
              <p className="text-gray-600">
                Get personalized wellness recommendations based on your unique needs.
              </p>
            </div>
            
            <div className="card p-8 hover:bg-gradient-to-br from-teal-50 to-emerald-50">
              <div className="bg-teal-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 transform transition-transform group-hover:scale-110">
                <BarChart2 className="text-teal-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Wellness Insights</h3>
              <p className="text-gray-600">
                Visualize your journey and gain valuable insights about your patterns.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonial section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Supporting Your Journey
              </h2>
              
              <p className="text-xl text-gray-600 italic mb-8">
                "Bloom understands that menstrual health is about more than tracking days—it's about supporting your complete emotional and physical well-being throughout your cycle."
              </p>
              
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 bg-teal-100 rounded-full"></div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Dr. Emma Chen</p>
                  <p className="text-gray-600">Reproductive Health Specialist</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Begin Your Wellness Journey
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Join Bloom today and experience a more mindful approach to menstrual wellness.
          </p>
          
          <button
            onClick={() => navigateTo('track')}
            className="btn-primary text-lg px-10 py-5"
          >
            Start Tracking Now
          </button>
        </div>
      </section>
    </div>
  );
};