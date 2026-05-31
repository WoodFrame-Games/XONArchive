const exportPath = "ChatExport_2026-05-31/";
const chatList = document.querySelector("#chatList");
const chatStatus = document.querySelector("#chatStatus");
const chatSearch = document.querySelector("#chatSearch");
let allMessages = [];
const missingLocalFiles = new Set([
  "files/Alpha+Sandbox_1.3_apkcombo.com.apk",
  "files/hypper-1624219018-www.androeed.ru.apk",
  "files/Sandbox Advanced_0.2.0_APKPure.apk",
  "files/HypperWithShaders.apk",
  "files/HypperWithShaders (1).apk",
  "files/base (1).apk",
  "files/GAMEWEBGLTEST.rar",
  "files/HypperSandboxPC.rar",
  "files/Hypper Sandbox_LITE 0.2 (1).apk",
  "files/HYPPER LITE MOD 0.3.apk",
  "files/HypperXON.V1.apk",
  "files/Sandbox Mod 2_2.12 (mpFix).apk",
  "files/PlayerBall.apk",
  "files/Polygon Sandbox_0.9.0.apk",
  "files/ImagesFromPolybox.rar"
]);

function isAvailableFile(value) {
  return value && !String(value).startsWith("(") && !missingLocalFiles.has(value);
}

function formatBytes(value) {
  if (!Number.isFinite(value)) {
    return "";
  }
  if (value < 1024) {
    return `${value} B`;
  }
  const units = ["KB", "MB", "GB"];
  let size = value / 1024;
  let unit = units.shift();
  while (size >= 1024 && units.length) {
    size /= 1024;
    unit = units.shift();
  }
  return `${size.toFixed(size >= 10 ? 1 : 2)} ${unit}`;
}

function postUrl(message) {
  return `https://t.me/HypperNet/${message.id}`;
}

function appendText(target, value) {
  if (typeof value === "string") {
    target.append(document.createTextNode(value));
    return;
  }

  const text = value.text || "";
  if (value.href) {
    const link = document.createElement("a");
    link.href = value.href;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = text;
    target.append(link);
    return;
  }

  const span = document.createElement(value.type === "bold" ? "strong" : value.type === "italic" ? "em" : "span");
  span.textContent = text;
  target.append(span);
}

function messageText(message) {
  const text = message.text;
  if (Array.isArray(text)) {
    return text.map((part) => (typeof part === "string" ? part : part.text || "")).join("");
  }
  return text || "";
}

function collectStickerPaths(message) {
  const text = Array.isArray(message.text) ? message.text : [];
  return text
    .filter((part) => typeof part === "object" && isAvailableFile(part.document_id))
    .map((part) => part.document_id);
}

function renderText(message, container) {
  const text = message.text;
  if (Array.isArray(text)) {
    text.forEach((part) => appendText(container, part));
    return;
  }
  appendText(container, text || "");
}

function formatDate(value) {
  try {
    return new Intl.DateTimeFormat("ru-RU", {
      dateStyle: "medium",
      timeStyle: "short"
    }).format(new Date(value));
  } catch {
    return value || "";
  }
}

function renderMessages(messages) {
  chatList.innerHTML = "";

  if (!messages.length) {
    const empty = document.createElement("div");
    empty.className = "empty-note";
    empty.textContent = "Посты не найдены.";
    chatList.append(empty);
    return;
  }

  const fragment = document.createDocumentFragment();
  for (const message of messages) {
    const card = document.createElement("article");
    card.className = `message ${message.type === "service" ? "service-message" : ""}`;

    const meta = document.createElement("div");
    meta.className = "message-meta";
    const author = document.createElement("span");
    author.textContent = message.from || message.actor || "XONArchive";
    const date = document.createElement("span");
    date.textContent = formatDate(message.date);
    meta.append(author, date);

    const body = document.createElement("div");
    body.className = "message-text";
    if (message.type === "service") {
      body.textContent = message.action ? `Service: ${message.action}` : "Service message";
    } else {
      renderText(message, body);
    }

    card.append(meta, body);

    if (message.photo) {
      const image = document.createElement("img");
      image.loading = "lazy";
      image.decoding = "async";
      image.src = exportPath + message.photo;
      image.alt = messageText(message) || "Telegram image";
      card.append(image);
    }

    if (isAvailableFile(message.file)) {
      if (message.thumbnail && isAvailableFile(message.thumbnail)) {
        const thumb = document.createElement("img");
        thumb.loading = "lazy";
        thumb.decoding = "async";
        thumb.src = exportPath + message.thumbnail;
        thumb.alt = message.file_name || "Telegram file preview";
        card.append(thumb);
      } else if (message.mime_type && message.mime_type.startsWith("image/")) {
        const preview = document.createElement("img");
        preview.loading = "lazy";
        preview.decoding = "async";
        preview.src = exportPath + message.file;
        preview.alt = message.file_name || "Telegram image";
        card.append(preview);
      } else if (message.mime_type && message.mime_type.startsWith("audio/")) {
        const audio = document.createElement("audio");
        audio.controls = true;
        audio.preload = "none";
        audio.src = exportPath + message.file;
        card.append(audio);
      }

      const file = document.createElement("a");
      file.className = "download-button";
      file.href = exportPath + message.file;
      const fileSize = formatBytes(message.file_size);
      file.textContent = fileSize ? `Скачать файл · ${fileSize}` : "Скачать файл";
      card.append(file);
    } else if (message.file_name) {
      const postLink = document.createElement("a");
      postLink.className = "download-button";
      postLink.href = postUrl(message);
      postLink.target = "_blank";
      postLink.rel = "noreferrer";
      postLink.textContent = message.file_name;
      card.append(postLink);
    }

    for (const stickerPath of collectStickerPaths(message)) {
      const sticker = document.createElement("img");
      sticker.className = "sticker-image";
      sticker.loading = "lazy";
      sticker.decoding = "async";
      sticker.src = exportPath + stickerPath;
      sticker.alt = "Custom emoji";
      card.append(sticker);

      const stickerDownload = document.createElement("a");
      stickerDownload.className = "download-button";
      stickerDownload.href = exportPath + stickerPath;
      stickerDownload.download = "";
      stickerDownload.textContent = "Скачать emoji";
      card.append(stickerDownload);
    }

    fragment.append(card);
  }

  chatList.append(fragment);
}

function applyFilter() {
  const query = chatSearch.value.trim().toLowerCase();
  if (!query) {
    renderMessages(allMessages);
    chatStatus.textContent = `${allMessages.length} постов`;
    return;
  }

  const filtered = allMessages.filter((message) => {
    const haystack = [
      message.from,
      message.actor,
      message.file_name,
      messageText(message)
    ].filter(Boolean).join(" ").toLowerCase();
    return haystack.includes(query);
  });

  renderMessages(filtered);
  chatStatus.textContent = `${filtered.length} из ${allMessages.length}`;
}

fetch(exportPath + "result.json")
  .then((response) => response.json())
  .then((data) => {
    allMessages = data.messages || [];
    renderMessages(allMessages);
    chatStatus.textContent = `${allMessages.length} постов`;
  })
  .catch(() => {
    chatStatus.textContent = "Не удалось загрузить архив";
    chatList.innerHTML = '<div class="empty-note">Открой сайт через GitHub Pages или локальный сервер, чтобы браузер мог прочитать архив постов.</div>';
  });

chatSearch.addEventListener("input", applyFilter);
