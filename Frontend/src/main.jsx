import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,

} from "react-router-dom";
import Layout from "./components/Layout";
import HeroSection from "./components/HeroSection.jsx";
import MostWanted from "./components/MostWanted.jsx";
import CareerPage from "./components/CareerPage.jsx";
import LostAndFound from "./components/LostAndFound.jsx";
import SelfDefense from "./components/SelfDefense.jsx";
import LoginPage from "./components/LoginPage.jsx";
import SignUp from "./components/Signup.jsx";
import NewsSection from "./components/NewsSection.jsx";
import MostWantedForm from "./adminComponents/MostWantedAdmin.jsx";
import Admin from "./adminComponents/AdminPannel.jsx"
import SelfDefenseAdmin  from "./adminComponents/SelfDefense.admin.jsx";
import CareerAdmin from "./adminComponents/Career.admin.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="" element={<HeroSection />} />
      <Route path="/" element={<Layout />}>
        <Route path="most-wanted" element={<MostWanted />} />
        <Route path="self-defense" element={<SelfDefense />} />
        <Route path="lost-and-Found" element={<LostAndFound />} />
        <Route path="careers" element={<CareerPage />} />
        <Route path="newsSection" element={<NewsSection />} />
      </Route>
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="admin" element={<Admin />} />
      <Route path="admin-most-wanted" element={<MostWantedForm />} />
      <Route path="admin-self-defense" element={<SelfDefenseAdmin />} />
      <Route path="admin-career" element={<CareerAdmin/>}/>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
