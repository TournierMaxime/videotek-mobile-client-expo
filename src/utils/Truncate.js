export function truncateTitle(title, language, maxLength) {
  if (language === 'zh-cn' || language === 'ko' || language === 'ja') {
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

  // Rest of the code for other languages
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
  