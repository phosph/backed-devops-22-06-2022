export const pathToAbsUrl = (path: string): URL => new URL(path, import.meta.env.VITE_URL_API)
