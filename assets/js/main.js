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















// //  1- خواندن اطلاعات ذخیره‌شده
// const redBtn =  document.getElementById("redBtn");
// const blueBtn = document.getElementById("blueBtn");
// const savedColor = localStorage.getItem("bgColor");

// if (savedColor) {
//   document.body.style.backgroundColor = savedColor;
// }

// //  3- تغییر رنگ و ذخیره‌سازی
// redBtn.addEventListener("click", () => {
//   document.body.style.backgroundColor = "red";
//   localStorage.setItem("bgColor", "red");
// });

// blueBtn.addEventListener("click", () => {
//   document.body.style.backgroundColor = "blue";
//   localStorage.setItem("bgColor", "blue");


//     saveNameBtn.addEventListener("click", () => {
//     const name = document.getElementById("nameInput").value;
//     if (name.trim() !== "") {
//       localStorage.setItem("userName", name);
//       document.getElementById("welcome").textContent = `سلام ${name}!`;
//       document.getElementById("nameInput").value = "";
//     }
//   });
// });






















    // ====== توضیحات کوتاه (فارسی) ======
    // این فایل یک پروژه ساده اما کامل برای تمرین است:
    // - فرم ثبت‌نام -> ذخیره در localStorage
    // - نمایش کارت هر شرکت‌کننده
    // - ولیدیشن (سن >= 18 ، ایمیل معتبر)
    // - جستجو، پاک‌سازی همه و خروجی JSON

    // helper: انتخابگر امن
    const $ = (q, el = document) => el.querySelector(q);

    // المان‌ها
    const form = $('#contestForm');
    const msg = $('#msg');
    const cardsEl = $('#cards');
    const countEl = $('#count');
    const searchInput = $('#searchInput');
    const clearAllBtn = $('#clearAll');
    const exportBtn = $('#exportBtn');

    // کلید در localStorage
    const STORAGE_KEY = 'contest_participants_v1';

    // دریافت لیست از localStorage
    function loadParticipants(){
      try{
        const raw = localStorage.getItem(STORAGE_KEY);
        if(!raw) return [];
        return JSON.parse(raw);
      }catch(e){
        console.error('خطا در خواندن localStorage', e);
        return [];
      }
    }

    // ذخیره لیست در localStorage
    function saveParticipants(list){
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }

    // تولید URL عکس با ui-avatars (خارج از محدوده مربوطه)
    function avatarUrl(name){
      const encoded = encodeURIComponent(name);
      return `https://ui-avatars.com/api/?name=${encoded}&background=7c3aed&color=ffffff&rounded=true&size=200`;
    }

    // بررسی اعتبار ایمیل ساده
    function isValidEmail(email){
      // regex ساده و محافظه‌کار
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // نمایش پیام موقتی
    function showMessage(text,type='info'){
      msg.innerHTML = `<div class="${type==='error' ? 'error' : ''}">${text}</div>`;
      if(type==='info') setTimeout(()=>{ msg.innerHTML=''; }, 3000);
    }

    // رندر لیست
    function renderList(list){
      cardsEl.innerHTML = '';
      if(!list.length){
        cardsEl.innerHTML = '<div style="color:var(--muted);padding:18px;border-radius:10px;background:rgba(255,255,255,0.02)">هیچ شرکت‌کننده‌ای ثبت نشده است.</div>';
        countEl.textContent = '0 شرکت‌کننده';
        return;
      }
      countEl.textContent = `${list.length} شرکت‌کننده`;

      const frag = document.createDocumentFragment();
      list.forEach(p => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <div class="avatar"><img src="${avatarUrl(p.fullname)}" alt="avatar" width="56" height="56" style="width:100%;height:100%;object-fit:cover;border-radius:8px"/></div>
          <div class="info">
            <div class="name">${escapeHtml(p.fullname)}</div>
            <div class="meta">${p.category} • ${p.age} سال</div>
            <div class="meta">${p.email}</div>
            <div class="actions">
              <button data-id="${p.id}" class="ghost">حذف</button>
            </div>
          </div>
        `;
        frag.appendChild(card);
      });
      cardsEl.appendChild(frag);
    }

    // تابع فرار از کاراکترهای HTML برای جلوگیری از XSS در نمایش
    function escapeHtml(str){
      return String(str).replace(/[&<>"]+/g, function(match){
        const map = {'&':'&amp;','<':'&lt;','>':'&gt;', '"':'&quot;'};
        return map[match];
      });
    }

    // افزودن شرکت‌کننده جدید
    function addParticipant(participant){
      const list = loadParticipants();
      list.unshift(participant); // اضافه در ابتدا
      saveParticipants(list);
      renderList(list);
    }

    // حذف شرکت‌کننده با id
    function removeParticipant(id){
      const list = loadParticipants().filter(p => p.id !== id);
      saveParticipants(list);
      renderList(list);
    }

    // پاک‌سازی همه
    clearAllBtn.addEventListener('click', ()=>{
      if(!confirm('آیا می‌خواهید همه شرکت‌کنندگان پاک شوند؟')) return;
      localStorage.removeItem(STORAGE_KEY);
      renderList([]);
      showMessage('همه شرکت‌کنندگان پاک شدند.');
    });

    // هندل کلیک‌های حذف در کارت‌ها
    cardsEl.addEventListener('click', (ev)=>{
      const btn = ev.target.closest('button[data-id]');
      if(!btn) return;
      const id = btn.getAttribute('data-id');
      removeParticipant(id);
      showMessage('شرکت‌کننده حذف شد.');
    });

    // ارسال فرم
    form.addEventListener('submit', function(e){
      e.preventDefault();

      const fullname = $('#fullname').value.trim();
      const email = $('#email').value.trim();
      const age = Number($('#age').value);
      const category = $('#category').value;

      // ولیدیشن
      if(!fullname || !email || !age){
        showMessage('لطفاً تمام فیلدها را پر کنید.', 'error');
        return;
      }
      if(!isValidEmail(email)){
        showMessage('ایمیل نامعتبر است.', 'error');
        return;
      }
      if(age < 18){
        showMessage('شرکت‌کننده باید حداقل 18 سال داشته باشد.', 'error');
        return;
      }

      // ساخت آبجکت شرکت‌کننده
      const participant = {
        id: 'p_' + Date.now().toString(36),
        fullname,
        email,
        age,
        category,
        createdAt: new Date().toISOString()
      };

      addParticipant(participant);

      // انیمیشن ساده و ریست فرم
      form.reset();
      showMessage('ثبت‌نام با موفقیت انجام شد.');
    });

    // جستجو
    searchInput.addEventListener('input', ()=>{
      const q = searchInput.value.trim().toLowerCase();
      const list = loadParticipants();
      if(!q){ renderList(list); return; }
      const filtered = list.filter(p => p.fullname.toLowerCase().includes(q) || p.email.toLowerCase().includes(q));
      renderList(filtered);
    });

    // خروجی JSON
    exportBtn.addEventListener('click', ()=>{
      const list = loadParticipants();
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(list, null, 2));
      const a = document.createElement('a');
      a.href = dataStr;
      a.download = 'participants.json';
      a.click();
    });

    // شروع: بارگذاری اولیه
    (function init(){
      const list = loadParticipants();
      renderList(list);
    })();