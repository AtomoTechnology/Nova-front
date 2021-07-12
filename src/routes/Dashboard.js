import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { Register } from "../components/auth/Register";
import { Home } from "../components/Home";
import { NavbarContent } from "../components/navbar/NavbarContent";
import { NavbarLateral } from "../components/navbar/NavbarLateral";
import { Orders } from "../components/orders/Orders";
import { AddUser } from "../components/users/AddUser";
import { GetUser } from "../components/users/GetUser";
import { User } from "../components/users/User";

import { Users } from "../components/users/Users";
import { AddWork } from "../components/works/AddWork";
import { GetWork } from "../components/works/GetWork";
import { Work } from "../components/works/Work";
import { Works } from "../components/works/Works";
import moment from "moment";
import { Histories } from "../components/works/Histories";
export default function Dashboard() {
  // const [workStates, setWorkStates] = useState([]);

  // const workWithoutChangeState = workStates.filter(
  //   (ws) =>
  //     (moment(moment().format("YYYY-MM-DD")) -
  //       (moment(moment(ws.createAt).format("YYYY-MM-DD")) == 0) &&
  //       ws.state.name == "Revision") ||
  //     ws.state.name == "En Reparación"
  // );
  // console.log(workWithoutChangeState);
  const closeModal = (e) => {
    // document.querySelector(".workWithoutChangeState").classList.add("hidden");
    document.querySelector(".workWithoutChangeState").style.display = "none";
  };
  return (
    <div className="taller">
      {/* colocar elemento comunes */}
      {/* {workWithoutChangeState.length > 0 && (
        <div className="workWithoutChangeState duration-50">
          <div className="content bg-gray-900  rounded relative">
            <div
              onClick={closeModal}
              className="overlay close-modal hover:bg-pink-800 bg-pink-500 duration-700 cursor-pointer"
            >
              X{" "}
            </div>
            <div className="mt-2">
              What is Lorem Ipsum Lorem Ipsum is simply dummy text of the
              printing and typesetting industry Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s when an
              unknown printer took a galley of type and scrambled it to make a
              type specimen book it has? Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s, when an unknown printer
              took a galley of type and scrambled it to make a type specimen
              book. It has survived not only five centuries, but also the leap
              into electronic typesetting, remaining essentially unchanged.
            </div>
            <Link
              className="bg-pink-400 p-2 m-2 text-white uppercase rounded-full shadow-lg"
              to="google"
            >
              Ver Trabajos
            </Link>
          </div>
        </div>
      )} */}
      <NavbarLateral />
      <div className="content-principal">
        <NavbarContent />
        <div className="content-principal-margin">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/works" component={Works} />
            <Route exact path="/clients" component={Users} />
            <Route exact path="/works/:workId/" component={GetWork} />
            <Route exact path="/orders" component={Orders} />
            <Route exact path="/works/histories/all" component={Histories} />

            <Route exact path="/clients/:clientId" component={GetUser} />
            <Route exact path="/client/add" component={AddUser} />
            <Route exact path="/work/add" component={AddWork} />
            <Route exact path="/auth/register" component={Register} />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    </div>
  );
}
