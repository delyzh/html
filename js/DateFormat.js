// 时间格式化，默认当前时间
function dateFmt(fmt, date = new Date()) {
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'S+': date.getMilliseconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    // eslint-disable-next-line no-param-reassign
    fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
  }
  Object.keys(o).forEach((k) => {
    if (new RegExp(`(${k})`).test(fmt)) {
      // eslint-disable-next-line no-param-reassign
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
    }
  });

  //   Object.keys(o)
  // .filter(k => new RegExp(`(${k})`).test(fmt))
  // .forEach((k) => {
  //   // eslint-disable-next-line no-param-reassign
  //   fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
  // });
  return fmt;
}


const DateFormat = {
  format: dateFmt,
  date_8(d = new Date()) {
    console.log(d);
    return dateFmt('yyyyMMdd', d);
  },
  date_10(d = new Date()) {
    console.log(d);
    return dateFmt('yyyy-MM-dd', d);
  },
};
export default DateFormat;
