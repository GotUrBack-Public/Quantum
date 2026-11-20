"use client";

import { useRef, useState } from "react";
import { Icon } from "./icon";

type UploadTrayProps = {
  files: File[];
  onAdd: (files: File[]) => void;
  onRemove: (file: File) => void;
  maxSize?: number;
};

function formatSize(bytes: number) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export function UploadTray({ files, onAdd, onRemove, maxSize = 25 * 1024 * 1024 }: UploadTrayProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");

  function addFiles(list: FileList | File[]) {
    const incoming = Array.from(list);
    const tooLarge = incoming.find((file) => file.size > maxSize);
    if (tooLarge) {
      setError(`${tooLarge.name} überschreitet das Limit von ${formatSize(maxSize)}.`);
      return;
    }
    setError("");
    onAdd(incoming.filter((file) => !files.some((existing) => existing.name === file.name && existing.size === file.size)));
  }

  return (
    <section className="upload-tray" aria-label="Dateianhänge">
      <div className={dragging ? "upload-dropzone is-dragging" : "upload-dropzone"}
        onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => { event.preventDefault(); setDragging(false); addFiles(event.dataTransfer.files); }}>
        <span className="upload-drop-icon"><Icon name="cloud-upload" size={19}/></span>
        <div className="upload-drop-copy"><b>Dateien hier ablegen</b><small>oder vom Gerät auswählen · maximal {formatSize(maxSize)} pro Datei</small></div>
        <button type="button" className="upload-browse" onClick={() => inputRef.current?.click()}>Durchsuchen</button>
        <input ref={inputRef} type="file" multiple hidden onChange={(event) => { if (event.target.files) addFiles(event.target.files); event.currentTarget.value = ""; }}/>
      </div>
      {error && <p className="upload-error" role="alert">{error}</p>}
      {files.length > 0 && <div className="upload-file-list">{files.map((file, index) => (
        <div className="upload-file" key={file.name + file.size + index}>
          <span className="upload-file-icon"><Icon name={file.type.startsWith("image/") ? "photo" : "file" } size={17}/></span>
          <span className="upload-file-copy"><b>{file.name}</b><small>{formatSize(file.size)} · lokal ausgewählt</small></span>
          <button type="button" aria-label={file.name + " entfernen"} onClick={() => onRemove(file)}><Icon name="x" size={15}/></button>
        </div>
      ))}</div>}
      <p className="upload-local-note"><Icon name="lock" size={12}/> Vorschau: Dateien bleiben lokal. Server-Upload und Verschlüsselung sind noch nicht eingerichtet.</p>
    </section>
  );
}
