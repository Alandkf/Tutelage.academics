import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (dropdown) => {
    if (window.innerWidth <= 768) {
      setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
        setActiveDropdown(null);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <a href="/" className="nav-logo">EduPlatform</a>
        
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <a href="/videos" className="nav-link" onClick={closeMenu}>Videos</a>
          </li>
          
          <li className="nav-item">
            <a href="/blogs" className="nav-link" onClick={closeMenu}>Blogs</a>
          </li>
          
          <li className="nav-item">
            <a href="/courses" className="nav-link" onClick={closeMenu}>Courses</a>
          </li>
          
          <li className={`nav-item ${activeDropdown === 'skills' ? 'active' : ''}`}>
            <a 
              className="nav-link" 
              onClick={() => toggleDropdown('skills')}
            >
              Skills
              <span className="dropdown-arrow">▼</span>
            </a>
            <div className="dropdown-menu">
              <a href="/skills/listening" className="dropdown-item" onClick={closeMenu}>Listening</a>
              <a href="/skills/speaking" className="dropdown-item" onClick={closeMenu}>Speaking</a>
              <a href="/skills/reading" className="dropdown-item" onClick={closeMenu}>Reading</a>
              <a href="/skills/writing" className="dropdown-item" onClick={closeMenu}>Writing</a>
            </div>
          </li>
          
          <li className={`nav-item ${activeDropdown === 'tests' ? 'active' : ''}`}>
            <a 
              className="nav-link"
              onClick={() => toggleDropdown('tests')}
            >
              Tests
              <span className="dropdown-arrow">▼</span>
            </a>
            <div className="dropdown-menu">
              <a href="/tests/fast-test" className="dropdown-item" onClick={closeMenu}>Fast Test</a>
              <a href="/tests/ai-test" className="dropdown-item" onClick={closeMenu}>AI Test</a>
              <a href="/tests/face-to-face" className="dropdown-item" onClick={closeMenu}>Face to Face Test</a>
            </div>
          </li>
        </ul>
        
        <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          background: #ffffff;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 1000;
          border-bottom: 1px solid #e9ecef;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 70px;
        }

        .nav-logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2563eb;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .nav-logo:hover {
          color: #1d4ed8;
        }

        .nav-menu {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-item {
          position: relative;
          margin: 0 0.5rem;
        }

        .nav-link {
          display: flex;
          align-items: center;
          padding: 0.75rem 1rem;
          text-decoration: none;
          color: #374151;
          font-weight: 500;
          border-radius: 6px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .nav-link:hover {
          background: #f3f4f6;
          color: #2563eb;
        }

        .dropdown-arrow {
          margin-left: 0.5rem;
          font-size: 0.8rem;
          transition: transform 0.3s ease;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background: #ffffff;
          min-width: 180px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          border-radius: 8px;
          padding: 0.5rem 0;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.3s ease;
          border: 1px solid #e5e7eb;
        }

        .nav-item:hover .dropdown-menu {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .nav-item:hover .dropdown-arrow {
          transform: rotate(180deg);
        }

        .dropdown-item {
          display: block;
          padding: 0.75rem 1rem;
          color: #374151;
          text-decoration: none;
          transition: all 0.2s ease;
          border-radius: 4px;
          margin: 0 0.5rem;
        }

        .dropdown-item:hover {
          background: #f3f4f6;
          color: #2563eb;
        }

        .hamburger {
          display: none;
          flex-direction: column;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 4px;
          transition: background 0.3s ease;
        }

        .hamburger:hover {
          background: #f3f4f6;
        }

        .hamburger span {
          width: 25px;
          height: 3px;
          background: #374151;
          margin: 3px 0;
          transition: all 0.3s ease;
          border-radius: 2px;
        }

        .hamburger.active span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .hamburger.active span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -6px);
        }

        @media (max-width: 768px) {
          .hamburger {
            display: flex;
          }

          .nav-menu {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: #ffffff;
            flex-direction: column;
            justify-content: flex-start;
            align-items: stretch;
            padding: 1rem;
            transition: left 0.3s ease;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }

          .nav-menu.active {
            left: 0;
          }

          .nav-item {
            margin: 0;
            border-bottom: 1px solid #e5e7eb;
            width: 100%;
          }

          .nav-item:last-child {
            border-bottom: none;
          }

          .nav-link {
            width: 100%;
            padding: 1rem;
            justify-content: space-between;
          }

          .dropdown-menu {
            position: static;
            opacity: 1;
            visibility: visible;
            transform: none;
            box-shadow: none;
            background: #f8f9fa;
            margin-left: 1rem;
            border-radius: 0;
            border: none;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease, padding 0.3s ease;
            padding: 0;
          }

          .nav-item.active .dropdown-menu {
            max-height: 300px;
            padding: 0.5rem 0;
          }

          .dropdown-item {
            margin: 0;
            border-radius: 0;
            padding: 0.75rem 1rem;
          }
        }

        @media (max-width: 480px) {
          .nav-container {
            padding: 0 0.5rem;
            height: 60px;
          }

          .nav-logo {
            font-size: 1.25rem;
          }

          .nav-menu {
            top: 60px;
            height: calc(100vh - 60px);
          }
        }
      `}</style>
    </nav>
  );
}