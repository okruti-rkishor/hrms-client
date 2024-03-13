import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import rest from "../../../services/http/api";
import { capitalToSmall } from "../../holiday/holidayList";
import { removeUnderScore } from "../../holiday/holidayList";
import {
  Divider,
  Tabs,
  Space,
  Card,
  Flex,
  Typography,
  Button,
  Avatar,
} from "antd";
import Icon, {
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./employeeDetail.scss";
import { icons } from "antd/es/image/PreviewGroup";

const data = {
  id: "c3cdfc16-7d4c-44ba-88a2-61b21e03513f",
  type: "FULL_TIME",
  status: "ACTIVE",
  employeeCode: "oksivvp29a6s",
  designation: "SENIOR_SOFTWARE_DEVELOPER",
  joiningDate: "2023-01-27",
  exitDate: null,
  officialEmail: "djangid@okruti.com",
  email: "djangid@okruti.com",
  totalExperience: "2 years",
  name: {
    title: "Mr",
    firstName: "Dharmendra",
    middleName: null,
    lastName: "Jangid",
  },
  gender: "MALE1",
  dateOfBirth: "1996-07-07",
  age: 28,
  qualification: "Graduation",
  contact: "7014376691",
  bloodGroup: "O_POSITIVE",
  presentAddress: {
    line1: "29",
    line2: "Samta nagar",
    city: "Jaipur",
    state: "Rajasthan",
    zipCode: "12345",
  },
  permanentAddress: {
    line1: "23",
    line2: "Madhauganj",
    city: "Shikohabad",
    state: "UP",
    zipCode: "283141",
  },
  previousExperiences: [
    {
      id: "fdc43e3d-e10a-4ee0-8b3b-c5b8f31e82ab",
      employerName: "Okruti it Consulting Pvt Ltd",
      designation: "SOFTWARE_DEVELOPER",
      duration: {
        startDate: "2023-01-27",
        endDate: "2023-02-24",
      },
      totalExperience: "2",
      annualCTC: "2399",
      skills: ["r", "e", "a", "c", "t"],
      reasonForLeaving: "no",
    },
    {
      id: "18cd83d8-a73b-45ef-8713-dd5e47d1a77d",
      employerName: "Tudip Digital",
      designation: "SENIOR_SOFTWARE_DEVELOPER",
      duration: {
        startDate: "2023-01-27",
        endDate: "2023-02-24",
      },
      totalExperience: "2",
      annualCTC: "8988",
      skills: ["r", "e", "a", "c", "t"],
      reasonForLeaving: "no",
    },
  ],
  familyDetails: [
    {
      id: "c3132cea-c57c-4423-b422-1eaaf235d358",
      name: "dha",
      gender: "MALE",
      relationType: "Mother",
      mobileNumber: "7657765756",
    },
    {
      id: "e6b90bb2-f6a8-4e61-8c76-446a3bb04f1b",
      name: "Dharmendra",
      gender: "MALE",
      relationType: "Father",
      mobileNumber: "7878787878",
    },
    {
      id: "e6b90bb2-f6a8-4e61-8c76-446a3bb04f1b",
      name: "Dharmendra",
      gender: "FEMALE",
      relationType: "Spouse",
      mobileNumber: "7878787878",
    },
  ],
  bankDetails: {
    id: "9609e31e-59b4-4d59-aa56-857a9c39859b",
    accountHolderName: "Dharmendra",
    accountNumber: "899797889899",
    branchName: "Dharmendra number",
    branchCode: "BHJIKU1",
    ifscCode: "67756",
  },
  documents: [
    {
      id: "8ce9b591-5ce9-4760-be85-e45e2785edc1",
      fileName: "496a896c-3e85-4c5c-ade5-faf7d0df2208.pdf",
      originalFileName: "Gaurav_Joshi_Resume.pdf",
      downloadLocation: null,
      contentType: "application/pdf",
      baseLocation: "hrms-s3-bucket/496a896c-3e85-4c5c-ade5-faf7d0df2208.pdf",
      documentType: "SSC",
      documentNumber: null,
      fileSize: "107 KB",
    },
    {
      id: "46b9f0e6-fbab-46e4-928e-94b8298d9598",
      fileName: "d4e46664-95c6-4369-a592-6374057d3a28.pdf",
      originalFileName: "Gaurav_Joshi_Resume.pdf",
      downloadLocation: null,
      contentType: "application/pdf",
      baseLocation: "hrms-s3-bucket/d4e46664-95c6-4369-a592-6374057d3a28.pdf",
      documentType: "AADHAAR_CARD",
      documentNumber: "898989775570",
      fileSize: "107 KB",
    },
    {
      id: "3dcbc0ce-b7e4-481a-bf59-67fb99d10c5c",
      fileName: "c6406724-d30e-40b5-af5d-8c81e83b80a1.pdf",
      originalFileName: "Gaurav_Joshi_Resume.pdf",
      downloadLocation: null,
      contentType: "application/pdf",
      baseLocation: "hrms-s3-bucket/c6406724-d30e-40b5-af5d-8c81e83b80a1.pdf",
      documentType: "PAN_CARD",
      documentNumber: "998997889876",
      fileSize: "107 KB",
    },
  ],
  audit: {
    createdOn: "2024-02-07T09:46:45.279",
    createdBy: "anonymousUser",
    lastModifiedOn: "2024-02-07T11:39:48.599",
    lastModifiedBy: "anonymousUser",
  },
};

const EmployeeDetailComponent: FC = () => {
  const { id } = useParams();
  const [employeeData, setEmployeeData] = useState<any>({});
  // const { token } = theme.useToken();
  // const panelStyle: React.CSSProperties = {
  //   marginBottom: 36,
  //   background: token.colorFillAlter,
  //   borderRadius: token.borderRadiusLG,
  //   border: "none",
  // };
  const sections = [
    {
      name: "About",
      element: (
        // <div className="family-detail card" style={{ gap: "20px" }}>
        <div>
          <Card style={{ textAlign: "left" }}>
            <Flex vertical={true} gap={20}>
              <Flex vertical>
                <h3>About</h3>
                <span>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </span>
              </Flex>
              <Flex vertical>
                <h3>About</h3>
                <span>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
                  excepturi similique veniam laboriosam nulla quas
                </span>
              </Flex>
              <Flex vertical>
                <h3>About</h3>
                <span>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
                  excepturi
                </span>
              </Flex>
            </Flex>
          </Card>
        </div>
      ),
    },
    {
      name: "Family Details",
      element: (
        <div className="family-detail">
          {(employeeData?.familyDetails ?? 0) &&
            employeeData?.familyDetails.map((familydetail: any) => (
              <Card
                key={familydetail.relationType}
                className="family-detail-card"
                style={{ width: "fit-content" }}
              >
                {familydetail.relationType === "Mother" && (
                  <Divider>
                    <img
                      className="logo"
                      src="data:image/png;base64,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"
                      alt="..."
                    />
                    Mother
                  </Divider>
                )}
                {familydetail.relationType === "Father" && (
                  <Divider>
                    <img
                      className="logo"
                      src="https://img.freepik.com/premium-vector/father-family-memeber-avatar-vector-illustration-design_24877-15519.jpg"
                      alt="..."
                    />
                    Father
                  </Divider>
                )}
                {familydetail.relationType === "Spouse" && (
                  <Divider>
                    <img
                      className="logo"
                      src="https://e7.pngegg.com/pngimages/661/846/png-clipart-happiness-husband-wife-marriage-hug-couple-love-couple-thumbnail.png"
                      alt="..."
                    />
                    Spouse
                  </Divider>
                )}
                <Flex vertical>
                  <Flex justify="space-between">
                    <span>Relation with Employee:</span>
                    <span>{familydetail.relationType}</span>
                  </Flex>
                  <Flex justify="space-between">
                    <span>Name: </span>
                    <span>{familydetail.name}</span>
                  </Flex>
                  <Flex justify="space-between">
                    <span>Mobile Number : </span>
                    <span>{familydetail.mobileNumber}</span>
                  </Flex>
                </Flex>
              </Card>
            ))}
        </div>
      ),
    },
    {
      name: "Previous Experiences",
      element: (
        <div className="previous-experience-detail-container">
          <div style={{ display: "flex" }}>
            {employeeData.previousExperiences &&
              employeeData.previousExperiences.map((item: any) => {
                return (
                  <div className="detail-card">
                    <Space direction="vertical" size={16}>
                      <Card
                        title={item?.employerName}
                        // extra={<a href="#">More</a>}
                        style={{ width: 300 }}
                      >
                        <Flex vertical justify="flex-start">
                          <Flex justify="space-between">
                            <span>Total Experience:</span>
                            <span>{item?.totalExperience + " Years"}</span>
                          </Flex>
                          <Flex justify="space-between">
                            <span>Start Date: </span>
                            <span>{item?.duration?.startDate}</span>
                          </Flex>
                          <Flex justify="space-between">
                            <span>End Date: </span>
                            <span>{item?.duration?.endDate}</span>
                          </Flex>
                          <Flex justify="space-between">
                            <span>Annual CTC: </span>
                            <span>{item?.annualCTC}</span>
                          </Flex>
                          <Flex justify="space-between">
                            <span>Designation: </span>
                            <span>
                              {removeUnderScore(item?.designation, "_")}
                            </span>
                          </Flex>
                        </Flex>
                      </Card>
                    </Space>
                    {/* <span>
                Ifsc Code:{" "}
                {employeeData.bankDetails
                  ? employeeData?.bankDetails[0]?.ifscCode
                  : ""}
              </span> */}
                  </div>
                );
              })}
          </div>
        </div>
      ),
    },
    {
      name: "Address",
      element: (
        <Flex gap={"large"}>
          {/* <div className="detail-card"> */}
          <Card
            className="permanent-address-container"
            extra={
              <Divider>
                <Flex>
                  <img
                    className="logo"
                    src="https://e7.pngegg.com/pngimages/526/91/png-clipart-website-home-page-home-inspection-house-size-icon-homepage-miscellaneous-blue-thumbnail.png"
                    alt=""
                  />
                  Permanant Address
                </Flex>
              </Divider>
            }
            style={{ textAlign: "left", padding: "20px" }}
          >
            <Flex vertical gap={"small"}>
              <span>
                House Number:{" "}
                {employeeData.presentAddress
                  ? employeeData.presentAddress?.line1
                  : ""}
              </span>
              <span>
                Colony:{" "}
                {employeeData.presentAddress
                  ? employeeData.presentAddress?.line2
                  : ""}
              </span>
              <span>
                City:{" "}
                {employeeData.presentAddress
                  ? employeeData.presentAddress?.city
                  : ""}
              </span>
              <span>
                State:{" "}
                {employeeData.presentAddress
                  ? employeeData.presentAddress?.state
                  : ""}
              </span>
              <span>
                Postal Code:{" "}
                {employeeData.presentAddress
                  ? employeeData?.presentAddress?.zipCode
                  : ""}
              </span>
            </Flex>
          </Card>
          {/* </div> */}

          <Card
            style={{ textAlign: "left", padding: "20px" }}
            extra={
              <>
                <Flex>
                  <img className="logo" src={"/icons/homeAddress.png"} alt="" />{" "}
                  Permanant Address
                </Flex>
              </>
            }
          >
            <Flex vertical justify="flex-start" gap={"small"}>
              <span>
                House Number:{" "}
                {employeeData.permanentAddress
                  ? employeeData.permanentAddress?.line1
                  : ""}
              </span>
              <span>
                Colony:{" "}
                {employeeData.permanentAddress
                  ? employeeData.permanentAddress?.line2
                  : ""}
              </span>
              <span>
                City:{" "}
                {employeeData.permanentAddress
                  ? employeeData.permanentAddress?.city
                  : ""}
              </span>
              <span>
                State:{" "}
                {employeeData.permanentAddress
                  ? employeeData.permanentAddress?.state
                  : ""}
              </span>
              <span>
                Postal Code:{" "}
                {employeeData.permanentAddress
                  ? employeeData?.permanentAddress?.zipCode
                  : ""}
              </span>
            </Flex>
          </Card>
        </Flex>

        // </div>
      ),
    },

    {
      name: "Bank Details",
      element: (
        <div className="personal-detail">
          <Card
            style={{ padding: "20px", width: "fit-content" }}
            extra={
              <Divider>
                <img
                  className="logo"
                  src="https://w7.pngwing.com/pngs/223/204/png-transparent-bank-logo-bank-saving-bank-pic-building-structure-bank-thumbnail.png"
                  alt=""
                />{" "}
                Account Information
              </Divider>
            }
          >
            <Flex justify="left" vertical gap={10}>
              <Flex justify="space-between">
                <span>Account Number: </span>
                <span>
                  {employeeData.bankDetails
                    ? employeeData.bankDetails?.accountNumber
                    : ""}
                </span>
              </Flex>
              <Flex justify="space-between">
                <span>Account Holder Name: </span>
                <span>
                  {employeeData.bankDetails
                    ? employeeData.bankDetails?.accountHolderName
                    : ""}
                </span>
              </Flex>
              <Flex justify="space-between">
                <span>Branch Name: </span>
                <span>
                  {employeeData.bankDetails
                    ? employeeData.bankDetails?.branchName
                    : ""}
                </span>
              </Flex>
              <Flex justify="space-between">
                <span>Branch Code: </span>
                <span>
                  {employeeData.bankDetails
                    ? employeeData.bankDetails.branchCode
                    : ""}
                </span>
              </Flex>
              <Flex justify="space-between">
                <span>Ifsc Code: </span>
                <span>
                  {employeeData.bankDetails
                    ? employeeData?.bankDetails[0]?.ifscCode
                    : ""}
                </span>
              </Flex>
            </Flex>
          </Card>
        </div>
        // </div>
      ),
    },
    {
      name: "Documents",
      element: (
        <Flex className="documents-detail card" gap={20}>
          {employeeData.documents?.map((item: any) => (
            <>
              <Card
                key={item.documentNumber}
                title={removeUnderScore(item.documentType, "_")}
                // extra={<a href="#">Show</a>}
                style={{ width: 300 }}
              >
                <Flex vertical gap={10}>
                  <span>
                    Document Number:{" "}
                    {item?.documenttNumber ? item?.documenttNumber : ""}
                  </span>
                  <span>
                    Document Name: {item?.documentType ? item.documentType : ""}
                  </span>
                  <span>
                    Document Name:{" "}
                    {employeeData.documents
                      ? employeeData.documents[0]?.documentType
                      : ""}
                  </span>
                </Flex>
              </Card>
            </>
          ))}
        </Flex>
      ),
    },
  ];

  useEffect(() => {
    // rest
    //   .employeeDetailsByID(id)
    //   .then((response: any) => {
    //     setEmployeeData(response);
    //   })
    //   .catch((error: any) => {
    //     console.log(error);
    //   });
    setEmployeeData(data);
  }, [id]); //[id]

  const cardStyle: React.CSSProperties = {
    // width: auto,
  };

  const imgStyle: React.CSSProperties = {
    display: "block",
    width: 273,
  };
  return (
    <div className="employee-detail-container">
      {/* <div className="sections"> */}
      <Card style={cardStyle}>
        <Flex justify="flex-start" gap={"middle"}>
          {/* <img
            alt="avatar"
            src="https://www.shutterstock.com/image-photo/smiling-bearded-man-holding-laptop-260nw-2127373250.jpg"
            style={imgStyle}
          /> */}
          <Avatar
            style={{ backgroundColor: "#fde3cf", color: "#000000" }}
            size={250}
            icon={<UserOutlined />}
          />
          <Flex
            vertical
            align="flex-start"
            // justify="space-between"
            style={{ padding: 32 }}
          >
            {/* <Typography.Title level={3}>
                “antd is an enterprise-class UI design language and React UI
                library.”
              </Typography.Title> */}
            {/* <Button type="primary" href="https://ant.design" target="_blank">
                Edit
              </Button> */}

            <span className="name">
              {employeeData.name?.firstName ??
                "" + " " + employeeData.name?.middleName ??
                "" + " " + employeeData.name?.lastName ??
                ""}
            </span>
            <Flex vertical={false} justify="flex-start" gap={"large"}>
              <span>
                <img
                  className="location-logo"
                  src="https://icons.veryicon.com/png/o/photographic/ant-design-official-icon-library/location-37.png"
                  alt="..."
                />
                {employeeData.permanentAddress?.city} {" | "}
                {employeeData.permanentAddress?.state}
              </span>
              <span>
                <PhoneOutlined />
                {` +91  ${employeeData.contact}`}
              </span>

              <span>
                <MailOutlined />
                {" " + employeeData.officialEmail}
              </span>
            </Flex>
            <Divider></Divider>
            <Flex justify="flex-start" gap={"large"}>
              <span>
                ID:
                <br />
                {employeeData.id}
              </span>

              <span>
                DESIGNATION:
                <br />
                {removeUnderScore(employeeData.designation, "_")}
              </span>

              <span>
                JOB TYPE:
                <br />
                {removeUnderScore(employeeData.type, "_")}
              </span>

              <span>
                EMPLOYEE CODE:
                <br />
                {employeeData.employeeCode}
              </span>
              <span>
                JOINING DATE:
                <br />
                {employeeData.joiningDate}
              </span>
            </Flex>
          </Flex>
        </Flex>
      </Card>
      <Card>
        <Flex justify="flex-start" gap={"large"}>
          <Card>
            <div className="details">
              <div className="detail-column">
                <span style={{ display: "flex" }}>
                  <img
                    className="logo"
                    src="https://static.vecteezy.com/system/resources/previews/013/366/641/original/birthday-cake-silhouette-for-icon-symbol-pictogram-apps-website-art-illustration-logo-or-graphic-design-element-format-png.png"
                    alt="..."
                  />
                  Birthday: <br /> {employeeData.dateOfBirth}
                </span>
                <span>
                  Gender: <br /> {employeeData.gender}
                </span>
                <span>
                  Age: <br /> {employeeData.age}
                </span>
                <span>
                  {/* <img src="" className="logo" alt="..." /> */}
                  Blood Group: <br />{" "}
                  {removeUnderScore(employeeData.bloodGroup, "_")}
                </span>
              </div>
              <div className="detail-column">
                <span style={{ display: "flex" }}>
                  <img
                    src="https://w7.pngwing.com/pngs/503/524/png-transparent-1st-anniversary-logo-wedding-anniversary-wedding-invitation-party-first-anniversary-holidays-text-wedding-thumbnail.png"
                    className="logo"
                    alt="..."
                  />
                  Working Anniversary: <br /> {employeeData.joiningDate}
                </span>
                {/* <span>Personal Email: <br /> {employeeData.email}</span> */}
                <span style={{ display: "flex" }}>
                  {/* <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/qualification-3351293-2789363.png" className="logo" alt="..." /> */}
                  Heiest Qualification: <br /> {employeeData.qualification}
                </span>
                <span>
                  Total Experience: <br /> {employeeData.totalExperience}
                </span>
                {/* <span>
                  Mobile Number: <br /> {employeeData.contact}
                </span> */}
              </div>
            </div>
          </Card>
          <Flex>
            <Tabs
              defaultActiveKey="2"
              items={sections.map((item, i) => {
                const id = String(i + 1);
                return {
                  key: id,
                  label: item.name,
                  children: item.element,
                  icon: <Icon />,
                };
              })}
            />
          </Flex>
        </Flex>
      </Card>

      {/* </div> */}
    </div>
  );
};

export default EmployeeDetailComponent;
