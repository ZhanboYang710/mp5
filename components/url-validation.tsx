
export default function checkUrl(input_url: string): boolean {
    try {
        new URL(input_url);
        return true;
    } catch (error) {
        console.error("Invalid URL:", error);
        return false;
    }
}