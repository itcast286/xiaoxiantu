window.addEventListener("load", function () {
  // 轮播图
  (function () {
    let arr = [
      {
        src: "./images/b1.jpg",
      },

      {
        src: "./images/b2.jpg",
      },

      {
        src: "./images/b3.jpg",
      },

      {
        src: "./images/b4.jpg",
      },

      {
        src: "./images/b5.jpg",
      },
    ];

    const main = document.querySelector(".main");
    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");
    const focus = document.querySelector(".focus");
    let index = 0;
    let n = setInterval(() => {
      index++;
      if (index >= arr.length) {
        index = 0;
      }
      if (main) {
        main.style.backgroundImage = `url(${arr[index].src})`;
        document
          .querySelector(".focus .promo-nav .active")
          .classList.remove("active");
        document
          .querySelector(`.promo-nav li:nth-child(${index + 1})`)
          .classList.add("active");
      } else {
        focus.style.backgroundImage = `url(${arr[index].src})`;
        focus.style.backgroundSize = "cover";
      }
    }, 2000);
    if (main) {
      prev.addEventListener("click", () => {
        index--;
        if (index < 0) {
          index = arr.length - 1;
        }
        main.style.backgroundImage = `url(${arr[index].src})`;
        document
          .querySelector(".focus .promo-nav .active")
          .classList.remove("active");
        document
          .querySelector(`.promo-nav li:nth-child(${index + 1})`)
          .classList.add("active");
      });
      next.addEventListener("click", () => {
        index++;
        if (index >= arr.length) {
          index = 0;
        }
        main.style.backgroundImage = `url(${arr[index].src})`;
        document
          .querySelector(".focus .promo-nav .active")
          .classList.remove("active");
        document
          .querySelector(`.promo-nav li:nth-child(${index + 1})`)
          .classList.add("active");
        focus.addEventListener("mouseenter", () => {
          clearInterval(n);
        });
        focus.addEventListener("mouseleave", () => {
          n = setInterval(() => {
            index++;
            if (index >= arr.length) {
              index = 0;
            }
            main.style.backgroundImage = `url(${arr[index].src})`;
            document
              .querySelector(".focus .promo-nav .active")
              .classList.remove("active");
            document
              .querySelector(`.promo-nav li:nth-child(${index + 1})`)
              .classList.add("active");
          }, 2000);
        });
      });
    } else {
          focus.addEventListener("mouseleave", () => {
            n = setInterval(() => {
              index++;
              if (index >= arr.length) {
                index = 0;
              }
              focus.style.backgroundImage = `url(${arr[index].src})`;
            }, 2000);
          });
      focus.addEventListener("mouseenter", () => {
        clearInterval(n);
      });
    }
  })();

  // 搜索框
  (function () {
    const searchBtn = document.querySelector(".search-btn");
    const input = document.querySelector("#pt");
    const ul = document.querySelector(".search-btn");
    let arr = [];
    // 搜索框失去焦点时显示搜索按钮
    input.addEventListener("blur", () => {
      searchBtn.style.display = "block";
      searchBtn.style.backgroundColor = "#fff";
    });
    // 搜索框获得焦点时隐藏搜索按钮
    input.addEventListener("focus", () => {
      searchBtn.style.display = "none";
      input.style.borderColor = "#eceae0e0";
      searchBtn.style.opacity = 0.5;
    });
    // 搜索框按下回车键时添加搜索记录
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        if (input.value.trim() !== "") {
          // p.innerHTML = input.value;
          arr.push(input.value);
          render();
        }
        input.value = "";
      }
    });
    // 渲染搜索记录
    function render() {
      ul.innerHTML = "";
      for (let i = 0; i < arr.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = `
                ${arr[i]}<a data-id="${i}">×</a>
                
            `;
        ul.appendChild(li);
      }
    }
    // 点击删除搜索记录
    ul.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        const id = e.target.dataset.id;
        arr.splice(id, 1);
        render();
      }
    });
  })();

  // 电梯导航
  (function () {
    const elevator = document.querySelector(".page");
    window.addEventListener("scroll", function () {
      const n = document.documentElement.scrollTop;
      if (n >= 200) {
        elevator.style.opacity = 1;
      } else {
        elevator.style.opacity = 0;
      }
    });
  })();

  // 固定导航
  (function () {
    const headers = document.querySelector(".headers");
    window.addEventListener("scroll", function () {
      const n = document.documentElement.scrollTop;
      if (n >= 200) {
        headers.style.top = 0;
      } else {
        headers.style.top = "-80px";
      }
    });
  })();

  // 选项卡
  // (function () {
  //     const ul = document.querySelector('.wb');
  //     ul.addEventListener('click', function (e) {
  //         e.preventDefault();
  //         if (e.target.tagName === 'A' && e.target.dataset.name) {
  //             const old = document.querySelector('.wb .active').classList.remove('active');

  //             if (old) {
  //                 old.classList.remove('active');
  //             }
  //             e.target.classList.add('active');
  //             const top = document.querySelector(`.xtx_goods_${e.target.dataset.name}`).offsetTop;
  //             console.log(e.target.dataset.name);
  //             document.documentElement.scrollTop = top;
  //         }
  //     });

  // })();

  (function () {
    const as = document.querySelectorAll(".wb li a");
    for (let i = 0; i < as.length; i++) {
      as[i].addEventListener("mouseenter", function () {
        document.querySelector(".wb li .active").classList.remove("active");
        this.classList.add("active");
        console.log(as[i].dataset.name);

        if (as[i].dataset.name) {
          const top = document.querySelector(
            `.xtx_goods_${as[i].dataset.name}`,
          ).offsetTop;
          document.documentElement.scrollTop = top;
        }
      });
    }

    const backTop = document.querySelector("#backTop");
    backTop.addEventListener("mouseenter", () => {
      document.documentElement.scrollTop = 0;
    });
  })();

  // 倒计时
  (function () {
    let time = document.querySelector(".headers");
    function getTime() {
      let k = +new Date();
      let n = +new Date("2026-3-15 0:0:0");
      let diff = (n - k) / 1000; //秒
      let d = parseInt(diff / 60 / 60 / 24);
      let h = parseInt((diff / 60 / 60) % 24);
      let m = parseInt((diff / 60) % 60);
      let s = parseInt(diff % 60);

      return `距离2026-3-15剩余${d}天${h}时:${m}分:${s}秒`;
    }

    setInterval(() => {
      time.innerHTML = getTime();
    }, 1000);
  })();

  //查找节点并添加事件
  (function () {
    const pages = document.querySelector(".pages_prev");
    const pages_next = document.querySelector(".pages_n");

    pages.addEventListener("click", function () {
      this.parentNode.style.display = "none";
    });
    pages_next.addEventListener("click", function () {
      location.href = "https://www.baidu.com";
    });
    let i = 15;
    let timer = setInterval(() => {
      pages_next.innerHTML = `${i--}s后关闭`;
      console.log(i);
      if (i < 0) {
        clearInterval(timer);
      }
    }, 1000);
    setTimeout(() => {
      pages.parentNode.style.display = "none";
    }, 17000);

    const li = document.querySelector(".fl li");
    const li1 = document.querySelector(".fr li");

    function render() {
      const username = localStorage.getItem("username");
      const userphone = localStorage.getItem("userphone");
      if (username) {
        li.innerHTML = `欢迎您，${username}`;
        li1.innerHTML = '<a href="./uploads/login.html">退出登录</a>';
      } else if (userphone) {
        li.innerHTML = `欢迎您，${username}`;
        li1.innerHTML = '<a href="./index.html">退出登录</a>';
      }
    }
    render();
    li1.addEventListener("click", function () {
      localStorage.removeItem("username");
      localStorage.removeItem("userphone");
      render();
    });
  })();
});
