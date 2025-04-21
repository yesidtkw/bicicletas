const bicicletas = [];
const form = document.getElementById('formBicicleta');
const container = document.getElementById('bicicletasContainer');

let biciEditando = null;

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const nuevaBici = {
    nombre: document.getElementById('nombre').value,
    modelo: document.getElementById('modelo').value,
    precio: parseFloat(document.getElementById('precio').value),
    imagen: document.getElementById('imagen').value
  };

  if (biciEditando) {
    nuevaBici.id = biciEditando.id;

    fetch('api.php', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevaBici)
    })
    .then(res => res.json())
    .then(data => {
      alert('✅ ' + data.mensaje);
      const index = bicicletas.findIndex(b => b.id === nuevaBici.id);
      bicicletas[index] = nuevaBici;
      mostrarBicicletas();
      form.reset();
      biciEditando = null;
    });

  } else {
    fetch('api.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevaBici)
    })
    .then(res => res.json())
    .then(data => {
      nuevaBici.id = data.id; // 💡 recibir el id generado por el servidor
      bicicletas.push(nuevaBici);
      alert('✅ Bicicleta guardada');
      mostrarBicicletas();
      form.reset();
    });
  }
});

function mostrarBicicletas() {
  container.innerHTML = '';

  if (bicicletas.length === 0) {
    container.innerHTML = '<p>No hay bicicletas guardadas aún.</p>';
    return;
  }

  bicicletas.forEach((bici) => {
    const div = document.createElement('div');
    div.className = 'bicicleta-card';
    div.innerHTML = `
      <img src="${bici.imagen}" alt="${bici.nombre}">
      <div>
        <h3>${bici.nombre}</h3>
        <p><strong>Modelo:</strong> ${bici.modelo}</p>
        <p><strong>Precio:</strong> $${bici.precio}</p>
        <button onclick="editarBicicleta('${bici.id}')">✏️ Editar</button>
        <button onclick="eliminarBicicleta('${bici.id}')">🗑️ Eliminar</button>
      </div>
    `;
    container.appendChild(div);
  });
}

function editarBicicleta(id) {
  const bici = bicicletas.find(b => b.id === id);
  if (!bici) return;

  document.getElementById('nombre').value = bici.nombre;
  document.getElementById('modelo').value = bici.modelo;
  document.getElementById('precio').value = bici.precio;
  document.getElementById('imagen').value = bici.imagen;

  biciEditando = bici;
}

function eliminarBicicleta(id) {
  if (!confirm('¿Estás seguro de que deseas eliminar esta bicicleta?')) return;

  fetch('api.php', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  })
  .then(res => res.json())
  .then(data => {
    alert('🗑️ ' + data.mensaje);
    const index = bicicletas.findIndex(b => b.id === id);
    if (index > -1) bicicletas.splice(index, 1);
    mostrarBicicletas();
  });
}

// 🚀 Cargar bicicletas al inicio
fetch('api.php')
  .then(res => res.json())
  .then(data => {
    bicicletas.push(...data);
    mostrarBicicletas();
  });
