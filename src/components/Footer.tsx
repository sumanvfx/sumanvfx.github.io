import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface ContactData {
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  menu: Array<{
    name: string;
    href: string;
  }>;
}

interface ServicesData {
  services: Array<{
    id: number;
    title: string;
    description: string;
  }>;
}

interface SocialData {
  social: Array<{
    name: string;
    url: string;
    icon: string;
  }>;
}

const Footer = () => {
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [services, setServices] = useState<ServicesData['services']>([]);
  const [socialLinks, setSocialLinks] = useState<SocialData['social']>([]);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const loadFooterData = async () => {
      try {
        // Load contact data
        const contactResponse = await fetch('/data/contact.json');
        const contactJson: ContactData = await contactResponse.json();
        setContactData(contactJson);

        // Load services data
        const servicesResponse = await fetch('/data/services.json');
        const servicesJson: ServicesData = await servicesResponse.json();
        setServices(servicesJson.services);

        // Load social data
        const socialResponse = await fetch('/data/social.json');
        const socialJson: SocialData = await socialResponse.json();
        setSocialLinks(socialJson.social);
      } catch (error) {
        console.error('Error loading footer data:', error);
      }
    };

    loadFooterData();
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newsletterEmail.trim() || !/\S+@\S+\.\S+/.test(newsletterEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    try {
      // Simulate newsletter signup
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      
      setNewsletterEmail('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive"
      });
    }
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'facebook':
        return '📘';
      case 'twitter':
        return '🐦';
      case 'instagram':
        return '📷';
      case 'linkedin':
        return '💼';
      default:
        return '🔗';
    }
  };

  if (!contactData) {
    return null;
  }

  return (
    <footer className="bg-portfolio-dark border-t border-portfolio-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-foreground font-bold text-lg mb-4">Contact Info</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-portfolio-orange rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-background text-sm">📧</span>
                </div>
                <a 
                  href={`mailto:${contactData.contact.email}`}
                  className="text-muted-foreground hover:text-portfolio-orange transition-colors duration-300"
                >
                  {contactData.contact.email}
                </a>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-portfolio-orange rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-background text-sm">📱</span>
                </div>
                <div className="text-muted-foreground">
                  {contactData.contact.phone.split(',').map((phone, index) => (
                    <a 
                      key={index}
                      href={`tel:${phone.trim()}`}
                      className="block hover:text-portfolio-orange transition-colors duration-300"
                    >
                      {phone.trim()}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-portfolio-orange rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-background text-sm">📍</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {contactData.contact.address}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Links */}
          <div>
            <h3 className="text-foreground font-bold text-lg mb-4">Menu</h3>
            <ul className="space-y-3">
              {contactData.menu.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-muted-foreground hover:text-portfolio-orange transition-colors duration-300 text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-foreground font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              {services.slice(0, 4).map((service) => (
                <li key={service.id}>
                  <span className="text-muted-foreground hover:text-portfolio-orange transition-colors duration-300 cursor-pointer">
                    {service.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-foreground font-bold text-lg mb-4">Follow Us</h3>
            
            {/* Social Links */}
            <div className="flex space-x-3 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-portfolio-card border border-portfolio-border rounded-lg flex items-center justify-center hover:bg-portfolio-orange hover:border-portfolio-orange transition-colors duration-300 group"
                >
                  <span className="group-hover:text-background transition-colors duration-300">
                    {getSocialIcon(social.icon)}
                  </span>
                </a>
              ))}
            </div>

            {/* Newsletter Form */}
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="bg-input border-portfolio-border text-foreground placeholder:text-muted-foreground focus:border-portfolio-orange"
                required
              />
              <Button 
                type="submit"
                className="w-full bg-portfolio-orange hover:bg-portfolio-orange-hover text-background font-medium"
              >
                Subscribe for newsletter
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-portfolio-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <p className="text-muted-foreground text-sm">
            © 2024 Suman Saurabh. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <button className="text-muted-foreground hover:text-portfolio-orange transition-colors duration-300 text-sm">
              Privacy Policy
            </button>
            <button className="text-muted-foreground hover:text-portfolio-orange transition-colors duration-300 text-sm">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;