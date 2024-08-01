import { z } from "zod";

export const AddKolRequestSchema = z.object({
  name: z.string().min(1, "نام نمی‌تواند خالی باشد"),
  officialName: z.string().min(1, "نام رسمی نمی‌تواند خالی باشد"),
  address: z.string().min(1, "آدرس نمی‌تواند خالی باشد"),
});
