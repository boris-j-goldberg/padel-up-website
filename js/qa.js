/**
 * Renders the Q&A page from a separate JSON content file.
 * Keeping copy outside HTML makes later editing and localization simpler.
 */
(function () {
  var CONTENT_URL = "assets/content/qa.en.json";
  var activeCategory = "all";
  var qaData = null;

  function setText(selector, text) {
    var node = document.querySelector(selector);
    if (node) {
      node.textContent = text;
    }
  }

  function createItem(item) {
    var details = document.createElement("details");
    details.className = "qa-item";

    var summary = document.createElement("summary");
    summary.textContent = item.question;

    var answer = document.createElement("p");
    answer.textContent = item.answer;

    details.appendChild(summary);
    details.appendChild(answer);

    return details;
  }

  function itemMatchesCategory(item, categoryId) {
    if (categoryId === "all") return true;
    return Array.isArray(item.categories) && item.categories.indexOf(categoryId) !== -1;
  }

  function setActiveFilterButton() {
    var buttons = document.querySelectorAll(".qa-filter");
    for (var i = 0; i < buttons.length; i++) {
      var isActive = buttons[i].getAttribute("data-category") === activeCategory;
      buttons[i].classList.toggle("active", isActive);
      buttons[i].setAttribute("aria-pressed", isActive ? "true" : "false");
    }
  }

  function renderFilters(categories) {
    var filters = document.getElementById("qa-filters");
    if (!filters) return;

    filters.innerHTML = "";

    var allButton = createFilterButton("all", "All");
    filters.appendChild(allButton);

    categories.forEach(function (category) {
      if (!category || !category.id || !category.label) return;
      filters.appendChild(createFilterButton(category.id, category.label));
    });

    setActiveFilterButton();
  }

  function createFilterButton(id, label) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "qa-filter";
    button.setAttribute("data-category", id);
    button.setAttribute("aria-pressed", "false");
    button.textContent = label;

    button.addEventListener("click", function () {
      activeCategory = id;
      renderItems();
      setActiveFilterButton();
    });

    return button;
  }

  function renderItems() {
    var list = document.getElementById("qa-list");
    if (!list) return;

    var data = qaData || {};
    var items = Array.isArray(data.items) ? data.items : [];
    var filteredItems = items.filter(function (item) {
      return item && item.question && item.answer && itemMatchesCategory(item, activeCategory);
    });

    list.innerHTML = "";

    if (activeCategory === "all") {
      setText("#qa-count", items.length ? items.length + " questions" : "");
    } else {
      setText("#qa-count", filteredItems.length + " of " + items.length + " questions");
    }

    if (!filteredItems.length) {
      var empty = document.createElement("p");
      empty.className = "qa-status";
      empty.textContent = items.length ? "No questions match this category yet." : "No questions are available yet.";
      list.appendChild(empty);
      return;
    }

    filteredItems.forEach(function (item) {
      list.appendChild(createItem(item));
    });
  }

  function render(data) {
    qaData = data || {};
    setText("#qa-intro", qaData.intro || "Answers to common questions about how Padel-Up works.");
    renderFilters(Array.isArray(qaData.categories) ? qaData.categories : []);
    renderItems();
  }

  function renderError() {
    var list = document.getElementById("qa-list");
    if (!list) return;

    list.innerHTML = "";

    var message = document.createElement("p");
    message.className = "qa-status qa-status-error";
    message.textContent = "The Q&A content could not be loaded. Please refresh the page or contact support@padel-up.net.";
    list.appendChild(message);
  }

  function init() {
    fetch(CONTENT_URL)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Q&A content request failed.");
        }
        return response.json();
      })
      .then(render)
      .catch(renderError);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
