const loadedScripts: Record<string, Promise<true>> = {}

const loadScript = (src: string) => {
  if (!(src in loadedScripts)) {
    loadedScripts[src] = new Promise((resolve, reject) => {
      const s = document.createElement('script')
      s.setAttribute('src', src)
      s.setAttribute('type', 'text/javascript')
      s.onload = () => {
        // console.log("LOADED SCRIPT src = " + src)
        resolve(true)
      }
      s.onerror = reject
      document.body.appendChild(s)
    })
  }
  return loadedScripts[src]
}

const loadImage = (src: string): Promise<HTMLImageElement> => {
  const img = new Image()
  const promise = new Promise<HTMLImageElement>((resolve, reject) => {
    img.onload = () => resolve(img)
    img.onerror = reject
  })
  img.src = src
  return promise
}

export const Load = {
  script: loadScript,
  /** Once image is loaded, the browser will cache it by default */
  image: loadImage,
}
