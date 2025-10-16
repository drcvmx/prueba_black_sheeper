import { useState } from "react";
import { Menu, X, Search, User, ChevronDown, MoreVertical } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#211C18]/95 backdrop-blur-md text-white border-b border-[#3a312a] sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 lg:space-x-6">
            <div className="flex items-center space-x-2">
              <img
                src="/Blizzard_Entertainment_Logo.svg.png"
                alt="Blizzard Logo"
                className="h-8 lg:h-10 w-auto object-contain"
              />
              <ChevronDown className="w-4 h-4 text-[#E0E0E0] hidden sm:block" />
            </div>

            {/* WoW Logo */}
            <div className="hidden md:flex items-center justify-center">
              <img
                src="/world-of-warcraft.svg"
                alt="World of Warcraft"
                className="h-10 w-10 lg:h-12 lg:w-12 object-contain"
              />
            </div>
          </div>

          {/* Desktop Navigation - Menu con 3 puntos */}
          <div className="hidden lg:flex items-center space-x-1 relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-[#2d2620] rounded-lg transition-colors"
            >
              <MoreVertical className="w-6 h-6 text-[#E0E0E0]" />
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-[#2d2620] rounded-lg shadow-xl border border-[#3a312a] py-2 z-50">
                <DropdownLink label="Información del juego" badge="NUEVO" />
                <DropdownLink label="Expansiones" />
                <DropdownLink label="Noticias" />
                <DropdownLink label="Comunidad" />
                <DropdownLink label="Tienda" />
              </div>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            <button className="hidden lg:block p-2 hover:bg-[#2d2620] rounded-lg transition-colors">
              <Search className="w-5 h-5 text-[#E0E0E0]" />
            </button>

            <button className="hidden lg:flex items-center space-x-2 p-2 hover:bg-[#2d2620] rounded-lg transition-colors">
              <User className="w-5 h-5 text-[#E0E0E0]" />
              <span className="text-sm text-[#E0E0E0]">Cuenta</span>
              <ChevronDown className="w-4 h-4 text-[#E0E0E0]" />
            </button>

            <button className="hidden lg:block px-4 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white rounded font-semibold text-sm transition-colors">
              Probar gratis
            </button>

            <button className="hidden lg:block px-4 py-2 bg-[#b83a2f] hover:bg-[#a02f25] text-white rounded font-semibold text-sm transition-colors">
              Suscribirse ahora
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-[#2d2620] rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#E0E0E0]" />
              ) : (
                <Menu className="w-6 h-6 text-[#E0E0E0]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#3a312a]">
            <div className="flex flex-col space-y-2">
              <MobileNavLink label="Información del juego" badge="NUEVO" />
              <MobileNavLink label="Expansiones" />
              <MobileNavLink label="Noticias" />
              <MobileNavLink label="Comunidad" />
              <MobileNavLink label="Tienda" />

              <div className="pt-4 flex flex-col space-y-2">
                <button className="w-full px-4 py-2 bg-[#2d2620] hover:bg-[#3a312a] rounded font-semibold text-sm transition-colors flex items-center justify-center space-x-2">
                  <User className="w-4 h-4 text-[#E0E0E0]" />
                  <span className="text-[#E0E0E0]">Cuenta</span>
                </button>
                <button className="w-full px-4 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white rounded font-semibold text-sm transition-colors">
                  Probar gratis
                </button>
                <button className="w-full px-4 py-2 bg-[#b83a2f] hover:bg-[#a02f25] text-white rounded font-semibold text-sm transition-colors">
                  Suscribirse ahora
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

interface NavLinkProps {
  label: string;
  badge?: string;
}

const MobileNavLink = ({ label, badge }: NavLinkProps) => {
  return (
    <button className="flex items-center justify-between px-4 py-3 hover:bg-[#2d2620] rounded-lg transition-colors">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-[#E0E0E0]">{label}</span>
        {badge && (
          <span className="px-2 py-0.5 bg-[#9DFF00] text-[#211C18] text-xs font-bold rounded">
            {badge}
          </span>
        )}
      </div>
      <ChevronDown className="w-4 h-4 text-[#E0E0E0]" />
    </button>
  );
};

const DropdownLink = ({ label, badge }: NavLinkProps) => {
  return (
    <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#3a312a] transition-colors text-left">
      <span className="text-sm font-medium text-[#E0E0E0]">{label}</span>
      {badge && (
        <span className="px-2 py-0.5 bg-[#9DFF00] text-[#211C18] text-xs font-bold rounded">
          {badge}
        </span>
      )}
    </button>
  );
};

export default Navbar;
