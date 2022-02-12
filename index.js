const taskContainer = document.querySelector(".task-container");

let globalStore =[];

const newCard = ({
  id,
  imageUrl, 
  taskTitle, 
  taskType, 
  taskDescription,
}) => `<div class="col-md-6 col-lg-4" id=${id}>
<div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" class="btn btn-outline-success"><i class="fa-solid fa-pencil"></i></button>
    <button type="button" id=${id} class="btn btn-outline-danger" onclick="deleteCard.apply(this, arguments)"><i class="fa-solid fa-trash-can" onclick="deleteCard.apply(this, arguments)" id=${id} ></i></button>
  </div>
  <img src=${imageUrl} class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${taskTitle}</h5>
    <p class="card-text">${taskDescription}</p>
    <span class="badge bg-primary">${taskType}</span>
  </div>
  <div class="card-footer text-muted">
    <button type="button" class="btn btn-outline-primary float-end">Open Task</button>
  </div>
</div>
</div>`; 

const loadInitialTaskCards = () => {
  const getInitialData = localStorage.getItem("taskify");
  if(!getInitialData) return;
  const { cards }=JSON.parse(getInitialData);
  cards.map((cardObject) => {
    const createNewCard= newCard(cardObject);
    taskContainer.insertAdjacentHTML("beforeend", createNewCard);
    globalStore.push(cardObject);
  });
};

const updateLocalStorage = () => {
  localStorage.setItem("taskify", JSON.stringify({ cards: globalStore }));
}

const saveChanges = () => {
  const taskData = {
    id: `${Date.now()}`, // unique number for card id
    imageUrl: document.getElementById("imageurl").value,
    taskTitle: document.getElementById("tasktitle").value,
    taskType: document.getElementById("tasktype").value,
    taskDescription: document.getElementById("taskdescription").value,
  };
  const createNewCard = newCard(taskData);

  taskContainer.insertAdjacentHTML("beforeend", createNewCard);
  globalStore.push(taskData);

  updateLocalStorage();
};

const deleteCard = (event) => {
  event=window.event;
  const targetID=event.target.id;
  const tagname=event.target.tagName;
  const globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID );

  updateLocalStorage();

  if(tagname === "BUTTON"){
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
  }
  return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);

}; 

