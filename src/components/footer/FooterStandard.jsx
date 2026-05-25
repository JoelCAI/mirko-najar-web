// src/components/footer/FooterStandard.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { footerConfig } from '../../config/footerConfig';
import { SOCIAL_VECTORS } from '../ui/SocialIcons';
import styles from './FooterStandard.module.css';

import { useTheme } from '../../hooks/useTheme'; 
import { navbarColorLight, navbarColorDark } from '../../config/navigationConfig';

const FooterStandard = () => {
  const { brand, navigation, contactInfo, socialLinksRow1, socialLinksRow2, googleMapsEmbedUrl, typography } = footerConfig;
  const { theme } = useTheme(); 

  const [activeAccordion, setActiveAccordion] = useState(null);
  const [activeDesktopMenu, setActiveDesktopMenu] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const activePalette = theme === 'light' ? navbarColorLight : navbarColorDark;

  const themeStyles = {
    '--dynamic-bg-solid': activePalette.bgSolid,
    '--dynamic-brand-text': activePalette.brandText,
    '--dynamic-text-menu-color': activePalette.textMenuColor,
    '--dynamic-text-menu-color-hover': activePalette.textMenuColorHover,
    '--dynamic-border-color': activePalette.borderColor,
    '--dynamic-hover-row': activePalette.hoverRow,

    '--footer-typo-desktop-logo': typography.desktop.logo,
    '--footer-typo-desktop-titles': typography.desktop.titles,
    '--footer-typo-desktop-description': typography.desktop.description,
    '--footer-typo-desktop-links': typography.desktop.links,
    '--footer-typo-desktop-items': typography.desktop.items,
    '--footer-typo-desktop-copyright': typography.desktop.copyright,

    '--footer-typo-mobile-logo': typography.mobile.logo,
    '--footer-typo-mobile-titles': typography.mobile.titles,
    '--footer-typo-mobile-description': typography.mobile.description,
    '--footer-typo-mobile-links': typography.mobile.links,
    '--footer-typo-mobile-items': typography.mobile.items,
    '--footer-typo-mobile-copyright': typography.mobile.copyright,
  };

  return (
    <footer className={styles.footer} style={themeStyles}>
      <div className={styles.container}>
        <div className={styles.gridFourColumns}>
          
          {/* BLOQUE 1: MADERA HOGAR */}
          <div className={styles.footerBlock}>
            <div className={styles.boxHeaderStatic}>
              <h2 className={styles.logoTextOnly}>{brand.logoText}</h2>
            </div>
            <div className={styles.boxBodyStatic}>
              <p className={styles.description}>{brand.description}</p>
              {/* FILA INTERNA 1 DE REDES SOCIALES */}
              {socialLinksRow1 && socialLinksRow1.length > 0 && (
                <div className={styles.socials}>
                  {socialLinksRow1.map((social) => {
                    const RenderVector = SOCIAL_VECTORS[social.id];
                    if (!RenderVector) return null;
                    return (
                      <a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialIcon}
                        aria-label={social.label}
                      >
                        <RenderVector size={24} />
                      </a>
                    );
                  })}
                </div>
              )}

              {/* FILA INTERNA 2 DE REDES SOCIALES */}
              {socialLinksRow2 && socialLinksRow2.length > 0 && (
                <div className={styles.socials} style={{ margin: '0px' }}>
                  {socialLinksRow2.map((social) => {
                    const RenderVector = SOCIAL_VECTORS[social.id];
                    if (!RenderVector) return null;
                    return (
                      <a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialIcon}
                        aria-label={social.label}
                      >
                        <RenderVector size={24} />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* BLOQUE 2: EXPLORAR */}
          <div className={`${styles.footerBlock} ${activeAccordion === 1 ? styles.isOpen : ''}`}>
            <div className={styles.boxHeader} onClick={() => toggleAccordion(1)}>
              <h3 className={styles.columnTitle}>EXPLORAR</h3>
              <ChevronDown className={styles.accordionArrow} size={18} />
            </div>
            <div className={styles.boxBody}>
              <div className={styles.navigationMenuContainer}>
                {navigation.map((group, groupIdx) => {
                  const isMenuOpen = activeDesktopMenu === groupIdx;
                  
                  // Manejador de clic móvil para abrir sub-acordeones individualmente
                  const handleGroupClick = (e) => {
                    // Si estamos en pantalla de escritorio (detectable por hover), no hacemos nada
                    if (window.innerWidth >= 768) return;
                    e.stopPropagation(); // Evita interferencias con el acordeón padre
                    setActiveDesktopMenu(activeDesktopMenu === groupIdx ? null : groupIdx);
                  };

                  return (
                    <div 
                      key={groupIdx} 
                      className={`${styles.desktopMenuParent} ${isMenuOpen ? styles.isOpenSubmenu : ''}`}
                      onMouseEnter={() => window.innerWidth >= 768 && setActiveDesktopMenu(groupIdx)}
                      onMouseLeave={() => window.innerWidth >= 768 && setActiveDesktopMenu(null)}
                    >
                      <div className={styles.menuTriggerRow} onClick={handleGroupClick}>
                        <span className={styles.menuTriggerText}>{group.title}</span>
                        <ChevronRight className={styles.submenuArrowRight} size={16} />
                      </div>

                      <div className={`${styles.floatingSubmenu} ${isMenuOpen ? styles.submenuVisible : ''}`}>
                        <ul className={styles.linkList}>
                          {group.links.map((link, linkIdx) => (
                            <li key={linkIdx} className={styles.linkItem}>
                              <Link to={link.path}>{link.label}</Link>
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

          {/* BLOQUE 3: CONTACTO */}
          <div className={`${styles.footerBlock} ${activeAccordion === 2 ? styles.isOpen : ''}`}>
            <div className={styles.boxHeader} onClick={() => toggleAccordion(2)}>
              <h3 className={styles.columnTitle}>{contactInfo.title}</h3>
              <ChevronDown className={styles.accordionArrow} size={18} />
            </div>
            <div className={styles.boxBody}>
              <ul className={styles.contactList}>
                {contactInfo.items.map((item, itemIdx) => {
                  const LucideIconComponent = LucideIcons[item.iconName];
                  const isExternalLink = item.href?.startsWith('http');
                  const extraProps = isExternalLink ? { target: "_blank", rel: "noopener noreferrer" } : {};

                  return (
                    <li key={itemIdx} className={styles.contactItem}>
                      <div className={styles.iconCenterWrapper}>
                        {LucideIconComponent && <LucideIconComponent size={16} />}
                      </div>
                      <div className={styles.textContentWrapper}>
                        {item.href ? (
                          <a href={item.href} {...extraProps}>{item.text}</a>
                        ) : (
                          <span>{item.text}</span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* BLOQUE 4: UBICACIÓN */}
          {googleMapsEmbedUrl && (
            <div className={`${styles.footerBlock} ${activeAccordion === 3 ? styles.isOpen : ''}`}>
              <div className={styles.boxHeader} onClick={() => toggleAccordion(3)}>
                <h3 className={styles.columnTitle}>UBICACIÓN</h3>
                <ChevronDown className={styles.accordionArrow} size={18} />
              </div>
              <div className={styles.boxBody}>
                <div className={styles.mapWrapper}>
                  <iframe
                    src={googleMapsEmbedUrl}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación de la empresa"
                  ></iframe>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* BARRA DE COPYRIGHT */}
        <div className={styles.bottomBar}>
          <div className={styles.copyrightText}>
            {brand.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterStandard;