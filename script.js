const urlParams = new URLSearchParams(window.location.search);
const currentPlanet = urlParams.get('planet') || 'earth';

fetch('planet.json')
  .then(response => response.json())
  .then(planets => {
    const planet = planets.find(p => p.name.toLowerCase() === currentPlanet.toLowerCase());

    const container = document.querySelector("#planet-content");
    container.innerHTML = `
      <h2>${planet.name}</h2>
      <video autoplay muted loop width="900" style="display: block; margin: 0 auto;">
        <source src="${planet.video}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <div class="tabs">
        <button class="tab-btn active" data-type="overview">01 OVERVIEW</button>
        <button class="tab-btn" data-type="structure">02 INTERNAL STRUCTURE</button>
        <button class="tab-btn" data-type="geology">03 SURFACE GEOLOGY</button>
      </div>
      <div class="details">
        <p class="tab-content">${planet.overview}</p>
        <p><strong>Rotation:</strong> ${planet.rotation}</p>
        <p><strong>Revolution:</strong> ${planet.revolution}</p>
        <p><strong>Radius:</strong> ${planet.radius}</p>
        <p><strong>Distance from Sun:</strong> ${planet.distance}</p>
        <p><strong>Temperature:</strong> ${planet.temperature}</p>
      </div>
    `;

    const buttons = container.querySelectorAll(".tab-btn");
    const content = container.querySelector(".tab-content");

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        const type = button.dataset.type;
        content.textContent = planet[type];
      });
    });
  });
