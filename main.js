fetch("ChatExport_2026-05-31/result.json")
  .then((response) => response.json())
  .then((data) => {
    const messages = data.messages || [];
    const regularMessages = messages.filter((message) => message.type === "message");
    const photos = messages.filter((message) => message.photo);
    document.querySelector("#messageCount").textContent = `${regularMessages.length} постов`;
    document.querySelector("#photoCount").textContent = `${photos.length} изображений`;
  })
  .catch(() => {
    document.querySelector("#messageCount").textContent = "Telegram archive";
    document.querySelector("#photoCount").textContent = "Данные будут доступны на GitHub Pages";
  });
