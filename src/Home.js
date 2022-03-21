import React, { useState } from "react";
import { auth } from "./firebase";
import { PDFDocument } from "pdf-lib";

const Mainpage = () => {
  const [mergedPdfUrl, setMergedPdfUrl] = useState([]);

  var fileList = [];

  function addFiles(files) {
    [].forEach.call(files, function (file) {
      var reader = new FileReader();
      reader.onloadend = function () {
        fileList.push(reader.result);
      };
      reader.readAsArrayBuffer(file);
    });
  }

  async function mergePdfs(pdfsToMerges) {
    const mergedPdf = await PDFDocument.create();
    const actions = pdfsToMerges.map(async (pdfBuffer) => {
      const pdf = await PDFDocument.load(pdfBuffer);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => {
        mergedPdf.addPage(page);
      });
    });
    await Promise.all(actions);
    const mergedPdfFile = await mergedPdf.save();
    setMergedPdfUrl(mergedPdfFile);
    console.log("mergedPdfFile", mergedPdfFile);
    const blob = new Blob([mergedPdfFile], { type: "application/pdf" });
    const blobURL = URL.createObjectURL(blob);
    console.log("blobURL", blobURL);
    window.open(blobURL);
    return mergedPdfFile;
  }

  const logout = () => {
    auth.signOut();
  };

  const onFilesChange = (e) => {
    console.log("e.target.files", [...e.target.files]);
    addFiles([...e.target.files]);
  };

  return (
    <div style={{ marginTop: 250 }}>
      <center>
        <input
          onChange={(e) => onFilesChange(e)}
          type="file"
          name="upload"
          accept="application/pdf"
          multiple
        />
        <button onClick={() => mergePdfs(fileList)}>Merge</button>

        <h3>Welcome{auth.currentUser.phoneNumber}</h3>
        <button style={{ marginLeft: "20px" }} onClick={logout}>
          Logout
        </button>
      </center>
    </div>
  );
};

export default Mainpage;