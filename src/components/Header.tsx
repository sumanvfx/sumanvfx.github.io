import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface MenuItem {
  name: string;
  href: string;
}

interface ContactData {
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  menu: MenuItem[];
}

const Header = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Load menu items from JSON
    const loadMenuData = async () => {
      try {
        const response = await fetch('/data/contact.json');
        const data: ContactData = await response.json();
        setMenuItems(data.menu);
      } catch (error) {
        console.error('Error loading menu data:', error);
        // Fallback menu items
        setMenuItems([
          { name: 'Home', href: '#home' },
          { name: 'About', href: '#about' },
          { name: 'Videography', href: '#videography' },
          { name: 'Photography', href: '#photography' },
          { name: 'Services', href: '#services' },
          { name: 'Projects', href: '#projects' },
          { name: 'Contact', href: '#contact' },
        ]);
      }
    };

    loadMenuData();

    // Handle scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-sm shadow-card' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center">
              <span className="text-background font-bold text-lg">SS</span>
            </div>
            <span className="text-foreground font-bold text-xl">Suman Saurabh</span>
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-foreground hover:text-portfolio-orange transition-colors duration-300 font-medium"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Contact Button */}
          <Button 
            variant="default"
            className="bg-portfolio-orange hover:bg-portfolio-orange-hover text-background font-medium px-6"
            onClick={() => scrollToSection('#contact')}
          >
            Contact
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;