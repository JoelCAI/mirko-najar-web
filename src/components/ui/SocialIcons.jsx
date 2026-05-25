// src/components/ui/SocialIcons.jsx

export const SOCIAL_VECTORS = {
  facebook: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  instagram: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ),
  x: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  ),
  tiktok: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  ),
  linkedin: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  youtube: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="youtube-vector">
      {/* Geometría rectangular oficial de la pantalla de YouTube */}
      <rect width="22" height="15" x="1" y="4.5" rx="4.5" />
      <polygon data-part="play" points="10 9 15 12 10 15 10 9" />
    </svg>
  ),
  whatsapp: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 20}
      height={props.size || 20}
      viewBox="0 0 24 24"
      fill="none"
    >
      {/* Globo */}
      <path
        data-part="wa-bubble"
        d="M20 11.5C20 6.81 16.19 3 11.5 3S3 6.81 3 11.5c0 1.61.45 3.12 1.23 4.41L3.2 21l5.26-1.38A8.46 8.46 0 0 0 11.5 20C16.19 20 20 16.19 20 11.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Teléfono */}
      <path
        data-part="wa-phone"
        d="M15.2 13.7
          c-.25-.13-1.47-.72-1.7-.8
          c-.23-.08-.4-.12-.56.12
          c-.16.24-.65.8-.8.96
          c-.14.16-.29.18-.54.06
          c-.25-.13-1.04-.38-1.98-1.22
          c-.73-.65-1.22-1.45-1.37-1.69
          c-.14-.25-.02-.38.11-.5
          c.11-.11.25-.29.37-.43
          c.12-.14.16-.24.24-.4
          c.08-.16.04-.3-.02-.42
          c-.06-.12-.5-1.22-.7-1.67
          c-.18-.44-.38-.38-.52-.39
          h-.45
          c-.16 0-.4.06-.62.3
          c-.21.24-.82.8-.82 1.94
          s.84 2.23.96 2.39
          c.12.16 1.65 2.52 4 3.53
          c.56.24 1 .38 1.34.49
          c.56.18 1.07.15 1.47.09
          c.45-.07 1.38-.57 1.57-1.12
          c.2-.55.2-1.02.14-1.12
          c-.06-.1-.21-.16-.46-.29z"
        fill="currentColor"
        stroke="none"
        transform="translate(0.38 0.22)"
      />
    </svg>
  ),
 pinterest: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 20}
      height={props.size || 20}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        data-part="pin-logo"
        fill="currentColor"
        d="M12 2C6.48 2 2 6.48 2 12c0 4.08 2.44 7.59 5.94 9.13-.08-.78-.15-1.98.03-2.84.17-.8 1.1-4.66 1.1-4.66s-.28-.57-.28-1.42c0-1.33.77-2.32 1.73-2.32.82 0 1.21.61 1.21 1.34 0 .82-.52 2.04-.79 3.18-.22.95.47 1.73 1.39 1.73 1.67 0 2.96-1.76 2.96-4.29 0-2.24-1.61-3.81-3.91-3.81-2.66 0-4.22 1.99-4.22 4.05 0 .8.31 1.66.7 2.13.08.09.09.17.07.27-.08.3-.25.96-.28 1.09-.04.18-.14.22-.33.13-1.23-.57-2-2.36-2-3.8 0-3.09 2.25-5.92 6.49-5.92 3.41 0 6.06 2.43 6.06 5.67 0 3.38-2.13 6.1-5.08 6.1-1 0-1.93-.52-2.25-1.13l-.61 2.33c-.22.84-.82 1.9-1.22 2.54.92.28 1.9.43 2.92.43 5.52 0 10-4.48 10-10S17.52 2 12 2z"
        transform="translate(0.1 0.1) scale(0.96)"
      />
    </svg>
  )
};