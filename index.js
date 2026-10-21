const API_URL = "https://crudcrud.com/api/6ce85e07ecf0470e93dea9868b79053d/Passwords";
let passwords = [];
// GET
async function getPasswords() {
    const response = await axios.get(API_URL);
    passwords = response.data;
    displayPasswords(passwords);
}
// DISPLAY
function displayPasswords(data) {
    const list = document.getElementById("password-list");
    list.innerHTML = "";
    data.forEach(function (item) {
        const text = document.createTextNode(
            item.Title + " : " + item.Password + " "
        );
        list.appendChild(text);
        const edit = document.createElement("button");
        edit.className = "edit-btn";
        edit.appendChild(document.createTextNode("Edit"));
        edit.onclick = function () {
            editPassword(item);
        };
        list.appendChild(edit);
        const del = document.createElement("button");
        del.className = "delete-btn";
        del.appendChild(document.createTextNode("Delete"));
        del.onclick = function () {
            deletePassword(item._id);
        };
        list.appendChild(del);
        list.appendChild(document.createElement("br"));
    });
    document.getElementById("total-count").textContent =
        passwords.length;
}
// POST
async function postPassword() {
    const title = document.getElementById("title").value;
    const password = document.getElementById("password").value;
    if (title === "" || password === "") {
        alert("Please enter title and password");
        return;
    }
    await axios.post(API_URL, {
        Title: title,
        Password: password
    });
    document.getElementById("title").value = "";
    document.getElementById("password").value = "";
    getPasswords();
}
// PUT
async function editPassword(item) {
    const title = prompt("Enter title", item.Title);
    const password = prompt("Enter password", item.Password);
    if (title === null || password === null) {
        return;
    }
    await axios.put(API_URL + "/" + item._id, {
        Title: title,
        Password: password
    });
    getPasswords();
}
// DELETE
async function deletePassword(id) {
    await axios.delete(API_URL + "/" + id);
    getPasswords();
}
// ADD
document.getElementById("add-btn").onclick = postPassword
// SEARCH
document.getElementById("search").oninput = function () {
    const value = this.value.toLowerCase();
    const result = passwords.filter(function (item) {
        return item.Title.toLowerCase().includes(value);
    });
    displayPasswords(result);
};
// START
getPasswords();