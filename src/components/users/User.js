import { Link } from 'react-router-dom';
import { AvatarDefault } from './AvatarDefault';
export const User = ({ client }) => {
  // console.log(client);
  return (
    <Link to={`clients/${client._id}`} className="user">
      <div className="img-user">
        {client?.pathImg ? (
          client.pathImg.slice(0, 3) === 'htt' ? (
            <img
              className="rounded-full w-24 h-24 shadow-md border-2"
              // src={`./assets/img/client/${client.pathImg}`}
              src={client?.pathImg}
              alt={client?.name}
            />
          ) : (
            // <img
            // 	className="rounded-full w-24 h-24 shadow-md border-2"
            // 	src={`./assets/img/client/${client.pathImg}`}
            // />
            <AvatarDefault username={client?.name} />
          )
        ) : (
          // <img
          // 	src={userLogo}
          // 	className="rounded-full w-24 h-24 shadow-md border-2"
          // />
          <AvatarDefault username={client?.name} />
        )}
      </div>
      <hr />
      <div className="user-info">
        <h4 className="capitalize">{client.name}</h4>
        <h4 className="capitalize">{client.dni}</h4>
      </div>
      {/* <hr /> */}
      {/* <Link to={`clients/${client._id}`}>Ver Cliente</Link> */}
    </Link>
  );
};
