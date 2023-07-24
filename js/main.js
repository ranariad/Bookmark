var siteName = document.getElementById("SiteName");
var siteUrl = document.getElementById("siteUrl");
var addBtn = document.getElementById("addBtn");
var editBtn = document.getElementById("editBtn");
var currentIndex;
var modalBox = document.getElementById("modalBox");
var closeBtn = document.getElementById("closeBtn");
var repeatWarning = document.getElementById("repeatWarning");

// todo: create an empty array that will contain all the bookmarks object
bookmarksContainer = [];

//todo: display the saved bookmarks in local storage when user open the application
if (localStorage.getItem("bookmarks") !== null) {
    bookmarksContainer = JSON.parse(localStorage.getItem("bookmarks"));
    displayBookmarks(bookmarksContainer);
  }

function createBookmarke(){
    if (validateSiteName() === true && validateSiteUrl() === true) {
        var bookmark = {
          bookmarkName: siteName.value,
          bookmarkUrl: siteUrl.value,
        };
        bookmarksContainer.push(bookmark);
        displayBookmarks(bookmarksContainer);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarksContainer));
        resetBookmark();
        
      } else {
        displayModalBox()
      }
      
}

// todo: call createBookmark Function when user click on addBtn
addBtn.addEventListener("click", createBookmarke);

// todo: create a function that will display all of the saved bookmarks in the table after user click on addBtn
function displayBookmarks(arr) {
    var tableRows = ``;
    for (let i = 0; i < arr.length; i++) {
      tableRows += `
          <tr>
          <td>${i + 1}</td>
          <td>${arr[i].bookmarkName}</td>
          <td>
            <a href="${arr[i].bookmarkUrl}" target="_blank" class="btn btn-outline-dark btn-sm visitBtn fs-6">
              Visit
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </td>
          <td>
            <button class="btn btn-outline-warning btn-sm fs-6 editBtn" onclick="setEditBookmark(${i})">
              Edit
              <i class="fa-solid fa-edit"></i>
            </button>
          </td>
          <td>
            <button class="btn btn-outline-danger btn-sm fs-6" onclick="deleteBookmark(${i})">
              Delete
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
          `;
    }
    document.getElementById("tableBody").innerHTML = tableRows;
  }

  //todo: create a function that reset input values after user click on addBtn
function resetBookmark() {
    siteName.value = "";
    siteUrl.value = "";
  }

  //todo: create a function that allows the user to delete a bookmark
function deleteBookmark(index) {
    bookmarksContainer.splice(index, 1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarksContainer));
    displayBookmarks(bookmarksContainer);
  }

  //todo: create a function that allows the user to edit a bookmark
function setEditBookmark(indexValue) {
    currentIndex = indexValue;
    siteName.value = bookmarksContainer[indexValue].bookmarkName;
    siteUrl.value = bookmarksContainer[indexValue].bookmarkUrl;
    addBtn.classList.replace("d-block", "d-none");
    editBtn.classList.replace("d-none", "d-block");

  }
  
  //todo: create a function that save edited bookmark when user click on editBtn
  function saveEditedBookmark() {
    if (validateSiteName() === true && validateSiteUrl() === true) {
      bookmarksContainer[currentIndex].bookmarkName = siteName.value;
      bookmarksContainer[currentIndex].bookmarkUrl = siteUrl.value;
      editBtn.classList.replace("d-block", "d-none");
      addBtn.classList.replace("d-none", "d-block");
      localStorage.setItem("bookmarks", JSON.stringify(bookmarksContainer));
      displayBookmarks(bookmarksContainer);
      resetBookmark();
  }else {
    displayModalBox();
  }
}
  
  editBtn.addEventListener("click", saveEditedBookmark);
  
  //todo: create functions that validate siteName input
  function validateSiteName() {
    var regexName = /^[A-Za-z0-9_]{3,}[A-Za-z0-9_\s]{0,}$/gm;
    return regexName.test(siteName.value);
  }
  
  //todo: create functions that validate siteUrl input
  function validateSiteUrl() {
    var regexUrl = /^(https:\/\/){1}[a-zA-Z0-9_?\/]{1,}\.[a-zA-Z0-9_?\/]{2,}$/gm;
    return regexUrl.test(siteUrl.value);
  }
  
  // todo: tell the user that his inputs match or mismatch the regex while typing the values by changing inputs shadow color
  function directValidateInputs(ValidateFunction, input, alertId, checkId) {
    if (ValidateFunction() === true) {
      input.style.boxShadow = "0 0 0 0.25rem rgba(25,135,84,.25)";
      document.getElementById(checkId).classList.replace("d-none", "d-block");
      document.getElementById(alertId).classList.replace("d-block", "d-none");
    } else {
      input.style.boxShadow = "0 0 0 0.25rem rgba(220,53,69,.25)";
      document.getElementById(alertId).classList.replace("d-none", "d-block");
      document.getElementById(checkId).classList.replace("d-block", "d-none");
    }
  }
  
// todo: create a function that display modal box when user enters invalid input value
function displayModalBox() {
    modalBox.classList.replace("invisible", "visible");
    modalBox.classList.replace("opacity-0", "opacity-100");
  }
 
//   // todo: create a function to hide the modal box when user click on closeBtn
function closeModal() {
    modalBox.classList.replace("visible", "invisible");
    modalBox.classList.replace("opacity-100", "opacity-0");
  }
  
  closeBtn.onclick = closeModal;
  
