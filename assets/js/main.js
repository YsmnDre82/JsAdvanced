// localStorage.setItem('username' , 'yasaman');
// localStorage.setItem('name' , 'mohammad');

// localStorage.removeItem('name');

// let username = localStorage.getItem('username')
// console.log(username);

// localStorage.clear()






// const user = {name: "ysmn" , age: 22};

// // ذخیره
// localStorage.setItem("user",JSON.stringify(user));

// // خواندن
// const saveUser = JSON.parse(localStorage.getItem("user"));
// console.log(saveUser);















//  1- خواندن اطلاعات ذخیره‌شده
const redBtn =  document.getElementById("redBtn");
const blueBtn = document.getElementById("blueBtn");
const savedColor = localStorage.getItem("bgColor");

if (savedColor) {
  document.body.style.backgroundColor = savedColor;
}

//  3- تغییر رنگ و ذخیره‌سازی
redBtn.addEventListener("click", () => {
  document.body.style.backgroundColor = "red";
  localStorage.setItem("bgColor", "red");
});

blueBtn.addEventListener("click", () => {
  document.body.style.backgroundColor = "blue";
  localStorage.setItem("bgColor", "blue");


    saveNameBtn.addEventListener("click", () => {
    const name = document.getElementById("nameInput").value;
    if (name.trim() !== "") {
      localStorage.setItem("userName", name);
      document.getElementById("welcome").textContent = `سلام ${name}!`;
      document.getElementById("nameInput").value = "";
    }
  });
});