const games = {
  hypper: {
    title: "Hypper Sandbox",
    items: [
      {
        version: "0.0.2",
        file: "APKs/Hypper0.0.2.apk",
        size: "81.0 MB",
        note: "APK build from local archive"
      },
      {
        version: "0.0.1",
        file: "APKs/Hypper0.0.1.apk",
        size: "73.3 MB",
        note: "APK build from local archive"
      }
    ]
  },
  polygon: {
    title: "PolygonSandbox",
    items: []
  }
};

const title = document.querySelector("#gameTitle");
const meta = document.querySelector("#gameMeta");
const list = document.querySelector("#versionList");
const buttons = document.querySelectorAll(".category-button");

function renderGame(id) {
  const game = games[id];
  title.textContent = game.title;
  meta.textContent = `${game.items.length} APK versions`;
  list.innerHTML = "";

  if (!game.items.length) {
    const empty = document.createElement("div");
    empty.className = "empty-note";
    empty.textContent = "Для этой категории APK пока не добавлены.";
    list.append(empty);
    return;
  }

  for (const item of game.items) {
    const row = document.createElement("article");
    row.className = "version-item";
    row.innerHTML = `
      <div>
        <span class="version-name">${game.title} ${item.version}</span>
        <span class="version-info">${item.size} · ${item.note}</span>
      </div>
      <a class="download-button" href="${item.file}" download>Скачать APK</a>
    `;
    list.append(row);
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderGame(button.dataset.game);
  });
});

renderGame("hypper");
