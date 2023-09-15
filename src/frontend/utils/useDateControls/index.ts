const useDateControls = () => {
  const d = new Date();

  const getDesiredDate = (dAddition?: number) => {
    const dateCopy = new Date();
    const parsedDate = new Intl.DateTimeFormat("en-GB", {
      dateStyle: "short",
    }).format(dateCopy.setDate(d.getDate() + (dAddition || 0)));

    return parsedDate.split("/").reverse().join("-");
  };

  const formatDate = (date: string) => {
    const copyDate = new Date(date);
    const parsedDate = new Intl.DateTimeFormat("en-GB", {
      dateStyle: "short",
    }).format(copyDate);

    return parsedDate.split("/").reverse().join("-");
  };

  return { d, getDesiredDate, formatDate };
};

export { useDateControls };
