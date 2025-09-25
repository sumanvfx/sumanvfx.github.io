import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface Service {
  id: number;
  title: string;
  description: string;
}

interface ServicesData {
  services: Service[];
}

const ServicesSection = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/services.json');
        const data: ServicesData = await response.json();
        setServices(data.services);
      } catch (error) {
        console.error('Error loading services:', error);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-pulse text-foreground">Loading services...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Services
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Professional video editing and creative services to elevate your brand and storytelling.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {services.map((service) => (
            <Card
              key={service.id}
              className="bg-gradient-card border-portfolio-border shadow-card hover:shadow-hover transition-all duration-300 hover:scale-105 group cursor-pointer"
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-portfolio-orange/10 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-portfolio-orange/20 transition-colors duration-300">
                  <div className="w-8 h-8 bg-portfolio-orange rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-portfolio-orange transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button 
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-portfolio-orange hover:bg-portfolio-orange-hover text-background font-medium px-8 py-3 rounded-lg transition-colors duration-300 shadow-glow hover:shadow-hover"
          >
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;