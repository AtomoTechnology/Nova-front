export const showImg = (input) => {
  if (input) {
    var reader = new FileReader();

    reader.onload = function (e) {
      let img = e.target.result;
      document.querySelector(".imgLoad").setAttribute("src", img);
    };
    reader.readAsDataURL(input);
  }
};
export const showMultiplesImg = (input) => {
  if (input) {
    for (let index = 0; index < input.length; index++) {
      var reader = new FileReader();
      reader.onload = function (e) {
        let img = e.target.result;
        document.querySelector(`.image${index}`).setAttribute("src", img);
      };
      reader.readAsDataURL(input[index]);
    }
  }
};
