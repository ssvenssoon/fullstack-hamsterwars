function fixUrl(url: string): string {
    if (import.meta.env.MODE === 'development') {
      return 'http://localhost:1178' + url
    } else {
      return url
    }
  }
  
  export { fixUrl }