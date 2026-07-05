import { Link } from 'react-router-dom';
import { ChevronDown, ChevronLeft } from 'lucide-react';
import { navigationMenu, menuTypographyConfig } from '../../config/navigationConfig';
import { pageDictionary } from '../../config/pageDictionary';
import Text from '../ui/Text';
import SearchBar from '../search/SearchBar';
import DynamicIcon from '../ui/DynamicIcon';

// 🌟 Importación de sus estilos exclusivos y aislados
import './NavbarMenu.css';

const NavbarMenu = ({ isMenuOpen, setIsMenuOpen, activeMobileSubmenu, setActiveMobileSubmenu, activeMobileSubSubmenu, setActiveMobileSubSubmenu, showSearchSwitch }) => {
  
  const handleNavClick = (index, hasSubmenu) => {
    if (!hasSubmenu) {
      setIsMenuOpen(false);
      return;
    }
    if (activeMobileSubmenu !== index) {
      setActiveMobileSubSubmenu(null);
    }
    setActiveMobileSubmenu(activeMobileSubmenu === index ? null : index);
  };

  const getPageData = (item) => {
    const page = pageDictionary[item.pageId] || { label: "Página Desconocida", path: "#", defaultIcon: "" };
    return {
      title: item.customLabel || page.label,
      path: page.path,
      icon: item.customIcon || page.defaultIcon,
      submenu: item.submenu || [],
      subSubmenu: item.subSubmenu || []
    };
  };

  return (
    <ul className={`c-navbar__menu ${isMenuOpen ? 'c-navbar__menu--open' : ''}`} role="menubar">
      {showSearchSwitch && (
        <li className="c-navbar__search-mobile" role="none">
          <SearchBar />
        </li>
      )}

      {navigationMenu.map((rawItem, index) => {
        const item = getPageData(rawItem);
        const hasSubmenu = item.submenu && item.submenu.length > 0;
        const isCurrentActive = activeMobileSubmenu === index;

        return (
          <li key={index} className={`c-navbar__item ${hasSubmenu ? 'c-navbar__item--has-dropdown' : ''}`} role="none">
            {hasSubmenu ? (
              <div className="c-navbar__link-container" onClick={() => handleNavClick(index, hasSubmenu)}>
                <Text as="span" className={`c-navbar__link ${isCurrentActive ? 'c-navbar__link--focused' : ''}`} customTypographyStyles={menuTypographyConfig.desktop}>
                  {item.title}
                </Text>
                <ChevronDown size={16} className={`c-navbar__arrow ${isCurrentActive ? 'c-navbar__arrow--focused' : ''}`} />
              </div>
            ) : (
              <Link to={item.path} className="c-navbar__link" role="menuitem" onClick={() => setIsMenuOpen(false)}>
                <Text as="span" customTypographyStyles={menuTypographyConfig.desktop}>{item.title}</Text>
              </Link>
            )}

            {hasSubmenu && (
              <ul className={`c-navbar__dropdown ${isCurrentActive ? 'c-navbar__dropdown--active-mobile' : ''}`} role="menu">
                {item.submenu.map((rawSubItem, subIndex) => {
                  const subItem = getPageData(rawSubItem);
                  const hasSubSub = subItem.subSubmenu && subItem.subSubmenu.length > 0;
                  const isSubActive = activeMobileSubSubmenu === subIndex;

                  return (
                    <li 
                      key={subIndex} 
                      className={`c-navbar__dropdown-item ${hasSubSub ? 'c-navbar__dropdown-item--has-subsub' : ''}`}
                      role="none"
                      onClick={(e) => {
                        if (hasSubSub) {
                          e.stopPropagation();
                          setActiveMobileSubSubmenu(isSubActive ? null : subIndex);
                        }
                      }}
                    >
                      <div className="c-navbar__sublink-wrapper">
                        <Link 
                          to={hasSubSub ? '#' : subItem.path} 
                          role="menuitem"
                          onClick={() => !hasSubSub && setIsMenuOpen(false)}
                          className={isSubActive ? 'c-navbar__link--focused' : ''}
                        >
                          {subItem.icon && (
                            <span className="c-navbar__sub-icon-container">
                              <DynamicIcon name={subItem.icon} className={`c-navbar__sub-icon ${isSubActive ? 'c-navbar__sub-icon--focused' : ''}`} />
                            </span>
                          )}
                          <span>{subItem.title}</span>
                        </Link>
                        {hasSubSub && <ChevronLeft size={16} className={`c-navbar__left-arrow-sub ${isSubActive ? 'c-navbar__left-arrow-sub--focused' : ''}`} />}
                      </div>

                      {hasSubSub && (
                        <ul className={`c-navbar__subsubmenu ${isSubActive ? 'c-navbar__subsubmenu--active-mobile' : ''}`} role="menu">
                          {subItem.subSubmenu.map((rawSubSub, ssIndex) => {
                            const subSub = getPageData(rawSubSub);
                            return (
                              <li key={ssIndex} className="c-navbar__subsub-item" role="none">
                                <Link to={subSub.path} role="menuitem" onClick={() => setIsMenuOpen(false)}>
                                  {subSub.title}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default NavbarMenu;