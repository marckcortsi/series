let products = []; // Array para almacenar los productos y sus series
let currentProductIndex = -1; // Índice del producto actual

// Inicializa los eventos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const acceptProduct = document.getElementById('acceptProduct');
    const registerSeries = document.getElementById('registerSeries');
    const newProduct = document.getElementById('newProduct');
    const finish = document.getElementById('finish');
    const generateReport = document.getElementById('generateReport');

    // Asegúrate de que los eventos estén correctamente asignados
    startButton.addEventListener('click', startProcess);
    acceptProduct.addEventListener('click', acceptProductCode);
    registerSeries.addEventListener('click', registerSeriesCode);
    newProduct.addEventListener('click', registerNewProduct);
    finish.addEventListener('click', finishProcess);
    generateReport.addEventListener('click', generateExcelReport);
});

// Muestra la sección indicada y oculta las demás
function showSection(sectionId) {
    // Asegúrate de que las secciones tengan la clase .section y que se oculten correctamente
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('visible');
    });
    // Muestra la sección que corresponde al ID pasado como argumento
    const sectionToShow = document
