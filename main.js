// botones para ver cada seccion
const botonSeccionBalance = document.getElementById('boton-seccion-balance');
const botonSeccionCategorias = document.getElementById('boton-seccion-categorias');
const botonSeccionReportes = document.getElementById('boton-seccion-reportes');
const seccionBalance = document.getElementById('seccion-balance');
const seccionCategorias = document.getElementById('seccion-categorias');
const seccionReportes = document.getElementById('seccion-reportes');


botonSeccionBalance.addEventListener('click',()=>{
    seccionBalance.style.display= 'block';
    seccionCategorias.style.display= 'none';
    seccionReportes.style.display= 'none';
    seccionNuevaOperacion.style.display= 'none';
    seccionEditarOperacion.style.display = 'none';
})
botonSeccionCategorias.addEventListener('click',()=>{
    seccionCategorias.style.display= 'block';
    seccionBalance.style.display= 'none';
    seccionReportes.style.display= 'none';
    seccionNuevaOperacion.style.display= 'none';
    seccionEditarOperacion.style.display = 'none';
})
botonSeccionReportes.addEventListener('click',()=>{
    seccionReportes.style.display= 'flex';
    seccionCategorias.style.display= 'none';
    seccionBalance.style.display= 'none';
    seccionNuevaOperacion.style.display= 'none';
    seccionEditarOperacion.style.display = 'none';
})
// boton para nueva operación
const botonNuevaOperacion = document.getElementById('boton-nueva-operacion');
const seccionNuevaOperacion = document.getElementById('seccion-nueva-operacion');

botonNuevaOperacion.addEventListener('click',() =>{
    seccionNuevaOperacion.style.display= 'block';
    seccionReportes.style.display= 'none';
    seccionCategorias.style.display= 'none';
    seccionBalance.style.display= 'none';
    seccionEditarOperacion.style.display = 'none';
})
// botón para editar operacion
const seccionEditarOperacion = document.getElementById('seccion-editar-operacion');

// botón para cancelar
const botonCancelarOperacion = document.getElementById('boton-cancelar-operacion');

botonCancelarOperacion.addEventListener('click',(e)=>{
    e.preventDefault();
    seccionBalance.style.display= 'flex';
    seccionCategorias.style.display= 'none';
    seccionReportes.style.display= 'none';
    seccionNuevaOperacion.style.display= 'none';
    seccionEditarOperacion.style.display = 'none';
})

// Creación nueva operación

const inputNuevaOperacionDescripcion = document.getElementById('input-nueva-operacion-descripcion');
const inputNuevaOperacionMonto= document.getElementById('input-nueva-operacion-monto');
const selectNuevaOperacionTipo = document.getElementById('select-nueva-operacion-tipo');
const selectNuevaOperacionCategoria = document.getElementById('select-nueva-operacion-categoria');
const inputNuevaOperacionFecha = document.getElementById('input-nueva-operacion-fecha');
const botonAgregarOperacion = document.getElementById('boton-agregar-operacion');

botonAgregarOperacion.addEventListener('click', (e)=>{
    e.preventDefault();
    console.log(inputNuevaOperacionDescripcion.value);
    console.log(inputNuevaOperacionMonto.value);
    console.log(selectNuevaOperacionTipo.value);
    console.log(selectNuevaOperacionCategoria.value);
    console.log(inputNuevaOperacionFecha.value);
    

}
)

