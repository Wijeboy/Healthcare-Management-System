import PDFDocument from "pdfkit";

// Format money values consistently
const formatMoney = (value) => {
  const amount = Number(value) || 0;
  return `$${amount.toFixed(2)}`;
};

// Format dates safely
const formatDate = (value) => {
  if (!value) {
    return "N/A";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "N/A";
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// ========================================
// GENERATE / STREAM INVOICE PDF
// ========================================
export const generateInvoicePdf = ({
  invoice,
  patientName,
  res,
}) => {
  const doc = new PDFDocument({
    margin: 40,
    size: "A4",
  });

  const safeInvoiceNumber =
    invoice.invoiceNumber || "invoice";

  const filename = `${safeInvoiceNumber}.pdf`;

  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${filename}"`,
  );

  res.setHeader("Content-Type", "application/pdf");

  doc.pipe(res);

  // ========================================
  // HEADER
  // ========================================
  doc
    .fontSize(22)
    .fillColor("#1E3A8A")
    .text("MEDIMATE HEALTHCARE SYSTEM", {
      align: "center",
    });

  doc
    .moveDown(0.3)
    .fontSize(16)
    .fillColor("#334155")
    .text("INVOICE", {
      align: "center",
    });

  doc
    .moveDown(0.3)
    .fontSize(10)
    .fillColor("#64748B")
    .text(`Invoice No: ${invoice.invoiceNumber}`, {
      align: "center",
    });

  doc.moveDown(2);

  // ========================================
  // INVOICE INFORMATION
  // ========================================
  doc
    .fontSize(12)
    .fillColor("#1E293B")
    .text("Invoice Information", {
      underline: true,
    });

  doc.moveDown(0.7);

  doc
    .fontSize(10)
    .fillColor("#334155")
    .text(
      `Patient: ${patientName || "Unknown Patient"}`,
    );

  doc.text(`Patient ID: ${invoice.patientId || "N/A"}`);

  doc.text(
    `Issue Date: ${formatDate(invoice.issueDate)}`,
  );

  doc.text(
    `Due Date: ${formatDate(invoice.dueDate)}`,
  );

  doc.text(`Status: ${invoice.status || "N/A"}`);

  if (invoice.appointmentId) {
    doc.text(
      `Appointment ID: ${invoice.appointmentId}`,
    );
  }

  doc.moveDown(1.5);

  // ========================================
  // ITEMS HEADER
  // ========================================
  const tableLeft = 40;
  const descriptionX = tableLeft;
  const quantityX = 300;
  const priceX = 370;
  const totalX = 465;

  let y = doc.y;

  doc
    .fontSize(10)
    .fillColor("#FFFFFF");

  doc
    .rect(tableLeft, y, 515, 22)
    .fill("#1E3A8A");

  doc
    .fillColor("#FFFFFF")
    .text("Description", descriptionX + 5, y + 6, {
      width: 240,
    });

  doc.text("Qty", quantityX, y + 6, {
    width: 50,
    align: "center",
  });

  doc.text("Unit Price", priceX, y + 6, {
    width: 80,
    align: "right",
  });

  doc.text("Total", totalX, y + 6, {
    width: 85,
    align: "right",
  });

  y += 30;

  // ========================================
  // ITEMS
  // ========================================
  const items = Array.isArray(invoice.items)
    ? invoice.items
    : [];

  if (items.length === 0) {
    doc
      .fillColor("#475569")
      .fontSize(10)
      .text("No invoice items available.", tableLeft, y);

    y += 25;
  } else {
    for (const item of items) {
      const quantity = Number(item.quantity) || 0;
      const unitPrice = Number(item.unitPrice) || 0;

      const itemTotal =
        Number(item.total) ||
        quantity * unitPrice;

      // Add another page if necessary
      if (y > 730) {
        doc.addPage();
        y = 50;
      }

      doc
        .fillColor("#334155")
        .fontSize(9)
        .text(
          item.description || "Item",
          descriptionX + 5,
          y,
          {
            width: 235,
          },
        );

      doc.text(
        String(quantity),
        quantityX,
        y,
        {
          width: 50,
          align: "center",
        },
      );

      doc.text(
        formatMoney(unitPrice),
        priceX,
        y,
        {
          width: 80,
          align: "right",
        },
      );

      doc.text(
        formatMoney(itemTotal),
        totalX,
        y,
        {
          width: 85,
          align: "right",
        },
      );

      y += 22;

      doc
        .moveTo(tableLeft, y - 5)
        .lineTo(555, y - 5)
        .strokeColor("#E2E8F0")
        .stroke();
    }
  }

  // ========================================
  // TOTALS
  // ========================================
  y += 15;

  if (y > 650) {
    doc.addPage();
    y = 50;
  }

  const labelX = 350;
  const amountX = 465;

  doc
    .fontSize(10)
    .fillColor("#334155")
    .text("Subtotal:", labelX, y, {
      width: 100,
      align: "right",
    });

  doc.text(
    formatMoney(invoice.subtotal),
    amountX,
    y,
    {
      width: 85,
      align: "right",
    },
  );

  y += 20;

  doc.text("Tax:", labelX, y, {
    width: 100,
    align: "right",
  });

  doc.text(
    formatMoney(invoice.taxAmount),
    amountX,
    y,
    {
      width: 85,
      align: "right",
    },
  );

  y += 20;

  doc.text("Discount:", labelX, y, {
    width: 100,
    align: "right",
  });

  doc.text(
    `-${formatMoney(invoice.discountAmount)}`,
    amountX,
    y,
    {
      width: 85,
      align: "right",
    },
  );

  y += 25;

  doc
    .fontSize(12)
    .fillColor("#1E3A8A")
    .text("Total:", labelX, y, {
      width: 100,
      align: "right",
    });

  doc.text(
    formatMoney(invoice.totalAmount),
    amountX,
    y,
    {
      width: 85,
      align: "right",
    },
  );

  y += 22;

  doc
    .fontSize(10)
    .fillColor("#334155")
    .text("Amount Paid:", labelX, y, {
      width: 100,
      align: "right",
    });

  doc.text(
    formatMoney(invoice.amountPaid),
    amountX,
    y,
    {
      width: 85,
      align: "right",
    },
  );

  y += 20;

  doc.text("Balance Due:", labelX, y, {
    width: 100,
    align: "right",
  });

  doc.text(
    formatMoney(invoice.balanceDue),
    amountX,
    y,
    {
      width: 85,
      align: "right",
    },
  );

  // ========================================
  // NOTES
  // ========================================
  if (invoice.notes) {
    y += 40;

    if (y > 700) {
      doc.addPage();
      y = 50;
    }

    doc
      .fontSize(11)
      .fillColor("#1E293B")
      .text("Notes", tableLeft, y, {
        underline: true,
      });

    doc
      .moveDown(0.4)
      .fontSize(9)
      .fillColor("#475569")
      .text(invoice.notes, {
        width: 500,
      });
  }

  // ========================================
  // FOOTER
  // ========================================
  doc
    .fontSize(8)
    .fillColor("#94A3B8")
    .text(
      "Generated by Medimate Healthcare Management System",
      40,
      790,
      {
        align: "center",
        width: 515,
      },
    );

  doc.end();
};