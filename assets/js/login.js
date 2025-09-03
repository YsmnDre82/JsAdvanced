// آرایه برای ذخیره اطلاعات کاربران
let users = [];

// تابع دریافت اطلاعات کاربران از API
async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        users = data;
        console.log('لیست کاربران دریافت شد:', users);
    } catch (error) {
        console.error('خطا در دریافت اطلاعات کاربران:', error);
    }
}

// تابع اعتبارسنجی کاربر
function validateUser(name, email) {
    return users.some(user => 
        user.name.toLowerCase() === name.toLowerCase() && 
        user.email.toLowerCase() === email.toLowerCase()
    );
}

// نمایش پیام به کاربر
function showMessage(text, isSuccess = true) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.style.color = isSuccess ? '#4CAF50' : '#f44336';
    messageDiv.style.padding = '10px';
    messageDiv.style.borderRadius = '4px';
    messageDiv.style.backgroundColor = isSuccess ? '#E8F5E9' : '#FFEBEE';
}

document.addEventListener('DOMContentLoaded', function() {
    // دریافت اطلاعات کاربران در هنگام بارگذاری صفحه
    fetchUsers();
    
    const form = document.querySelector('.login-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = form.querySelector('[name="name"]').value;
            const email = form.querySelector('[name="email"]').value;

            if (validateUser(name, email)) {
                showMessage('ورود با موفقیت انجام شد! خوش آمدید.');
                // می‌توانید کاربر را به صفحه دیگری هدایت کنید
                // window.location.href = 'dashboard.html';
            } else {
                showMessage('نام یا ایمیل اشتباه است. لطفاً دوباره تلاش کنید.', false);
            }
        });
    }
});