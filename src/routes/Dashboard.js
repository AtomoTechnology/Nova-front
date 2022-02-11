import { Switch, Route, Redirect } from 'react-router-dom';
import { Home } from '../components/Home';
import { NavbarContent } from '../components/navbar/NavbarContent';
import { NavbarLateral } from '../components/navbar/NavbarLateral';
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
import { Queries } from '../components/queries/Queries';
import { useDispatch, useSelector } from 'react-redux';
import { startChecking } from '../action/authAction';
import { Loading } from '../components/Loading';
import { useEffect } from 'react';
import { AddQuery } from '../components/queries/AddQuery';
export default function Dashboard({ history }) {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(startChecking());
  // }, []);

  // const { uid, checking } = useSelector((state) => state.auth);

  // if (checking) {
  //   return <Loading />;
  // }
  return (
    <div className="taller">
      <NavbarLateral history={history} />
      <div className="content-principal">
        <NavbarContent />
        <div className="content-principal-margin">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/works">
              <Works history={history} />
            </Route>
            <Route exact path="/clients" component={Users} />
            <Route exact path="/works/:workId/" component={GetWork} />
            <Route exact path="/works/histories/all" component={Histories} />
            <Route exact path="/work/edit/:id" component={WorkEdit} />
            <Route exact path="/works/order/:id" component={OrderWork} />
            <Route exaxt path="/news" component={News} />
            <Route exaxt path="/queries" component={Queries} />
            <Route exaxt path="/createquery" component={AddQuery} />

            <Route exact path="/clients/:clientId" component={GetUser} />
            <Route exact path="/client/add" component={AddUser} />
            <Route exact path="/user/update-password" component={UpdatePassword} />
            <Route exact path="/work/add">
              <AddWork history={history} />
            </Route>
            <Redirect to="/" />
          </Switch>
        </div>
        <Footer />
      </div>
    </div>
  );
}
