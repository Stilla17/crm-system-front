export type SalesPlanExcelItem = {
  department: string;
  type: string;
  monthlyPlan: number;
  result: number;
};

type ExportSalesPlanExcelParams = {
  from: string;
  to: string;
  items: SalesPlanExcelItem[];
};

const BORDER_COLOR = "FF202020";

function formatDate(value: string) {
  const [year, month, day] = value.split("-");

  return `${day}.${month}.${year}`;
}

function getProgress(result: number, plan: number) {
  if (plan <= 0) return 0;

  return Math.round((result / plan) * 100);
}

function getProgressFill(progress: number) {
  if (progress >= 80) return "FF00B050";
  if (progress >= 60) return "FFFFFF00";

  return "FFFF0000";
}

export async function exportSalesPlanExcel({
  from,
  to,
  items,
}: ExportSalesPlanExcelParams) {
  const { Workbook } = await import("exceljs");
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet("Reja va bajarilish", {
    views: [{ state: "frozen", ySplit: 4 }],
    pageSetup: {
      orientation: "landscape",
      fitToPage: true,
      fitToWidth: 1,
      fitToHeight: 0,
      paperSize: 9,
      margins: {
        left: 0.25,
        right: 0.25,
        top: 0.5,
        bottom: 0.5,
        header: 0.2,
        footer: 0.2,
      },
    },
  });

  worksheet.columns = [
    { key: "department", width: 30 },
    { key: "type", width: 14 },
    { key: "monthlyPlan", width: 21 },
    { key: "result", width: 21 },
    { key: "remaining", width: 21 },
    { key: "progress", width: 15 },
  ];

  worksheet.mergeCells("A1:F1");
  const titleCell = worksheet.getCell("A1");
  titleCell.value = `Hisobot ${from.slice(0, 4)}`;
  titleCell.font = { name: "Times New Roman", size: 16, bold: true };
  titleCell.alignment = { horizontal: "left", vertical: "middle" };
  worksheet.getRow(1).height = 25;

  worksheet.mergeCells("A2:F2");
  const periodCell = worksheet.getCell("A2");
  periodCell.value = `${formatDate(from)}–${formatDate(to)}`;
  periodCell.font = { name: "Times New Roman", size: 14, bold: true };
  periodCell.alignment = { horizontal: "center", vertical: "middle" };
  worksheet.getRow(2).height = 23;

  worksheet.addRow([]);
  const headerRow = worksheet.addRow([
    "Bo‘lim",
    "Turi",
    "Oylik reja",
    "Natija",
    "Bajarilmagan",
    "Bajarilish, %",
  ]);
  headerRow.height = 34;

  headerRow.eachCell((cell) => {
    cell.font = { name: "Times New Roman", size: 12, bold: true };
    cell.alignment = {
      horizontal: "center",
      vertical: "middle",
      wrapText: true,
    };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFF2F2F2" },
    };
  });

  for (const item of items) {
    const remaining = Math.max(item.monthlyPlan - item.result, 0);
    const progress = getProgress(item.result, item.monthlyPlan);
    const row = worksheet.addRow([
      item.department,
      item.type,
      item.monthlyPlan,
      item.result,
      remaining,
      progress,
    ]);

    row.height = 22;
    row.eachCell((cell, columnNumber) => {
      cell.font = { name: "Times New Roman", size: 11 };
      cell.alignment = {
        horizontal: columnNumber <= 2 ? "left" : "right",
        vertical: "middle",
      };
    });

    for (let column = 3; column <= 5; column += 1) {
      row.getCell(column).numFmt = "#,##0.00";
    }

    const progressCell = row.getCell(6);
    progressCell.numFmt = '0"%"';
    progressCell.font = {
      name: "Times New Roman",
      size: 11,
      bold: true,
      color: { argb: progress >= 60 ? "FF000000" : "FFFFFFFF" },
    };
    progressCell.alignment = { horizontal: "center", vertical: "middle" };
    progressCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: getProgressFill(progress) },
    };
  }

  const totals = items.reduce(
    (result, item) => ({
      plan: result.plan + item.monthlyPlan,
      sales: result.sales + item.result,
    }),
    { plan: 0, sales: 0 },
  );
  const totalRemaining = Math.max(totals.plan - totals.sales, 0);
  const totalProgress = getProgress(totals.sales, totals.plan);
  const totalRow = worksheet.addRow([
    "Jami:",
    `${items.length} ta filial`,
    totals.plan,
    totals.sales,
    totalRemaining,
    totalProgress,
  ]);
  totalRow.height = 24;

  totalRow.eachCell((cell, columnNumber) => {
    cell.font = {
      name: "Times New Roman",
      size: 11,
      bold: true,
      color: columnNumber >= 3 && columnNumber <= 5
        ? { argb: "FFFFFFFF" }
        : { argb: "FF000000" },
    };
    cell.alignment = {
      horizontal: columnNumber <= 2 ? "left" : "right",
      vertical: "middle",
    };

    if (columnNumber >= 3 && columnNumber <= 5) {
      cell.numFmt = "#,##0.00";
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF00A651" },
      };
    }
  });

  const totalProgressCell = totalRow.getCell(6);
  totalProgressCell.numFmt = '0"%"';
  totalProgressCell.alignment = { horizontal: "center", vertical: "middle" };
  totalProgressCell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: getProgressFill(totalProgress) },
  };

  const lastRow = worksheet.rowCount;
  for (let row = 1; row <= lastRow; row += 1) {
    for (let column = 1; column <= 6; column += 1) {
      const cell = worksheet.getCell(row, column);
      cell.border = {
        top: { style: "thin", color: { argb: BORDER_COLOR } },
        left: { style: "thin", color: { argb: BORDER_COLOR } },
        bottom: { style: "thin", color: { argb: BORDER_COLOR } },
        right: { style: "thin", color: { argb: BORDER_COLOR } },
      };
    }
  }

  worksheet.autoFilter = {
    from: "A4",
    to: `F${Math.max(lastRow - 1, 4)}`,
  };
  worksheet.pageSetup.printArea = `A1:F${lastRow}`;

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer as BlobPart], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = `savdo-reja-hisoboti-${from}-${to}.xlsx`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
