import { jsPDF } from "jspdf"
import "./NotoSansHebrew"

import background from "./background"
import { Patient } from "../model/patient"
import { PatientAnswer } from "../model/PatientAnswer"
import { PatientImage } from "../model/PatientImage"

export async function printPdf(
  patient: Patient,
  answers: PatientAnswer[],
  images: PatientImage[],
  fileName?: string
) {
  const doc = new jsPDF("p", "mm", "a3")
  await drawBackground()

  doc.setFont("NotoSansHebrew", undefined, 400)
  drawString(patient.name, 24, 278, 47)
  const textPositions = [
    { x: 165, y: 65 },
    { x: 272, y: 175 },
    { x: 165, y: 283 },
  ]
  const imagePosition = [...textPositions]

  for (const answer of answers) {
    let pos = textPositions.shift()
    if (pos) {
      drawString(answer.title, 18, pos.x, pos.y)
      drawString(answer.text, 24, pos.x - 5, pos.y + 15)
    }
  }
  for (const image of images) {
    let pos = imagePosition.shift()
    if (pos&&image.image) {
      drawImage(image, pos.x, pos.y)
    }
  }

  doc.save(fileName || patient.name)

  async function drawBackground() {
    // const path_url = process.cwd() + "/src/assets/bg.png",
    const format = "PNG"
    //format 'JPEG', 'PNG', 'WEBP'

    // if (false) {
    //   const imgData = fs.readFileSync(path_url).toString("base64");

    //   const s = sharp(Buffer.from(imgData, "base64"));
    //   const meta = await s.metadata();
    //   fs.writeFileSync(
    //     "./src/pdf/background.ts",
    //     JSON.stringify(
    //       {
    //         image: imgData,
    //         width: meta.width,
    //         height: meta.height,
    //       },
    //       undefined,
    //       2
    //     )
    //   );
    // }
    const ratio = background.width! / doc.internal.pageSize.getWidth()

    doc.addImage(
      background.image,
      format,
      0,
      0,
      background.width! / ratio,
      background.height! / ratio
    )
  }

  function drawImage(info: PatientImage, textRight: number, textTop: number) {
    const width = 102,
      height = 95
    //doc.rect(left, top, width, height, "FD");
    let left = textRight < 200 ? textRight + 10 : 20
    let top = textTop - 10
    let ratio = info.width / width
    if (info.width < info.height) {
      ratio = info.height / height
      left += (width - info.width / ratio) / 2
    } else {
      top += (height - info.height / ratio) / 2
    }
    const drawWidth = info.width / ratio,
      drawHeight = info.height / ratio
    console.log({ left, top, drawWidth, drawHeight, textTop })
    doc.addImage(info.image, "png", left, top, drawWidth, drawHeight)
  }

  function drawString(
    text: string,
    fontSize: number,
    right: number,
    top: number
  ) {
    doc.setFontSize(fontSize)
    //doc.setR2L(true);

    const lines = doc.splitTextToSize(text, 135)
    doc.text(lines, right, top, {
      isInputRtl: false,
      isOutputRtl: true,
      align: "right",
    })
  }
}
