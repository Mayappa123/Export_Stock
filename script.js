document.getElementById("date").innerText = "DATE: " + new Date().toLocaleDateString('en-GB');

const table = document.getElementById("exportTable");
const totalRow = document.getElementById("totalRow");

// Auto TOTAL update
table.addEventListener("input", () => {
  const rows = table.querySelectorAll("tbody tr");
  const colCount = rows[0].cells.length;

  for (let col = 1; col < colCount; col++) {
    let sum = 0;
    for (let row = 0; row < rows.length - 1; row++) {
      const cell = rows[row].cells[col];
      const value = parseInt(cell.innerText);
      if (!isNaN(value)) {
        sum += value;
      }
    }
    totalRow.cells[col].innerText = sum;
  }
});

function printPreview() {
  const printContent = document.getElementById("table-container").outerHTML;
  const printWindow = window.open('', '', 'width=1000,height=800');
  printWindow.document.write(`
    <html>
      <head>
        <title>Print Preview</title>
        <link rel="stylesheet" href="style.css">
      </head>
      <body onload="window.print(); window.close();">
        ${printContent}
      </body>
    </html>
  `);
  printWindow.document.close();
}

html2canvas(document.querySelector("#table-container"), {
  scale: 1, // prevent zoom
  useCORS: true
}).then(canvas => {
  const link = document.createElement('a');
  link.download = 'export_table.png';
  link.href = canvas.toDataURL();
  link.click();
});

// Save table as image
function saveImage() {
  const element = document.querySelector("#table-container");
  html2canvas(element, {
    scale: 1, // ✅ Prevent enlarged image
    useCORS: true, // optional if you use external images/fonts
  }).then(canvas => {
    const link = document.createElement('a');
    link.download = 'export_table.png';
    link.href = canvas.toDataURL();
    link.click();
  });
}

// Keyboard input restrictions
document.querySelectorAll("td[contenteditable]").forEach((cell, index, allCells) => {
  cell.setAttribute("inputmode", "numeric");

  cell.addEventListener("keypress", (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  });

  cell.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const currentIndex = Array.from(allCells).indexOf(cell);
      const nextCell = allCells[currentIndex + 1];
      if (nextCell) nextCell.focus();
    }
  });
});
