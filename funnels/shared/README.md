# Componentes compartidos entre funnels

De momento vacío: con un solo funnel no hay nada que compartir todavía.

Cuando exista el segundo funnel (fibra), aquí deben moverse los componentes
y utilidades comunes para no duplicarlos:

- `Header`, `Footer`, `CookieConsent`, `FAQSection`, `TestimonialsSection`
- `FloatingContactButtons`, `ChatbaseEmbed`, `LanguageSwitcher`
- `LegalConsentCheckbox`, `VisualIcon`
- `lib/`: i18n, formValidation, antispam, utm, analytics, contact, brand, submitLead

**Regla:** si un cambio hay que repetirlo en dos funnels, ese componente
debería estar aquí.
