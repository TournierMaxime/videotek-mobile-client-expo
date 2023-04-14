export function truncateTitle(title, maxLength) {
    let length = 0;
    let truncatedTitle = "";
  
    for (const char of title) {
      const code = char.charCodeAt(0);
      length += code < 0x10000 ? 1 : 2;
      if (length > maxLength) {
        truncatedTitle += "...";
        break;
      }
      truncatedTitle += char;
    }
  
    return truncatedTitle;
  }

  export function truncateOverview(title, maxLength) {
    if (typeof title !== 'string') {
      return '';
    }
  
    let length = 0;
    let truncatedOverview = "";
  
    for (const char of title) {
      const code = char.charCodeAt(0);
      length += code < 0x10000 ? 1 : 2;
      if (length > maxLength) {
        truncatedOverview += "...";
        break;
      }
      truncatedOverview += char;
    }
  
    return truncatedOverview;
  }
  