import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { X, Play } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  featured: boolean;
  image: string;
  description: string;
  videoUrl?: string;
}

interface ProjectsData {
  videography: Project[];
}

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/projects.json');
        const data: ProjectsData = await response.json();
        
        // Add sample YouTube video URLs for demonstration
        const projectsWithVideos = data.videography.map(project => ({
          ...project,
          videoUrl: project.id % 2 === 0 
            ? "https://www.youtube.com/embed/dQw4w9WgXcQ" // Sample YouTube URL
            : "https://www.youtube.com/embed/jNQXAC9IVRw" // Another sample URL
        }));
        
        setProjects(projectsWithVideos);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Get unique categories
  const categories = Array.from(new Set(projects.map(project => project.category)));

  const handleCategoryClick = (category: string) => {
    navigate(`/projects/${category.toLowerCase().replace(/\s+/g, '-')}`);
  };
  
  const openVideoDialog = (e: React.MouseEvent, videoUrl: string) => {
    e.stopPropagation();
    setSelectedVideo(videoUrl);
  };
  
  const closeVideoDialog = () => {
    setSelectedVideo(null);
  };

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
    <section id="projects" className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Projects
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore my work across different categories. Click on any category to see detailed project showcase.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {categories.map((category) => {
            const categoryProjects = projects.filter(project => project.category === category);
            const featuredProject = categoryProjects.find(project => project.featured) || categoryProjects[0];
            
            return (
              <Card
                key={category}
                onClick={() => handleCategoryClick(category)}
                className="bg-gradient-card border-portfolio-border shadow-card hover:shadow-hover transition-all duration-300 hover:scale-105 group cursor-pointer"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={`https://picsum.photos/400/300?random=${featuredProject?.id || 1}`}
                      alt={category}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Project Count Badge */}
                    <div className="absolute top-4 right-4 bg-portfolio-orange text-background px-3 py-1 rounded-full text-sm font-medium">
                      {categoryProjects.length} Projects
                    </div>
                    
                    {/* Video Play Button - Only show if featured project has a video URL */}
                    {featuredProject?.videoUrl && (
                      <button
                        onClick={(e) => openVideoDialog(e, featuredProject.videoUrl!)}
                        className="absolute bottom-4 right-4 bg-background/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-background/40 transition-colors group-hover:opacity-100 opacity-0"
                        aria-label="Play video"
                      >
                        <Play size={24} className="fill-portfolio-orange" />
                      </button>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-portfolio-orange transition-colors duration-300">
                      {category}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {featuredProject?.description || `Explore ${categoryProjects.length} projects in ${category} category`}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-portfolio-orange text-sm font-medium">
                        Click to explore →
                      </span>
                      {featuredProject?.videoUrl && (
                        <button
                          onClick={(e) => openVideoDialog(e, featuredProject.videoUrl!)}
                          className="text-portfolio-orange hover:text-portfolio-orange-hover flex items-center gap-1 text-sm font-medium"
                        >
                          <Play size={16} /> Watch Video
                        </button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
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
      
      {/* YouTube Video Dialog */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={closeVideoDialog}
        >
          <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col">
            {/* Close Button */}
            <button 
              className="absolute -top-12 right-0 z-10 bg-background/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-background/40 transition-colors"
              onClick={closeVideoDialog}
            >
              <X size={24} />
            </button>
            
            {/* YouTube Embed */}
            <div className="relative w-full overflow-hidden rounded-lg" style={{ paddingBottom: '56.25%' }}>
              <iframe 
                src={`${selectedVideo}?autoplay=1`}
                title="YouTube video player"
                className="absolute top-0 left-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;