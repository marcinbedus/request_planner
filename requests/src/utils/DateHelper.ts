import moment from "moment";

class DateHelper {
  private areDatesOnTheSameDay = (dateToBeChecked: Date) => {
    const currentDate = new Date();

    return (
      currentDate.getFullYear() === dateToBeChecked.getFullYear() &&
      currentDate.getMonth() === dateToBeChecked.getMonth() &&
      currentDate.getDate() === dateToBeChecked.getDate()
    );
  };

  private areDatesInTheSameMinute = (dateToBeChecked: Date) => {
    const currentDate = new Date();

    return (
      currentDate.getMinutes() === dateToBeChecked.getMinutes() &&
      currentDate.getHours() === dateToBeChecked.getHours()
    );
  };

  public isDateSameWithCurrent = (dataToBeChecked: Date) =>
    this.areDatesOnTheSameDay(dataToBeChecked) &&
    this.areDatesInTheSameMinute(dataToBeChecked);

  public getCurrentMinuteOfTheDay = () => {
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();
    return currentHour * 60 + currentMinute;
  };

  public getCurrentTime = () => {
    const currentTime = moment().utcOffset(60).format("HH:mm");

    return currentTime;
  };
}

export default new DateHelper();
