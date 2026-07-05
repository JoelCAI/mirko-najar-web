// src/components/footer/FooterStandard.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { ChevronDown } from 'lucide-react';

import { footerData, footerConfig } from '../../config/footerConfig';
import { SOCIAL_VECTORS } from '../ui/SocialIcons'; // 🔥 Recuperamos tus vectores nativos libres de errores
import { useTheme } from '../../hooks/useTheme'; 

import './FooterStandard.css';

const FooterStandard = () => {
  const { theme } = useTheme(); // 🌙 Sincronización nativa con el Sol y la Luna
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (sectionKey) => {
    setOpenSection(openSection === sectionKey ? null : sectionKey);
  };

  // 📐 Mapeo dinámico de variables tipográficas controladas por tu configuración
  const typographyStyles = {
    '--footer-typo-desktop-logo': footerConfig.typography?.desktop?.logo,
    '--footer-typo-desktop-titles': footerConfig.typography?.desktop?.titles,
    '--footer-typo-desktop-description': footerConfig.typography?.desktop?.description,
    '--footer-typo-desktop-links': footerConfig.typography?.desktop?.links,
    '--footer-typo-desktop-items': footerConfig.typography?.desktop?.items,
    '--footer-typo-desktop-copyright': footerConfig.typography?.desktop?.copyright,

    '--footer-typo-mobile-logo': footerConfig.typography?.mobile?.logo,
    '--footer-typo-mobile-titles': footerConfig.typography?.mobile?.titles,
    '--footer-typo-mobile-description': footerConfig.typography?.mobile?.description,
    '--footer-typo-mobile-links': footerConfig.typography?.mobile?.links,
    '--footer-typo-mobile-items': footerConfig.typography?.mobile?.items,
    '--footer-typo-mobile-copyright': footerConfig.typography?.mobile?.copyright,
  };

  // 🧱 Orquestador de Ranuras Dinámicas (Slots)
  const renderColumnContent = (type) => {
    switch (type) {
      case 'branding':
        if (!footerConfig.switches.showBranding) return null;
        return (
          <div className="c-footer__brand-block">
            <h2 className="c-footer__logo">{footerData.brand.logoText}</h2>
            <p className="c-footer__description">{footerData.brand.description}</p>
          </div>
        );

      case 'menu':
        if (!footerConfig.switches.showMenu) return null;
        return (
          <div className="c-footer__menu-groups">
            {footerData.navigation.map((group, index) => (
              <div key={index} className="c-footer__menu-subgroup">
                <h3 className="c-footer__subgroup-title">{group.title}</h3>
                <ul className="c-footer__list">
                  {group.links.map((link, lIndex) => (
                    <li key={lIndex} className="c-footer__item">
                      <Link to={link.path} className="c-footer__link">{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );

      case 'contact':
        if (!footerConfig.switches.showContact) return null;
        return (
          <div className="c-footer__contact-block">
            <h3 className="c-footer__column-title">{footerData.contactInfo.title}</h3>
            <ul className="c-footer__list">
              {footerData.contactInfo.items.map((item, index) => {
                const LucideIconComponent = LucideIcons[item.iconName];
                const isExternalLink = item.href?.startsWith('http');
                const extraProps = isExternalLink ? { target: "_blank", rel: "noopener noreferrer" } : {};

                const content = (
                  <>
                    <div className="c-footer__icon-wrapper">
                      {LucideIconComponent && <LucideIconComponent size={16} />}
                    </div>
                    <span className="c-footer__contact-text-span">{item.text}</span>
                  </>
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
        );

      case 'location':
        if (!footerConfig.switches.showLocation || !footerData.googleMapsEmbedUrl) return null;
        return (
          <div className="c-footer__map-block">
            <h3 className="c-footer__column-title">Ubicación</h3>
            <div className="c-footer__map-wrapper">
              <iframe
                src={footerData.googleMapsEmbedUrl}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación"
              ></iframe>
            </div>
          </div>
        );

      case 'empty':
      default:
        // Ranura vacía que conserva simetría en Desktop, desaparece en Mobile
        return <div className="c-footer__column--empty" aria-hidden="true"></div>;
    }
  };

  const getSectionTitle = (type) => {
    if (type === 'branding') return footerData.brand.logoText;
    if (type === 'menu') return "Navegación";
    if (type === 'contact') return footerData.contactInfo.title;
    if (type === 'location') return "Ubicación";
    return "";
  };

  return (
    <footer 
      className="c-footer" 
      aria-label="Pie de página"
      data-theme={theme} // Recibe el estado del tema de forma nativa para CSS
      style={typographyStyles}
    >
      <div className="c-footer__container siteLayoutWrapper">
        
        {/* ==========================================================================
            🖥️ ENTORNO DESKTOP: Rejilla Simétrica Rígida (4 Columnas)
           ========================================================================== */}
        <div className="c-footer__grid-desktop">
          {footerConfig.columnOrder.slice(0, 4).map((colType, index) => (
            <div key={`desk-col-${index}`} className={`c-footer__column c-footer__column--${colType}`}>
              {renderColumnContent(colType)}
            </div>
          ))}
        </div>

        {/* ==========================================================================
            📱 ENTORNO MOBILE: Acordeones Flexibles (Filtra 'empty')
           ========================================================================== */}
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
                      {renderColumnContent(colType)}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* ==========================================================================
            🌐 FILA INFERIOR: Redes Sociales (Vectores Locales) e Info Legal
           ========================================================================== */}
        <div className="c-footer__bottom-bar">
          
          <div className="c-footer__social-wrapper">
            {/* Fila 1 de Redes */}
            {footerData.socialLinksRow1?.length > 0 && (
              <div className="c-footer__social-row">
                {footerData.socialLinksRow1.map((social) => {
                  const RenderVector = SOCIAL_VECTORS[social.id];
                  if (!RenderVector) return null;
                  return (
                    <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" className="c-footer__social-link" aria-label={social.label}>
                      <RenderVector size={22} />
                    </a>
                  );
                })}
              </div>
            )}
            
            {/* Fila 2 de Redes */}
            {footerData.socialLinksRow2?.length > 0 && (
              <div className="c-footer__social-row">
                {footerData.socialLinksRow2.map((social) => {
                  const RenderVector = SOCIAL_VECTORS[social.id];
                  if (!RenderVector) return null;
                  return (
                    <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" className="c-footer__social-link" aria-label={social.label}>
                      <RenderVector size={22} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          <div className="c-footer__copyright">
            <p>{footerData.brand.copyright}</p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default FooterStandard;