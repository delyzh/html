class YcdDate extends Date {
  constructor(date, format) {
    if (format) {
      console.log('------');
    }
    if (date === undefined) {
      super();
    } else {
      super(date);
    }
  }

  isBefore(date) {
    return this.getTime() < date.getTime();
  }

  add(num, unit) {
    const millions = {
      day: 24 * 3600 * 1000,
      hour: 3600 * 1000,
    };
    const number = millions[unit] * num;
    // console.log('this.getTime()', this, super.toString());
    return new YcdDate(new Date(this.getTime() + number));
  }
  // eslint-disable-next-line class-methods-use-this
  startTime(time) {
    const nowTimeDate = new Date(time);
    return nowTimeDate.setHours(0, 0, 0, 0);
  }
  startTimeHour(time,h) {
    const nowTimeDate = new Date(time);
    return nowTimeDate.setHours(h, 0, 0, 0);
  }
  clone() {
    return new YcdDate(super.getTime());
  }
}

const getDate = () => new Date();

const getWeekZh = (date = new Date()) => ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][date.getDay()];
// function addDate(date, expr, unit = 'd') {
//   const d = (date instanceof Date) ? date : new Date(date);
//   let s = 0;
//   if (unit === 'd') {
//     s = 24 * 3600 * expr;
//   } else if (unit === 's') {
//     s = expr;
//   } else {
//     throw new Error(`invalid time unit: ${unit}`);
//   }
//   return new Date(d.getTime() + s);
// }

function dayDiff(date1, date2) {
  const d1 = (date1 instanceof Date) ? date1 : new Date(date1);
  const d2 = (date2 instanceof Date) ? date2 : new Date(date2);
  // eslint-disable-next-line no-mixed-operators
  return parseInt(((d1.getTime() - d2.getTime()) / (24 * 3600) + 0.5), 10);
}

function dates(start, end, unit = 'day') {
  let s = new YcdDate(start);
  const e = new YcdDate(end);
  const res = [];
  while (s.isBefore(e)) {
    res.push(s.clone());
    s = s.add(1, unit);
  }
  // console.log('res', res);
  return res;
}

export {
  YcdDate,
  getDate,
  getWeekZh,
  // addDate,
  dayDiff,
  dates,
};
