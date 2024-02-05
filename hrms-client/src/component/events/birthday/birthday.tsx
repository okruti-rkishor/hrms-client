import BirthdayData from "../../../custom_hooks/birthdayData";
import Common from "../common/common";
import BirthdayContext from "../../../context/birthdayContext";
import { useContext } from "react";

function Birthday() {
  const [birthDayValue, anniveValue] = BirthdayData('birthday');
  const { birthdayData } = useContext<any>(BirthdayContext);
  console.log("Birthday:", birthdayData);
  const data11 = birthdayData;

  const newData = {
    today:
      (data11.today &&
        data11.today.map((item: any) => {
          item.date = item.dateOfBirth;
          delete item["dateOfBirth"];
          return item;
        })) ||
      [],

    passed:
      (data11.passed &&
        data11.passed.map((item: any) => {
          item.date = item.dateOfBirth;
          delete item["dateOfBirth"];
          return item;
        })) ||
      [],

    upcoming:
      (data11.upcoming &&
        data11.upcoming.map((item: any) => {
          item.date = item.dateOfBirth;
          delete item["dateOfBirth"];
          return item;
        })) ||
      [],
  };

  return (
    <>
      <Common data={newData} event="Birthday" />
    </>
  );
}

export default Birthday;
