// TypeScript does not know that there are files other than .tsor .tsx so it will throw an error if an import has an unknown file suffix.
// So we are importing  JSON & SCSS with webpack .. but need toi tesll TS that these are modules


declare module "*.json";
declare module "*.css"
declare module "*.scss"