import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Play } from 'lucide-react';
import VideoPlayer from '@/components/VideoPlayer';

interface Project {
  id: number;
  title: string;
  category: string;
  featured: boolean;
  image: string;
  description: string;
  video?: {
    type: 'local' | 'youtube';
    source: string;
    thumbnail?: string;
  };
}

interface ProjectsData {
  videography: Project[];
}

const ProjectCategory = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<{type: 'local' | 'youtube', source: string} | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/projects.json');
        const data: ProjectsData = await response.json();
        
        // Filter projects by category
        const categoryName = category?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || '';
        const filteredProjects = data.videography.filter(
          project => project.category.toLowerCase() === categoryName.toLowerCase()
        );
        
        setProjects(filteredProjects);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [category]);

  const categoryName = category?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || '';

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 text-center">
          <div className="animate-pulse text-foreground">Loading projects...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="mb-6 border-portfolio-orange text-portfolio-orange hover:bg-portfolio-orange hover:text-background"
            >
              ← Back to Home
            </Button>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
              {categoryName} Projects
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore my {categoryName.toLowerCase()} projects and video content showcasing creativity and professional expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          {projects.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-foreground mb-4">No projects found</h3>
              <p className="text-muted-foreground mb-8">
                Sorry, no projects found in the {categoryName} category.
              </p>
              <Button
                onClick={() => navigate('/')}
                className="bg-portfolio-orange hover:bg-portfolio-orange-hover text-background"
              >
                Back to Home
              </Button>
            </div>
          ) : (
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
                        src={`https://picsum.photos/600/400?random=${project.id}`}
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
                      
                      {/* Play Button Overlay */}
                      {project.video && (
                        <div 
                          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          onClick={() => setSelectedVideo({type: project.video!.type, source: project.video!.source})}
                        >
                          <div className="w-16 h-16 bg-portfolio-orange/90 rounded-full flex items-center justify-center">
                            <Play className="h-8 w-8 text-background" />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-portfolio-orange transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {project.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-portfolio-orange text-sm font-medium">
                          {project.category}
                        </span>
                        {project.video && (
                          <button 
                            className="text-portfolio-orange hover:text-portfolio-orange-hover text-sm font-medium transition-colors duration-300"
                            onClick={() => setSelectedVideo({type: project.video!.type, source: project.video!.source})}
                          >
                            Watch Video →
                          </button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center mt-16">
            <Button
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="bg-portfolio-orange hover:bg-portfolio-orange-hover text-background font-medium px-8 py-3 shadow-glow hover:shadow-hover"
            >
              Start Your {categoryName} Project
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Video Player */}
      {selectedVideo && (
        <VideoPlayer
          videoType={selectedVideo.type}
          videoSource={selectedVideo.source}
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
};

export default ProjectCategory;