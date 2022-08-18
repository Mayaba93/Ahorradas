// botones para ver cada seccion
const botonSeccionBalance = document.getElementById("boton-seccion-balance");
const botonSeccionCategorias = document.getElementById(
  "boton-seccion-categorias"
);
const botonSeccionReportes = document.getElementById("boton-seccion-reportes");
const seccionBalance = document.getElementById("seccion-balance");
const seccionCategorias = document.getElementById("seccion-categorias");
const seccionReportes = document.getElementById("seccion-reportes");

botonSeccionBalance.addEventListener("click", () => {
  seccionBalance.style.display = "block";
  seccionCategorias.style.display = "none";
  seccionReportes.style.display = "none";
  seccionNuevaOperacion.style.display = "none";
  seccionEditarOperacion.style.display = "none";
});
botonSeccionCategorias.addEventListener("click", () => {
  seccionCategorias.style.display = "block";
  seccionBalance.style.display = "none";
  seccionReportes.style.display = "none";
  seccionNuevaOperacion.style.display = "none";
  seccionEditarOperacion.style.display = "none";
});
botonSeccionReportes.addEventListener("click", () => {
  seccionReportes.style.display = "flex";
  seccionCategorias.style.display = "none";
  seccionBalance.style.display = "none";
  seccionNuevaOperacion.style.display = "none";
  seccionEditarOperacion.style.display = "none";
});
// boton para nueva operación
const botonNuevaOperacion = document.getElementById("boton-nueva-operacion");
const seccionNuevaOperacion = document.getElementById(
  "seccion-nueva-operacion"
);

botonNuevaOperacion.addEventListener("click", () => {
  seccionNuevaOperacion.style.display = "block";
  seccionReportes.style.display = "none";
  seccionCategorias.style.display = "none";
  seccionBalance.style.display = "none";
  seccionEditarOperacion.style.display = "none";
});
// botón para editar operacion
const seccionEditarOperacion = document.getElementById(
  "seccion-editar-operacion"
);

// botón para cancelar
const botonCancelarOperacion = document.getElementById(
  "boton-cancelar-operacion"
);

botonCancelarOperacion.addEventListener("click", (e) => {
  e.preventDefault();
  seccionBalance.style.display = "flex";
  seccionCategorias.style.display = "none";
  seccionReportes.style.display = "none";
  seccionNuevaOperacion.style.display = "none";
  seccionEditarOperacion.style.display = "none";
});
//Creando selects de categorias
const categorias = [
  "Comida",
  "Servicios",
  "Salidas",
  "Educación",
  "Transporte",
  "Trabajo",
];
const generarCategorias = () => {
  const selectCategorias = document.getElementsByClassName("select-categorias");
  for (let i = 0; i < selectCategorias.length; i++) {
    const select = selectCategorias[i];
    if (select.classList.contains("filtro-categorias")) {
      select.innerHTML = "<option>Todas</option>";
    }
    categorias.forEach((categoria) => {
      select.innerHTML += `<option value="${categoria}">${categoria}</option>`;
    });
  }
};
generarCategorias();

// Array con operaciones

let operaciones = JSON.parse(localStorage.getItem('operaciones')) || [];

// Creación nueva operación

const inputNuevaOperacionDescripcion = document.getElementById(
  "input-nueva-operacion-descripcion"
);
const inputNuevaOperacionMonto = document.getElementById(
  "input-nueva-operacion-monto"
);
const selectNuevaOperacionTipo = document.getElementById(
  "select-nueva-operacion-tipo"
);
const selectNuevaOperacionCategoria = document.getElementById(
  "select-nueva-operacion-categoria"
);
const inputNuevaOperacionFecha = document.getElementById(
  "input-nueva-operacion-fecha"
);
const botonAgregarOperacion = document.getElementById(
  "boton-agregar-operacion"
);

botonAgregarOperacion.addEventListener("click", (e) => {
  e.preventDefault();
  const operacion = {
    id: uuidv4(),
    descripcion: inputNuevaOperacionDescripcion.value,
    monto: inputNuevaOperacionMonto.value,
    tipo: selectNuevaOperacionTipo.value,
    categoria: selectNuevaOperacionCategoria.value,
    fecha: inputNuevaOperacionFecha.value,
  };
  operaciones.push(operacion);
  seccionNuevaOperacion.style.display = "none";
  seccionBalance.style.display = "block";
  inputNuevaOperacionDescripcion.value = "";
  inputNuevaOperacionMonto.value = 0;
  selectNuevaOperacionTipo.value = "gasto";
  selectNuevaOperacionCategoria.value = "Comida";
  verOperaciones(operaciones);
  localStorage.setItem('operaciones', JSON.stringify(operaciones))
  pintarOperaciones(operaciones);
});

//Pintar operaciones sección balance, borrar y eliminar operacion
const operacionesNuevas = document.getElementById("operaciones-nuevas");

const pintarOperaciones = (arr) => {
  let str = "";
  arr.forEach((operacion) => {
    const { id, descripcion, categoria, fecha, monto, tipo } = operacion;
    str =
      str +
      `<div class="row d-flex my-3 py-2 rounded operacion">

        <span class="col-3 fw-bold">${descripcion}</span>
        <div class="col-3"> 
        <span class="span-categoria">${categoria}</span>
        </div>
        <span  class="col-2 text-end span-fecha">${fecha}</span>
        <span class="col-2 text-end fw-bold ${tipo === 'ganancia' ? 'ganancia' : 'gasto'}">${monto}</span>
        <a class="col-1 text-end text-decoration-none boton-editar-operacion" data-id=${id} href="#">Editar</a></a>
        <a class="col-1 text-end text-decoration-none boton-eliminar-operacion" data-id=${id} href="#">Borrar</a>
      </div>`;
  }); operacionesNuevas.innerHTML = str;
  const botonesEliminarOperacion = document.querySelectorAll('.boton-eliminar-operacion')
  botonesEliminarOperacion.forEach(btn => {
    btn.addEventListener('click', e => {
      const arregloBorrarOperacion = operaciones.filter(operacion => operacion.id !== e.target.dataset.id)
      localStorage.setItem('operaciones', JSON.stringify(arregloBorrarOperacion))
      operaciones = JSON.parse(localStorage.getItem('operaciones'))
      pintarOperaciones(operaciones)
      verOperaciones(operaciones)
    })
  })
};

//Cambio de imagen de no hay operaciones a operaciones
const ningunaOperacion = document.getElementById("ninguna-operacion");
const contenedorOperaciones = document.getElementById("contenedor-operaciones");

const verOperaciones = (operaciones) => {
  if (!operaciones.length) {
    ningunaOperacion.style.display = 'flex';
    contenedorOperaciones.style.display = 'none';
  }
  else {
    ningunaOperacion.style.display = 'none';
    contenedorOperaciones.style.display = 'block';
  }
}
verOperaciones(operaciones);

pintarOperaciones(operaciones);