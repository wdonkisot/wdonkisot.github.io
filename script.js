// PARTICLES
const particlesContainer = document.querySelector('.particles');
const particleCount = 60;

for (let i = 0; i < particleCount; i++) {
  const p = document.createElement('span');
  p.className = 'particle';
  p.style.left = Math.random() * 100 + 'vw';
  p.style.bottom = (-20 - Math.random() * 120) + 'px';
  p.style.animationDuration = (12 + Math.random() * 18) + 's';
  p.style.animationDelay = (-Math.random() * 20) + 's';
  p.style.opacity = (0.12 + Math.random() * 0.22).toFixed(2);
  p.style.transform = `scale(${0.7 + Math.random() * 1.8})`;
  particlesContainer.appendChild(p);
}

// SCROLL REVEAL
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// NEWS JSON
fetch('news.json')
  .then(res => res.json())
  .then(news => {
    const newsContainer = document.getElementById('news-container');

    news.forEach(item => {
      const card = document.createElement('div');
      card.className = 'news-card reveal';

      card.innerHTML = `
        <div class="news-date">${item.date}</div>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      `;

      newsContainer.appendChild(card);
      observer.observe(card);
    });
  })
  .catch(err => console.error('News yüklenemedi:', err));

// RELEASES JSON
fetch('releases.json')
  .then(res => res.json())
  .then(releases => {
    const releasesContainer = document.getElementById('releases-container');

    releases.forEach(item => {
      const card = document.createElement('div');
      card.className = 'release-card reveal';

      card.innerHTML = `
        <img src="${item.image}" alt="${item.title} cover" />
        <div class="release-info">
          <h3>${item.title}</h3>
          <a href="${item.link}" target="_blank">Dinle</a>
        </div>
      `;

      releasesContainer.appendChild(card);
      observer.observe(card);
    });
  })
  .catch(err => console.error('Releases yüklenemedi:', err));

// 🔥 ADMIN PANEL

let clickCount = 0;
document.getElementById("secretAdminTrigger").addEventListener("click", () => {
  clickCount++;
  if (clickCount >= 5) {
    document.getElementById("adminModal").style.display = "flex";
    clickCount = 0;
  }
});

// LOGIN
function adminLogin() {
  const user = document.getElementById("adminUser").value;
  const pass = document.getElementById("adminPass").value;

  if (user === "wdonkisotprd" && pass === "!!32!oWdK890") {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("adminContent").style.display = "block";
  } else {
    alert("Hatalı giriş");
  }
}

// COPY JSON
function copyJSON(id) {
  const text = document.getElementById(id).value;
  navigator.clipboard.writeText(text);
  alert("Kopyalandı!");
}

// CLOSE PANEL (arka plana tıklayınca kapansın)
document.getElementById("adminModal").addEventListener("click", (e) => {
  if (e.target.id === "adminModal") {
    document.getElementById("adminModal").style.display = "none";
  }
});
