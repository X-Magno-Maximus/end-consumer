"use strict";
(() => {
  const STORAGE_KEY = "marxia-language";
  const supported = new Set(["en", "es"]);
  const messages = {
  "en": {
    "common.language": "Language",
    "common.english": "English",
    "common.spanish": "Spanish",
    "common.appearance": "Appearance",
    "common.light": "Light",
    "common.dark": "Dark",
    "page.title": "Marxia · Consumer Marketplace",
    "catalog.searchLabel": "Search",
    "action.selectEnglish": "Select English",
    "action.selectSpanish": "Select Spanish",
    "theme.darkTitle": "Dark theme",
    "theme.lightTitle": "Light theme",
    "welcome.preferences": "Welcome preferences",
    "welcome.thanks": "Thank you for choosing Marxia",
    "welcome.headline": "Everything you need, closer to home.",
    "welcome.intro": "Local products, trusted businesses, and convenient pickup or delivery.",
    "welcome.cta": "Order your products →→",
    "catalog.preview": "Product preview",
    "catalog.search": "Search products and stores",
    "catalog.products": "Products",
    "catalog.add": "Add",
    "product.coffee": "Artisan coffee",
    "product.bread": "Fresh bread",
    "product.berries": "Local berries",
    "product.cheese": "Artisan cheese",
    "action.changeLanguage": "Change language",
    "action.enableDark": "Enable dark theme",
    "action.enableLight": "Enable light theme",
    "action.bag": "Shopping bag",
    "status.added": "Added to your shopping bag.",
    "error.storage": "Your preference could not be saved on this device."
  },
  "es": {
    "common.language": "Idioma",
    "common.english": "Inglés",
    "common.spanish": "Español",
    "common.appearance": "Apariencia",
    "common.light": "Claro",
    "common.dark": "Oscuro",
    "page.title": "Marxia · Mercado para consumidores",
    "catalog.searchLabel": "Buscar",
    "action.selectEnglish": "Seleccionar inglés",
    "action.selectSpanish": "Seleccionar español",
    "theme.darkTitle": "Tema oscuro",
    "theme.lightTitle": "Tema claro",
    "welcome.preferences": "Preferencias de bienvenida",
    "welcome.thanks": "Gracias por elegir Marxia",
    "welcome.headline": "Todo lo que necesitas, más cerca de casa.",
    "welcome.intro": "Productos locales, negocios de confianza y opciones convenientes de retiro o entrega.",
    "welcome.cta": "Ordena tus productos →→",
    "catalog.preview": "Vista previa de productos",
    "catalog.search": "Buscar productos y tiendas",
    "catalog.products": "Productos",
    "catalog.add": "Agregar",
    "product.coffee": "Café artesanal",
    "product.bread": "Pan fresco",
    "product.berries": "Frutas locales",
    "product.cheese": "Queso artesanal",
    "action.changeLanguage": "Cambiar idioma",
    "action.enableDark": "Activar tema oscuro",
    "action.enableLight": "Activar tema claro",
    "action.bag": "Bolsa de compras",
    "status.added": "Agregado a tu bolsa de compras.",
    "error.storage": "No se pudo guardar tu preferencia en este dispositivo."
  }
};
  let language = supported.has(localStorage.getItem(STORAGE_KEY)) ? localStorage.getItem(STORAGE_KEY) : "en";

  const format = (text, values = {}) => Object.entries(values).reduce(
    (result, [name, value]) => result.replaceAll(`{{${name}}}`, String(value)), text
  );
  const t = (key, values) => format(messages[language][key] ?? messages.en[key] ?? key, values);

  const localize = (root = document) => {
    document.documentElement.lang = language;
    root.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
    root.querySelectorAll("[data-i18n-placeholder]").forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
    root.querySelectorAll("[data-i18n-label]").forEach(el => { el.setAttribute("aria-label", t(el.dataset.i18nLabel)); });
    root.querySelectorAll("[data-i18n-title]").forEach(el => { el.title = t(el.dataset.i18nTitle); });
    document.title = t("page.title");
    document.dispatchEvent(new CustomEvent("marxia:languagechange", { detail: { language } }));
  };
  const setLanguage = locale => {
    if (!supported.has(locale)) return false;
    language = locale;
    localStorage.setItem(STORAGE_KEY, locale);
    localize();
    return true;
  };
  const register = (locale, additions) => {
    if (!supported.has(locale) || !additions || typeof additions !== "object") return false;
    Object.assign(messages[locale], additions);
    return true;
  };
  window.MarxiaI18n = { get language(){ return language; }, messages, t, localize, register, setLanguage };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => localize(), { once:true });
  else localize();
})();
