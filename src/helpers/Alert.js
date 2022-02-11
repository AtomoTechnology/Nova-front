export const Alert = ({ data }) => {
  return (
    <div class="alert notification">
      <span class="msg">{data.msg}</span>
      <span class="icons">
        {data.type == 'success' ? (
          <i class="fas fa-check-circle success"></i>
        ) : (
          <i class="fas fa-exclamation-triangle error"></i>
        )}
      </span>
    </div>
  );
};
