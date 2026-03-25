(function () {
  // 用户名验证
  const username = document.getElementById("username");
  const icon = username.nextElementSibling;
  const err = icon.nextElementSibling;
  username.addEventListener("change", verifyusername);
  function verifyusername() {
    const reg = /^[\u4e00-\u9fa5a-zA-Z0-9_]{2,10}$/;
    if (!reg.test(username.value)) {
      setError(icon, err, "×", "请输入2-10位中文/字母/数字/下划线", "red");
      return false;
    } else {
      setSuccess(icon, err, "√", "输入正确", "green");
      return true;
    }
  }

  // 手机号验证
  const userphone = document.getElementById("phone");
  const icon2 = userphone.nextElementSibling;
  const err2 = icon2.nextElementSibling;
  userphone.addEventListener("change", verifyuserphone);
  function verifyuserphone() {
    const reg = /^1[3-9]\d{9}$/;
    if (!reg.test(userphone.value)) {
      setError(icon2, err2, "×", "请输入正确的手机号", "red");
      return false;
    } else {
      setSuccess(icon2, err2, "√", "输入正确", "green");
      return true;
    }
  }

  // 短信验证码相关
  const code = document.getElementById("code");
  const getCodeBtn = code.nextElementSibling;
  const icon_code = getCodeBtn.nextElementSibling;
  const err_code = icon_code.nextElementSibling;

  // 获取验证码按钮逻辑
  getCodeBtn.addEventListener("click", function () {
    if (!verifyuserphone()) {
      alert("请先输入正确的手机号");
      return;
    }
    getCodeBtn.disabled = true;
    getCodeBtn.innerHTML = "60秒后重新获取";
    let time = 60;
    const timer = setInterval(() => {
      time--;
      getCodeBtn.innerHTML = `${time}秒后重新获取`;
      if (time <= 0) {
        clearInterval(timer);
        getCodeBtn.innerHTML = "重新获取";
        getCodeBtn.disabled = false;
      }
    }, 1000);
  });

  // 验证码验证
  code.addEventListener("change", verifyCode);
  function verifyCode() {
    const reg = /^\d{6}$/;
    if (!reg.test(code.value)) {
      setError(icon_code, err_code, "×", "请输入6位数字", "red");
      getCodeBtn.style.backgroundColor = "#fff";
      return false;
    } else {
      setSuccess(icon_code, err_code, "√", "输入正确", "green");
      getCodeBtn.style.backgroundColor = "rgb(232, 240, 254)";
      return true;
    }
  }

  // 密码验证
  const password = document.getElementById("password");
  const icon3 = password.nextElementSibling;
  const err3 = icon3.nextElementSibling;
  password.addEventListener("change", verifyPassword);
  function verifyPassword() {
    const reg = /^[a-zA-Z0-9_]{6,12}$/;
    if (!reg.test(password.value)) {
      setError(icon3, err3, "×", "请输入6-12位字母/数字/下划线", "red");
      return false;
    } else {
      setSuccess(icon3, err3, "√", "输入正确", "green");
      return true;
    }
  }

  // 确认密码验证
  const password2 = document.getElementById("confirm-password");
  const icon4 = password2.nextElementSibling;
  const err4 = icon4.nextElementSibling;
  password2.addEventListener("change", verifyPassword2);
  function verifyPassword2() {
    if (password2.value === password.value && password2.value) {
      setSuccess(icon4, err4, "√", "输入正确", "green");
      return true;
    } else if (!password2.value) {
      setError(icon4, err4, "×", "请确认密码", "red");
      return false;
    } else {
      setError(icon4, err4, "×", "两次密码不一致", "red");
      return false;
    }
  }

  // 通用状态设置函数
  function setSuccess(icon, err, iconText, errText, color) {
    icon.style.display = "inline-block";
    err.style.display = "inline-block";
    icon.innerHTML = iconText;
    err.innerHTML = errText;
    err.style.color = color;
    icon.style.backgroundColor = color;
  }
  function setError(icon, err, iconText, errText, color) {
    icon.style.display = "inline-block";
    err.style.display = "inline-block";
    icon.innerHTML = iconText;
    err.innerHTML = errText;
    err.style.color = color;
    icon.style.backgroundColor = color;
  }

  // 表单提交逻辑（核心）
  const queren = document.getElementById("checkbox");
  const form = document.querySelector("form");
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    // 1. 校验协议
    if (!queren.checked) {
      alert("请先同意协议");
      return;
    }
    // 2. 校验所有字段
    const isAllValid =
      verifyusername() &&
      verifyPassword() &&
      verifyPassword2() &&
      verifyuserphone() &&
      verifyCode();
    if (!isAllValid) return;
    // 3. 组装请求数据
    const registerData = {
      username: username.value,
      password: password.value,
      phone: userphone.value,
      code: code.value,
    };
    // 4. 发起注册请求
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/register",
        registerData,
      );
      const result = await response.data;
      // 5. 处理结果
      alert(result.message || "注册成功");
      if (result.code === 200) {
        localStorage.setItem("username", username.value);
        window.location.href = "../index.html";
      } else {
        alert(result.message || "注册失败");
      }
    } catch (error) {
      console.error("注册请求失败：", error.response?.data || error.message);
      alert(error.response?.data?.message || "注册失败");
    }
  });
})();
