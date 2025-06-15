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

// Save table as image
function saveImage() {
  html2canvas(document.querySelector("#table-container")).then(canvas => {
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
