// particles
const particlesContainer = document.querySelector('.particles');
const particleCount = 24;

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

// reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// NEWS JSON çek
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

// RELEASES JSON çek
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
// GIZLI ADMIN PANEL
let adminTapCount = 0;
const adminTrigger = document.getElementById('secretAdminTrigger');
const adminModal = document.getElementById('adminModal');

if (adminTrigger) {
  adminTrigger.addEventListener('click', () => {
    adminTapCount++;

    if (adminTapCount >= 5) {
      adminModal.style.display = 'flex';
      adminTapCount = 0;
    }

    setTimeout(() => {
      adminTapCount = 0;
    }, 2500);
  });
}

function closeAdmin() {
  adminModal.style.display = 'none';
}

function adminLogin() {
  const user = document.getElementById('adminUser').value.trim();
  const pass = document.getElementById('adminPass').value.trim();

  // BURAYI KENDINE GORE DEGISTIR
  const correctUser = "wdkadmin";
  const correctPass = "1907wdk";

  if (user === correctUser && pass === correctPass) {
    document.getElementById('loginBox').style.display = 'none';
    document.getElementById('adminContent').style.display = 'block';
  } else {
    alert("Kullanıcı adı veya şifre yanlış.");
  }
}

function copyJSON(id) {
  const textarea = document.getElementById(id);
  textarea.select();
  textarea.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(textarea.value)
    .then(() => alert("JSON kopyalandı. GitHub dosyasına yapıştırabilirsin."))
    .catch(() => alert("Kopyalama başarısız oldu."));
}
