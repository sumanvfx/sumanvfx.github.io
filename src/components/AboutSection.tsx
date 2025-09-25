import { Card, CardContent } from '@/components/ui/card';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            About Me
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Creative and detail-oriented video editor with 3+ years of experience crafting engaging content for digital platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Profile Image */}
          <div className="relative">
            <div className="aspect-square bg-gradient-card rounded-2xl p-8 border border-portfolio-border shadow-card">
              <div className="w-full h-full bg-muted rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-portfolio-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-background font-bold text-5xl">SS</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Suman Saurabh</h3>
                  <p className="text-portfolio-orange font-medium">Creative Video Editor | Cinematographer</p>
                </div>
              </div>
            </div>
          </div>

          {/* About Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Profile</h3>
              <p className="text-muted-foreground leading-relaxed">
                Proficient in storytelling, editing, and motion graphics with a strong understanding of modern trends and formats. 
                I specialize in creating compelling visual narratives that captivate audiences and bring brands to life.
              </p>
            </div>

            {/* Experience */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Experience</h3>
              <div className="space-y-4">
                <Card className="bg-gradient-card border-portfolio-border">
                  <CardContent className="p-4">
                    <h4 className="font-bold text-foreground">Car&Bike - Video Editor</h4>
                    <p className="text-portfolio-orange text-sm">05/2024 – Present | Delhi, India</p>
                    <p className="text-muted-foreground text-sm mt-2">
                      Edited 150+ automotive reviews, increasing YouTube engagement by 30%
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card border-portfolio-border">
                  <CardContent className="p-4">
                    <h4 className="font-bold text-foreground">Premix Studio Pvt. Ltd. - Video Editor</h4>
                    <p className="text-portfolio-orange text-sm">06/2022 – 05/2024 | Delhi, India</p>
                    <p className="text-muted-foreground text-sm mt-2">
                      Handled corporate videos, promos, and post-production workflows
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {['Adobe Premiere Pro', 'After Effects', 'Photoshop', 'Illustrator', 'Cinematography'].map((skill) => (
                  <span
                    key={skill}
                    className="bg-portfolio-orange/10 text-portfolio-orange px-3 py-1 rounded-full text-sm font-medium border border-portfolio-orange/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;