export function join (...paths) {
    return paths.join('/').replace(/\/+/g, '/');
}
