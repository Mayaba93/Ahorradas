// botones para ver cada seccion
const botonSeccionBalance = document.getElementById("boton-seccion-balance");
const botonSeccionCategorias = document.getElementById(
  "boton-seccion-categorias"
);
const botonSeccionReportes = document.getElementById("boton-seccion-reportes");
const seccionBalance = document.getElementById("seccion-balance");
const seccionCategorias = document.getElementById("seccion-categorias");
const seccionReportes = document.getElementById("seccion-reportes");
const seccionEditarCategoria = document.getElementById(
  "seccion-editar-categoria"
);
const contenedorOperacionesInsuficientes = document.getElementById(
  "contenedor-operaciones-insuficientes"
);
const contenedorReportes = document.getElementById("contenedor-reportes");

botonSeccionBalance.addEventListener("click", () => {
  seccionBalance.classList.remove("d-none");
  seccionCategorias.classList.add("d-none");
  seccionReportes.classList.add("d-none");
});
botonSeccionCategorias.addEventListener("click", () => {
  seccionBalance.classList.add("d-none");
  seccionCategorias.classList.remove("d-none");
  seccionReportes.classList.add("d-none");
});
botonSeccionReportes.addEventListener("click", () => {
  seccionBalance.classList.add("d-none");
  seccionCategorias.classList.add("d-none");
  seccionReportes.classList.remove("d-none");
  if (!operaciones.length) {
    contenedorReportes.classList.add("d-none")
    contenedorOperacionesInsuficientes.classList.remove('d-none')
  } else {
    contenedorReportes.classList.remove("d-none")
    contenedorOperacionesInsuficientes.classList.add('d-none')
  }
  reportesMes(operaciones);
  reportesCategoria(operaciones);
});
// boton para nueva operación
const botonNuevaOperacion = document.getElementById("boton-nueva-operacion");
const seccionNuevaOperacion = document.getElementById(
  "seccion-nueva-operacion"
);

botonNuevaOperacion.addEventListener("click", () => {
  seccionNuevaOperacion.classList.remove("d-none");
  seccionBalance.classList.add("d-none");
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
  seccionBalance.classList.remove("d-none");
  seccionNuevaOperacion.classList.add("d-none");
});
//Pintar,editar y eliminar categorias.
let categorias = JSON.parse(localStorage.getItem("categorias")) || [
  { nombre: "Comida", id: uuidv4() },
  { nombre: "Servicios", id: uuidv4() },
  { nombre: "Salidas", id: uuidv4() },
  { nombre: "Educación", id: uuidv4() },
  { nombre: "Transporte", id: uuidv4() },
  { nombre: "Trabajo", id: uuidv4() },
];
const botonEditarCategoria = document.getElementById("boton-editar-categoria");
const inputNombreEditarCategoria = document.getElementById(
  "input-nombre-editar-categoria"
);
const selectCategorias = document.getElementsByClassName("select-categorias");
const botonCancelarEditarCategoria = document.getElementById(
  "boton-cancelar-editar-categoria"
);
const generarCategorias = () => {
  for (let i = 0; i < selectCategorias.length; i++) {
    const select = selectCategorias[i];
    select.innerHTML = "";
    if (select.classList.contains("filtro-categorias")) {
      select.innerHTML = "<option value='todas'>Todas</option>";
    }
    let str = "";
    categorias.forEach((categoria) => {
      const { nombre, id } = categoria;
      select.innerHTML += `<option value="${nombre}">${nombre}</option>`;
      str =
        str +
        `<div class="contenedor-span-editar-eliminar d-flex justify-content-between my-3 text-center align-items-center">
    <span class="span-nombre-categoria text-white p-1 rounded-2 fw-semibold">${nombre}</span>
    <div class="me-3">
      <a href="#" data-id=${id} class="link-editar-eliminar-categoria link-editar-categoria text-decoration-none ms-2 text-white">Editar</a
      ><a href="#" data-id=${id} class="link-editar-eliminar-categoria link-eliminar-categoria text-decoration-none ms-2 text-white"
        >Eliminar</a>
    </div>
  </div>`;
    });
    contenedorCategorias.innerHTML = str;
  }
  if (!Array.isArray(categorias)) {
    alertify.error("El tipo de dato es incorrecto");
  } else {
    localStorage.setItem("categorias", JSON.stringify(categorias));
  }
  const linkEliminarCategoria = document.querySelectorAll(
    ".link-eliminar-categoria"
  );
  const linkEditarCategoria = document.querySelectorAll(
    ".link-editar-categoria"
  );
  const eliminarCategoria = (arr, e, operaciones) => {
    const buscarCategoria = arr.find(categoria => categoria.id === e.target.dataset.id).nombre;
    const borrarCategoria = arr.filter(categoria => categoria.id !== e.target.dataset.id);
    const borrarOperacion = operaciones.filter(operaciones => operaciones.categoria !== buscarCategoria);
    localStorage.setItem('categorias', JSON.stringify(borrarCategoria));
    categorias = JSON.parse(localStorage.getItem('categorias'))
    generarCategorias()
    localStorage.setItem('operaciones', JSON.stringify(borrarOperacion));
    operaciones = JSON.parse(localStorage.getItem('operaciones'));
    pintarOperaciones(operaciones)
    verOperaciones(operaciones)
    actualizarBalance(operaciones)
  };

  linkEliminarCategoria.forEach(btn => {
    btn.addEventListener('click', e =>{
      e.preventDefault();
      eliminarCategoria(categorias, e, operaciones)
    });
  });

  linkEditarCategoria.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault()
      categoriaParaEditar = categorias.filter(
        (categoria) => categoria.id === e.target.dataset.id
      );
      editarCategoria(categoriaParaEditar);
    });
  });

  botonEditarCategoria.addEventListener("click", () => {
    seccionCategorias.classList.remove('d-none')
    seccionEditarCategoria.classList.add('d-none')
    const filtrar = categorias.filter(categoria => categoria.id === categoriaParaEditar[0].id)
    const filtrado = filtrar[0]
    if (inputNombreEditarCategoria.value.trim().length == 0) {
      return alertify.error("El nombre no puede estar vacío");
    }
    filtrado.nombre = inputNombreEditarCategoria.value;
    filtrado.id = categoriaParaEditar[0].id;

    const nuevas = categorias.map(categoria => categoria.id === categoriaParaEditar[0].id ? filtrado : categoria)
    if (!Array.isArray(categorias)) {
      alertify.error("El tipo de dato es incorrecto"); //modificar nombre de la constante
    } else {
      localStorage.setItem("categorias", JSON.stringify(nuevas));   
    }
    // const categoriasEditadas = JSON.parse(localStorage.getItem('categorias'))
    generarCategorias();
    alertify.success("Categoria editada exitosamente");
  });

  botonCancelarEditarCategoria.addEventListener("click", () => {
    seccionEditarCategoria.classList.add('d-none');
    seccionCategorias.classList.remove('d-none');
  });
};
const editarCategoria = (arr) => {
  seccionEditarCategoria.classList.remove('d-none');
  seccionCategorias.classList.add('d-none');
  inputNombreEditarCategoria.value = arr[0].nombre;
};

// Agregar categorias
const inputNombreNuevaCategoria = document.getElementById(
  "input-nombre-nueva-categoria"
);
const botonAgregarNuevaCategoria = document.getElementById(
  "boton-agregar-nueva-categoria"
);
const contenedorCategorias = document.getElementById("contenedor-categorias");
botonAgregarNuevaCategoria.addEventListener("click", () => {
  if (inputNombreNuevaCategoria.value.trim().length === 0) {
    return alertify.error("La descripción no puede estar vacía");
  }

  const categoria = {
    nombre: inputNombreNuevaCategoria.value,
    id: uuidv4(),
  };
  categorias.push(categoria);
  inputNombreNuevaCategoria.value = "";
  alertify.success("Categoría agregada exitosamente");
  generarCategorias();
});

// Array con operaciones

let operaciones = JSON.parse(localStorage.getItem("operaciones")) || [];

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
  if (
    inputNuevaOperacionDescripcion.value.trim().length === 0 ||
    inputNuevaOperacionMonto.value <= 0
  ) {
    return alertify.error(
      "El monto no puede ser igual o menor a 0 y la descripción no puede estar vacía"
    );
  }
  const operacion = {
    id: uuidv4(),
    descripcion: inputNuevaOperacionDescripcion.value,
    monto: inputNuevaOperacionMonto.value,
    tipo: selectNuevaOperacionTipo.value,
    categoria: selectNuevaOperacionCategoria.value,
    fecha: inputNuevaOperacionFecha.value,
  };
  operaciones.push(operacion);
  seccionNuevaOperacion.classList.add("d-none");
  seccionBalance.classList.remove('d-none');
  inputNuevaOperacionDescripcion.value = "";
  inputNuevaOperacionMonto.value = 0;
  selectNuevaOperacionTipo.value = "gasto";
  selectNuevaOperacionCategoria.value = categorias[0].nombre;
  inputNuevaOperacionFecha.valueAsDate = new Date();
  alertify.success("Operación agregada exitosamente");
  verOperaciones(operaciones);
  if (!Array.isArray(operaciones)) {
    alertify.error("El tipo de dato es incorrecto");
  } else {
    localStorage.setItem("operaciones", JSON.stringify(operaciones));
  }
  pintarOperaciones(operaciones);
  actualizarBalance(operaciones);
});

//Pintar operaciones sección balance, editar y eliminar operacion
const inputEditarOperacionDescripcion = document.getElementById(
  "input-editar-operacion-descripcion"
);
const inputEditarOperacionMonto = document.getElementById(
  "input-editar-operacion-monto"
);
const selectEditarOperacionTipo = document.getElementById(
  "select-editar-operacion-tipo"
);
const selectEditarOperacionCategoria = document.getElementById(
  "select-editar-operacion-categoria"
);
const inputEditarOperacionFecha = document.getElementById(
  "input-editar-operacion-fecha"
);
const botonCancelarEditarOperacion = document.getElementById(
  "boton-cancelar-editar-operacion"
);
const botonEditarOperacion = document.getElementById("boton-editar-operacion");
const operacionesNuevas = document.getElementById("operaciones-nuevas");

const pintarOperaciones = (arr) => {
  let str = "";
  arr.forEach((operacion) => {
    const { id, descripcion, categoria, fecha, monto, tipo } = operacion;
    str =
      str +
      `<div class="row d-flex my-3 py-2 rounded operacion">
        <div class="col-md-3 col-sm-6 col-6 fw-bold">
          <span>${descripcion}</span>
        </div>
        <div class="col-md-3 col-sm-6 col-6 text-end"> 
          <span class="span-categoria rounded-2 p-1 text-white fw-semibold">${categoria}</span>
        </div>

        
        <span class="col-md-2 col-sm-6 col-6 span-fecha text-end d-none d-lg-block">${fecha}</span>
        <div class="col-md-2 col-sm-6 col-6 text-end operacion-monto">
          <span class="fw-bold ${tipo === "ganancia" ? "ganancia-operacion" : "gasto-operacion"
      }">${monto}</span>
        </div>
        <div class="col-md-2 col-sm-6 col-6 text-wrap text-end">
          <a class="text-decoration-none boton-editar-operacion" data-id=${id} href="#">Editar</a></a>
          <a class="text-decoration-none boton-eliminar-operacion" data-id=${id} href="#">Borrar</a>
        </div>
      </div>`;
  });
  operacionesNuevas.innerHTML = str;
  const botonesEliminarOperacion = document.querySelectorAll(
    ".boton-eliminar-operacion"
  );
  const botonesEditarOperacion = document.querySelectorAll(
    ".boton-editar-operacion"
  );
  botonesEliminarOperacion.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const arregloBorrarOperacion = operaciones.filter(
        (operacion) => operacion.id !== e.target.dataset.id
      );
      if (!Array.isArray(arregloBorrarOperacion)) {
        alertify.error("El tipo de dato es incorrecto");
      } else {
        localStorage.setItem(
          "operaciones",
          JSON.stringify(arregloBorrarOperacion)
        );
      }
      operaciones = JSON.parse(localStorage.getItem("operaciones"));
      pintarOperaciones(operaciones);
      verOperaciones(operaciones);
      actualizarBalance(operaciones);
    });
  });
  botonesEditarOperacion.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      operacionParaEditar = operaciones.filter(
        (operacion) => operacion.id === e.target.dataset.id
      );
      editarOperacion(operacionParaEditar);
    });
  });

  botonEditarOperacion.addEventListener("click", () => {
    seccionBalance.classList.remove("d-none")
    seccionEditarOperacion.classList.add("none");
    const filtrar = operaciones.filter(
      (operacion) => operacion.id === operacionParaEditar[0].id
    );
    const filtrado = filtrar[0];
    if (
      inputEditarOperacionDescripcion.value.trim().length === 0 ||
      inputEditarOperacionMonto.value <= 0
    ) {
      return alertify.error(
        "El monto no puede ser igual o menor a 0 y la descripción no puede estar vacía"
      );
    }
    filtrado.monto = inputEditarOperacionMonto.value;
    filtrado.descripcion = inputEditarOperacionDescripcion.value;
    filtrado.tipo = selectEditarOperacionTipo.value;
    filtrado.categoria = selectEditarOperacionCategoria.value;
    filtrado.fecha = inputEditarOperacionFecha.value;
    filtrado.id = operacionParaEditar[0].id;

    const nuevas = operaciones.map((operacion) =>
      operacion.id === operacionParaEditar[0].id ? filtrado : operacion
    );
    verOperaciones(operaciones);
    if (!Array.isArray(operaciones)) {
      alertify.error("El tipo de dato es incorrecto");
    } else {
      localStorage.setItem("operaciones", JSON.stringify(nuevas));
    }
    const operacionesEditadas = JSON.parse(localStorage.getItem("operaciones"));
    pintarOperaciones(operacionesEditadas);
    actualizarBalance(operaciones);
    alertify.success("Operación editada exitosamente");
  });
  botonCancelarEditarOperacion.addEventListener("click", () => {
    seccionBalance.classList.remove("d-none");
    seccionEditarOperacion.classList.add("d-none");
  });
};
const editarOperacion = (arr) => {
  if (arr.length === 0) return;
  const { descripcion, monto, tipo, categoria, fecha } = arr[0];
  seccionBalance.classList.add("d-none");
  seccionEditarOperacion.classList.remove("d-none");
  inputEditarOperacionDescripcion.value = descripcion;
  inputEditarOperacionMonto.value = monto;
  selectEditarOperacionCategoria.value = categoria;
  selectEditarOperacionTipo.value = tipo;
  inputEditarOperacionFecha.valueAsDate = new Date(fecha);
};
//Cambio de imagen de no hay operaciones a operaciones
const ningunaOperacion = document.getElementById("ninguna-operacion");
const contenedorOperaciones = document.getElementById("contenedor-operaciones");

const verOperaciones = (operaciones) => {
  if (!operaciones.length) {
    ningunaOperacion.classList.remove('d-none');
    contenedorOperaciones.classList.add('d-none');
  } else {
    ningunaOperacion.classList.add('d-none');
    contenedorOperaciones.classList.remove('d-none');
  }
};

// Sección balance, card balance
const balanceGananciasTotales = document.getElementById(
  "balance-ganancias-totales"
);
const balanceGastosTotales = document.getElementById("balance-gastos-totales");
const balanceTotal = document.getElementById("balance-total");

const actualizarBalance = (arr) => {
  const gananciasTotales = (arr) =>
    arr
      .filter((operacion) => operacion.tipo === "ganancia")
      .reduce((prev, current) => Number(prev) + Number(current.monto), 0);
  const gastosTotales = (arr) =>
    arr
      .filter((operacion) => operacion.tipo === "gasto")
      .reduce((prev, current) => Number(prev) + Number(current.monto), 0);
  balanceGananciasTotales.innerHTML = `+$${gananciasTotales(arr)}`;
  balanceGastosTotales.innerHTML = `-$${gastosTotales(arr)}`;
  balanceTotal.innerHTML = `$${gananciasTotales(arr) - gastosTotales(arr)}`;
};

//Seccion balance, filtros
const selectFiltroTipo = document.getElementById("select-filtro-tipo");
const selectFiltroCategoria = document.getElementById(
  "select-filtro-categoria"
);
const selectFiltroOrdenar = document.getElementById("select-filtro-ordenar");
const inputFiltroFecha = document.getElementById("input-filtro-fecha");

const filtros = (e) => {
  const filtroTipo = selectFiltroTipo.value;
  const filtroCategoria = selectFiltroCategoria.value;
  const filtroOrdenar = selectFiltroOrdenar.value;

  let operaciones = JSON.parse(localStorage.getItem("operaciones")) || [];

  operaciones = operaciones.filter(
    (operacion) => operacion.fecha >= inputFiltroFecha.value
  );
  if (filtroTipo !== "todos") {
    operaciones = operaciones.filter(
      (operacion) => operacion.tipo === filtroTipo
    );
  }
  if (filtroCategoria !== "todas") {
    operaciones = operaciones.filter(
      (operacion) => operacion.categoria === filtroCategoria
    );
  }
  if (filtroOrdenar === "mas-reciente") {
    operaciones = operaciones.sort(
      (a, b) => new Date(b.fecha) - new Date(a.fecha)
    );
  }
  if (filtroOrdenar === "menos-reciente") {
    operaciones = operaciones.sort(
      (a, b) => new Date(a.fecha) - new Date(b.fecha)
    );
  }
  if (filtroOrdenar === "mayor-monto") {
    operaciones = operaciones.sort((a, b) => Number(b.monto) - Number(a.monto));
  }
  if (filtroOrdenar === "menor-monto") {
    operaciones = operaciones.sort((a, b) => Number(a.monto) - Number(b.monto));
  }
  if (filtroOrdenar === "a/z") {
    operaciones = operaciones.sort((a, b) => {
      if (a.descripcion.toLowerCase() < b.descripcion.toLowerCase()) {
        return -1;
      }
    });
  }
  if (filtroOrdenar === "z/a") {
    operaciones = operaciones.sort((a, b) => {
      if (a.descripcion.toLowerCase() > b.descripcion.toLowerCase()) {
        return -1;
      }
    });
  }
  pintarOperaciones(operaciones);
  verOperaciones(operaciones);
  actualizarBalance(operaciones);
};

selectFiltroTipo.addEventListener("change", filtros);
selectFiltroCategoria.addEventListener("change", filtros);
selectFiltroOrdenar.addEventListener("change", filtros);

inputFiltroFecha.addEventListener("change", filtros);

// ----------------------------------------sección reportes-------------------------------------------------//
const contenedorTotalesPorMes = document.getElementById(
  "contenedor-totales-por-mes"
);
const contenedorTotalesPorCategoria = document.getElementById(
  "contenedor-totales-por-categoria"
);
const mayorGananciaNombre = document.getElementById("mayor-ganancia-nombre");
const mayorGananciaValor = document.getElementById("mayor-ganancia-valor");
const mayorGastoNombre = document.getElementById("mayor-gasto-nombre");
const mayorGastoValor = document.getElementById("mayor-gasto-valor");
const mayorBalanceNombre = document.getElementById("mayor-balance-nombre");
const mayorBalanceValor = document.getElementById("mayor-balance-valor");
const mayorGananciaMesNombre = document.getElementById(
  "mayor-ganancia-mes-nombre"
);
const mayorGananciaMesValor = document.getElementById(
  "mayor-ganancia-mes-valor"
);
const mayorGastoMesNombre = document.getElementById("mayor-gasto-mes-nombre");
const mayorGastoMesValor = document.getElementById("mayor-gasto-mes-valor");

const reportesMes = (arr) => {
  const mesBalance = [];
  const mesesSinRepetir = [
    ...new Set(arr.map((operacion) => operacion.fecha.split("-")[1])),
  ].sort();
  for (let i = 0; i < mesesSinRepetir.length; i++) {
    const operacionesDelMes = arr.filter(
      (operacion) => operacion.fecha.split("-")[1] === mesesSinRepetir[i]
    );
    const gananciaDelMes = operacionesDelMes
      .filter((operacion) => operacion.tipo === "ganancia")
      .reduce((count, current) => count + Number(current.monto), 0);
    const gastosDelMes = operacionesDelMes
      .filter((operacion) => operacion.tipo === "gasto")
      .reduce((count, current) => count + Number(current.monto), 0);
    const balanceDelMes = Number(gananciaDelMes) - Number(gastosDelMes);
    obj = {
      mes: mesesSinRepetir[i],
      gasto: gastosDelMes,
      ganancia: gananciaDelMes,
      balance: balanceDelMes,
    };
    mesBalance.push(obj);
  }
  pintarMesMayorGasto(mesBalance);
  pintarMesMayorGanancia(mesBalance);
  pintarMesReportes(mesBalance);
};

const pintarMesReportes = (arr) => {
  let str = "";
  contenedorTotalesPorMes.innerHTML = "";

  arr.forEach((categoria) => {
    const { mes, gasto, ganancia, balance } = categoria;
    str =
      str +
      ` <div class="row my-3 fw-semibold">

    <div class="col-md-3 col-3 text-start">${mes} </div>
    <div class="col-md-3 col-3 text-end"><span class="ganancia rounded-2 p-1">${ganancia}</span></div>
    <div class="col-md-3 col-3 text-end"><span class="gasto rounded-2 p-1">${gasto}</span></div>
    <div class="col-md-3 col-3 text-end"><span class="span-categoria rounded-2 p-1 text-white fw-semibold">$${balance}</span></div>

  </div>`;
  });
  contenedorTotalesPorMes.innerHTML = str;
};

const reportesCategoria = (operaciones) => {
  const categoriasBalance = [];
  const categorias = [
    ...new Set(operaciones.map((operacion) => operacion.categoria)),
  ];
  categorias.forEach((categoria) => {
    const cadaCategoria = operaciones.filter(
      (operacion) => operacion.categoria === categoria
    );
    const cadaCategoriaGanancia = cadaCategoria
      .filter((operacion) => operacion.tipo === "ganancia")
      .reduce((count, current) => count + Number(current.monto), 0);
    const cadaCategoriaGasto = cadaCategoria
      .filter((operacion) => operacion.tipo === "gasto")
      .reduce((count, current) => count + Number(current.monto), 0);
    const cadaCategoriaBalance =
      Number(cadaCategoriaGanancia) - Number(cadaCategoriaGasto);
    obj = {
      nombre: categoria,
      ganancia: cadaCategoriaGanancia,
      gasto: cadaCategoriaGasto,
      balance: cadaCategoriaBalance,
    };
    categoriasBalance.push(obj);
  });
  pintarMayorGanancia(categoriasBalance);
  pintarMayorGasto(categoriasBalance);
  pintarMayorBalance(categoriasBalance);
  pintarCategoriasReportes(categoriasBalance);
};

const pintarCategoriasReportes = (arr) => {
  let str = "";
  contenedorTotalesPorCategoria.innerHTML = "";

  arr.forEach((categoria) => {
    const { nombre, gasto, ganancia, balance } = categoria;
    str =
      str +
      ` <div class="row my-3 fw-semibold">

    <div class="col-md-3 col-3 text-start">${nombre} </div>
    <div class="col-md-3 col-3 text-end"><span class="ganancia rounded-2 p-1">${ganancia}</span></div>
    <div class="col-md-3 col-3 text-end"><span class="gasto rounded-2 p-1">${gasto}</span></div>
    <div class="col-md-3 col-3 text-end"><span class="span-categoria rounded-2 p-1 text-white fw-semibold">$${balance}</span></div>

  
  </div>`;
  });
  contenedorTotalesPorCategoria.innerHTML = str;
};

const mayorGanancia = (arr) => {
  return arr.sort((a, b) => Number(b.ganancia) - Number(a.ganancia));
};

const pintarMayorGanancia = (arr) => {
  mayorGananciaNombre.innerHTML = `<span class="span-categoria rounded-2 p-1 text-white fw-semibold">${mayorGanancia(arr)[0].nombre
    }</span>`;
  mayorGananciaValor.innerHTML = `<span class="ganancia rounded-2 p-1">${mayorGanancia(arr)[0].ganancia
    }</span>`;
};

const mayorGasto = (arr) => {
  return arr.sort((a, b) => Number(b.gasto) - Number(a.gasto));
};
const pintarMayorGasto = (arr) => {
  mayorGastoNombre.innerHTML = `<span class="span-categoria rounded-2 p-1 text-white fw-semibold">${mayorGasto(arr)[0].nombre
    }</span>`;
  mayorGastoValor.innerHTML = `<span class="gasto rounded-2 p-1">${mayorGasto(arr)[0].gasto
    }</span>`;
};

const mayorBalance = (arr) => {
  return arr.sort((a, b) => Number(b.balance) - Number(a.balance));
};
const pintarMayorBalance = (arr) => {
  mayorBalanceNombre.innerHTML = `<span class="span-categoria rounded-2 p-1 text-white fw-semibold">${mayorBalance(arr)[0].nombre
    }</span>`;
  mayorBalanceValor.innerHTML = `<span class="span-categoria rounded-2 p-1 text-white fw-semibold">$${mayorBalance(arr)[0].balance
    }</span>`;
};

const pintarMesMayorGanancia = (arr) => {
  mayorGananciaMesNombre.innerHTML = `<span class="span-categoria rounded-2 p-1 text-white fw-semibold">${mayorGanancia(arr)[0].mes
    }</span>`;
  mayorGananciaMesValor.innerHTML = `<span class="ganancia rounded-2 p-1 text-white fw-semibold">${mayorGanancia(arr)[0].ganancia
    }</span>`;
};

const pintarMesMayorGasto = (arr) => {
  mayorGastoMesNombre.innerHTML = `<span class="span-categoria rounded-2 p-1 text-white fw-semibold">${mayorGasto(arr)[0].mes
    }</span>`;
  mayorGastoMesValor.innerHTML = `<span class="gasto rounded-2 p-1">${mayorGasto(arr)[0].gasto
    }</span>`;
};
// -----------------------------------------ocultar filtros----------------------------------------------------------//

const spanOcultarFiltros = document.getElementById("span-ocultar-filtros");

const contenedorFiltros = document.getElementById("contenedor-filtros");

spanOcultarFiltros.addEventListener("click", () => {
  contenedorFiltros.classList.toggle("d-none");
});

const inicializar = () => {
  const inputFiltroFecha = document.querySelectorAll('input[type = "date"]');
  inputFiltroFecha.forEach((input) => {
    input.valueAsDate = new Date();
  }); //buscar como poner la fecha en Argentina
  actualizarBalance(operaciones);
  generarCategorias();
  verOperaciones(operaciones);
  pintarOperaciones(operaciones);
  reportesCategoria(operaciones);
  reportesMes(operaciones);
};
window.onload = inicializar;