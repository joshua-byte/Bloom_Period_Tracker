import React from 'react';
import { Heart, MessageCircle, Shield, Coffee } from 'lucide-react';
import { MascotAvatar } from '../components/MascotAvatar';

export const About: React.FC = () => {
  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <MascotAvatar size="large" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          About Period Companion
        </h1>
        
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          A caring, emotionally intelligent companion for your menstrual wellness journey.
        </p>
      </div>
      
      {/* Mission section */}
      <section className="bg-white rounded-xl shadow-md p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Mission</h2>
        
        <div className="space-y-6">
          <p className="text-gray-700">
            Period Companion was created with a simple but powerful mission: to provide a safe, 
            non-judgmental space where menstruators can track their physical symptoms and emotional 
            well-being throughout their cycle.
          </p>
          
          <p className="text-gray-700">
            Unlike traditional period trackers that focus only on dates and physical symptoms, 
            we recognize that menstrual health involves a complex interplay of physical, emotional, 
            and psychological factors. Our emotion-aware approach offers validation, support, and 
            personalized care suggestions based on your unique experience.
          </p>
          
          <p className="text-gray-700">
            We believe in breaking the stigma around menstruation and creating a world where 
            everyone can talk openly about their period experiences and receive the support they need.
          </p>
        </div>
      </section>
      
      {/* Values section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Values</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-pink-50 rounded-xl p-6 border border-pink-100">
            <div className="flex items-center mb-4">
              <div className="bg-pink-100 p-2 rounded-full mr-3">
                <Heart className="text-pink-500" size={20} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Emotional Intelligence</h3>
            </div>
            <p className="text-gray-700">
              We recognize and validate the emotional aspects of menstrual health, providing 
              supportive, non-judgmental responses to your feelings and experiences.
            </p>
          </div>
          
          <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-2 rounded-full mr-3">
                <MessageCircle className="text-purple-500" size={20} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Inclusive Communication</h3>
            </div>
            <p className="text-gray-700">
              We use inclusive, gender-neutral language that respects the diversity of individuals 
              who menstruate, creating a welcoming space for everyone.
            </p>
          </div>
          
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <Shield className="text-blue-500" size={20} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Privacy First</h3>
            </div>
            <p className="text-gray-700">
              Your data stays on your device. We respect your privacy and ensure your 
              personal health information remains confidential and secure.
            </p>
          </div>
          
          <div className="bg-green-50 rounded-xl p-6 border border-green-100">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <Coffee className="text-green-500" size={20} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Holistic Wellness</h3>
            </div>
            <p className="text-gray-700">
              We take a whole-person approach, offering suggestions that nourish your physical, 
              emotional, and mental well-being throughout your cycle.
            </p>
          </div>
        </div>
      </section>
      
      {/* FAQ section */}
      <section className="bg-white rounded-xl shadow-md p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Is my data private?
            </h3>
            <p className="text-gray-700">
              Yes, absolutely. All your data is stored locally on your device and never shared with 
              third parties. Your personal health information remains completely private.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              How accurate are the suggestions?
            </h3>
            <p className="text-gray-700">
              Our suggestions are based on research-backed approaches to menstrual health and emotional 
              wellbeing. However, they are not meant to replace medical advice. Always consult with a 
              healthcare provider for medical concerns.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Can I use Period Companion if I have irregular cycles?
            </h3>
            <p className="text-gray-700">
              Absolutely! Period Companion focuses on your day-to-day symptoms and emotions, 
              making it suitable for everyone regardless of cycle regularity.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Is Period Companion inclusive of all gender identities?
            </h3>
            <p className="text-gray-700">
              Yes, we designed Period Companion to be welcoming and affirming for all menstruators, 
              regardless of gender identity. We use inclusive language throughout the app.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact section */}
      <section className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Get in Touch</h2>
        
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          We'd love to hear from you! If you have questions, suggestions, or just want to share your 
          experience with Period Companion, please reach out.
        </p>
        
        <a 
          href="mailto:hello@periodcompanion.app" 
          className="inline-block bg-white hover:bg-gray-50 text-pink-600 px-6 py-3 rounded-full font-medium shadow-sm transition-colors"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
};
