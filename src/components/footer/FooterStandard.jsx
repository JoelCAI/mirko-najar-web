// src/components/footer/FooterStandard.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { ChevronDown, ChevronRight } from 'lucide-react';

import { footerBlocks, footerConfig } from '../../config/footerConfig';
import { SOCIAL_VECTORS } from '../ui/SocialIcons'; 
import { useTheme } from '../../hooks/useTheme'; 

import './FooterStandard.css';

const FooterStandard = () => {
  const { theme } = useTheme(); 
  const [openSection, setOpenSection] = useState(null);
  const [activeDesktopMenu, setActiveDesktopMenu] = useState(null);

  const toggleSection = (sectionKey) => {
    setOpenSection(openSection === sectionKey ? null : sectionKey);
  };

  const renderSlotContent = (type, isMobile = false) => {
    switch (type) {
      case 'branding': {
        if (!footerConfig.switches.showBranding) return null;
        const brandData = footerBlocks.branding;
        return (
          <div className="c-footer__brand-block">
            {!isMobile && <h3 className="c-footer__column-title">{brandData.title}</h3>}
            
            <div className="c-footer__column-content c-footer__social-container">
              {brandData.socialLinksRow1?.length > 0 && (
                <div className="c-footer__social-box-row1">
                  {brandData.socialLinksRow1.map((social) => {
                    const RenderVector = SOCIAL_VECTORS[social.id];
                    if (!RenderVector) return null;
                    return (
                      <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" className="c-footer__social-link" aria-label={social.label}>
                        <RenderVector size={20} />
                      </a>
                    );
                  })}
                </div>
              )}
              
              {brandData.socialLinksRow2?.length > 0 && (
                <div className="c-footer__social-box-row2">
                  {brandData.socialLinksRow2.map((social) => {
                    const RenderVector = SOCIAL_VECTORS[social.id];
                    if (!RenderVector) return null;
                    return (
                      <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" className="c-footer__social-link" aria-label={social.label}>
                        <RenderVector size={20} />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );
      }

      case 'menu': {
        if (!footerConfig.switches.showMenu) return null;
        const menuData = footerBlocks.menu;
        return (
          <div className="c-footer__menu-block">
            {!isMobile && <h3 className="c-footer__column-title">{menuData.title}</h3>}
            
            <div className="c-footer__column-content">
              <div className="c-footer__nav-container">
                {menuData.navigation.map((group, groupIdx) => {
                  const isMenuOpen = activeDesktopMenu === groupIdx;
                  
                  const handleGroupClick = (e) => {
                    if (window.innerWidth >= 1025) return;
                    e.stopPropagation(); 
                    setActiveDesktopMenu(activeDesktopMenu === groupIdx ? null : groupIdx);
                  };

                  return (
                    <div 
                      key={groupIdx} 
                      className={`c-footer__menu-parent ${isMenuOpen ? 'is-submenu-open' : ''}`}
                      onMouseEnter={() => window.innerWidth >= 1025 && setActiveDesktopMenu(groupIdx)}
                      onMouseLeave={() => window.innerWidth >= 1025 && setActiveDesktopMenu(null)}
                    >
                      <div className="c-footer__trigger-row" onClick={handleGroupClick}>
                        <span className="c-footer__trigger-text">{group.title}</span>
                        <ChevronRight className="c-footer__submenu-arrow" size={14} />
                      </div>

                      <div className={`c-footer__floating-submenu ${isMenuOpen ? 'is-visible' : ''}`}>
                        <ul className="c-footer__link-list">
                          {group.links.map((link, linkIdx) => (
                            <li key={linkIdx} className="c-footer__link-item">
                              <Link to={link.path} className="c-footer__link">{link.label}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      }

      case 'contact': {
        if (!footerConfig.switches.showContact) return null;
        const contactData = footerBlocks.contact;
        return (
          <div className="c-footer__contact-block">
            {!isMobile && <h3 className="c-footer__column-title">{contactData.title}</h3>}
            
            <div className="c-footer__column-content">
              <ul className="c-footer__contact-list">
                {contactData.items.map((item, index) => {
                  const LucideIconComponent = LucideIcons[item.iconName];
                  const isExternalLink = item.href?.startsWith('http');
                  const extraProps = isExternalLink ? { target: "_blank", rel: "noopener noreferrer" } : {};

                  const content = (
                    <div className="c-footer__trigger-row c-footer__trigger-row--static">
                      <div className="c-footer__contact-wrapper-inner">
                        <div className="c-footer__icon-wrapper">
                          {LucideIconComponent && <LucideIconComponent size={15} />}
                        </div>
                        <span className="c-footer__contact-text-span">{item.text}</span>
                      </div>
                    </div>
                  );

                  return (
                    <li key={index} className="c-footer__contact-item">
                      {item.href ? (
                        <a href={item.href} className="c-footer__contact-link" {...extraProps}>{content}</a>
                      ) : (
                        <div className="c-footer__contact-text">{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        );
      }

      case 'location': {
        if (!footerConfig.switches.showLocation) return null;
        
        const rawInput = footerBlocks.location.googleMapsEmbedUrl || '';

        // Filtro de seguridad estricto para SaaS: Solo acepta URLs directas y seguras
        const getCleanMapUrl = (input) => {
          const trimmed = input.trim();
          
          // REGLA 1: Si el cliente intentó pegar un <iframe> completo a pesar de la instrucción, 
          // lo rechazamos o intentamos rescatar la URL interna para que no rompa el JSON/objeto.
          if (trimmed.startsWith('<iframe')) {
            const srcMatch = trimmed.match(/src=["']([^"']+)["']/);
            // Si encontramos la URL interna de Google Maps la salvamos, si no, retornamos null (basura)
            return srcMatch && (srcMatch[1].startsWith('http://') || srcMatch[1].startsWith('https://')) ? srcMatch[1] : null;
          }
          
          // REGLA 2: Si cumple con ser una URL directa (HTTPS) de Google o dominios confiables, pasa.
          if (trimmed.startsWith('https://www.google.com/maps') || trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
            return trimmed;
          }
          
          // Cualquier otro texto, script o inyección maliciosa queda completamente bloqueado.
          return null;
        };

        const cleanMapUrl = getCleanMapUrl(rawInput);

        // Si es inválido o vacío, mostramos el placeholder simétrico sin romper la app
        if (!cleanMapUrl) {
          return (
            <div className="c-footer__map-block">
              {!isMobile && <h3 className="c-footer__column-title">{footerBlocks.location.title}</h3>}
              <div className="c-footer__column-content">
                <div className="c-footer__map-wrapper c-footer__map-wrapper--empty">
                  <span>Ubicación no configurada</span>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div className="c-footer__map-block">
            {!isMobile && <h3 className="c-footer__column-title">{footerBlocks.location.title}</h3>}
            
            <div className="c-footer__column-content">
              <div className="c-footer__map-wrapper">
                <iframe
                  src={cleanMapUrl}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación"
                ></iframe>
              </div>
            </div>
          </div>
        );
      }

      case 'empty':
      default:
        return <div className="c-footer__column--empty" aria-hidden="true"></div>;
    }
  };

  const getSectionTitle = (type) => {
    if (type === 'empty') return "";
    return footerBlocks[type]?.title || "";
  };

  return (
    <footer className="c-footer" data-theme={theme} aria-label="Pie de página corporativo">
      <div className="c-footer__container siteLayoutWrapper">
        
        {/* Matrix Desktop */}
        <div className="c-footer__grid-desktop">
          {footerConfig.columnOrder.slice(0, 4).map((colType, index) => (
            <div key={`desk-col-${index}`} className={`c-footer__column c-footer__column--${colType}`}>
              {renderSlotContent(colType, false)}
            </div>
          ))}
        </div>

        {/* Acordeones Mobile */}
        <div className="c-footer__accordion-mobile">
          {footerConfig.columnOrder
            .filter(type => type !== 'empty')
            .map((colType, index) => {
              const isOpen = openSection === colType;
              const title = getSectionTitle(colType);
              
              return (
                <div key={`mob-col-${index}`} className={`c-footer__accordion-item ${isOpen ? 'c-footer__accordion-item--open' : ''}`}>
                  <button 
                    type="button" 
                    className="c-footer__accordion-trigger"
                    onClick={() => toggleSection(colType)}
                    aria-expanded={isOpen}
                  >
                    <span className="c-footer__accordion-title">{title}</span>
                    <ChevronDown size={18} className="c-footer__accordion-arrow" />
                  </button>
                  <div className="c-footer__accordion-content">
                    <div className="c-footer__accordion-inner">
                      {renderSlotContent(colType, true)}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Fila Inferior */}
        <div className="c-footer__bottom-bar">
          <div className="c-footer__copyright">
            <p>{footerConfig.copyright}</p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default FooterStandard;