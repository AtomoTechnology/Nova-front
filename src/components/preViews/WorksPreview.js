import './index.scss';

const WorksPreview = () => {
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  return (
    <div className="works-preview works-grid p-1 m-auto">
      {arr.map((a, index) => (
        <div key={index} className="work-preview work">
          <div className="header p-2 gap-2">
            <div className="img-header skeleton"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="flex flex-col gap-2">
              <div className=" w-1 rounded-full h-1 shadow overflow-hidden">
                <div className="skeleton skeleton-text"></div>
              </div>
              <div className=" w-1 rounded-full h-1 shadow overflow-hidden ">
                <div className="skeleton skeleton-text"></div>
              </div>
              <div className=" w-1 rounded-full h-1 shadow overflow-hidden">
                <div className="skeleton skeleton-text"></div>
              </div>
            </div>
          </div>
          <div className="body">
            <div className="skeleton skeleton-text mb-4"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
          </div>
          <div className="p-3 flex justify-between items-center">
            <div className="skeleton skeleton-text !h-5 !w-10"></div>
            <div className="skeleton skeleton-text  !h-6 !w-4"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorksPreview;
