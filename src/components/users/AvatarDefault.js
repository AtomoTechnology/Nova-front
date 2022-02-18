export const AvatarDefault = ({ username, width }) => {
  var color = '';
  const max = 6;
  var r = Math.floor(Math.random() * max);
  console.log(r);
  switch (r) {
    case 1:
      color = 'green-500';
      break;
    case 2:
      color = 'yellow-600';
      break;
    case 3:
      color = 'red-400';
      break;
    case 4:
      color = 'gray-500';
      break;
    case 5:
      color = 'pink-400';
      break;

    default:
      color = 'blue-500';
      break;
  }
  return (
    <div className={'avatar-default bg-red-500 '} style={{ width: width }}>
      <span className={'letter mt-12 text-white rounded-full p-2 shadow w-24 h-24 bg-' + color}>{username[0]}</span>
    </div>
  );
};
