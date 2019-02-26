let list = [];

if (localStorage.getItem("list")) {
    list = JSON.parse(localStorage.getItem('list'));
}

// localStorage.removeItem("list");

console.log(list);