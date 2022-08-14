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
  pintarOperaciones(operaciones);
});

//Pintar operaciones sección balance
const operacionesNuevas = document.getElementById("operaciones-nuevas");

const pintarOperaciones = (arr) => {
  let str = "";
  arr.forEach((operacion) => {
      const { id, descripcion , categoria , fecha , monto} = operacion;
    str =
      str +
      `<div class="row d-flex">
        <span class="col-3">${descripcion}</span>
        <span class="col-3">${categoria}</span>
        <span  class="col-2 text-end">${fecha}</span>
        <span class="col-2 text-end">${monto}</span>
        <a class="col-1 text-end" href="#">Editar</a></a>
        <a class="col-1 text-end" href="#">Borrar</a>
      </div>`;
  }); operacionesNuevas.innerHTML = str;
};

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
const operaciones = [];
//Cambio de imagen de no hay operaciones a operaciones
const ningunaOperacion = document.getElementById("ninguna-operacion");
const contenedorOperaciones = document.getElementById("contenedor-operaciones");

const verOperaciones = (operaciones) => {
  if (!operaciones.length) {
    ningunaOperacion.classList.remove("invisible");
    contenedorOperaciones.classList.add("invisible");
  } else {
    ningunaOperacion.classList.add("invisible");
    contenedorOperaciones.classList.remove("invisible");
  }
};
verOperaciones(operaciones);
