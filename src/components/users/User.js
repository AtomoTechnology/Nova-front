import { Link } from 'react-router-dom';
import { AvatarDefault } from './AvatarDefault';
export const User = ({ client }) => {
  // console.log(client);
  return (
    <Link to={`clients/${client._id}`} className="user">
      <div className="img-user bg-blue-600 ">
        {client?.photo ? (
          <img
            className="rounded-full mt-12  w-24 h-24 shadow-md bg-gray-800 "
            src={client?.photo}
            alt={client?.name}
          />
        ) : (
          <AvatarDefault username={client?.name} />
        )}
      </div>
      <hr />
      <div className="user-info mt-8">
        <h4 className="capitalize">{client.name}</h4>
        <h4 className="capitalize">{client.dni}</h4>
      </div>
      {/* <hr /> */}
      {/* <Link to={`clients/${client._id}`}>Ver Cliente</Link> */}
    </Link>
  );
};
