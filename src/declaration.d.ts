// import messages from "../messages/en.json";

declare module "*.png" {
  import { type StaticImageData } from "next/image";
  const value: StaticImageData;
  export default value;
}

// declare module "next-intl" {
//   interface AppConfig {
//     Messages: typeof messages;
//   }
// }

type Messages = typeof import("../messages/en.json");
type IntlMessages = Messages;
