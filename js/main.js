var siteName = document.getElementById("siteName")
var siteUrl = document.getElementById("siteUrl")
var alert = document.querySelector("dialog")
var list = []
if (localStorage.getItem("webSite") != null) {
    list = JSON.parse(localStorage.getItem("webSite"))
    display(list)
}

// ADD SITE
function addSite() {
    if (valid(/^\w{3,}(\s+\w+)*$/, siteName) == true && valid(/^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/, siteUrl) == true && repeat() != true) {
        var site = {
            name: siteName.value,
            url: siteUrl.value
        }
        list.push(site)
        localStorage.setItem("webSite", JSON.stringify(list))
        display()
        clear()

    }
    else {
        alert.style.display = "block"
    }
}

// DISPLAY
function display() {
    var temp = ""
    for (var i = 0; i < list.length; i++) {
        temp += `<tr>
<td>`+ (i + 1) + `</td>
<td>`+ list[i].name + `</td>
<td>
<a href="`+ list[i].url + `" target="_blank" class="text-decoration-none ">
<button type="button" class="btn visit">
  <i class="fa-solid fa-eye pe-2"></i>
  Visit</button>
</a>
</td>
<td>
<button type="button" class="btn delete" onclick="deleteSite(`+ i + `)">
<i class="fa-solid fa-trash-can pe-2"></i>
Delete</button>
</td>
<tr>`
    }
    document.getElementById("tableBody").innerHTML = temp
}

// DELETE
function deleteSite(x) {
    list.splice(x, 1)
    localStorage.setItem("webSite", JSON.stringify(list))
    display()
}

// Clear
function clear() {
    siteName.value = ""
    siteUrl.value = ""
    siteName.classList.remove("is-valid")
    siteUrl.classList.remove("is-valid")
}

//   Validation
siteName.addEventListener("keyup", function () {
    var nameRegex = /^\w{3,}(\s+\w+)*$/;
    valid(nameRegex, siteName)
})
siteUrl.addEventListener("keyup", function () {
    var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
    valid(urlRegex, siteUrl)
})
function valid(regex, site) {
    var result = regex.test(site.value)
    if (result == true) {
        site.classList.add("is-valid")
        site.classList.remove("is-invalid")
        return true;
    }
    else {
        site.classList.add("is-invalid")
        site.classList.remove("is-valid")
        return false;
    }
}


// REPEAT
siteName,addEventListener("keyup",function () {
    repeat()
})
function repeat() {
    for (var i = 0; i < list.length; i++) {
        var r = JSON.stringify(list[i]).toLowerCase().includes(siteName.value.toLowerCase())
        if (r == true) {
            siteName.classList.remove("is-valid")
            siteName.classList.add("is-invalid")
            return r;
        }
    }
}

// BTN CLOSE
var btn = document.querySelector(".btn-close")
btn.addEventListener("click", function () {
    alert.style.display = "none"
})


