import { Link } from "react-router-dom";
export const User = ({ client }) => {
  console.log(client);
  return (
    <div className="user">
      <div className="img-user">
        {client?.pathImg ? (
          client.pathImg.slice(0, 3) == 'htt' ? <img
            className="rounded-full w-24 h-24 shadow-md border-2"
            // src={`./assets/img/client/${client.pathImg}`}
            src={client?.pathImg}
          /> : <img
          className="rounded-full w-24 h-24 shadow-md border-2"
          src={`./assets/img/client/${client.pathImg}`}
           />


        ) : (
          <img
            src={"./assets/img/userLogo.png"}
            className="rounded-full w-24 h-24 shadow-md border-2"
          />
        )}
      </div>
      <hr />
      <div className="user-info">
        <h4 className="capitalize">{client.name}</h4>
      </div>
      <hr />
      <Link to={`clients/${client._id}`}>Ver Cliente</Link>
    </div>
  );
};
