import z from "zod";
import { MY_ACCOUNT } from ".";

export const MyAccountSchema = z.object({
  [MY_ACCOUNT.NAME]: z.string(),
  [MY_ACCOUNT.EMAIL]: z.string(),
  [MY_ACCOUNT.AVATAR_URL]: z.string().url().optional(),
  [MY_ACCOUNT.FURIGANA_NAME]: z.string().optional(),
  [MY_ACCOUNT.COMPANYNAME]: z.string(),
  [MY_ACCOUNT.YEAR_OF_BIRTH]: z.string().min(4).max(4).optional(),
  [MY_ACCOUNT.GENDER]: z.enum(["male", "female"]).optional(),
  [MY_ACCOUNT.HEIGHT]: z.number().min(0).optional(),
  [MY_ACCOUNT.WEIGHT]: z.number().min(0).optional(),
  [MY_ACCOUNT.HEALTH_DATA_PRIVACY]: z.boolean(),
  [MY_ACCOUNT.PROFILE_DATA_PRIVACY]: z.boolean(),
});
export type MyAccount = z.infer<typeof MyAccountSchema>;
