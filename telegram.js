const exportPath = "ChatExport_2026-05-31/";
const chatList = document.querySelector("#chatList");
const chatStatus = document.querySelector("#chatStatus");
const chatSearch = document.querySelector("#chatSearch");
let allMessages = [];

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
    empty.textContent = "Сообщения не найдены.";
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

    if (message.file && message.file !== "(File not included. Change data exporting settings to download.)") {
      const file = document.createElement("a");
      file.className = "download-button";
      file.href = exportPath + message.file;
      file.textContent = message.file_name || "Скачать файл";
      card.append(file);
    } else if (message.file_name) {
      const missing = document.createElement("p");
      missing.className = "version-info";
      missing.textContent = `Файл не включен в экспорт: ${message.file_name}`;
      card.append(missing);
    }

    fragment.append(card);
  }

  chatList.append(fragment);
}

function applyFilter() {
  const query = chatSearch.value.trim().toLowerCase();
  if (!query) {
    renderMessages(allMessages);
    chatStatus.textContent = `${allMessages.length} сообщений`;
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
    chatStatus.textContent = `${allMessages.length} сообщений`;
  })
  .catch(() => {
    chatStatus.textContent = "Не удалось загрузить ChatExport";
    chatList.innerHTML = '<div class="empty-note">Открой сайт через GitHub Pages или локальный сервер, чтобы браузер мог прочитать result.json.</div>';
  });

chatSearch.addEventListener("input", applyFilter);
