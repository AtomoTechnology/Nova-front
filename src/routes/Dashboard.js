import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import NavbarContent from '../components/navbar/NavbarContent';
import Footer from '../components/navbar/Footer';
import { Loading } from '../components/Loading';
import NavbarLateral from '../components/navbar/NavbarLateral';
import { ErrorApp } from '../components/ErrorApp';
const Home = React.lazy(() => import('../components/Home'));
const Banners = React.lazy(() => import('../components/Banners'));
const Users = React.lazy(() => import('../components/users/Users'));
const Works = React.lazy(() => import('../components/works/Works'));
const AddUser = React.lazy(() => import('../components/users/AddUser'));
const GetUser = React.lazy(() => import('../components/users/GetUser'));
const AddWork = React.lazy(() => import('../components/works/AddWork'));
const GetWork = React.lazy(() => import('../components/works/GetWork'));
const Histories = React.lazy(() => import('../components/works/Histories'));
const WorkEdit = React.lazy(() => import('../components/works/WorkEdit'));
const News = React.lazy(() => import('../components/News'));
const UpdatePassword = React.lazy(() => import('../components/users/UpdatePassword'));
const OrderWork = React.lazy(() => import('../components/works/OrderWork'));
const Queries = React.lazy(() => import('../components/queries/Queries'));
const AddQuery = React.lazy(() => import('../components/queries/AddQuery'));
const startChecking = React.lazy(() => import('../action/authAction'));

export default function Dashboard({ history }) {
  return (
    <div className="taller">
      <NavbarLateral history={history} />
      <div className="content-principal">
        <NavbarContent />
        <div className="content-principal-margin">
          <React.Suspense fallback={<Loading />}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/clients" component={Users} />
              <Route exact path="/works">
                <Works history={history} />
              </Route>
              <Route exact path="/works/:workId/" component={GetWork} />
              <Route exact path="/works/histories/all" component={Histories} />
              <Route exact path="/work/edit/:id" component={WorkEdit} />
              <Route exact path="/works/order/:id" component={OrderWork} />
              <Route exaxt path="/news" component={News} />
              <Route exaxt path="/queries" component={Queries} />
              <Route exaxt path="/createquery" component={AddQuery} />
              <Route exaxt path="/banners" component={Banners} />

              <Route exact path="/clients/:clientId" component={GetUser} />
              <Route exact path="/client/add" component={AddUser} />
              <Route exact path="/user/update-password" component={UpdatePassword} />
              <Route exact path="/work/add">
                <AddWork history={history} />
              </Route>
              <Route path="*" component={ErrorApp} />

              {/* <Redirect to="/" /> */}
            </Switch>
          </React.Suspense>
        </div>
        <Footer />
      </div>
    </div>
  );
}
