import Header from '@/components/Header';
import AboutSection from '@/components/AboutSection';
import VideographySection from '@/components/VideographySection';
import PhotographySection from '@/components/PhotographySection';
import ServicesSection from '@/components/ServicesSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section id="home" className="pt-20 min-h-screen bg-gradient-hero flex items-center">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 animate-fade-in">
            Creative <span className="text-portfolio-orange">Visual</span> Storytelling
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            Transforming ideas into compelling visual narratives through professional videography, photography, and digital marketing solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <button 
              onClick={() => document.querySelector('#videography')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-portfolio-orange hover:bg-portfolio-orange-hover text-background font-medium px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-glow transform hover:scale-105"
            >
              View Our Work
            </button>
            <button 
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="border border-portfolio-orange text-portfolio-orange hover:bg-portfolio-orange hover:text-background font-medium px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

       {/* Projects Section */}
      <ProjectsSection />

      {/* Videography Section */}
      <VideographySection />

      {/* Photography Section */}
      <PhotographySection />

      {/* Services Section */}
      <ServicesSection />

     

      {/* Contact Form */}
      <ContactForm />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
