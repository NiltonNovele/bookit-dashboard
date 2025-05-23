// resend.config.js
import { Resend } from "resend";

const resend = new Resend("re_ddqy2Kir_MohBnwX3fbigXexoCaTPNDVK"); // Get this from your Resend dashboard

const sender = {
  email: "onboarding@resend.dev", // This must match your verified domain
  name: "Nilton Novele",
};

export { resend, sender };
