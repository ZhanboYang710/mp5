

export default function checkUrl(input_url: string): boolean {
    try {
        new URL(input_url);
        return true;
    } catch (_e) {
        return false;
    }
}