import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import NavbarContent from '../components/navbar/NavbarContent';
import Footer from '../components/navbar/Footer';
import { Loading } from '../components/Loading';
import NavbarLateral from '../components/navbar/NavbarLateral';
import { ErrorApp } from '../components/ErrorApp';
import { useSelector } from 'react-redux';
const Home = React.lazy(() => import('../components/Home'));
const TermsConditions = React.lazy(() => import('../components/TermsConditions'));
const Browse = React.lazy(() => import('../components/Browse'));
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

export default function Dashboard({ history }) {
  const { role } = useSelector((state) => state.auth);

  return (
    <div className="taller">
      <NavbarLateral history={history} />
      <div className="content-principal">
        <NavbarContent />
        <div className="content-principal-margin">
          <React.Suspense fallback={<Loading />}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/terms-conditions" component={TermsConditions} />
              <Route exact path="/browse" component={Browse} />
              <Route
                exact
                path="/clients"
                render={(props) => {
                  return role === 'admin' ? <Users {...props} /> : <Redirect to="/browse" />;
                }}
              />
              <Route
                exact
                path="/works"
                render={(props) => {
                  return role === 'admin' ? <Works {...props} /> : <Redirect to="/browse" />;
                }}
              ></Route>
              <Route exact path="/works/:workId/" component={GetWork} />
              <Route
                exact
                path="/histories"
                render={(props) => {
                  return role === 'admin' ? <Histories {...props} /> : <Redirect to="/browse" />;
                }}
              />
              <Route
                exact
                path="/work/edit/:id"
                render={(props) => {
                  return role === 'admin' ? <WorkEdit {...props} /> : <Redirect to="/browse" />;
                }}
              />
              <Route exact path="/works/order/:id" component={OrderWork} />
              <Route
                exaxt
                path="/news"
                render={(props) => {
                  return role === 'admin' ? <News {...props} /> : <Redirect to="/browse" />;
                }}
              />
              <Route exact path="/queries" component={Queries} />
              <Route exact path="/createquery" component={AddQuery} />
              <Route
                exact
                path="/banners"
                render={(props) => {
                  return role === 'admin' ? <Banners {...props} /> : <Redirect to="/browse" />;
                }}
              />

              <Route exact path="/clients/:clientId" component={GetUser} />
              <Route
                exact
                path="/client/add"
                render={(props) => {
                  return role === 'admin' ? <AddUser {...props} /> : <Redirect to="/browse" />;
                }}
              />
              <Route exact path="/user/update-password" component={UpdatePassword} />
              <Route
                exact
                path="/work/add"
                render={(props) => {
                  console.log(props);
                  return role === 'admin' ? <AddWork {...props} /> : <Redirect to="/browse" />;
                }}
              />
              <Route path="*" component={ErrorApp} />
            </Switch>
          </React.Suspense>
        </div>
        <Footer />
      </div>
    </div>
  );
}
