import EventData from "../../../custom_hooks/eventData";
import Common from "../common/common";
import EventContext from "../../../context/eventContext";
import { useContext } from "react";

function Birthday() {
  EventData('birthday');
  const { birthdayData } = useContext<any>(EventContext);
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
