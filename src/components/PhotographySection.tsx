import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface PhotoProject {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  galleryImages: string[];
}

const PhotographySection = () => {
  const [selectedProject, setSelectedProject] = useState<PhotoProject | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const photoProjects: PhotoProject[] = [
    {
      id: 1,
      title: "Portrait Photography",
      category: "Portrait",
      image: "https://picsum.photos/400/300?random=101",
      description: "Professional portrait photography capturing authentic moments and emotions.",
      galleryImages: [
        "https://picsum.photos/800/600?random=1011",
        "https://picsum.photos/800/600?random=1012",
        "https://picsum.photos/800/600?random=1013",
        "https://picsum.photos/800/600?random=1014"
      ]
    },
    {
      id: 2,
      title: "Event Photography",
      category: "Events",
      image: "https://picsum.photos/400/300?random=102",
      description: "Capturing memorable moments at corporate events and celebrations.",
      galleryImages: [
        "https://picsum.photos/800/600?random=1021",
        "https://picsum.photos/800/600?random=1022",
        "https://picsum.photos/800/600?random=1023",
        "https://picsum.photos/800/600?random=1024"
      ]
    },
    {
      id: 3,
      title: "Product Photography",
      category: "Commercial",
      image: "https://picsum.photos/400/300?random=103",
      description: "High-quality product photography for e-commerce and marketing.",
      galleryImages: [
        "https://picsum.photos/800/600?random=1031",
        "https://picsum.photos/800/600?random=1032",
        "https://picsum.photos/800/600?random=1033",
        "https://picsum.photos/800/600?random=1034"
      ]
    },
    {
      id: 4,
      title: "Lifestyle Photography",
      category: "Lifestyle",
      image: "https://picsum.photos/400/300?random=104",
      description: "Lifestyle photography that tells authentic brand stories.",
      galleryImages: [
        "https://picsum.photos/800/600?random=1041",
        "https://picsum.photos/800/600?random=1042",
        "https://picsum.photos/800/600?random=1043",
        "https://picsum.photos/800/600?random=1044"
      ]
    }
  ];

  const openGallery = (project: PhotoProject) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeGallery = () => {
    setSelectedProject(null);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.galleryImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.galleryImages.length - 1 : prev - 1
      );
    }
  };

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
              onClick={() => openGallery(project)}
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
                  
                  {/* Gallery Badge */}
                  <div className="absolute bottom-4 right-4 bg-portfolio-orange text-background px-3 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.galleryImages.length} Photos
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

      {/* Gallery Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={closeGallery}
        >
          <div className="relative w-full max-w-6xl max-h-[90vh] flex flex-col">
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 z-10 bg-background/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-background/40 transition-colors"
              onClick={closeGallery}
            >
              <X size={24} />
            </button>
            
            {/* Gallery Image */}
            <div className="relative flex-1 overflow-hidden rounded-lg">
              <img 
                src={selectedProject.galleryImages[currentImageIndex]} 
                alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-contain"
              />
              
              {/* Navigation Controls */}
              <button 
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-background/40 transition-colors"
                onClick={prevImage}
              >
                <ChevronLeft size={24} />
              </button>
              
              <button 
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-background/40 transition-colors"
                onClick={nextImage}
              >
                <ChevronRight size={24} />
              </button>
              
              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {selectedProject.galleryImages.length}
              </div>
            </div>
            
            {/* Image Title and Description */}
            <div className="mt-4 text-white text-center">
              <h3 className="text-xl font-bold">{selectedProject.title}</h3>
              <p className="text-white/70 mt-1">{selectedProject.description}</p>
            </div>
            
            {/* Thumbnail Navigation */}
            <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
              {selectedProject.galleryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                    currentImageIndex === index ? 'border-portfolio-orange scale-110' : 'border-transparent opacity-70'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
export default PhotographySection;