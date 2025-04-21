let bicicletasGuardadas = [];

function mostrarBicicletas(lista) {
  const contenedor = document.getElementById('lista-bicicletas');
  contenedor.innerHTML = ''; // Limpiar contenido anterior

  lista.forEach(bici => {
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('bicicleta');
    tarjeta.innerHTML = `
      <img src="${bici.imagen}" alt="Imagen de ${bici.nombre}">
      <h3>${bici.nombre}</h3>
      <p><strong>Modelo:</strong> ${bici.modelo}</p>
      
      <p><strong>Precio:</strong> $${bici.precio}</p>
    `;
    contenedor.appendChild(tarjeta);
  });
}

// Cargar bicicletas al inicio
fetch('data.json')
  .then(response => response.json())
  .then(bicicletas => {
    bicicletasGuardadas = bicicletas;
    mostrarBicicletas(bicicletas);
  })
  .catch(error => {
    console.error('Error al cargar las bicicletas:', error);
  });

// Funciones de filtro
function filtrarModelo(modelo) {
  if (modelo === 'todas') {
    mostrarBicicletas(bicicletasGuardadas);
  } else {
    const filtradas = bicicletasGuardadas.filter(bici => bici.modelo === modelo);
    mostrarBicicletas(filtradas);
  }
}

function filtrarPrecio(tipo) {
  let filtradas = [];
  if (tipo === 'menor') {
    filtradas = bicicletasGuardadas.filter(bici => bici.precio < 1000);
  } else {
    filtradas = bicicletasGuardadas.filter(bici => bici.precio >= 1000);
  }
  mostrarBicicletas(filtradas);
}

function mostrarTodas() {
  mostrarBicicletas(bicicletasGuardadas);
}
function toggleMenu() {
  const menu = document.querySelector('.nav-links');
  menu.classList.toggle('active');
}
