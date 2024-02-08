import EventData from "../../../custom_hooks/eventData";
import Common from "../common/common";
import EventContext from "../../../context/eventContext";
import { useContext } from "react";

function Birthday() {
  EventData('birthday');
  const { birthdayData } = useContext<any>(EventContext);
  const newBirthdayData = birthdayData;

  const newData = {
    today:
      (newBirthdayData.today &&
        newBirthdayData.today.map((item: any) => {
          item.date = item.dateOfBirth;
          delete item["dateOfBirth"];
          return item;
        })) ||
      [],

    passed:
      (newBirthdayData.passed &&
        newBirthdayData.passed.map((item: any) => {
          item.date = item.dateOfBirth;
          delete item["dateOfBirth"];
          return item;
        })) ||
      [],

    upcoming:
      (newBirthdayData.upcoming &&
        newBirthdayData.upcoming.map((item: any) => {
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
