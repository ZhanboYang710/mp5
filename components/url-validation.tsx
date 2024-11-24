

export default function checkUrl(input_url: string): boolean {
    try {
        new URL(input_url);
        return true;
    } catch (e) {
        return false;
    }
}