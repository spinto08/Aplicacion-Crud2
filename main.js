let data = [];

const table = document.getElementById("datatable");
const formAdd = document.getElementById("form-add");

// Read data
function readData() {
  data = JSON.parse(localStorage.getItem("data"));
  if (!data) {
    data = [];
  }
  table.querySelector("tbody").innerHTML = data.map((item) => `
    <tr>
      <td>${item.id}</td>
      <td>${item.nombre}</td>
      <td>${item.apellido}</td>
      <td>
        <button type="button" onclick="editData(${item.id})">Editar</button>
        <button type="button" onclick="deleteData(${item.id})">Borrar</button>
      </td>
    </tr>
  `).join("");
}

// Add data
function addData() {
  const id = formAdd.querySelector("input[name='id']").value.trim();
  const nombre = formAdd.querySelector("input[name='nombre']").value.trim();
  const apellido = formAdd.querySelector("input[name='apellido']").value.trim();

  if (!id || !nombre || !apellido) {
    alert("Por favor, rellene todos los campos");
    return;
  }

  const item = {
    id: parseInt(id),
    nombre,
    apellido,
  };

  data.push(item);
  localStorage.setItem("data", JSON.stringify(data));
  readData();
  clearForm();
}

// Edit data
function editData(id) {
  const item = data.find((item) => item.id === id);
  if (!item) {
    alert("No se encontró el elemento");
    return;
  }

  formAdd.querySelector("input[name='id']").value = item.id;
  formAdd.querySelector("input[name='nombre']").value = item.nombre;
  formAdd.querySelector("input[name='apellido']").value = item.apellido;
  formAdd.querySelector("button[type='submit']").innerHTML = "Actualizar";

  editMode = true;
  editedItemId = item.id;
}

// Update data
function updateData() {
  const id = formAdd.querySelector("input[name='id']").value.trim();
  const nombre = formAdd.querySelector("input[name='nombre']").value.trim();
  const apellido = formAdd.querySelector("input[name='apellido']").value.trim();

  if (!nombre || !apellido) {
    alert("Por favor, rellene todos los campos");
    return;
  }

  const item = data.find((item) => item.id === editedItemId);
  item.nombre = nombre;
  item.apellido = apellido;
  localStorage.setItem("data", JSON.stringify(data));
  readData();
  clearForm();
}

// Delete data
function deleteData(id) {
  const item = data.find((item) => item.id === id);
  if (!item) {
    alert("No se encontró el elemento");
    return;
  }

  data.splice(data.indexOf(item), 1);
  localStorage.setItem("data", JSON.stringify(data));
  readData();
}

// Clear form
function clearForm() {
  formAdd.querySelector("input[name='id']").value = "";
  formAdd.querySelector("input[name='nombre']").value = "";
  formAdd.querySelector("input[name='apellido']").value = "";
  formAdd.querySelector("button[type='submit']").innerHTML = "Agregar";

  editMode = false;
  editedItemId = null;
}

// Global variables
let editMode = false;
let editedItemId = null;

// Event listeners
readData();

formAdd.addEventListener("submit", (event) => {
  event.preventDefault();

  if (editMode) {
    updateData();
  } else {
    addData();
  }
});