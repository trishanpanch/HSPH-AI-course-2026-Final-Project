export async function renderPdfPages(blob: Blob): Promise<string[]> {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  const loadingTask = pdfjs.getDocument({
    data: new Uint8Array(await blob.arrayBuffer()),
  });
  const document = await loadingTask.promise;
  try {
    if (document.numPages > 30)
      throw new Error("The worksheet is too long to preview.");
    const images: string[] = [];
    for (let n = 1; n <= document.numPages; n++) {
      const page = await document.getPage(n);
      const viewport = page.getViewport({ scale: 1.35 });
      const canvas = window.document.createElement("canvas");
      canvas.width = Math.ceil(viewport.width);
      canvas.height = Math.ceil(viewport.height);
      const context = canvas.getContext("2d");
      if (!context) throw new Error("PDF preview is unavailable.");
      await page.render({ canvas, canvasContext: context, viewport }).promise;
      images.push(canvas.toDataURL("image/png"));
      canvas.width = 0;
      canvas.height = 0;
      page.cleanup();
    }
    return images;
  } finally {
    await loadingTask.destroy();
  }
}
