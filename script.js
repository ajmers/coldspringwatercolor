(function () {
  "use strict";

  var ART = [
    { slug: "evening-field", title: "Evening Field", category: "Landscape" },
    { slug: "state-house", title: "State House", category: "Architecture" },
    { slug: "in-flight", title: "In Flight", category: "Wildlife" },
    { slug: "birches-in-bloom", title: "Birches in Bloom", category: "Landscape" },
    { slug: "piping-plover", title: "Piping Plover", category: "Wildlife" },
    { slug: "daisies", title: "Daisies", category: "Floral" },
    { slug: "breaching", title: "Breaching", category: "Wildlife" },
    { slug: "celosia", title: "Celosia", category: "Floral" },
    { slug: "houseplant-portrait", title: "Houseplant Portrait", category: "Whimsical" },
    { slug: "sliced-watermelon", title: "Sliced Watermelon", category: "Still Life" },
    { slug: "flowers-in-a-basket", title: "Flowers in a Basket", category: "Still Life" },
    { slug: "boy-and-guinea-pig", title: "Boy and Guinea Pig", category: "Portrait" },
    { slug: "cottage-and-sunflowers", title: "Cottage & Sunflowers", category: "Landscape" },
    { slug: "autumn-reflection", title: "Autumn Reflection", category: "Landscape" },
    { slug: "lone-maple", title: "Lone Maple", category: "Landscape" },
    { slug: "cat-by-the-fence", title: "Cat by the Fence", category: "Wildlife" },
    { slug: "island-sunset", title: "Island Sunset", category: "Landscape" },
    { slug: "cherry-blossoms", title: "Cherry Blossoms", category: "Landscape" },
    { slug: "dogwood-branch", title: "Dogwood Branch", category: "Floral" },
    { slug: "windsor-chair", title: "Windsor Chair", category: "Still Life" },
    { slug: "standing-stones", title: "Standing Stones", category: "Landscape" },
    { slug: "lupines", title: "Lupines", category: "Floral" },
    { slug: "village-street", title: "Village Street", category: "Architecture" },
    { slug: "curled-up", title: "Curled Up", category: "Wildlife" }
  ];

  var masonry = document.getElementById("masonry");
  var frag = document.createDocumentFragment();

  ART.forEach(function (art, i) {
    var card = document.createElement("article");
    card.className = "art-card";
    card.dataset.category = art.category;
    card.dataset.index = i;

    var img = document.createElement("img");
    img.src = "images/thumb/" + art.slug + ".jpg";
    img.alt = art.title + " — original watercolor painting, " + art.category.toLowerCase();
    img.loading = "lazy";

    var cap = document.createElement("div");
    cap.className = "art-card-cap";
    cap.innerHTML = "<h3>" + art.title + "</h3><span>" + art.category + "</span>";

    card.appendChild(img);
    card.appendChild(cap);
    frag.appendChild(card);
  });
  masonry.appendChild(frag);

  /* ---------- Filters ---------- */
  var filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      var filter = btn.dataset.filter;
      document.querySelectorAll(".art-card").forEach(function (card) {
        var show = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });

  /* ---------- Lightbox ---------- */
  var lightbox = document.getElementById("lightbox");
  var lbImg = document.getElementById("lightboxImg");
  var lbCaption = document.getElementById("lightboxCaption");
  var lbClose = document.getElementById("lightboxClose");
  var lbPrev = document.getElementById("lightboxPrev");
  var lbNext = document.getElementById("lightboxNext");
  var currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    var art = ART[index];
    lbImg.src = "images/full/" + art.slug + ".jpg";
    lbImg.alt = art.title + " — original watercolor painting, " + art.category.toLowerCase();
    lbCaption.innerHTML = art.title + "<span>" + art.category + "</span>";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function showRelative(delta) {
    currentIndex = (currentIndex + delta + ART.length) % ART.length;
    openLightbox(currentIndex);
  }

  masonry.addEventListener("click", function (e) {
    var card = e.target.closest(".art-card");
    if (!card) return;
    openLightbox(Number(card.dataset.index));
  });

  lbClose.addEventListener("click", closeLightbox);
  lbPrev.addEventListener("click", function () { showRelative(-1); });
  lbNext.addEventListener("click", function () { showRelative(1); });
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showRelative(-1);
    if (e.key === "ArrowRight") showRelative(1);
  });

  /* ---------- Mobile nav ---------- */
  var navToggle = document.getElementById("navToggle");
  var siteNav = document.querySelector(".site-nav");
  navToggle.addEventListener("click", function () {
    var open = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  document.querySelectorAll(".site-nav a").forEach(function (a) {
    a.addEventListener("click", function () {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
