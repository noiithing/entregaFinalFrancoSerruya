const vehiculosEnVenta = JSON.parse(localStorage.getItem('vehiculos')) || [];

function guardarVehiculosEnLocalStorage() {
    localStorage.setItem('vehiculos', JSON.stringify(vehiculosEnVenta));
}

function agregarVehiculo() {
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const color = document.getElementById('color').value;
    const precio = parseFloat(document.getElementById('precio').value);
    const anio = parseInt(document.getElementById('anio').value);

    const vehiculo = { marca, modelo, color, precio, anio };
    vehiculosEnVenta.push(vehiculo);

    guardarVehiculosEnLocalStorage();
    actualizarListaVehiculosEnDOM();


    Swal.fire({
        title: 'Vehículo agregado con éxito',
        icon: 'success'
    });
    
    document.getElementById('vehiculo-form').reset();
}


function actualizarListaVehiculosEnDOM() {
    const vehiculosList = document.getElementById('vehiculos-list');
    vehiculosList.innerHTML = '';

    vehiculosEnVenta.forEach((vehiculo, i) => {
        const vehiculoItem = document.createElement('div');
        vehiculoItem.innerHTML = `
            <p>[${i + 1}] Marca: ${vehiculo.marca}, Modelo: ${vehiculo.modelo}, Color: ${vehiculo.color}, Precio: $${vehiculo.precio}, Año: ${vehiculo.anio}</p>
            <button onclick="eliminarVehiculo(${i})">Eliminar</button>
        `;
        vehiculosList.appendChild(vehiculoItem);
    });
}
function eliminarVehiculo(index) {
    vehiculosEnVenta.splice(index, 1);
    guardarVehiculosEnLocalStorage();
    actualizarListaVehiculosEnDOM();
}



// Cargar datos desde un archivo JSON
function cargarDatosDesdeJSON() {
    fetch('../js/vehiculos.json')  // Reemplaza con la ruta correcta de tu archivo JSON
        .then(response => response.json())
        .then(data => {
            vehiculosEnVenta.push(...data);
            guardarVehiculosEnLocalStorage();
            actualizarListaVehiculosEnDOM();
        })
        .catch(error => {
            Swal.fire({
                title: 'Error al cargar datos',
                text: error.message,
                icon: 'error'
            });
        });
}

actualizarListaVehiculosEnDOM();


cargarDatosDesdeJSON();