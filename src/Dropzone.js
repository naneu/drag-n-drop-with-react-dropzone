import React, { useCallback, useMemo, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const baseStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  transition: "border .3s ease-in-out"
};

const activeStyle = {
  borderColor: "#2196f3"
};

const acceptStyle = {
  borderColor: "#00e676"
};

const rejectStyle = {
  borderColor: "#FF0000"
};

function Dropzone(props) {
  const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    );
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: {
      "text/plain": [".txt"],
      "application/pdf": [
        ".pdf",
        ".doc",
        ".docx",
        ".ppt",
        ".pptx",
        ".pages",
        ".odt"
      ]
    }
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject, isDragAccept]
  );
  const thumbs = files.map((file) => (
    <div key={file.name}>
      <p>{file.name}</p>
    </div>
  ));
  // clean up
  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );
  return (
    <section>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <div>
          {isDragActive ? (
            <p>Release to drop your files here</p>
          ) : (
            <p>Drag and drop your images here.</p>
          )}
        </div>
      </div>
      {isDragReject ? (
        <aside>Wrong file extension</aside>
      ) : (
        <aside>{thumbs}</aside>
      )}
    </section>
  );
}

export default Dropzone;
