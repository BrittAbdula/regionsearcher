import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            "url": "https://regionsearcher.com/",
            "lastModified": new Date().toISOString(),
            "changeFrequency": "daily",
            "priority": 0.7
        }
    ]
}