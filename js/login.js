(function () {

    // 1. 获取DOM元素
    const phone = document.querySelector('[name=userphone]');
    const spand_phone = phone.parentElement.nextElementSibling.children[0];
    const i_phone = phone.parentElement.nextElementSibling.children[1];

    const password = document.querySelector('[name=password]');
    const spand_password = password.parentElement.nextElementSibling.children[0];
    const i_password = password.parentElement.nextElementSibling.children[1];

    const login_title = document.querySelector('.login-box .login-title');
    const tab_hd = document.querySelectorAll('.tab_hd');
    const queren = document.querySelector('.checkbox');
    const from = document.querySelector('form');

    // 2. 手机号验证函数
    function verifyPhone() {
        const reg = /^1(5\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/; // 修复正则表达式错误
        if (!reg.test(phone.value.trim())) { // 增加trim去除首尾空格
            spand_phone.innerText = '手机号格式不正确，请重新输入'; // 修正错别字：从新 -> 重新
            i_phone.innerText = '×';
            i_phone.style.backgroundColor = 'red';
            spand_phone.style.color = 'red';
            i_phone.style.opacity = '1';
            spand_phone.style.opacity = '1';
            return false;
        }
        spand_phone.innerText = '手机号正确';
        i_phone.innerText = '√';
        i_phone.style.backgroundColor = 'green';
        spand_phone.style.color = 'green';
        i_phone.style.opacity = '1';
        spand_phone.style.opacity = '1';
        return true;
    };

    // 3. 密码验证函数
    function verifyPassword() {
        const reg = /^[a-zA-Z0-9]{6,12}$/;
        if (!reg.test(password.value.trim())) { // 增加trim去除首尾空格
            spand_password.innerText = '密码格式不正确，请重新输入'; // 修正错别字：从新 -> 重新
            i_password.innerText = '×';
            i_password.style.backgroundColor = 'red';
            spand_password.style.color = 'red';
            i_password.style.opacity = '1';
            spand_password.style.opacity = '1';
            return false;
        }
        spand_password.innerText = '密码正确';
        i_password.innerText = '√';
        i_password.style.backgroundColor = 'green';
        spand_password.style.color = 'green';
        i_password.style.opacity = '1';
        spand_password.style.opacity = '1';
        return true;
    };

    // 4. 登录选项卡切换
    login_title.addEventListener('mouseover', function (e) {
        if (e.target.tagName === 'LI') {
            login_title.querySelector('.active').classList.remove('active');
            e.target.classList.add('active');
            tab_hd.forEach(item => item.style.display = 'none'); // 简化循环写法
            tab_hd[e.target.dataset.index].style.display = 'block';
        }
    });

    // 5. 登录接口请求函数
    // 5. 登录接口请求函数
    async function login(phone, password) {
        try {
            const res = await axios.post('http://localhost:5000/api/login', {
                phone: phone,
                password: password
            });
            console.log(res.data);
            alert(res.data.message);

            if (res.data.code === 200) {
                localStorage.setItem('userphone', phone);
                // 新增：存储当前登录用户的用户名
                localStorage.setItem('username', res.data.data.username);
                location.href = '../index.html';
            }
        } catch (err) {
            console.error('登录失败：', err.response?.data || err.message);
            alert(err.response?.data?.message || '登录失败，请稍后重试');
        }
    }

    // 6. 表单提交事件（核心关联逻辑）
    from.addEventListener('submit', async function (e) {
        e.preventDefault(); // 阻止默认提交行为

        // 第一步：验证协议勾选
        if (!queren.checked) {
            return alert('请先同意协议');
        }

        // 第二步：前端格式验证
        const isPhoneValid = verifyPhone();
        const isPwdValid = verifyPassword();

        // 格式验证不通过则终止
        if (!isPhoneValid || !isPwdValid) {
            alert('请检查手机号和密码格式');
            return;
        }

        // 第三步：格式验证通过后，调用登录接口（核心关联）
        await login(phone.value.trim(), password.value.trim());
    });

})();

