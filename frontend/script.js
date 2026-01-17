const API_BASE = "https://myprofile-ba8s.onrender.com";

async function loadProfile() {
  const res = await fetch(`${API_BASE}/profile`);
  const data = await res.json();
  document.getElementById("profileBox").textContent = JSON.stringify(data, null, 2);
}

async function loadProjects() {
  const skill = document.getElementById("skillInput").value.trim();

  let url = `${API_BASE}/projects`;
  if (skill) url += `?skill=${encodeURIComponent(skill)}`;

  const res = await fetch(url);
  const data = await res.json();
  document.getElementById("projectsBox").textContent = JSON.stringify(data, null, 2);
}

async function searchAll() {
  const q = document.getElementById("searchInput").value.trim();
  if (!q) {
    alert("Please type something to search");
    return;
  }

  const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(q)}`);
  const data = await res.json();
  document.getElementById("searchBox").textContent = JSON.stringify(data, null, 2);
}
