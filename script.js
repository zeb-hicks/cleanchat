const observerConfig = {
  attributes: true,
  childList: true,
  subtree: true
};

const observerCallback = (mutationList, _) => {
  for (const mutation of mutationList) {
    if (mutation.type == "childList") {
      for (let node of mutation.addedNodes) {
        handleMutation(node);
      }
    }
  }
}

const observer = new MutationObserver(observerCallback);
observer.observe(document.body, observerConfig);

/**
 * DOM mutation event handler.
 * @param {Node} node 
 */
function handleMutation(node) {
  if (node === undefined) return;
  if (node.classList === undefined) return;
  if (node.classList.contains === undefined) return;

  if (node.classList.contains("chat-line__message")) {
    handleChatMessage(node);
  } else {
    let messages = node.querySelectorAll(".chat-line__message");
    messages.forEach(message => {
      handleChatMessage(message);
    });
  }

  // Scan for any unprocessed messages.
  let unprocessedMessages = document.querySelectorAll(".message:not([data-cleaned-up])");
  unprocessedMessages.forEach(message => {
    handleChatMessage(message);
  });

  scrollIfNeeded();

  checkFFZSettings();
}

/**
 * Applies tag classes and adds custom elements to chat messages.
 * @param {HTMLElement} node 
 */
function handleChatMessage(node) {
  if (node.getAttribute("data-cleaned-up")) return;
  node.setAttribute("data-cleaned-up", "");

  let badgeNodes = node.querySelectorAll(".chat-line__message--badges span");
  for (let badge of badgeNodes) {
    let badgeName = badge.getAttribute("data-badge");
    if (badgeName === null) continue;
    
    node.classList.add(`badge-${badgeName}`);
  }

  let messageNode = node.querySelector(".message");

  if (messageNode === null) return;

  let textFragments = messageNode.querySelectorAll(".text-fragment");

  let messageText = "";

  if (textFragments.length > 0) {
    messageText = Array.from(textFragments).filter(e => e !== undefined && e !== null).flatMap(e => e.innerText.trim()).join("");
  }

  if (messageText.length == 0) {
    let emotes = messageNode.querySelectorAll("img");

    if (emotes.length >= 1 && emotes.length <= 3) {
      enlargeEmotes(emotes);
    }
  }
}

/**
 * Enlarge all the emotes in a message from their 1x size to 2x as in Discord or similar.
 * @param {HTMLImageElement} emotes 
 */
function enlargeEmotes(emotes) {
  const setregex = /((?<x1>.*) 1x)? ?((?<x2>.*) 2x)? ?((?<x4>.*) 4x)?/;
  /** 
   * @type {HTMLImageElement} emote
   */
  for (let emote of emotes) {
    let actualWidth = emote.clientWidth;
    let actualHeight = emote.clientHeight;
    if (!emote.complete || actualWidth == 0 || actualHeight == 0) {
      console.log(emote, "Emote not loaded yet.");
      setTimeout(() => {
        enlargeEmotes([emote]);
      }, 10);
      continue;
    }
    let srcset = emote.getAttribute("srcset");
    let sizes = setregex.exec(srcset);
    if (sizes === null) continue;
    let x1 = sizes.groups.x1 || emote.src;
    let x2 = sizes.groups.x2 || emote.src;
    let x4 = sizes.groups.x4 || emote.src;

    x1 = x2;
    x2 = x4;

    emote.setAttribute("srcset", `${x1} 1x, ${x2} 2x, ${x4} 4x`);
    emote.setAttribute("src", x1);

    emote.style.width = `${actualWidth * 2}px`;
    emote.style.maxWidth = `${actualWidth * 2}px`;
    emote.style.height = `${actualHeight * 2}px`;
    emote.style.maxHeight = `${actualHeight * 2}px`;
    emote.style.lineHeight = `${actualHeight * 2}px`;
    emote.style.verticalAlign = "baseline";

    emote.setAttribute("data-embiggened", "");
  }
}

function checkFFZSettings() {
  if (!window.ffz) return setTimeout(checkFFZSettings, 1000);
  if (!window.ffz.settings) return setTimeout(checkFFZSettings, 1000);
  if (!window.ffz.settings.get) return setTimeout(checkFFZSettings, 1000);
  let format = ffz.settings.get("chat.timestamp-format");

  let size = 0;
  if (format.length >= 1) size = 1;
  if (format.length >= 6) size = 2;
  if (format.length >= 8) size = 3;

  let classes = [
    "clean-no-timestamps",
    "clean-small-timestamps",
    "clean-medium-timestamps",
    "clean-large-timestamps"
  ];

  document.body.classList.remove(...classes);
  document.body.classList.add(classes[size]);
}

function scrollIfNeeded() {
  let chat = document.querySelector(".chat-scrollable-area__message-container");
  let paused = chat.classList.contains("chat-scrollable-area__message-container--paused");
  if (paused) return;

  chat.lastChild.scrollIntoViewIfNeeded();
}

checkFFZSettings();
