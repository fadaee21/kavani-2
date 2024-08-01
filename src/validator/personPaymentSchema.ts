import { z } from "zod";

export const personPaymentSchema = z.object({
  name: z.string().min(1, "نام الزامی است"),
  lastName: z.string().min(1, "نام خانوادگی الزامی است"),
  mobile: z
    .string()
    .min(1, "شماره موبایل الزامی است")
    .refine((value) => value.startsWith("09") && value.length === 11, {
      message: "شماره موبایل نامعتبر است",
      path: ["mobile"],
    }),
  // amount: z
  //   .string()
  //   .min(1, "مبلغ الزامی است")
  //   .refine((value) => !isNaN(Number(value)), {
  //     message: "مبلغ نامعتبر است",
  //     path: ["amount"],
  //   }),
  // companyName: z.string().min(1, "نام شرکت الزامی است"),
  callBackUrl: z.string().url({ message: "URL نامعتبر است" }),
});
