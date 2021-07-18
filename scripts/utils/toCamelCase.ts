export default function toCamelCase(name: string) {
    return name.charAt(0).toLocaleLowerCase() + name.slice(1);
}