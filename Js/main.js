const TaskForm = document.querySelector(".task-form");
console.log(TaskForm);
const sites = JSON.parse(localStorage.getItem("sites")) || [];
displaySites();
console.log(sites);

TaskForm.onsubmit = function (e) {
  e.preventDefault();
  const site = {
    TaskTitle: document.querySelector(".task-title").value,
    TaskDescription: document.querySelector(".task-description").value,
    addedDate: new Date().toLocaleString(),
    done: false,
  };
  sites.push(site);
  localStorage.setItem("sites", JSON.stringify(sites));
  TaskForm.reset();
  displaySites();
  //console.log(sites);
};

function displaySites() {
  const result = sites
    .map((site, index) => {
      return `<li>
         <div class="left-section">
         <input type="checkbox" />
         <div class="task-text">
              <div class="task-title"><strong>${site.TaskTitle}</strong></div>
              <div class="task-description">${site.TaskDescription}</div>
              ${site.done ? '<div class="task-done">✅ Done</div>' : ""}
      </div>
       </div>

     <div class="right-section">
          <small>${site.addedDate}</small>
          <button onclick="removeTask(${index})">Remove</button>
     </div>

</li>`;

    }).join("");

  document.querySelector(".task-ul").innerHTML = result;
  enableDragAndDrop();
  enableCheckboxToggle();
}

function enableCheckboxToggle() {
  document
    .querySelectorAll(".task-ul li input[type='checkbox']")
    .forEach((checkbox, index) => {
      checkbox.checked = sites[index].done;

      checkbox.onchange = function () {
        sites[index].done = checkbox.checked;
        localStorage.setItem("sites", JSON.stringify(sites));
        displaySites();
      };
    });
}

function removeTask(index) {
  sites.splice(index, 1);
  localStorage.setItem("sites", JSON.stringify(sites));
  displaySites();
}

function enableDragAndDrop() {
  document.querySelectorAll(".task-ul li").forEach((item, index) => {
    item.draggable = true;
    item.dataset.index = index;

    item.ondragstart = () => (draggedIndex = index);
    item.ondragover = (e) => e.preventDefault();
    item.ondrop = () => {
      const from = +draggedIndex;
      const to = +item.dataset.index;
      const moved = sites.splice(from, 1)[0];
      sites.splice(to, 0, moved);
      localStorage.setItem("sites", JSON.stringify(sites));
      displaySites();
    };
  });
}

let draggedIndex = null;
