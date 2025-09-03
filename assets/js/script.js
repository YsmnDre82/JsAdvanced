// تابع دریافت و چاپ اطلاعات فرم ثبت‌نام
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.signup-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = form.querySelector('[name="name"]').value;
      const email = form.querySelector('[name="email"]').value;
      const password = form.querySelector('[name="password"]').value;
      console.log('نام:', name);
      console.log('ایمیل:', email);
      console.log('پسورد:', password);
    });
  }
});