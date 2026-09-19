const form = document.querySelector(".feedback-form");
const STORAGE_KEY = "feedback-form-state";

let formData = { email: "", message: "" };

// Перевірка та заповнення форми при завантаженні сторінки
const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  try {
    formData = JSON.parse(savedData);
    form.elements.email.value = formData.email ?? "";
    form.elements.message.value = formData.message ?? "";
  } catch (error) {
    console.error("Parse error:", error);
  }
}

// Слухач на введення (делегування)
form.addEventListener("input", (event) => {
  formData[event.target.name] = event.target.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// Слухач на відправку
form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert("Fill please all fields");
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  formData = { email: "", message: "" };
  form.reset();
});