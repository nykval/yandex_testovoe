const inputScreen = document.getElementById("input-screen");
const resultScreen = document.getElementById("result-screen");
const digitInput = document.getElementById("digit-input");
const showColorsBtn = document.getElementById("show-colors-btn");
const backBtn = document.getElementById("back-btn");
const errorMessage = document.getElementById("error-message");
const colorGrid = document.getElementById("color-grid");

const allowedDigits = new Set(["1", "2", "3", "4", "5"]);

function validateDigits(rawValue) {
  const cleaned = rawValue.replace(/\s+/g, "");

  if (!cleaned) {
    return { ok: false, error: "Введите комбинацию цифр." };
  }

  if (!/^\d+$/.test(cleaned)) {
    return { ok: false, error: "Можно использовать только цифры." };
  }

  return { ok: true, digits: cleaned };
}

function isValidInput(rawValue) {
  const cleaned = rawValue.replace(/\s+/g, "");
  if (!cleaned) return false;
  return /^\d+$/.test(cleaned);
}

function updateButtonState() {
  if (isValidInput(digitInput.value)) {
    showColorsBtn.classList.add("ready");
    showColorsBtn.disabled = false;
    return;
  }

  showColorsBtn.classList.remove("ready");
  showColorsBtn.disabled = true;
}

function renderGrid(digits) {
  colorGrid.innerHTML = "";
  const extraDigits = [];

  for (const digit of digits) {
    if (!allowedDigits.has(digit)) {
      extraDigits.push(digit);
      continue;
    }

    const tile = document.createElement("div");
    tile.className = "tile";
    tile.dataset.digit = digit;
    tile.textContent = digit;
    colorGrid.appendChild(tile);
  }

  if (extraDigits.length > 0) {
    const extraTile = document.createElement("div");
    extraTile.className = "tile tile-extra";
    extraTile.textContent = extraDigits.join(" ");
    colorGrid.appendChild(extraTile);
  }
}

function showResultScreen(digits) {
  renderGrid(digits);
  inputScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
}

function showInputScreen() {
  resultScreen.classList.add("hidden");
  inputScreen.classList.remove("hidden");
}

showColorsBtn.addEventListener("click", () => {
  const result = validateDigits(digitInput.value);

  if (!result.ok) {
    errorMessage.textContent = result.error;
    return;
  }

  errorMessage.textContent = "";
  showResultScreen(result.digits);
});

backBtn.addEventListener("click", () => {
  showInputScreen();
});

digitInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    showColorsBtn.click();
  }
});

digitInput.addEventListener("input", () => {
  updateButtonState();
});

updateButtonState();
