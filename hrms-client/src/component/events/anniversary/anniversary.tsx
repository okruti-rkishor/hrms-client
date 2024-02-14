import EventData from "../../../custom_hooks/eventData";
import Common from "../common/common";
import EventContext from "../../../context/eventContext";
import { useContext } from "react";

function Anniversary() {
  EventData('anniversary');
  const { anniversaryData } = useContext<any>(EventContext);
  const newAnniversaryData = anniversaryData;

  const newData = {
    today:
      (newAnniversaryData.today &&
        newAnniversaryData.today.map((item: any) => {
          item.date = item.dateOfJoining;
          delete item["dateOfJoining"];
          return item;
        })) ||
      [],

    passed:
      (newAnniversaryData.passed &&
        newAnniversaryData.passed.map((item: any) => {
          item.date = item.dateOfJoining;
          delete item["dateOfJoining"];
          return item;
        })) ||
      [],

    upcoming:
      (newAnniversaryData.upcoming &&
        newAnniversaryData.upcoming.map((item: any) => {
          item.date = item.dateOfJoining ??item.dateOfJoining;
          delete item["dateOfJoining"];
          return item;
        })) ||
      [],
  };

  return (
    <>
      <Common data={newData} event={"Work Anniversary"} />
    </>
  );
}

export default Anniversary;
