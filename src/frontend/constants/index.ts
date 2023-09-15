export interface IDictionary<T> {
  [Key: string]: T;
}

export const RE_DIGIT = new RegExp(/^\d+$/);

export const MOBILE_FORMAT = new RegExp(
  /^([\u06F0]|[0])([\u06F9]|[9])(([\u06F0-\u06F9]|[0-9]){2})(([\u06F0-\u06F9]|[0-9]){3})(([\u06F0-\u06F9]|[0-9]){4})/
);

export const REMITTANCE_STATUS: IDictionary<string> = {
  temp: "باز",
  completed: "تکمیل شده",
};

export const POS_DICTIONARY: IDictionary<string> = {
  BPM: "به پرداخت ملت",
  PEC: "پارسیان",
  SEP: "سامان کیش",
};
