const month_word = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];



const get_month = (month) => { 
    switch (month) {
      case 0:
        return month_word[0];
      case 1:
        return month_word[1];
      case 2:
        return month_word[2];
      case 3:
        return month_word[3];
      case 4:
        return month_word[4];
      case 5:
        return month_word[5];
      case 6:
        return month_word[6];
      case 7:
        return month_word[7];
      case 8:
        return month_word[8];
      case 9:
        return month_word[9];
      case 10:
        return month_word[10];
      case 11:
        return month_word[11];

      default:
        break;
    }
}


export const createdTime = (createdTime) => {
  const time = new Date(createdTime);
  const date = time.getDate();
  const month = time.getMonth();
  const year = time.getFullYear();
  return `${date} ${get_month(month)} ${year}`;
};








