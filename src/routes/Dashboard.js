import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Home } from '../components/Home';
import { NavbarContent } from '../components/navbar/NavbarContent';
import { NavbarLateral } from '../components/navbar/NavbarLateral';
import { Orders } from '../components/orders/Orders';
import { AddUser } from '../components/users/AddUser';
import { GetUser } from '../components/users/GetUser';
import { Users } from '../components/users/Users';
import { AddWork } from '../components/works/AddWork';
import { GetWork } from '../components/works/GetWork';
import { Works } from '../components/works/Works';
import { Histories } from '../components/works/Histories';
import { Footer } from '../components/navbar/Footer';
import { WorkEdit } from '../components/works/WorkEdit';
import { News } from '../components/News';
import { UpdatePassword } from '../components/users/UpdatePassword';
import { OrderWork } from '../components/works/OrderWork';
export default function Dashboard({ history }) {
  const closeModal = (e) => {
    // document.querySelector(".workWithoutChangeState").classList.add("hidden");
    document.querySelector('.workWithoutChangeState').style.display = 'none';
  };
  const [refresh, setRefresh] = useState(false);
  return (
    <div className="taller">
      <NavbarLateral />
      <div className="content-principal">
        <NavbarContent />
        <div className="content-principal-margin">
          <Switch>
            <Route exact path="/" component={Home} />
            {/* <Route exact   component={Works} /> */}
            <Route exact path="/works">
              <Works refresh={refresh} history={history} setRefresh={setRefresh} />
            </Route>
            <Route exact path="/clients" component={Users} />
            <Route exact path="/works/:workId/" component={GetWork} />
            <Route exact path="/orders" component={Orders} />
            <Route exact path="/works/histories/all" component={Histories} />
            <Route exact path="/work/edit/:id" component={WorkEdit} />
            <Route exact path="/works/order/:id" component={OrderWork} />
            <Route exaxt path="/news" component={News} />

            <Route exact path="/clients/:clientId" component={GetUser} />
            <Route exact path="/client/add" component={AddUser} />
            <Route exact path="/user/update-password" component={UpdatePassword} />
            <Route exact path="/work/add">
              <AddWork history={history} refresh={refresh} setRefresh={setRefresh} />
            </Route>
            <Redirect to="/" />
          </Switch>
        </div>
        <Footer />
      </div>
    </div>
  );
}
