let loadedScripts: Record<string, Promise<true>> = {};

export const loadScript = ( src: string ) => {
  if ( !(src in loadedScripts) ) {
    loadedScripts[src] = new Promise( (resolve,reject) => {
      let s = document.createElement('script');
      s.setAttribute('src', src);
      s.setAttribute('type', 'text/javascript');
      s.onload = () => {
        // console.log("LOADED SCRIPT src = " + src)
        resolve(true)
      };
      s.onerror = reject;
      document.body.appendChild(s);
    })
  }
  return loadedScripts[src];
};