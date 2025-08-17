import AdmZip from 'adm-zip'
export default (path, dest) => {
  const zip = new AdmZip()
  zip.addLocalFolder(path)
  zip.writeZip(dest)
}
