export interface Size {
    name: string
    versionedName: string
    size: number
    minified: number
    gzipped: number
  }

export interface PackageData {
    meta: {
      description: string;
      name: string;
      distTag:{};
      versiona: string[]
    },
    sizes: Size[]
}