function offscreenCapture(s: SVGSVGElement) {
  const canvas = new OffscreenCanvas(600, 600);
  const ctx = canvas.getContext("2d");
  const svgData = new XMLSerializer().serializeToString(s);
  const imgsrc = "data:image/svg+xml;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(svgData)));
  const image = new Image();

  image.onload = async function () {
    ctx?.drawImage(image, 0, 0);
    const blob = await canvas.convertToBlob();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "image.png";
    a.click();
  };
  image.src = imgsrc;
}

function domCapture(s: SVGSVGElement) {
  const canvas = document.createElement("canvas");
  canvas.width = 600;
  canvas.height = 600;
  const ctx = canvas.getContext("2d");
  const svgData = new XMLSerializer().serializeToString(s);
  const imgsrc = "data:image/svg+xml;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(svgData)));
  const image = new Image();
  image.onload = async function () {
    ctx?.drawImage(image, 0, 0);
    const blob = await new Promise((resolve) => canvas.toBlob(resolve));
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "image.png";
    a.click();
  };
  image.src = imgsrc;
}

export function capture(s: SVGSVGElement) {
  if (OffscreenCanvas) {
    return offscreenCapture(s);
  } else {
    return domCapture(s);
  }
}
