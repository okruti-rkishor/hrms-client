import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import rest from "../../../services/http/api";
import { removeUnderScore } from "../../holiday/holidayList";
import {
  Divider,
  Tabs,
  Space,
  Card,
  Flex,
  Avatar,
  Layout,
  Button,
  Dropdown,
  MenuProps,
  message,
} from "antd";
import Icon, {
  MailOutlined,
  PhoneOutlined,
  PrinterOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "../../../styles/component/employeeDetail.scss";
import {
  CaretDownOutlined,
  DeleteTwoTone,
  DownOutlined,
  EditOutlined,
  EditTwoTone,
  HomeTwoTone,
  MailTwoTone,
  PhoneTwoTone,
} from "@ant-design/icons/lib";
import { PageHeader } from "@ant-design/pro-layout";

// const data = {
//   id: "c3cdfc16-7d4c-44ba-88a2-61b21e03513f",
//   type: "FULL_TIME",
//   status: "ACTIVE",
//   employeeCode: "oksivvp29a6s",
//   designation: "SENIOR_SOFTWARE_DEVELOPER",
//   joiningDate: "2023-01-27",
//   exitDate: null,
//   officialEmail: "djangid@okruti.com",
//   email: "djangid@okruti.com",
//   totalExperience: "2 years",
//   name: {
//     title: "Mr",
//     firstName: "Abhishek",
//     middleName: null,
//     lastName: "Singh",
//   },
//   gender: "MALE1",
//   dateOfBirth: "1996-07-07",
//   age: 28,
//   qualification: "Graduation",
//   contact: "7014376691",
//   bloodGroup: "O_POSITIVE",
//   presentAddress: {
//     line1: "29",
//     line2: "Samta nagar",
//     city: "Jaipur",
//     state: "Rajasthan",
//     zipCode: "12345",
//   },
//   permanentAddress: {
//     line1: "23",
//     line2: "Madhauganj",
//     city: "Shikohabad",
//     state: "UP",
//     zipCode: "283141",
//   },
//   previousExperiences: [
//     {
//       id: "fdc43e3d-e10a-4ee0-8b3b-c5b8f31e82ab",
//       employerName: "Okruti it Consulting Pvt Ltd",
//       designation: "SOFTWARE_DEVELOPER",
//       duration: {
//         startDate: "2023-01-27",
//         endDate: "2023-02-24",
//       },
//       totalExperience: "2",
//       annualCTC: "2399",
//       skills: ["r", "e", "a", "c", "t"],
//       reasonForLeaving: "no",
//     },
//     {
//       id: "18cd83d8-a73b-45ef-8713-dd5e47d1a77d",
//       employerName: "Tudip Digital",
//       designation: "SENIOR_SOFTWARE_DEVELOPER",
//       duration: {
//         startDate: "2023-01-27",
//         endDate: "2023-02-24",
//       },
//       totalExperience: "2",
//       annualCTC: "8988",
//       skills: ["r", "e", "a", "c", "t"],
//       reasonForLeaving: "no",
//     },
//   ],
//   familyDetails: [
//     {
//       id: "c3132cea-c57c-4423-b422-1eaaf235d358",
//       name: "dha",
//       gender: "MALE",
//       relationType: "Mother",
//       mobileNumber: "7657765756",
//     },
//     {
//       id: "e6b90bb2-f6a8-4e61-8c76-446a3bb04f1b",
//       name: "Dharmendra",
//       gender: "MALE",
//       relationType: "Father",
//       mobileNumber: "7878787878",
//     },
//     {
//       id: "e6b90bb2-f6a8-4e61-8c76-446a3bb04f1b",
//       name: "Dharmendra",
//       gender: "FEMALE",
//       relationType: "Spouse",
//       mobileNumber: "7878787878",
//     },
//   ],
//   bankDetails: {
//     id: "9609e31e-59b4-4d59-aa56-857a9c39859b",
//     accountHolderName: "Dharmendra",
//     accountNumber: "899797889899",
//     branchName: "Dharmendra number",
//     branchCode: "BHJIKU1",
//     ifscCode: "67756",
//   },
//   documents: [
//     {
//       id: "8ce9b591-5ce9-4760-be85-e45e2785edc1",
//       fileName: "496a896c-3e85-4c5c-ade5-faf7d0df2208.pdf",
//       originalFileName: "Gaurav_Joshi_Resume.pdf",
//       downloadLocation: null,
//       contentType: "application/pdf",
//       baseLocation: "hrms-s3-bucket/496a896c-3e85-4c5c-ade5-faf7d0df2208.pdf",
//       documentType: "SSC",
//       documentNumber: null,
//       fileSize: "107 KB",
//     },
//     {
//       id: "46b9f0e6-fbab-46e4-928e-94b8298d9598",
//       fileName: "d4e46664-95c6-4369-a592-6374057d3a28.pdf",
//       originalFileName: "Gaurav_Joshi_Resume.pdf",
//       downloadLocation: null,
//       contentType: "application/pdf",
//       baseLocation: "hrms-s3-bucket/d4e46664-95c6-4369-a592-6374057d3a28.pdf",
//       documentType: "AADHAAR_CARD",
//       documentNumber: "898989775570",
//       fileSize: "107 KB",
//     },
//     {
//       id: "3dcbc0ce-b7e4-481a-bf59-67fb99d10c5c",
//       fileName: "c6406724-d30e-40b5-af5d-8c81e83b80a1.pdf",
//       originalFileName: "Gaurav_Joshi_Resume.pdf",
//       downloadLocation: null,
//       contentType: "application/pdf",
//       baseLocation: "hrms-s3-bucket/c6406724-d30e-40b5-af5d-8c81e83b80a1.pdf",
//       documentType: "PAN_CARD",
//       documentNumber: "998997889876",
//       fileSize: "107 KB",
//     },
//   ],
//   audit: {
//     createdOn: "2024-02-07T09:46:45.279",
//     createdBy: "anonymousUser",
//     lastModifiedOn: "2024-02-07T11:39:48.599",
//     lastModifiedBy: "anonymousUser",
//   },
// };

const EmployeeDetailComponent02 = () => {
  const { id } = useParams();
  const [employeeData, setEmployeeData] = useState<any>({});
  // const { token } = theme.useToken();

  const sections = [
    {
      name: "About",
      element: (
        <Flex vertical={true} gap={20}>
          <PageHeader
            className="employee-details__page-header"
            title="Basic Details"
          />
          <Flex vertical>
            {/* <h3>About</h3> */}
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              excepturi similique veniam laboriosam nulla quas illum excepturi
              sit amet consectetur adipisicing elit. Illum excepturi similique
            </span>
          </Flex>
          {/* <Flex vertical>
            <h3>About</h3>
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              excepturi similique veniam laboriosam nulla quas
            </span>
          </Flex> */}
          <Card>
          <h3>Personal-Detail</h3>
             <Flex vertical>
               <span>Personal-Email:{employeeData.email}</span>
               <span>Joining-Email:{employeeData.joiningDate}</span>
               <span>Total Experience:{employeeData.totalExperience}</span>
               <span>Gender:{employeeData.gender}</span>
               <span>Date Of Birth:{employeeData.dateOfBirth}</span>
               </Flex>
          </Card>
        </Flex>
      ),
    },
    {
      name: "Family Details",
      element: (
        <section>
          <PageHeader
            className="employee-details__page-header"
            title="Family Details"
          />
          <div className="family-detail">
            {(employeeData?.familyDetails ?? 0) &&
              employeeData?.familyDetails.map((familydetail: any) => (
                <Card
                  key={familydetail.relationType}
                  className="family-detail-card"
                >
                  <Divider>
                    {familydetail.relationType ?? familydetail.relationType}
                  </Divider>
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
        </section>
      ),
    },
    {
      name: "Experiences",
      element: (
        <div className="previous-experience-detail-container">
          <PageHeader
            className="employee-details__page-header"
            title="Experience"
          />
          <div style={{ display: "flex" }}>
            {employeeData.experiences &&
              employeeData.experiences.map((item: any) => {
                return (
                  <div className="detail-card">
                    <Space direction="vertical" size={16}>
                      <Card title={item?.employerName}>
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
                              {removeUnderScore(
                                String(item?.designation.code),
                                "_"
                              )}
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
          <PageHeader
            className="employee-details__page-header"
            title="Address Details"
          />
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
      ),
    },
    {
      name: "Bank Details",
      element: (
        <div className="personal-detail">
          <PageHeader
            className="employee-details__page-header"
            title="Bank Details"
          />
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
                  {employeeData.bankDetail
                    ? employeeData.bankDetail?.accountNumber
                    : ""}
                </span>
              </Flex>
              <Flex justify="space-between">
                <span>Account Holder Name: </span>
                <span>
                  {employeeData.bankDetail
                    ? employeeData.bankDetail?.accountHolderName
                    : ""}
                </span>
              </Flex>
              <Flex justify="space-between">
                <span>Branch Name: </span>
                <span>
                  {employeeData.bankDetail
                    ? employeeData.bankDetail?.branchName
                    : ""}
                </span>
              </Flex>
              <Flex justify="space-between">
                <span>Branch Code: </span>
                <span>
                  {employeeData.bankDetail
                    ? employeeData.bankDetail.branchCode
                    : ""}
                </span>
              </Flex>
              <Flex justify="space-between">
                <span>Ifsc Code: </span>
                <span>
                  {employeeData.bankDetail
                    ? employeeData?.bankDetail?.ifscCode
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
          <PageHeader
            className="employee-details__page-header"
            title="Document Details"
          />
          {employeeData.documents?.map((item: any) => (
            <>
              <Card
                key={item?.documentNumber}
                title={removeUnderScore(item?.documentType, "_")}
              >
                <Flex vertical gap={10}>
                  <span>
                    Document Number:{" "}
                    {item?.documentNumber ? item?.documentNumber : ""}
                  </span>
                  <span>
                    Document Name: {item?.documentType ? item.documentType : ""}
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
    rest
      .employeeDetailsByID(id)
      .then((response: any) => {
        setEmployeeData(response);
      })
      .catch((error: any) => {
        console.log(error);
      });
    // setEmployeeData(data);
  }, [id]);

  const items: MenuProps["items"] = [
    {
      label: <Link to="/user/create">Edit Details</Link>,
      key: "1",
      icon: <EditTwoTone />,
    },
    {
      label: <Link to="/user/create">Delete</Link>,
      key: "2",
      icon: <DeleteTwoTone />,
    },
    {
      label: <Link to="/user/create">Print</Link>,
      key: "2",
      icon: <PrinterOutlined style={{ color: "skyBlue" }} />,
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = () => {
    message.info("Click on menu item.");
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <Layout className="with-background">
      <div className="employee-details data-table">
        <Card className="employee-details__section">
          <Flex className="employee-details__header">
            <Avatar
              icon={<UserOutlined />}
              className="employee-details__avatar"
            />
            <Flex vertical>
              <div>
                <h2 className="employee-name">
                  {`${employeeData.name?.firstName??""} ${employeeData.name?.middleName ??""} ${ employeeData.name?.lastName?? ""}`}
                </h2>
                <Flex className="employee-contacts">
                  <span>
                    <HomeTwoTone twoToneColor="#1677ff" />
                    {employeeData.permanentAddress?.city} {" | "}
                    {employeeData.permanentAddress?.state}
                  </span>
                  <span>
                    <MailTwoTone twoToneColor="#eb2f96" />
                    {" " + employeeData.officialEmail}
                  </span>
                  <span>
                    <PhoneTwoTone twoToneColor="#52c41a" />
                    {`+91 ${employeeData.contact}`}
                  </span>
                </Flex>
              </div>
              <Divider />
              <Flex className="employee-job-details">
                <span>
                  <h4 className="employee-job-details__title">Designation</h4>
                  {removeUnderScore(
                    String(employeeData?.designation?.code),
                    "_"
                  )}
                </span>
                <span>
                  <h4 className="employee-job-details__title">Employee Code</h4>
                  {employeeData.employeeCode}
                </span>
                <span>
                  <h4 className="employee-job-details__title">Job Type</h4>
                  {removeUnderScore(employeeData.type, "_")}
                </span>
                <span style={{ flex: "1 1 0", textAlign: "right" }}>
                  {/*<Button type="primary" shape="round" icon={<CaretDownOutlined />} size='large'>*/}
                  {/*  Actions*/}
                  {/*</Button>*/}
                  <Dropdown menu={menuProps} placement="bottomLeft" arrow>
                    <Button type="primary" shape="round" size="large">
                      <Space>
                        Actions
                        <CaretDownOutlined />
                      </Space>
                    </Button>
                  </Dropdown>
                </span>
              </Flex>
            </Flex>
          </Flex>
        </Card>
        <br />
        <Flex className="employee-details__section">
          {/* Work Anniversay & Birthday Section*/}
          {/*<Card>*/}
          {/*  <div className='employee-details__section-sidebar'>*/}
          {/*    <div className="detail-column">*/}
          {/*        <span style={{ display: "flex" }}>*/}
          {/*          <img className="logo"*/}
          {/*               alt="..."*/}
          {/*               src="https://w7.pngwing.com/pngs/503/524/png-transparent-1st-anniversary-logo-wedding-anniversary-wedding-invitation-party-first-anniversary-holidays-text-wedding-thumbnail.png"*/}
          {/*          />*/}
          {/*          Working Anniversary: <br /> {employeeData.joiningDate}*/}
          {/*        </span>*/}
          {/*      /!* <span>Personal Email: <br /> {employeeData.email}</span> *!/*/}
          {/*      <span style={{ display: "flex" }}>*/}
          {/*        Highest Qualification: <br /> {employeeData.qualification}*/}
          {/*        </span>*/}
          {/*      <span>Total Experience: <br /> {employeeData.totalExperience}</span>*/}
          {/*      /!* <span>Mobile Number: <br /> {employeeData.contact}</span> *!/*/}
          {/*    </div>*/}
          {/*    <div className="detail-column">*/}
          {/*        <span style={{ display: "flex" }}>*/}
          {/*          <img className="logo"*/}
          {/*               alt="..."*/}
          {/*               src="https://static.vecteezy.com/system/resources/previews/013/366/641/original/birthday-cake-silhouette-for-icon-symbol-pictogram-apps-website-art-illustration-logo-or-graphic-design-element-format-png.png"*/}
          {/*          />*/}
          {/*          Birthday: <br /> {employeeData.dateOfBirth}*/}
          {/*        </span>*/}
          {/*      <span>Gender: <br /> {employeeData.gender}</span>*/}
          {/*      <span>Age: <br /> {employeeData.age}</span>*/}
          {/*      <span>Blood Group: <br />{" "}{removeUnderScore(employeeData.bloodGroup, "_")}</span>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</Card> */}
          <Card className="employee-details__tabs-card">
            <Flex>
              <Tabs
                className="employee-details__tabs"
                defaultActiveKey="2"
                tabPosition="left"
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
          </Card>
        </Flex>
      </div>
    </Layout>
  );
};

export default EmployeeDetailComponent02;
