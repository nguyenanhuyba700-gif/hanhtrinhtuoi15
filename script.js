const body = document.body;
body.classList.add("js-ready");
const titleConfig = window.SITE_TITLE_CONFIG || {
  siteTitle: "Hành trình tuổi 15",
  separator: " | ",
  pageTitles: {},
};
const ASSET_VERSION = "20260329d";
const HEADER_FALLBACK = `
<a class="brand" href="index.html">
  <span class="brand-script">A8</span>
  <span class="brand-text">Hành trình tuổi 15</span>
</a>
<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
  Menu
</button>
<nav class="site-nav" id="site-nav">
  <a data-page-link="index.html" href="index.html">Trang mở đầu</a>
  <a data-page-link="day1.html" href="day1.html">Ngày 1</a>
  <a data-page-link="day2.html" href="day2.html">Ngày 2</a>
  <a data-page-link="day3.html" href="day3.html">Ngày 3</a>
  <a data-page-link="day4.html" href="day4.html">Ngày 4</a>
  <a data-page-link="thanks.html" href="thanks.html">Những bức tâm thư</a>
</nav>
<div class="header-tools">
  <button class="info-trigger" type="button" aria-expanded="false" aria-controls="info-popup">ⓘ about</button>
  <div class="info-popup" id="info-popup" hidden>
    <div class="about-content">
      <strong>Về trang này</strong>
      <p>
        Trang này được làm ra trong lúc <b>cậu be</b> đang rất lụy chuyến đi này.
        <b>Cậu be</b> muốn lưu giữ lại những kỉ niệm thật đẹp ở tuổi 15 này nên
        đã làm ra trang web này, để sau này mở lại vẫn thấy được không khí đầy
        mùi kỉ niệm của 4 ngày 3 đêm đó. Mãi iu <b>A8</b> ❤️❤️❤️
      </p>
      <p><b>Tác giả:</b> cậu be</p>
      <p><b>In4 cậu be: ⬇️⬇️</b></p>
      <div class="about-socials" style="display:grid;gap:.7rem;margin-top:.95rem;">
        <a class="about-btn" href="https://www.facebook.com/ng.an.huyyy/" target="_blank" rel="noreferrer" style="display:inline-flex;align-items:center;justify-content:center;gap:.55rem;width:100%;min-width:0;min-height:42px;padding:.75rem 1rem;border:1px solid rgba(59,52,65,.04);border-radius:999px;background:#7e6e72;color:#fff;font-weight:700;text-decoration:none;box-shadow:0 10px 20px rgba(94,79,74,.14);-webkit-appearance:none;appearance:none;">
          <span class="logo face" style="flex:0 0 auto;display:inline-grid;place-items:center;width:22px;height:22px;border-radius:50%;background:#fff;color:#1877f2;font-family:Arial,sans-serif;font-weight:800;">f</span>
          <span>Facebook</span>
        </a>
        <a class="about-btn ig" href="https://instagram.com/" target="_blank" rel="noreferrer" style="display:inline-flex;align-items:center;justify-content:center;gap:.55rem;width:100%;min-width:0;min-height:42px;padding:.75rem 1rem;border:1px solid rgba(59,52,65,.04);border-radius:999px;background:#8b6f7a;color:#fff;font-weight:700;text-decoration:none;box-shadow:0 10px 20px rgba(94,79,74,.14);-webkit-appearance:none;appearance:none;">
          <span class="logo ig" style="flex:0 0 auto;display:inline-grid;place-items:center;width:22px;height:22px;border-radius:50%;background:#fff;color:#d14d8b;font-family:Arial,sans-serif;font-weight:800;font-size:.62rem;text-transform:lowercase;">ig</span>
          <span>Instagram</span>
        </a>
      </div>
    </div>
  </div>
</div>
`;
const FOOTER_FALLBACK = `<p>By <b>cậu be</b>. Made for A8</p>`;

const currentPage = window.location.pathname.split("/").pop() || "index.html";
const currentPageTitle = titleConfig.pageTitles[currentPage];

if (currentPageTitle) {
  document.title = `${currentPageTitle}${titleConfig.separator}${titleConfig.siteTitle}`;
} else {
  document.title = titleConfig.siteTitle;
}

async function loadSharedHeader() {
  const headerHost = document.querySelector("[data-site-header]");

  if (!headerHost) {
    return;
  }

  try {
    const response = await fetch(`header.html?v=${ASSET_VERSION}`);

    if (!response.ok) {
      throw new Error("header_load_failed");
    }

    headerHost.innerHTML = await response.text();
    markActiveHeaderLink(headerHost);
    initHeaderInteractions(headerHost);
  } catch (error) {
    headerHost.innerHTML = HEADER_FALLBACK;
    markActiveHeaderLink(headerHost);
    initHeaderInteractions(headerHost);
  }
}

async function loadSharedFooter() {
  const footerHost = document.querySelector("[data-site-footer]");

  if (!footerHost) {
    return;
  }

  try {
    const response = await fetch(`footer.html?v=${ASSET_VERSION}`);

    if (!response.ok) {
      throw new Error("footer_load_failed");
    }

    footerHost.innerHTML = await response.text();
  } catch (error) {
    footerHost.innerHTML = FOOTER_FALLBACK;
  }
}

function markActiveHeaderLink(scope) {
  scope.querySelectorAll("[data-page-link]").forEach((link) => {
    const isActive = link.getAttribute("data-page-link") === currentPage;
    link.classList.toggle("active", isActive);
  });
}

function initHeaderInteractions(scope) {
  const navToggle = scope.querySelector(".nav-toggle");
  const infoTrigger = scope.querySelector(".info-trigger");
  const infoPopup = scope.querySelector(".info-popup");

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      const isOpen = body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  scope.querySelectorAll(".site-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      body.classList.remove("nav-open");
      if (navToggle) {
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      body.classList.remove("nav-open");
      if (navToggle) {
        navToggle.setAttribute("aria-expanded", "false");
      }
    }
  });

  if (infoTrigger && infoPopup) {
    infoTrigger.addEventListener("click", (event) => {
      event.stopPropagation();
      const willOpen = infoPopup.hasAttribute("hidden");

      if (willOpen) {
        infoPopup.removeAttribute("hidden");
        infoTrigger.setAttribute("aria-expanded", "true");
        body.classList.add("info-open");
      } else {
        infoPopup.setAttribute("hidden", "");
        infoTrigger.setAttribute("aria-expanded", "false");
        body.classList.remove("info-open");
      }
    });

    document.addEventListener("click", (event) => {
      if (!infoPopup.contains(event.target) && event.target !== infoTrigger) {
        infoPopup.setAttribute("hidden", "");
        infoTrigger.setAttribute("aria-expanded", "false");
        body.classList.remove("info-open");
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        infoPopup.setAttribute("hidden", "");
        infoTrigger.setAttribute("aria-expanded", "false");
        body.classList.remove("info-open");
      }
    });
  }
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealItems.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

window.setTimeout(() => {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}, 600);

const quotes = [
  "\"Một trang giấy nhỏ cũng đủ giữ lại một ngày thật đẹp.\"",
  "\"Có những kỉ niệm càng nhẹ thì càng ở lại lâu.\"",
  "\"Tuổi 15 của chúng mình được gặp lại trong từng trang lưu bút.\"",
  "\"Bốn ngày trôi qua, nhưng sự dịu dàng thì vẫn nằm yên ở đây.\"",
];

const randomQuote = document.querySelector("[data-random-quote]");

if (randomQuote) {
  const quoteIndex = Math.floor(Math.random() * quotes.length);
  randomQuote.textContent = quotes[quoteIndex];
}

const thanksGrid = document.querySelector("[data-thanks-grid]");
const albumGrid = document.querySelector("[data-album-grid]");

if (thanksGrid) {
  loadThanksMessages();
}

if (albumGrid) {
  loadAlbumDay();
}

async function loadThanksMessages() {
  try {
    const response = await fetch(`thanks-data.json?v=${ASSET_VERSION}`);

    if (!response.ok) {
      throw new Error("thanks_data_load_failed");
    }

    const thanksMessages = await response.json();

    if (!Array.isArray(thanksMessages)) {
      throw new Error("thanks_data_invalid");
    }

    renderThanksMessages(thanksMessages);
  } catch (error) {
    thanksGrid.innerHTML = `
      <article class="friend-note special">
        <span class="paper-label">Tam thu</span>
        <h2>Chua tai duoc du lieu</h2>
        <p class="friend-category">Thong bao nho</p>
        <p>Khong tai duoc file thanks-data.json nen trang tam thu tam thoi chua hien ra day du.</p>
      </article>
    `;
  }
}

function renderThanksMessages(thanksMessages) {
  thanksGrid.innerHTML = thanksMessages
    .map((entry) => {
      const category = String(entry.category || "ban").trim();
      const title = String(entry.title || "").trim();
      const name = String(entry.name || "Mot nguoi ban").trim();
      const messageList = Array.isArray(entry.message) ? entry.message : [String(entry.message || "").trim()];
      const paragraphs = messageList
        .filter(Boolean)
        .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
        .join("");

      return `
        <article class="friend-note${category === "guest" ? " special" : ""}" data-category="${escapeHtml(category)}">
          <span class="paper-label">${escapeHtml(name)}</span>
          ${title ? `<h2>${escapeHtml(title)}</h2>` : ""}
          <p class="friend-category">${escapeHtml(formatCategoryLabel(category))}</p>
          ${paragraphs}
        </article>
      `;
    })
    .join("");
}

async function loadAlbumDay() {
  const albumDay = albumGrid.getAttribute("data-album-day");

  if (!albumDay) {
    return;
  }

  try {
    const response = await fetch(`albums-data.json?v=${ASSET_VERSION}`);

    if (!response.ok) {
      throw new Error("album_data_load_failed");
    }

    const albumData = await response.json();
    const dayData = albumData?.[albumDay];

    if (!dayData || !Array.isArray(dayData.photos)) {
      throw new Error("album_day_missing");
    }

    renderAlbumCards(dayData.photos);
  } catch (error) {
    albumGrid.innerHTML = `
      <article class="photo-memory wide">
        <div class="album-photo soft-sand">Album</div>
        <span class="paper-label">Thong bao</span>
        <h2>Chua tai duoc du lieu</h2>
        <p>Trang album nay tam thoi chua hien duoc danh sach anh tu file albums-data.json.</p>
      </article>
    `;
  }
}

function renderAlbumCards(photos) {
  albumGrid.innerHTML = photos
    .map((photo) => {
      const label = String(photo.label || "Anh").trim();
      const title = String(photo.title || "").trim();
      const description = String(photo.description || "").trim();
      const photoText = String(photo.photoText || "").trim();
      const imageSrc = String(photo.imageSrc || "").trim();
      const imageAlt = String(photo.imageAlt || title || photoText || label).trim();
      const tone = String(photo.tone || "soft-sand").trim();
      const layout = String(photo.layout || "").trim();
      const classes = ["photo-memory"];

      if (layout) {
        classes.push(layout);
      }

      return `
        <article class="${classes.join(" ")}">
          <div class="album-photo ${escapeHtml(tone)}"${imageSrc ? ' data-has-image="true"' : ""}>
            ${
              imageSrc
                ? `<img src="${escapeHtml(imageSrc)}" alt="${escapeHtml(imageAlt)}" loading="lazy" />`
                : `<span class="album-photo-text">${escapeHtml(photoText || imageAlt)}</span>`
            }
          </div>
          <span class="paper-label">${escapeHtml(label)}</span>
          ${title ? `<h2>${escapeHtml(title)}</h2>` : ""}
          ${description ? `<p>${escapeHtml(description)}</p>` : ""}
        </article>
      `;
    })
    .join("");
}

function formatCategoryLabel(category) {
  const labels = {
    ban: "Ban cung lop",
    guest: "Khach moi dac biet",
    teacher: "Thay co",
  };

  return labels[category] || category;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

const GOOGLE_SHEETS_ENDPOINT = "";
const shareForm = document.querySelector("[data-share-form]");
const formStatus = document.querySelector("[data-form-status]");

if (shareForm && formStatus) {
  shareForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(shareForm);
    const payload = {
      nickname: String(formData.get("nickname") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      submitted_at: new Date().toISOString(),
      page: currentPage || "share.html",
      user_agent: navigator.userAgent,
    };

    if (!GOOGLE_SHEETS_ENDPOINT) {
      formStatus.textContent =
        "Chưa có endpoint Google Sheets. Hãy thêm link Apps Script vào script.js để lưu dữ liệu.";
      return;
    }

    formStatus.textContent = "Đang gửi tâm thư...";

    try {
      const response = await fetch(GOOGLE_SHEETS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("submit_failed");
      }

      formStatus.textContent = "Gửi thành công rồi nè.";
      shareForm.reset();
    } catch (error) {
      formStatus.textContent =
        "Gửi chưa thành công. Kiểm tra lại endpoint Google Sheets hoặc quyền truy cập nha.";
    }
  });
}

Promise.all([loadSharedHeader(), loadSharedFooter()]);
