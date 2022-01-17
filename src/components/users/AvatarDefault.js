import React from 'react';

export const AvatarDefault = ({ username, width }) => {
  var color = '';
  const max = 6;
  var r = Math.floor(Math.random() * max);
  // console.log(r);
  switch (r) {
    case 1:
      color = 'green-500';
      break;
    case 2:
      color = 'yellow-300';
      break;
    case 3:
      color = 'red-400';
      break;
    case 4:
      color = 'gray-500';
      break;
    case 5:
      color = 'pink-500';
      break;

    default:
      color = 'blue-300';
      break;
  }
  return (
    <div className={'avatar-default bg-' + color} style={{ width: width }}>
      <span className="letter">{username[0]}</span>
    </div>
  );
};
