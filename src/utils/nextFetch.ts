const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
export default async function NextFetch(url: string, opts: RequestInit) {
    return await fetch(baseUrl + url, opts);
}
