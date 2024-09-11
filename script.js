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

    startButton.addEventListener('click', startProcess);
    acceptProduct.addEventListener('click', acceptProductCode);
    registerSeries.addEventListener('click', registerSeriesCode);
    newProduct.addEventListener('click', registerNewProduct);
    finish.addEventListener('click', finishProcess);
    generateReport.addEventListener('click', generateExcelReport);
});

// Muestra la sección indicada y oculta las demás
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('visible');
    });
    document.getElementById(sectionId).classList.add('visible');
}

// Inicia el proceso, muestra la sección para ingresar el producto
function startProcess() {
    document.getElementById('startButton').style.display = 'none';
    showSection('productSection');
}

// Acepta el código del producto y muestra la sección para escanear la serie
function acceptProductCode() {
    const productCode = document.getElementById('productCode').value.trim();
    if (productCode === '') {
        alert('Por favor, ingresa un código de producto.');
        return;
    }

    products.push({ code: productCode, series: [] });
    currentProductIndex = products.length - 1;
    updateCounter();
    showSection('seriesSection');
}

// Registra el código de la serie, verifica duplicados y actualiza el contador
function registerSeriesCode() {
    const seriesCode = document.getElementById('seriesCode').value.trim();
    if (seriesCode === '') {
        alert('Por favor, ingresa una serie.');
        return;
    }

    const currentProduct = products[currentProductIndex];
    if (currentProduct.series.includes(seriesCode)) {
        alert('Esta serie ya ha sido registrada.');
        return;
    }

    currentProduct.series.push(seriesCode);
    updateCounter();
    document.getElementById('seriesCode').value = '';
}

// Actualiza el contador y el producto actual en la interfaz
function updateCounter() {
    const currentProduct = products[currentProductIndex];
    document.getElementById('counter').textContent = `Registrando: ${currentProduct.code} | Series: ${currentProduct.series.length}`;
}

// Permite registrar un nuevo producto sin finalizar el pedido actual
function registerNewProduct() {
    document.getElementById('productCode').value = '';
    showSection('productSection');
}

// Finaliza el proceso y muestra la sección para ingresar el número de pedido
function finishProcess() {
    showSection('finishSection');
}

// Genera el reporte en Excel con el formato deseado
function generateExcelReport() {
    const orderNumber = document.getElementById('orderNumber').value.trim();
    if (orderNumber === '') {
        alert('Por favor, ingresa el número de pedido.');
        return;
    }

    // Crear una hoja de cálculo para el reporte
    const workbook = XLSX.utils.book_new();
    const worksheetData = [];

    // Agregar productos y sus series al reporte
    products.forEach(product => {
        worksheetData.push([product.code]);
        product.series.forEach(series => {
            worksheetData.push([series]);
        });
        worksheetData.push([]); // Línea en blanco entre productos
    });

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');

    // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, `${orderNumber}.xlsx`);
    resetApp();
}

// Reinicia la aplicación a su estado inicial
function resetApp() {
    products = [];
    currentProductIndex = -1;
    document.getElementById('startButton').style.display = 'block';
    showSection('');
}
