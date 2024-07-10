import { prisma } from "@/prisma";
import { Prisma } from "@prisma/client";

// 使用 Prisma 存储数据
export const inseartSearchLog = async (searchInput: string, regions: string[], translations: string[]) =>
 await prisma.translationLog.create({
    data: {
        searchInput,
        regions: regions as any,
        translations: translations as any
    }
});