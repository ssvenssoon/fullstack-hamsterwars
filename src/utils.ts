function fixUrl(url: string): string {
  return 'http://localhost:1178' + url
    // if (import.meta.env.MODE === 'development') {
    //   return 'http://localhost:1178' + url
    // } else {
    //   return url
    // }
  }
  
  export { fixUrl }