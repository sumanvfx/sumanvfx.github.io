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
I'm a professional video editor with 5 years of experience in creating engaging video content.
Skilled in editing, color grading, motion graphics, and sound design using industry-standard tools.
I turn ideas into compelling visual stories for brands, creators, and businesses.            
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Profile Image */}
          <div className="relative">
            <div className="aspect-square bg-gradient-card rounded-2xl p-8 border border-portfolio-border shadow-card">

              <div className="w-full h-full rounded-xl overflow-hidden">
                <img
                  src="/images/profile.jpeg" // put your image path here
                  alt="Suman Saurabh"
                  className="w-full h-full object-cover"
                />
              </div>              
            
            </div>
          </div>

          {/* About Content */}
          <div className="space-y-6">
            {/* <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Profile Summary</h3>
              <p className="text-muted-foreground leading-relaxed">
            
                I specialize in editing, color grading, motion graphics, and sound design using Adobe Premiere Pro, After Effects,
                and DaVinci Resolve. Whether it’s YouTube videos, social media content, or promotional clips,
                I turn your raw footage into compelling visual stories that connect with your audience and elevate your brand.
              </p>
            </div> */}

            {/* Experience */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Experience</h3>
              <div className="space-y-4">
                <Card className="bg-gradient-card border-portfolio-border">
                  <CardContent className="p-4">
                    <h4 className="font-bold text-foreground">Car&Bike - Video Editor</h4>
                    <p className="text-portfolio-orange text-sm">05/2024 – Present | Delhi, India</p>
                    <p className="text-muted-foreground text-sm mt-2">
• Edited over 450+ automotive reviews and campaigns, increasing YouTube
engagement by 30%.
                    </p>
                   <p className="text-muted-foreground text-sm mt-2">
• Worked closely with motion design and content teams.
                    </p>

                     <p className="text-muted-foreground text-sm mt-2">
• Maintained brand tone while delivering fast-paced edits.
                    </p> 
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card border-portfolio-border">
                  <CardContent className="p-4">
                    <h4 className="font-bold text-foreground">Premix Studio Pvt. Ltd. - Video Editor</h4>
                    <p className="text-portfolio-orange text-sm">06/2022 – 05/2024 | Delhi, India</p>
                    <p className="text-muted-foreground text-sm mt-2">
•Handled corporate videos, promos, and post-production. • Designed motion graphics using After Effects. • Managed studio editing workflows, file delivery & asset management.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-card border-portfolio-border">
                  <CardContent className="p-4">
                    <h4 className="font-bold text-foreground">Mentors Adda Pvt. Ltd. - Video Editor</h4>
                    <p className="text-portfolio-orange text-sm">01/2021 – 01/2022 | Delhi, India</p>
                    <p className="text-muted-foreground text-sm mt-2">
• Edited educational video content and social ads.• Assisted in creative planning and asset creation.
                    </p>
                  </CardContent>
                </Card> 
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {['Adobe Premiere Pro', 'After Effects', 'Photoshop', 'Illustrator', 'Cinematography','DaVinci Resolve'].map((skill) => (
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
