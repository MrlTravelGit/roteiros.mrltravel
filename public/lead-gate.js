/*
 * Pop-up de cadastro (lead gate) do site de roteiros da MRL Travel.
 * Carregado no index.html. Envia o formulário para o app do manychat (data-endpoint).
 * Opções (data-*): data-endpoint, data-root (id do elemento raiz, padrão "root"),
 * data-only-with="utm_source,ref" (só mostra se a URL tiver algum desses parâmetros).
 */
(function () {
  "use strict";
  var script = document.currentScript;
  if (!script || window.__mrlGateLoaded) return;
  window.__mrlGateLoaded = true;

  var STORAGE_KEY = script.getAttribute("data-storage-key") || "mrl_lead_ok";
  var ROOT_ID = script.getAttribute("data-root") || "root";
  var ENDPOINT =
    script.getAttribute("data-endpoint") || new URL("/api/lead", script.src).href;

  var qs = new URLSearchParams(location.search);
  var onlyWith = script.getAttribute("data-only-with");
  if (
    onlyWith &&
    !onlyWith.split(",").some(function (k) {
      return qs.has(k.trim());
    })
  )
    return;

  try {
    if (localStorage.getItem(STORAGE_KEY)) return;
  } catch (e) {}

  var CSS =
    ".mrl-gate{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:16px;" +
    "background:rgba(6,14,24,.6);-webkit-backdrop-filter:blur(16px) saturate(1.1);backdrop-filter:blur(16px) saturate(1.1);" +
    "font-family:'DM Sans',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif}" +
    ".mrl-card{box-sizing:border-box;width:100%;max-width:440px;max-height:calc(100vh - 32px);max-height:calc(100dvh - 32px);overflow:auto;" +
    "background:#161616;color:#fff;border:1px solid rgba(255,255,255,.14);border-radius:20px;padding:24px;box-shadow:0 24px 80px rgba(0,0,0,.55)}" +
    ".mrl-card *{box-sizing:border-box}" +
    ".mrl-eyebrow{margin:0 0 6px;font-size:11px;letter-spacing:.08em;color:#a9a9a9;text-transform:uppercase}" +
    ".mrl-card .mrl-title{margin:0;font-family:inherit;font-size:24px;line-height:1.2;font-weight:700;letter-spacing:0;text-transform:none}" +
    ".mrl-sub{margin:6px 0 18px;font-size:14px;color:#a9a9a9}" +
    ".mrl-field{margin:0 0 14px;border:0;padding:0}" +
    ".mrl-label{display:block;margin:0 0 6px;font-size:13px;font-weight:600;color:#cfcfcf}" +
    ".mrl-input{width:100%;height:48px;padding:0 18px;border-radius:999px;border:1px solid rgba(255,255,255,.2);background:transparent;" +
    "color:#fff;font:inherit;font-size:16px;outline:none}" +
    ".mrl-input::placeholder{color:#7d7d7d}" +
    ".mrl-input:focus{border-color:#f2b632;box-shadow:0 0 0 3px rgba(242,182,50,.25)}" +
    ".mrl-radio{display:flex;align-items:center;gap:10px;margin:0 0 10px;font-size:15px;cursor:pointer}" +
    ".mrl-radio input{width:20px;height:20px;margin:0;accent-color:#f2b632;cursor:pointer}" +
    ".mrl-btn{width:100%;height:50px;margin-top:6px;border:0;border-radius:999px;background:#f2b632;color:#0b1f33;font:inherit;font-size:16px;" +
    "font-weight:700;cursor:pointer}" +
    ".mrl-btn:disabled{opacity:.6;cursor:default}" +
    ".mrl-error{min-height:18px;margin:8px 0 0;font-size:13px;color:#ff8b8b}" +
    ".mrl-skip{display:none;margin:8px auto 0;background:none;border:0;color:#a9a9a9;font:inherit;font-size:13px;text-decoration:underline;cursor:pointer}" +
    ".mrl-note{margin:12px 0 0;font-size:12px;line-height:1.4;color:#8a8a8a;text-align:center}" +
    ".mrl-hp{position:absolute;left:-9999px;width:1px;height:1px;opacity:0}" +
    "@media (prefers-reduced-motion:no-preference){.mrl-card{animation:mrlIn .25s ease-out}@keyframes mrlIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}}";

  var HTML =
    '<form class="mrl-card" novalidate>' +
    '<p class="mrl-eyebrow">BLACK MRL 2026</p>' +
    '<h2 class="mrl-title" id="mrl-gate-title">Cadastre sua próxima viagem ✈️</h2>' +
    '<p class="mrl-sub">Leva menos de 1 minuto. Depois é só explorar os roteiros.</p>' +
    '<div class="mrl-field"><label class="mrl-label" for="mrl-nome">Seu nome</label>' +
    '<input class="mrl-input" id="mrl-nome" name="nome" type="text" autocomplete="name" placeholder="Nome completo" maxlength="80"></div>' +
    '<div class="mrl-field"><label class="mrl-label" for="mrl-whats">WhatsApp</label>' +
    '<input class="mrl-input" id="mrl-whats" name="whatsapp" type="tel" inputmode="tel" autocomplete="tel-national" placeholder="(00) 00000-0000" maxlength="16"></div>' +
    '<fieldset class="mrl-field"><legend class="mrl-label">Quando pretende fazer sua próxima viagem?</legend>' +
    '<label class="mrl-radio"><input type="radio" name="prazo" value="ate_3_meses" checked> Nos próximos 3 meses</label>' +
    '<label class="mrl-radio"><input type="radio" name="prazo" value="ate_6_meses"> Nos próximos 6 meses</label>' +
    '<label class="mrl-radio"><input type="radio" name="prazo" value="ate_12_meses"> Nos próximos 12 meses</label>' +
    '<label class="mrl-radio"><input type="radio" name="prazo" value="nao_defini"> Ainda não defini</label></fieldset>' +
    '<div class="mrl-field"><label class="mrl-label" for="mrl-destino">Qual destino você gostaria de conhecer?</label>' +
    '<input class="mrl-input" id="mrl-destino" name="destino" type="text" autocomplete="off" placeholder="Ex.: Maceió, Gramado, Paris..." maxlength="100"></div>' +
    '<input class="mrl-hp" name="empresa" type="text" tabindex="-1" autocomplete="off" aria-hidden="true">' +
    '<button class="mrl-btn" type="submit">Acessar os roteiros</button>' +
    '<p class="mrl-error" role="alert" aria-live="polite"></p>' +
    '<button class="mrl-skip" type="button">Continuar sem cadastro</button>' +
    '<p class="mrl-note">Ao enviar, você aceita receber contato da MRL Travel por WhatsApp sobre sua viagem.</p>' +
    "</form>";

  var overlay, form, errorEl, skipEl, submitEl, rootEl, shownAt, failures = 0;
  var prevOverflow = "";

  function open() {
    var style = document.createElement("style");
    style.id = "mrl-gate-style";
    style.textContent = CSS;
    document.head.appendChild(style);

    overlay = document.createElement("div");
    overlay.className = "mrl-gate";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "mrl-gate-title");
    overlay.innerHTML = HTML;
    document.body.appendChild(overlay);

    form = overlay.querySelector("form");
    errorEl = overlay.querySelector(".mrl-error");
    skipEl = overlay.querySelector(".mrl-skip");
    submitEl = overlay.querySelector(".mrl-btn");

    rootEl = document.getElementById(ROOT_ID);
    if (rootEl) rootEl.setAttribute("inert", "");
    prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    var whats = form.elements["whatsapp"];
    whats.addEventListener("input", function () {
      var d = whats.value.replace(/\D/g, "").slice(0, 11);
      var out = d;
      if (d.length > 2) out = "(" + d.slice(0, 2) + ") " + d.slice(2);
      if (d.length > 7) out = "(" + d.slice(0, 2) + ") " + d.slice(2, 7) + "-" + d.slice(7);
      whats.value = out;
    });

    form.addEventListener("submit", onSubmit);
    form.addEventListener("input", function () {
      errorEl.textContent = "";
    });
    skipEl.addEventListener("click", close);

    shownAt = Date.now();
    setTimeout(function () {
      try {
        form.elements["nome"].focus({ preventScroll: true });
      } catch (e) {}
    }, 50);
  }

  function close() {
    if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
    var style = document.getElementById("mrl-gate-style");
    if (style) style.parentNode.removeChild(style);
    if (rootEl) rootEl.removeAttribute("inert");
    document.documentElement.style.overflow = prevOverflow;
  }

  function fail(msg) {
    failures++;
    errorEl.textContent = msg;
    submitEl.disabled = false;
    submitEl.textContent = "Acessar os roteiros";
    if (failures >= 2) skipEl.style.display = "block";
  }

  function onSubmit(ev) {
    ev.preventDefault();
    var f = form.elements;
    var nome = f["nome"].value.trim();
    var digits = f["whatsapp"].value.replace(/\D/g, "");
    var destino = f["destino"].value.trim();
    errorEl.textContent = "";

    if (nome.length < 2) return showError("Informe seu nome.", f["nome"]);
    if (digits.length < 10) return showError("Informe seu WhatsApp com DDD.", f["whatsapp"]);
    if (destino.length < 2) return showError("Conte qual destino você quer conhecer.", f["destino"]);

    submitEl.disabled = true;
    submitEl.textContent = "Enviando...";

    var payload = {
      nome: nome,
      whatsapp: digits,
      prazo: f["prazo"].value,
      destino: destino,
      empresa: f["empresa"].value,
      fill_ms: Date.now() - shownAt,
      utm_source: qs.get("utm_source"),
      utm_medium: qs.get("utm_medium"),
      utm_campaign: qs.get("utm_campaign"),
      utm_content: qs.get("utm_content"),
      ref: qs.get("ref") || qs.get("v"),
      page_url: location.href,
    };

    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(function (res) {
        return res
          .json()
          .catch(function () {
            return {};
          })
          .then(function (j) {
            return { ok: res.ok, j: j };
          });
      })
      .then(function (r) {
        if (!r.ok) return fail((r.j && r.j.error) || "Não foi possível enviar agora. Tente de novo.");
        try {
          localStorage.setItem(STORAGE_KEY, String(Date.now()));
        } catch (e) {}
        close();
        try {
          if (window.dataLayer) window.dataLayer.push({ event: "mrl_lead", prazo: payload.prazo });
          if (typeof window.fbq === "function") window.fbq("track", "Lead");
          window.dispatchEvent(new CustomEvent("mrl:lead"));
        } catch (e) {}
      })
      .catch(function () {
        fail("Sem conexão. Verifique a internet e tente de novo.");
      });
  }

  function showError(msg, el) {
    errorEl.textContent = msg;
    try {
      el.focus();
    } catch (e) {}
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", open);
  else open();
})();
