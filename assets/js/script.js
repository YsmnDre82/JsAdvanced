// آرایه برای ذخیره اطلاعات کاربران
let users = [];

// تابع دریافت اطلاعات کاربران از API
async function fetchUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    users = data;
    console.log('لیست کاربران:', users);
  } catch (error) {
    console.error('خطا در دریافت اطلاعات کاربران:', error);
  }
}

// تابع دریافت و چاپ اطلاعات فرم ثبت‌نام
document.addEventListener('DOMContentLoaded', function() {
  // دریافت اطلاعات کاربران در هنگام بارگذاری صفحه
  fetchUsers();
  
  const form = document.querySelector('.signup-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = form.querySelector('[name="name"]').value;
      const email = form.querySelector('[name="email"]').value;
      const password = form.querySelector('[name="password"]').value;
      (async () => {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
          });
          const result = await response.json();
          console.log('ارسال شد:', result);
        } catch (error) {
          console.error('خطا در ارسال:', error);
        }
      })();
    });
  }
});