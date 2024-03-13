import React from "react";
import "./App.scss";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  AboutUs,
  Anniversary,
  Birthday,
  ContactUs,
  EmployeeCreate,
  EmployeeDetailComponent,
  EmployeeSearch,
  EnumCards,
  Error,
  FAQComponent,
  ForgotPassword,
  HolidayCalendar,
  HolidayCreate,
  HolidayList,
  Home,
  LayoutComponent,
  Login,
  PrivacyPolicy,
  PrivateRoutes,
  UserCreate,
  UserDataTable,
  UserDetailsCard,
} from "./component/index";
import ApiInterceptor from "./apiInterceptor";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LayoutComponent />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/user/list"
          element={<PrivateRoutes Componant={<UserDataTable />} />}
        />
        <Route
          path="/user/detail"
          element={<PrivateRoutes Componant={<UserDetailsCard />} />}
        />
        <Route
          path="/user/create"
          element={<PrivateRoutes Componant={<UserCreate />} />}
        />
        <Route
          path="/employee/search"
          element={<PrivateRoutes Componant={<EmployeeSearch />} />}
        />
        <Route path="/employee/create" element={<EmployeeCreate />} />
        <Route path="/event/birthday" element={<Birthday />} />
        <Route path="/event/anniversary" element={<Anniversary />} />
        <Route path="/event/birthday/:id" element={<Birthday />} />
        <Route
          path="/employee/create/:id"
          element={<PrivateRoutes Componant={<EmployeeCreate />} />}
        />
        <Route
          path="/employee/detail/:id"
          element={<PrivateRoutes Componant={<EmployeeDetailComponent />} />}
        />
        <Route
          path="/enum"
          element={<PrivateRoutes Componant={<EnumCards />} />}
        />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/faqs" element={<FAQComponent />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/holiday" element={<HolidayList />} />
        <Route path="/holiday/create" element={<HolidayCreate />} />
        <Route path="/holiday/calendar" element={<HolidayCalendar />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="*" element={<Error />} />
    </>
  )
);

const App: React.FC = () => (
  <div className="App">
    <ApiInterceptor />
    <ToastContainer autoClose={8000} position={toast.POSITION.BOTTOM_RIGHT} />
    <RouterProvider router={router} />
  </div>
);

export default App;
