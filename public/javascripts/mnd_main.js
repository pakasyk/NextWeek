document
  .querySelector(".exercise-create-outer")
  .addEventListener("mouseup", element=>{
    if (element.target.classList.contains("exercise-create-outer")) {
      document.querySelector(".exercise-create-outer").style.display = "none";
    }
  });

document
  .querySelector("button.create")
  .addEventListener("click", ()=> {
    document.querySelector(".exercise-create-outer").style.display = "flex";
  });
