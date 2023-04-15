export const numberWithCommas = (number) => {
    let internationalNumberFormat = new Intl.NumberFormat("en-US");
    return internationalNumberFormat.format(number);
  };