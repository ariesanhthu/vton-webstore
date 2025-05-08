// export interface ImageLoaderProps {
//     src: string;
// }
import type { ImageLoaderProps } from 'next/image';

export default function defaultLoader({ src }: ImageLoaderProps): string {
    try {
        if (!src || typeof src !== "string") {
            console.error("Invalid URL: src is not a valid string", src);
            return "/fallback-image.jpg";
        }

        // Nếu URL không bắt đầu bằng http(s) hoặc "/"
        if (!src.startsWith("http") && !src.startsWith("/")) {
            // Nếu trông giống domain thiếu protocol (ví dụ: lp2.hm.com)
            if (/^[\w.-]+\.[\w.-]+/.test(src)) {
                console.warn("Autofixing missing protocol:", src);
                src = `https://${src}`;
            } else {
                console.error("Invalid URL format:", src);
                return "/fallback-image.jpg";
            }
        }

        // Nếu là đường dẫn tương đối, thêm base URL
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const finalUrl = src.startsWith("/") ? `${baseUrl}${src}` : src;

        return new URL(finalUrl).toString();
    } catch (error) {
        console.error("Error constructing URL:", error);
        return "/fallback-image.jpg";
    }
}
