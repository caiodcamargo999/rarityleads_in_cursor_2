
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Settings, Sparkles } from 'lucide-react';

const Navbar = () => {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <nav className="relative z-50 backdrop-blur-sm bg-white/5 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Rarity Leads
              </span>
            </Link>
            
            {user && (
              <div className="hidden md:flex ml-16 space-x-8">
                <Link
                  to="/dashboard"
                  className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
                >
                  {t('navigation.dashboard')}
                </Link>
                <Link
                  to="/prospecting"
                  className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
                >
                  {t('navigation.prospecting')}
                </Link>
                <Link
                  to="/leads"
                  className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
                >
                  {t('navigation.leads')}
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/10">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline text-sm">{user.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-slate-900/95 backdrop-blur-xl border border-white/10 shadow-lg">
                  <DropdownMenuItem onClick={() => navigate('/settings')} className="text-gray-300 hover:bg-white/10 hover:text-white">
                    <Settings className="mr-2 h-4 w-4" />
                    {t('navigation.settings')}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem onClick={handleSignOut} className="text-gray-300 hover:bg-white/10 hover:text-white">
                    <LogOut className="mr-2 h-4 w-4" />
                    {t('navigation.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-sm px-6 rounded-full">
                <Link to="/auth">{t('auth.signIn')}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
