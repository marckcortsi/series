
    // Crear la hoja de Excel con los encabezados y las filas de series
    const wsData = [headers, ...rows];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reporte de Productos");

    // Guardar el archivo Excel con el nombre del pedido
    XLSX.writeFile(wb, `${orderNumber}.xlsx`);
}

function resetApp() {
    products = [];
    currentProductIndex = -1;
    document.getElementById('startButton').style.display = 'block'; // Reaparece el botón "Comenzar"
    showSection('');
}