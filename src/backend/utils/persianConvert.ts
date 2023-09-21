export class PersianConvert {
  public static convertPersian2English = (string: string | null) => {
    if (!string) return null;
    if (string.length === 0) return "";
    return string.replace(/[\u0660-\u0669\u06f0-\u06f9]/g, (c: string) => {
      return (c.charCodeAt(0) & 0xf).toString();
    });
  };
}
