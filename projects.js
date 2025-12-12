// Calculator
function calculate() {
  const box1 = document.getElementById('input1');
  const box2 = document.getElementById('input2');
  const operator = document.getElementById('operator');
  const button = document.getElementById('button');

  numbox1 = parseInt(input1.value);
  numbox2 = parseInt(input2.value);
  operatorvalue = operator.value;

  console.log(numbox1, numbox2, operatorvalue);

  let result;

  if (operatorvalue == '+') {
    result = numbox1 + numbox2;
    alert(result);
  } else if (operatorvalue == '-') {
    result = numbox1 - numbox2;
    alert(result);
  } else if (operatorvalue == '*') {
    result = numbox1 * numbox2;
    alert(result);
  } else {
    result = numbox1 / numbox2;
    alert(result);
  }
}


// ToDo List
// setup listener & get all existing todo from localStorage
function init() {
  // get the elements of my DOM
  const addBtn = document.getElementById("addBtn");
  const todoInput = document.getElementById("todoInput");

  const todosJsonString = '[{"id":1731597966001,"text":"Vacuum the living room"},{"id":1731597966002,"text":"Wash the dishes"},{"id":1731597966003,"text":"Fold the laundry"},{"id":1731597966004,"text":"Dust the shelves"},{"id":1731597966005,"text":"Mop the kitchen floor"},{"id":1731597966006,"text":"Clean the bathroom mirror"},{"id":1731597966007,"text":"Water the plants"},{"id":1731597966008,"text":"Wipe the kitchen counters"},{"id":1731597966009,"text":"Change the bed sheets"},{"id":1731597966010,"text":"Empty the trash bins"},{"id":1731597966011,"text":"Clean the fridge"},{"id":1731597966012,"text":"Scrub the stove top"},{"id":1731597966013,"text":"Organize the pantry"},{"id":1731597966014,"text":"Wipe window sills"},{"id":1731597966015,"text":"Sweep the hallway"},{"id":1731597966016,"text":"Clean the microwave"},{"id":1731597966017,"text":"Rinse recycling and sort"},{"id":1731597966018,"text":"Tidy up the playroom"},{"id":1731597966019,"text":"Disinfect door handles"},{"id":1731597966020,"text":"Wipe the dining table"}]';

  // Seed sample todos only if nothing is already stored (don't overwrite user data)
  if (!localStorage.getItem('todos')) {
    localStorage.setItem('todos', todosJsonString);
  }

  // setup my event listeners
  addBtn.addEventListener("click", addTodo);

  todoInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTodo();
    }
  });
  displayTodos();
}

function addTodo() {
  const todoInput = document.getElementById("todoInput");
  if (!todoInput) return;

  const text = todoInput.value.trim();
  if (text === "") {
    // nothing to add
    return;
  }

  const todos = getTodosFromStorage();
  const newTodo = {
    id: Date.now(),
    text: text,
  };

  todos.push(newTodo);
  localStorage.setItem('todos', JSON.stringify(todos));

  // clear input and refresh list
  todoInput.value = "";
  displayTodos();
}

// Iterate the todo's in the dom structure
function displayTodos() {
  console.log("displaying todo");
  // identify the placeholder as an element
  const todoList = document.getElementById("todoList");

  // get todo's from the localstorage
  const todos = getTodosFromStorage();
  console.log(todos);
  // clear the current list
  todoList.innerHTML = "";

  if (todos.length === 0) {
    // show empty message
    todoList.innerHTML =
      '<li class="list-group-item">No notes yet... write some</li>';
    return;
  }

  // render todos
  todos.forEach((t) => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    const span = document.createElement('span');
    span.textContent = t.text;

    const delBtn = document.createElement('button');
    delBtn.className = 'btn btn-sm btn-danger delete-btn';
    delBtn.textContent = 'Delete';
    delBtn.dataset.id = String(t.id);
    delBtn.addEventListener('click', (e) => {
      const id = Number(e.currentTarget.dataset.id);
      deleteTodo(id);
    });

    li.appendChild(span);
    li.appendChild(delBtn);
    todoList.appendChild(li);
  });
}

function deleteTodo(id) {
  const todos = getTodosFromStorage();
  const filtered = todos.filter((t) => t.id !== id);
  localStorage.setItem('todos', JSON.stringify(filtered));
  displayTodos();
}

function getTodosFromStorage() {
  // get the strings from localstorage
  const todosString = localStorage.getItem("todos");

  // if nothing is stores yet, return an empty array
  if (todosString === null) {
    return [];
  }

  // Parse  JSON string back into an array
  return JSON.parse(todosString);
}

init();

function clearAllTodos() {
  localStorage.setItem('todos', JSON.stringify([]));
  displayTodos();
}



// Chinese Zodiac Sign
const zodiacExamples = [
  { animal: 'Rat', year: 2020 },
  { animal: 'Ox', year: 2021 },
  { animal: 'Tiger', year: 2022 },
  { animal: 'Rabbit', year: 2023 },
  { animal: 'Dragon', year: 2024 },
  { animal: 'Snake', year: 2025 },
  { animal: 'Horse', year: 2026 },
  { animal: 'Goat', year: 2027 },
  { animal: 'Monkey', year: 2028 },
  { animal: 'Rooster', year: 2029 },
  { animal: 'Dog', year: 2030 },
  { animal: 'Pig', year: 2031 }
];

const zodiacCycle = zodiacExamples.map(e => e.animal);

const elementMap = {
  'Rat': ['Water', 'Rat'],
  'Ox': ['Water', 'Ox'],
  'Tiger': ['Wood', 'Tiger'],
  'Rabbit': ['Wood', 'Rabbit'],
  'Dragon': ['Earth', 'Dragon'],
  'Snake': ['Fire', 'Snake'],
  'Horse': ['Fire', 'Horse'],
  'Goat': ['Earth', 'Goat'],
  'Monkey': ['Metal', 'Monkey'],
  'Rooster': ['Metal', 'Rooster'],
  'Dog': ['Earth', 'Dog'],
  'Pig': ['Water', 'Pig']
};

function getZodiacForYear(year) {
  if (!Number.isInteger(year)) {
    throw new TypeError('year must be an integer');
  }
  const index = ((year - 2020) % 12 + 12) % 12;
  return zodiacCycle[index];
}

function getZodiacElementForYear(year) {
  if (!Number.isInteger(year)) {
    throw new TypeError('year must be an integer');
  }
  const animal = getZodiacForYear(year);
  const elements = ['Water', 'Wood', 'Fire', 'Earth', 'Metal'];
  const elementIndex = Math.floor((year - 2020) / 12) % 5;
  const element = elements[elementIndex];
  return element;
}


(function attachZodiacCalendar() {
  const container = document.getElementById('zodiac');
  if (!container) return;

  // Calender input
  let dateInput = container.querySelector('input[type="date"][name="date"]');
  let resultEl = container.querySelector('[data-result]');

  if (!dateInput) {
    dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.name = 'date';
    dateInput.placeholder = 'Pick a date';
    container.appendChild(dateInput);
  }

  if (!resultEl) {
    resultEl = document.createElement('div');
    resultEl.setAttribute('data-result', 'true');
    resultEl.style.marginTop = '0.5rem';
    container.appendChild(resultEl);
  }

  const update = () => {
    const value = dateInput.value;
    if (!value) {
      resultEl.textContent = 'Please select a date.';
      return;
    }
    const year = Number(value.slice(0, 4));
    if (!Number.isInteger(year)) {
      resultEl.textContent = 'Invalid date.';
      return;
    }
    try {
      const animal = getZodiacForYear(year);
      const element = getZodiacElementForYear(year);
      const details = zodiacDetails[animal];

      resultEl.innerHTML = `
  <div class="d-flex flex-wrap align-items-center gap-2 mb-3">
    <span class="badge rounded-pill text-bg-warning">${year}</span>
    <span class="badge rounded-pill text-bg-warning">${element}</span>
    <span class="badge rounded-pill text-bg-warning">${animal}</span>
  </div>
  ${details ? `
  <div class="small">
    <p class="mb-1"><strong>Traits:</strong> ${details.traits}</p>
    <p class="mb-0"><strong>Lucky:</strong> ${details.lucky}</p>
  </div>
  ` : ''}
`;

      // Easter egg: If Dragon, show the dragon modal
      if (animal === 'Dragon') {
        setTimeout(() => {
          const dragonModal = new bootstrap.Modal(document.getElementById('dragonModal'));
          dragonModal.show();
        }, 500);
      }
    } catch (err) {
      resultEl.textContent = err.message;
    }

  };

  dateInput.addEventListener('change', update);
  // update if already filled
  if (dateInput.value) update();

  // expose globally
  window.getZodiacForYear = getZodiacForYear;
  window.zodiacExamples = zodiacExamples;
})();

// Zodiac sign details
const zodiacDetails = {
  'Rat': { element: 'Water', traits: 'Intelligent, adaptable, quick-witted', lucky: 'Numbers 2, 3; Colors blue, gold' },
  'Ox': { element: 'Water', traits: 'Diligent, dependable, strong, steady', lucky: 'Numbers 1, 9; Color blue' },
  'Tiger': { element: 'Wood', traits: 'Brave, competitive, unpredictable, confident', lucky: 'Numbers 1, 3, 4; Colors orange, white' },
  'Rabbit': { element: 'Wood', traits: 'Quiet, elegant, kind, responsible', lucky: 'Numbers 3, 4, 9; Colors red, pink, purple' },
  'Dragon': { element: 'Earth', traits: 'Confident, ambitious, energetic, independent', lucky: 'Numbers 1, 6, 7; Colors gold, silver, hoarfrost white' },
  'Snake': { element: 'Fire', traits: 'Wise, mysterious, introspective, charming', lucky: 'Numbers 2, 8, 9; Colors red, black' },
  'Horse': { element: 'Fire', traits: 'Energetic, independent, free-spirited, warm', lucky: 'Numbers 2, 3, 7; Colors brown, red, purple' },
  'Goat': { element: 'Earth', traits: 'Calm, gentle, sympathetic, creative', lucky: 'Numbers 2, 7; Colors brown, red, purple' },
  'Monkey': { element: 'Metal', traits: 'Playful, curious, mischievous, clever', lucky: 'Numbers 1, 7, 8; Colors white, blue, gold' },
  'Rooster': { element: 'Metal', traits: 'Observant, honest, active, straightforward', lucky: 'Numbers 5, 7, 8; Colors gold, brown, yellow' },
  'Dog': { element: 'Earth', traits: 'Loyal, honest, reliable, sincere', lucky: 'Numbers 3, 4, 9; Colors green, red, purple' },
  'Pig': { element: 'Water', traits: 'Compassionate, generous, diligent, honest', lucky: 'Numbers 2, 5, 8; Colors yellow, gray, brown' }
};



// Helper functions for rendering
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Render a section with a title and list items using plain HTML strings
function renderListSection(title, items, formatItem) {
  if (!items || items.length === 0) {
    return `<section><h3>${escapeHtml(title)}</h3><p>None</p></section>`;
  }
  const lis = items.map(item => `<li>${escapeHtml(formatItem(item))}</li>`).join("");
  return `<section>
      <h3>${escapeHtml(title)}</h3>
      <ul>${lis}</ul>
    </section>`;
}

