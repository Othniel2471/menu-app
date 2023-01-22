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
const imageInput = document.querySelector("#image_input");

const btnContainner = document.querySelector(".btn-container");

// food menu array
const foodMenu = [];

// display menu
const displayItem = () => {
  addItem();
  clearFields();
  filterMenu();
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
    img: uploadedImage,
  };
  filterMenu();
  foodMenu.push(foodDetails);
  // imgUpload();
};

// display function
const displayMenu = (menu) => {
  let displayMenu = menu
    .map((item) => {
      // console.log("chief");

      return `<article class="menu-item" data-category="${item.category}">
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
          <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
        </article>`;
    })
    .join("");

  // display menu
  sectionCenter.innerHTML = displayMenu;

  const elements = document.querySelectorAll(".menu-item");
  elements.forEach((element) => {
    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);
    // const editBtn = element.querySelector(".edit-btn");
    // editBtn.addEventListener("click", editItem);
  });
};

// delete function
const deleteItem = (e) => {
  const element = e.target.closest(".menu-item");
  const index = Array.from(sectionCenter.children).indexOf(element);
  foodMenu.splice(index, 1);
  displayMenu(foodMenu);
};

// edit function

// upload image
let uploadedImage = "";

imageInput.addEventListener("change", function () {
  // console.log(this.files);
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    console.log(reader.result);
    uploadedImage = reader.result;
  });
  reader.readAsDataURL(this.files[0]);
});

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
      return `<button type="button" class="filter-btn" data-category="${category}">${category}</button>`;
    })
    .join("");
  btnContainner.innerHTML = categoryBtns;
  btnContainner.addEventListener("click", (e) => {
    if (e.target.classList.contains("filter-btn")) {
      const category = e.target.getAttribute("data-category");
      if (category === "all") {
        displayMenu(foodMenu);
      } else {
        const filteredMenu = foodMenu.filter(
          (item) => item.category === category
        );
        displayMenu(filteredMenu);
      }
    }
  });
};

// clear form
const clearFields = () => {
  foodName.value = "";
  foodPrice.value = "";
  foodCate.value = "";
  foodDesc.value = "";
};
