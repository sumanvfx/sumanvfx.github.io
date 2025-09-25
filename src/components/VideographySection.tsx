import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface Project {
  id: number;
  title: string;
  category: string;
  featured: boolean;
  image: string;
  description: string;
}

interface ProjectsData {
  videography: Project[];
}

const VideographySection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/projects.json');
        const data: ProjectsData = await response.json();
        setProjects(data.videography);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-pulse text-foreground">Loading projects...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="videography" className="py-20 bg-gradient-hero min-h-screen">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Videography
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Creating compelling visual stories that captivate audiences and bring brands to life through dynamic video content.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <Card 
              key={project.id} 
              className={`
                bg-gradient-card border-portfolio-border shadow-card hover:shadow-hover 
                transition-all duration-300 hover:scale-105 group cursor-pointer
                ${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}
              `}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={`https://picsum.photos/400/300?random=${project.id}`}
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-portfolio-orange text-background px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-background/20 backdrop-blur-sm text-foreground px-3 py-1 rounded-full text-sm">
                    {project.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-portfolio-orange transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
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
            Start Your Project
          </button>
        </div>
      </div>
    </section>
  );
};

export default VideographySection;