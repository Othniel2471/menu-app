const btn = document.querySelector(".modal-btn");
const overlay = document.querySelector(".modal-overlay");
const closeBtn = document.querySelector(".close-btn");

btn.addEventListener("click", () => {
  overlay.classList.add("open-modal");
});
closeBtn.addEventListener("click", () => {
  overlay.classList.remove("open-modal");
});
// overlay.addEventListener("click", () => {
//   overlay.classList.remove("open-modal");
// });

// menu inputs
const form = document.querySelector("form").addEventListener("click", (e) => {
  // e.preventDefault();
  e.preventDefault();
});
const foodName = document.querySelector("#meal");
const foodPrice = document.querySelector("#price");
const foodCate = document.querySelector("#cate");
const foodDesc = document.querySelector("#desc");
const sectionCenter = document.querySelector(".section-center");
const imageInput = document
  .querySelector("#image_input")
  .addEventListener("change", function () {
    console.log(this.files);
  });
const btnContainner = document.querySelector(".btn-container");

// food menu array
const foodMenu = [];

// display menu
const displayItem = () => {
  addItem();
  clearFields();
  displayMenu(foodMenu);
  overlay.classList.remove("open-modal");
};

// create  menu
const addItem = () => {
  const foodDetails = {
    name: foodName.value,
    price: foodPrice.value,
    category: foodCate.value,
    desc: foodDesc.value,
    // img: uploadedImage,
  };
  imageUpload();
  filterMenu();
  foodMenu.push(foodDetails);
  // imageUpload();
  // console.log(uploadedImage);
  // console.log(foodMenu);
};

// display function
const displayMenu = (menu) => {
  let displayMenu = menu
    .map((item) => {
      // console.log("chief");
      return `<article class="menu-item">
          <img src="${item.img}" class="photo" alt="menu-item" />
          <div class="item-info">
            <header>
              <h4>${item.name}</h4>
              <h4 class="price">${item.price}</h4>
            </header>
            <p class="item-text">
            ${item.desc}
            </p>
          </div>
        </article>`;
    })
    .join("");
  sectionCenter.innerHTML = displayMenu;
};

// upload image
// window.addEventListener("DOMContentLoaded", imageUpload());
// let uploadedImage = "file.name";
// const imageUpload = () => {
//   imageInput.addEventListener("change", function () {
//     console.log(this.files);
//   });
// };

// filtler function and display buttons
const filterMenu = () => {
  const categories = foodMenu.reduce(
    (values, item) => {
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    ["all"]
  );
  const categoryBtns = categories
    .map((category) => {
      return `<button class="filter-btn" type="button" data-id="${category}">${category}</button>`;
    })
    .join("");
  btnContainner.innerHTML = categoryBtns;
  const filterBtns = document.querySelectorAll(".filter-btn");
  // filter items
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // console.log(e.currentTarget.dataset.id);
      let category = e.currentTarget.dataset.id;
      const menuCategory = foodMenu.filter((item) => {
        if (item.category === category) {
          return item;
        }
      });
      if (category === "all") {
        displayMenu(foodMenu);
      } else {
        displayMenu(menuCategory);
      }
    });
  });
};

// clear form
const clearFields = () => {
  foodName.value = "";
  foodPrice.value = "";
  foodCate.value = "";
  foodDesc.value = "";
};
