import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AvatarDefault } from './AvatarDefault';
export const User = ({ client, lastUser }) => {
  console.log(lastUser);
  const last = useCallback((node) => {
    console.log(node);
  });
  return (
    <Link ref={lastUser} to={`clients/${client._id}`} className="user">
      <div className="img-user sm:bg-blue-600 ">
        {client?.photo ? (
          <img className="rounded-full  sm:mt-12  w-24 h-24 shadow-lg" src={client?.photo} alt={client?.name} />
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
