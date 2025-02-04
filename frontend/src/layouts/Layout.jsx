import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';

const Layout = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode
          ? 'dark bg-zinc-900 text-zinc-100'
          : 'bg-zinc-50 text-zinc-900'
      } transition-colors duration-300`}
    >
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-zinc-800/70 shadow-sm">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <NavLink
            to="/"
            className="flex items-center space-x-3 text-2xl font-semibold 
            text-zinc-900 dark:text-zinc-100 
            hover:text-emerald-600 dark:hover:text-emerald-400 
            transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 stroke-current"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19V6.2C4 5.08 4 4.52 4.218 4.092a2 2 0 0 1 .874-.874C5.52 3 6.08 3 7.2 3h9.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C20 4.52 20 5.08 20 6.2V17H6c-1.105 0-2 .895-2 2zM4 19c0 1.105.895 2 2 2h14M9 7h6M9 11h6M9 15h4" />
            </svg>
            <span>EduManage</span>
          </NavLink>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-zinc-600 dark:text-zinc-300 
              hover:text-emerald-600 dark:hover:text-emerald-400 
              transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div
            className={`
            fixed inset-0 bg-zinc-50 dark:bg-zinc-900 
            md:static md:flex md:bg-transparent md:dark:bg-transparent
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
            md:translate-x-0 transition-transform duration-300 ease-in-out
            flex flex-col md:flex-row items-center justify-center md:justify-end 
            gap-6 p-6 md:p-0 md:space-x-6
          `}
          >
            <button
              onClick={toggleMenu}
              className="md:hidden absolute top-4 right-4 
              text-zinc-700 dark:text-zinc-300"
            >
              <X size={24} />
            </button>

            {['Home', 'Login', 'Register', 'Users'].map((link) => (
              <NavLink
                key={link}
                to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                onClick={toggleMenu}
                className={({ isActive }) => `
                  text-lg font-medium relative group
                  ${
                    isActive
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-zinc-600 dark:text-zinc-300'
                  }
                  hover:text-emerald-600 dark:hover:text-emerald-400 
                  transition-colors
                `}
              >
                {({ isActive }) => (
                  <>
                    {link}
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-0 right-0 h-0.5 
                      bg-emerald-600 dark:bg-emerald-400 
                      scale-x-0 group-hover:scale-x-100 
                      transition-transform origin-center"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}

            <button
              onClick={toggleDarkMode}
              className="text-zinc-600 dark:text-zinc-300 
              hover:text-emerald-600 dark:hover:text-emerald-400 
              transition-colors ml-2"
            >
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Outlet />
      </main>

      <footer></footer>
    </div>
  );
};

export default Layout;
