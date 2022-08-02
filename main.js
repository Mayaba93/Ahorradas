// botones para ver cada seccion
const botonSeccionBalance = document.getElementById('boton-seccion-balance');
const botonSeccionCategorias = document.getElementById('boton-seccion-categorias');
const botonSeccionReportes = document.getElementById('boton-seccion-reportes');
const seccionBalance = document.getElementById('seccion-balance');
const seccionCategorias = document.getElementById('seccion-categorias');
const seccionReportes = document.getElementById('seccion-reportes');

botonSeccionBalance.addEventListener('click',()=>{
    seccionBalance.style.display= 'flex';
    seccionCategorias.style.display= 'none';
    seccionReportes.style.display= 'none';
    seccionNuevaOperacion.style.display= 'none';
})
botonSeccionCategorias.addEventListener('click',()=>{
    seccionCategorias.style.display= 'flex';
    seccionBalance.style.display= 'none';
    seccionReportes.style.display= 'none';
    seccionNuevaOperacion.style.display= 'none';
})
botonSeccionReportes.addEventListener('click',()=>{
    seccionReportes.style.display= 'flex';
    seccionCategorias.style.display= 'none';
    seccionBalance.style.display= 'none';
    seccionNuevaOperacion.style.display= 'none';
})
// boton para nueva operación
const botonNuevaOperacion = document.getElementById('boton-nueva-operacion');
const seccionNuevaOperacion = document.getElementById('seccion-nueva-operacion');

botonNuevaOperacion.addEventListener('click',() =>{
    seccionNuevaOperacion.style.display= 'block';
    seccionReportes.style.display= 'none';
    seccionCategorias.style.display= 'none';
    seccionBalance.style.display= 'none';
})
// botón para cancelar
const botonCancelarOperacion = document.getElementById('boton-cancelar-operacion');

botonCancelarOperacion.addEventListener('click',(e)=>{
    e.preventDefault();
    seccionBalance.style.display= 'flex';
    seccionCategorias.style.display= 'none';
    seccionReportes.style.display= 'none';
    seccionNuevaOperacion.style.display= 'none';
})