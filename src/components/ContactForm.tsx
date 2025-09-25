import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your name",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast({
        title: "Validation Error", 
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.message.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your message",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate form submission (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon.",
      });

      // Reset form
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Contact Info */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Let's <span className="text-portfolio-orange">Talk!</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Ready to bring your vision to life? Get in touch and let's create something amazing together.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-portfolio-orange rounded-lg flex items-center justify-center">
                    <span className="text-background font-bold">📧</span>
                  </div>
                  <span className="text-foreground">connect@elevn11.in</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-portfolio-orange rounded-lg flex items-center justify-center">
                    <span className="text-background font-bold">📱</span>
                  </div>
                  <span className="text-foreground">+91 8525987970</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="bg-gradient-card border-portfolio-border shadow-card">
              <CardHeader>
                <CardTitle className="text-foreground text-xl">Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Your good name..."
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-input border-portfolio-border text-foreground placeholder:text-muted-foreground focus:border-portfolio-orange"
                      required
                    />
                  </div>

                  <div>
                    <Input
                      type="email"
                      name="email"
                      placeholder="your.email@example.in"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-input border-portfolio-border text-foreground placeholder:text-muted-foreground focus:border-portfolio-orange"
                      required
                    />
                  </div>

                  <div>
                    <Textarea
                      name="message"
                      placeholder="Write your message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="bg-input border-portfolio-border text-foreground placeholder:text-muted-foreground focus:border-portfolio-orange resize-none"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-portfolio-orange hover:bg-portfolio-orange-hover text-background font-medium py-3 disabled:opacity-50 transition-colors duration-300"
                  >
                    {isSubmitting ? 'Sending...' : 'Submit'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;