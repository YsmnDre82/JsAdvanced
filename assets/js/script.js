// // Function Declaration (تعریف تابع)
// function sayHello() {
//   console.log("سلام!");
// }
// sayHello(); 

// // Function Expression (عبارت تابع)
// let sayHello2 = function() {
//   console.log("سلام!");
// };

// sayHello2(); 

// // Anonymous Functions (توابع بی‌نام)
// setTimeout(function() {
//   console.log("بعد از ۲ ثانیه اجرا شد!");
// }, 2000);


// // IIFE (Immediately Invoked Function Expression) – تابع خوداجرا
// (function() {
//   console.log("این یک تابع خوداجراست!");
// })();

// // Arrow Function 
// let sayHelloArrow = ()=> {
//   console.log("سلام!");
// };
















// function showThis() {
//   console.log(this.name);
// }

// showThis(); //  undefined /  window

// const obj = { name: "عباس", f: showThis };
// obj.f(); // اینجا this = obj

























// const showThis = ()=> {
//   console.log(this);
// }

// showThis(); //

// const obj = { name: "عباس", f: showThis };
// obj.f(); // اینجا this = obj









function showThis() {
  const showThis2 = ()=> {
    console.log(this.name);
  }
  showThis2(); // 
}

const obj = { name: "عباس", f: showThis };
obj.f(); // اینجا this = obj






















// const sayHello = function () {
//   console.log("سلام، من " + this.name + " هستم");
// }

// const user1 = {
//   name: "عباس",
//   sayHello: sayHello // همون تابع رو قرض گرفتیم
// };
// const user2 = {
//   name: "علی",
//   sayHello: sayHello // همون تابع رو قرض گرفتیم
// };

// user1.sayHello(); // سلام، من عباس هستم
// user2.sayHello(); // سلام، من علی هستم