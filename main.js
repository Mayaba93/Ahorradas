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
})
botonSeccionCategorias.addEventListener('click',()=>{
    seccionCategorias.style.display= 'flex';
    seccionBalance.style.display= 'none';
    seccionReportes.style.display= 'none';
})
botonSeccionReportes.addEventListener('click',()=>{
    seccionReportes.style.display= 'flex';
    seccionCategorias.style.display= 'none';
    seccionBalance.style.display= 'none';
})