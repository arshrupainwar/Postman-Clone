console.log("loded");

function getElementFromString(string) {
  const div = document.createElement("div");
  div.innerHTML = string;
  return div.firstElementChild;
}

let parameterBox = document.getElementById("parameterBox");
parameterBox.style.display = "none";

let addedparamCount = 0;

let paramRadio = document.getElementById("paramsradio");
paramRadio.addEventListener("click", () => {
  document.getElementById("requestJsonBox").style.display = "none";

  document.getElementById("parameterBox").style.display = "block";

});

let jsonradio = document.getElementById("jsonradio");
jsonradio.addEventListener("click", () => {
  document.getElementById("parameterBox").style.display = "none";
  document.getElementById("requestJsonBox").style.display = "block";
  document.getElementById("params").style.display = "none";
});

let addParam = document.getElementById("addParam");
addParam.addEventListener("click", () => {
  let params = document.getElementById("params");
  let string = `
    <div id="parameterBox">
    <div class="form-row my-2">
      <label for="url" class="col-sm-2 col-form-label">Parameter${addedparamCount + 2}</label>
      <div class="col-md-4">
        <input type="text" class="form-control" id="parameterkey${addedparamCount + 2}" placeholder="Enter Parameter ${addedparamCount + 2} Key">
      </div>
      <div class="col-md-4">
        <input type="text" class="form-control" id="parametervalue${addedparamCount + 2}" placeholder="Enter Parameter ${addedparamCount + 2} Value">
      </div>
      <button type="button" id="addParam" class="btn btn-success deleteParam">-</button>
    </div>
  </div> `

  addedparamCount++;
  let childElement = getElementFromString(string);
  params.appendChild(childElement);

  let deleteparam = document.getElementsByClassName("deleteParam");
  for (item of deleteparam) {
    item.addEventListener("click", (e) => {
      e.target.parentElement.remove();
    })
  }
});

// submit button

document.getElementById("submit").addEventListener("click", () => {
  const url = document.getElementById("urlField").value;
  const requestType = document.querySelector("input[name='requestType']:checked").value;
  const contentType = document.querySelector("input[name='contentType']:checked").value;
  console.log(requestType, contentType);
  let data = {};
  if (contentType == "params") {

    for (let i = 1; i <= addedparamCount + 1; i++) {
      let key = document.getElementById(`parameterkey${i}`).value;
      let value = document.getElementById(`parametervalue${i}`).value;
      data[key] = value;
    }
    //console.log(data);
  }

  else {
    data = document.getElementById("requestJsonText").value;
  }

  if (requestType == "GET") {
    //console.log(url)
    fetch(url)
      .then(res => res.text())
      .then(data => {
        console.log(data)
        document.getElementById("responseJsonText").value = data
      })
      .catch(err => console.log(err))

  }

  else if (requestType == "POST") {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json,charset=UTF-8"
      },
      body: data
    }).then(res => res.text())
      .then(data => console.log(data))
      .catch(err => console.log(err))

    document.getElementById("responseJsonText").value = data;
  }

  else if (requestType === 'DELETE') {

    fetch(url, {
      method: "DELETE"
      })
      .then(res => res.text())
      .then(data => {
        console.log(data)
        document.getElementById("responseJsonText").value = data
      })
  }

  else if (requestType === 'PUT') {

    fetch(url, {
      method: "PUT",
      body: data,
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => res.text())
      .then(data => {
        console.log(data)
        document.getElementById("responseJsonText").value = data
      })
  }
});



