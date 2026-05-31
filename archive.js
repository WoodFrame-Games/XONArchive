const games = {
  hypper: {
    title: "HypperSandbox",
    items: [
      {
        version: "0.1.6",
        file: "https://github.com/WoodFrame-Games/XONArchive/releases/download/Hypper/Hypper0.1.6.apk",
        size: "85.3 MB",
        note: "GitHub Releases asset"
      },
      {
        version: "0.1.5",
        file: "https://github.com/WoodFrame-Games/XONArchive/releases/download/Hypper/Hypper0.1.5.apk",
        size: "81.9 MB",
        note: "GitHub Releases asset"
      },
      {
        version: "0.1.4",
        file: "https://github.com/WoodFrame-Games/XONArchive/releases/download/Hypper/Hypper0.1.4.apk",
        size: "82.1 MB",
        note: "GitHub Releases asset"
      },
      {
        version: "0.1.3",
        file: "https://github.com/WoodFrame-Games/XONArchive/releases/download/Hypper/Hypper0.1.3.apk",
        size: "82.1 MB",
        note: "GitHub Releases asset"
      },
      {
        version: "0.1.2",
        file: "https://github.com/WoodFrame-Games/XONArchive/releases/download/Hypper/Hypper0.1.2.apk",
        size: "98.5 MB",
        note: "GitHub Releases asset"
      },
      {
        version: "0.1.1",
        file: "https://github.com/WoodFrame-Games/XONArchive/releases/download/Hypper/Hypper0.1.1.apk",
        size: "82.6 MB",
        note: "GitHub Releases asset"
      },
      {
        version: "0.1.0",
        file: "https://github.com/WoodFrame-Games/XONArchive/releases/download/Hypper/Hypper0.1.0.apk",
        size: "80.6 MB",
        note: "GitHub Releases asset"
      },
      {
        version: "0.0.9",
        file: "https://github.com/WoodFrame-Games/XONArchive/releases/download/Hypper/Hypper0.0.9.apk",
        size: "79.1 MB",
        note: "GitHub Releases asset"
      },
      {
        version: "0.0.8",
        file: "https://github.com/WoodFrame-Games/XONArchive/releases/download/Hypper/Hypper0.0.8.apk",
        size: "79.1 MB",
        note: "GitHub Releases asset"
      },
      {
        version: "0.0.7",
        file: "https://github.com/WoodFrame-Games/XONArchive/releases/download/Hypper/Hypper0.0.7.apk",
        size: "78.5 MB",
        note: "GitHub Releases asset"
      },
      {
        version: "0.0.6",
        file: "https://github.com/WoodFrame-Games/XONArchive/releases/download/Hypper/Hypper0.0.6.apk",
        size: "70.1 MB",
        note: "GitHub Releases asset"
      },
      {
        version: "0.0.5",
        file: "https://github.com/WoodFrame-Games/XONArchive/releases/download/Hypper/Hypper0.0.5.apk",
        size: "88.4 MB",
        note: "GitHub Releases asset"
      },
      {
        version: "0.0.4",
        file: "https://github.com/WoodFrame-Games/XONArchive/releases/download/Hypper/Hypper0.0.4.apk",
        size: "83.2 MB",
        note: "GitHub Releases asset"
      },
      {
        version: "0.0.3",
        file: "https://github.com/WoodFrame-Games/XONArchive/releases/download/Hypper/Hypper0.0.3.apk",
        size: "81.6 MB",
        note: "GitHub Releases asset"
      },
      {
        version: "0.0.2",
        file: "https://github.com/WoodFrame-Games/XONArchive/releases/download/Hypper/Hypper0.0.2.apk",
        size: "81.0 MB",
        note: "GitHub Releases asset"
      },
      {
        version: "0.0.1",
        file: "https://github.com/WoodFrame-Games/XONArchive/releases/download/Hypper/Hypper0.0.1.apk",
        size: "73.3 MB",
        note: "GitHub Releases asset"
      }
    ]
  },
  polygon: {
    title: "PolygonSandbox",
    items: [
      {
        version: "0.9.0 Modify",
        file: "https://github.com/WoodFrame-Games/XONArchive/releases/download/PolygonSandbox/PolygonSandbox0.9.0Modify.apk",
        size: "183.3 MB",
        note: "GitHub Releases asset"
      },
      {
        version: "0.9.0 apks.2",
        file: "https://github.com/WoodFrame-Games/XONArchive/releases/download/PolygonSandbox/Polygon.Sandbox_0.9.0_apks.2.apk",
        size: "183.3 MB",
        note: "GitHub Releases asset"
      }
    ]
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
