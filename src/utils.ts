function fixUrl(url: string): string {
    if (import.meta.env.MODE === 'development') {
      return 'http://localhost:3000' + url
    } else {
      return url
    }
  }
  
  export { fixUrl }