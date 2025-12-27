import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import type { Vehicle } from '../data/mockData'
import logo from '../img/logo-bs-automotores.png'

const fetchImageBytes = async (url: string) => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Image fetch failed')
    }
    return await response.arrayBuffer()
  } catch (error) {
    console.warn('No se pudo cargar la imagen del vehículo para el PDF.', error)
    return undefined
  }
}

const drawLabelValue = ({
  page,
  x,
  y,
  label,
  value,
  labelFont,
  valueFont,
}: {
  page: any
  x: number
  y: number
  label: string
  value: string
  labelFont: any
  valueFont: any
}) => {
  page.drawText(label.toUpperCase(), {
    x,
    y,
    size: 8,
    font: labelFont,
    color: rgb(0.75, 0.75, 0.78),
  })
  page.drawLine({
    start: { x, y: y - 4 },
    end: { x: x + 200, y: y - 4 },
    thickness: 0.5,
    color: rgb(0.24, 0.24, 0.28),
  })
  page.drawText(value, {
    x,
    y: y - 18,
    size: 12,
    font: valueFont,
    color: rgb(1, 1, 1),
  })
}

export const downloadVehiclePdf = async (vehicle: Vehicle) => {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([612, 842])
  const { width, height } = page.getSize()
  const margin = 40

  const primary = rgb(0.89, 0.07, 0.07)
  const background = rgb(0.04, 0.04, 0.07)

  page.drawRectangle({ x: 0, y: 0, width, height, color: background })
  page.drawRectangle({ x: 0, y: 0, width, height: 40, color: primary })

  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica)

  // Logo image
  try {
    const logoBytes = await fetchImageBytes(logo)
    if (logoBytes) {
      const logoImage = await pdfDoc.embedPng(logoBytes)
      const logoSize = 120
      page.drawImage(logoImage, {
        x: margin,
        y: height - margin - logoSize,
        width: logoSize,
        height: logoSize,
      })
    }
  } catch (error) {
    console.warn('No se pudo cargar el logo para el PDF', error)
  }

  // Title
  page.drawText('FICHA TÉCNICA', {
    x: margin + 130,
    y: height - margin - 40,
    size: 28,
    font: fontBold,
    color: rgb(1, 1, 1),
  })
  page.drawText(`${vehicle.brand} ${vehicle.model}`, {
    x: margin + 130,
    y: height - margin - 70,
    size: 20,
    font: fontBold,
    color: rgb(1, 1, 1),
  })
  page.drawText('Confianza en cada kilómetro | Compra y venta de autos usados seleccionados', {
    x: margin,
    y: height - margin - 110,
    size: 11,
    font: fontRegular,
    color: rgb(0.75, 0.75, 0.78),
  })

  // Vehicle image
  const imgBytes = await fetchImageBytes(vehicle.image)
  if (imgBytes) {
    try {
      const isPng = vehicle.image.toLowerCase().endsWith('.png')
      const image = isPng ? await pdfDoc.embedPng(imgBytes) : await pdfDoc.embedJpg(imgBytes)
      const imageWidth = 300
      const intrinsicWidth = image.width ?? 300
      const intrinsicHeight = image.height ?? 200
      const imageHeight = (intrinsicHeight / intrinsicWidth) * imageWidth
      page.drawRectangle({
        x: margin,
        y: height - margin - 140 - imageHeight - 10,
        width: imageWidth,
        height: imageHeight + 10,
        color: rgb(0.15, 0.15, 0.18),
        borderColor: primary,
        borderWidth: 1,
        opacity: 0.9,
      })
      page.drawImage(image, {
        x: margin + 5,
        y: height - margin - 140 - imageHeight - 5,
        width: imageWidth - 10,
        height: imageHeight,
      })
    } catch (error) {
      console.warn('No se pudo incrustar la imagen en el PDF', error)
    }
  }

  const dataStartX = margin
  let yPointer = height - margin - 360
  const specs: { label: string; value: string | number }[] = [
    { label: 'Marca', value: vehicle.brand },
    { label: 'Modelo', value: vehicle.model },
    { label: 'Año', value: vehicle.year },
    { label: 'Kilometraje', value: vehicle.mileage },
    { label: 'Motor', value: vehicle.engine },
    { label: 'Transmisión', value: vehicle.transmission },
    { label: 'Color', value: vehicle.color },
    { label: 'Dominio', value: vehicle.plate },
    { label: 'Precio', value: vehicle.price },
  ]

  page.drawText('DATOS PRINCIPALES', {
    x: dataStartX + 320,
    y: yPointer + 196,
    size: 14,
    font: fontBold,
    color: rgb(1, 1, 1),
  })

  specs.forEach((spec) => {
    drawLabelValue({
      page,
      x: dataStartX + 320,
      y: yPointer + 160,
      label: spec.label,
      value: String(spec.value),
      labelFont: fontRegular,
      valueFont: fontBold,
    })
    yPointer -= 36
  })

  // Highlights
  const highlightStartY = height - margin - 420
  page.drawText('DETALLES DESTACADOS', {
    x: margin,
    y: highlightStartY + 20,
    size: 14,
    font: fontBold,
    color: rgb(1, 1, 1),
  })

  const highlights = [
    'Único dueño',
    'Mantenimiento al día',
    'Llantas de aleación',
    'Aire acondicionado / Dirección asistida',
    'Papeles listos para transferir',
  ]

  highlights.forEach((text, idx) => {
    page.drawText('-', {
      x: margin,
      y: highlightStartY - idx * 18,
      size: 12,
      font: fontBold,
      color: primary,
    })
    page.drawText(text, {
      x: margin + 20,
      y: highlightStartY - idx * 18,
      size: 11,
      font: fontRegular,
      color: rgb(0.85, 0.85, 0.9),
    })
  })

  // Contact block
  page.drawText('CONTACTO', {
    x: dataStartX,
    y: 220,
    size: 14,
    font: fontBold,
    color: rgb(1, 1, 1),
  })
  page.drawText('+54 11 5555-0000', {
    x: dataStartX,
    y: 200,
    size: 11,
    font: fontRegular,
    color: rgb(0.85, 0.85, 0.9),
  })
  page.drawText('ventas@bsautomotores.com', {
    x: dataStartX,
    y: 182,
    size: 11,
    font: fontRegular,
    color: rgb(0.85, 0.85, 0.9),
  })

  page.drawRectangle({
    x: margin,
    y: 60,
    width: width - margin * 2,
    height: 4,
    color: primary,
  })
  const footerText = 'BS Automotores | Compra y venta de autos'
  const footerTextWidth = fontBold.widthOfTextAtSize(footerText, 12)
  page.drawText(footerText, {
    x: (width - footerTextWidth) / 2,
    y: 30,
    size: 12,
    font: fontBold,
    color: rgb(1, 1, 1),
  })

  const pdfBytes = await pdfDoc.save()
  const pdfArray = new Uint8Array(pdfBytes)
  const blob = new Blob([pdfArray.buffer], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const downloadLink = document.createElement('a')
  downloadLink.href = url
  downloadLink.download = `Ficha-${vehicle.brand}-${vehicle.model}.pdf`
  downloadLink.click()
  URL.revokeObjectURL(url)
}
