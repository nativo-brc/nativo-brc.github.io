/* Medición de Google Ads de Nativo.
   Los IDs son públicos (van a la vista en cualquier página). Mientras una etiqueta
   diga REEMPLAZAR, ese evento no se envía: no hay riesgo de medir mal por error. */
(function () {
  'use strict';
  var CONV = {
    cotizacion: 'AW-18515236168/OvzFCMvTt6IdEMiq4PxE',
    whatsapp: 'AW-18515236168/Q2qbCOvzt6IdEMiq4PxE'
  };

  function activa(k) { return !!CONV[k] && CONV[k].indexOf('REEMPLAZAR') === -1; }

  /* Se llama desde el cotizador cuando el presupuesto se muestra con éxito. */
  window.nativoConv = function (k) {
    try {
      if (typeof window.gtag === 'function' && activa(k)) {
        window.gtag('event', 'conversion', { send_to: CONV[k] });
      }
    } catch (e) { /* medir nunca debe romper la página */ }
  };

  /* Clic en cualquier enlace de WhatsApp (hero, pie, "Reservar por WhatsApp" del presupuesto). */
  document.addEventListener('click', function (e) {
    try {
      var a = e.target && e.target.closest ? e.target.closest('a[href^="https://wa.me/"]') : null;
      if (a) window.nativoConv('whatsapp');
    } catch (err) { /* idem */ }
  }, true);
})();
