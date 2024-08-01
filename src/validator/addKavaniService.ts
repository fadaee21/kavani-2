import { z } from "zod";

export const AddKavaniServiceRequestSchema = z.object({
  name: z.string().min(1, "نام نمی‌تواند خالی باشد"),

  servicePrice: z
    .string()
    .refine(
      (value) => !isNaN(Number(value)) && Number(value) >= 0,
      "قیمت سرویس باید یک عدد غیرمنفی باشد"
    ),
  discount: z
    .string()
    .refine(
      (value) =>
        !isNaN(Number(value)) && Number(value) >= 0 && Number(value) <= 100,
      "درصد تخفیف باید یک عدد بین ۰ و ۱۰۰ باشد"
    ),
  kavaniPercentage: z
    .string()
    .refine(
      (value) =>
        !isNaN(Number(value)) && Number(value) >= 0 && Number(value) <= 100,
      "درصد کاوانی باید یک عدد بین ۰ و ۱۰۰ باشد"
    ),
  prepayment: z
    .string()
    .refine(
      (value) => !isNaN(Number(value)) && Number(value) >= 0,
      "پیش‌پرداخت باید یک عدد غیرمنفی باشد"
    ),
});
