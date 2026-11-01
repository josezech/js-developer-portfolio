async function loadProfile() {
  try {
    const response = await fetch('data/profile.json');
    const data = await response.json();
    render(data);
  } catch (erro) {
    console.error('Erro ao carregar o perfil:', erro);
  }
}

function listItems(items) {
  return items.map((item) => `<li>${item}</li>`).join('');
}

function render(d) {
  document.title = `${d.name} | Portfólio`;
  document.getElementById('avatar').src = d.avatar;
  document.getElementById('name').textContent = d.name;
  document.getElementById('job').textContent = d.job;

  document.getElementById('contact').innerHTML = listItems([
    d.location,
    d.phone,
    `<a href="mailto:${d.email}">${d.email}</a>`,
    `<a href="${d.github}" target="_blank" rel="noopener">GitHub</a>`,
    `<a href="${d.linkedin}" target="_blank" rel="noopener">LinkedIn</a>`,
  ]);

  document.getElementById('hardSkills').innerHTML = listItems(d.hardSkills);
  document.getElementById('softSkills').innerHTML = listItems(d.softSkills);
  document.getElementById('languages').innerHTML = listItems(d.languages);

  document.getElementById('portfolio').innerHTML = d.portfolio
    .map((p) => `
      <article class="card">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <a href="${p.url}" target="_blank" rel="noopener">Ver projeto</a>
        <a href="${p.github}" target="_blank" rel="noopener">Código</a>
      </article>`)
    .join('');

  document.getElementById('experience').innerHTML = d.experience
    .map((e) => `
      <div class="job-item">
        <h3>${e.title}</h3>
        <span>${e.period}</span>
        <p>${e.description}</p>
      </div>`)
    .join('');
}

loadProfile();