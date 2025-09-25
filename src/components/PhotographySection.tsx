import { Card, CardContent } from '@/components/ui/card';

interface PhotoProject {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

const PhotographySection = () => {
  const photoProjects: PhotoProject[] = [
    {
      id: 1,
      title: "Portrait Photography",
      category: "Portrait",
      image: "https://picsum.photos/400/300?random=101",
      description: "Professional portrait photography capturing authentic moments and emotions."
    },
    {
      id: 2,
      title: "Event Photography",
      category: "Events",
      image: "https://picsum.photos/400/300?random=102",
      description: "Capturing memorable moments at corporate events and celebrations."
    },
    {
      id: 3,
      title: "Product Photography",
      category: "Commercial",
      image: "https://picsum.photos/400/300?random=103",
      description: "High-quality product photography for e-commerce and marketing."
    },
    {
      id: 4,
      title: "Lifestyle Photography",
      category: "Lifestyle",
      image: "https://picsum.photos/400/300?random=104",
      description: "Lifestyle photography that tells authentic brand stories."
    }
  ];

  return (
    <section id="photography" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Photography
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Capturing moments that matter through creative photography and visual storytelling.
          </p>
        </div>

        {/* Photography Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {photoProjects.map((project) => (
            <Card 
              key={project.id} 
              className="bg-gradient-card border-portfolio-border shadow-card hover:shadow-hover transition-all duration-300 hover:scale-105 group cursor-pointer"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
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
            Hire Me for Photography
          </button>
        </div>
      </div>
    </section>
  );
};

export default PhotographySection;