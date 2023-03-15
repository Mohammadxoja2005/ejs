const showData = document.querySelector('.showData');
const input = document.querySelector(".input_fill");
const createBtn = document.querySelector(".create_btn");

const getAllData = async () => {
    const data = await fetch('http://localhost:3002/crud');
    const json = await data.json();
    return json;
}

const data = getAllData();

data
    .then((data) => {
        let str = "";
        data.forEach((value) => {
            str += `<div class="renderData">
         <li class="showData_text" >${value.text}</li>
         <div class="showData_btns">
             <div class="btn delete" data-id=${value.id}>delete</div>
             <div class="btn update">update</div>
        </div>
         </div>`
        })

        return str;
    }).then((renderedData) => {
        showData.innerHTML = renderedData;
    }).then(() => {
        const deleteBtn = document.querySelectorAll(".delete");

        deleteBtn.forEach((value) => {
            value.addEventListener("click", () => {

                const id = value.getAttribute("data-id");

                fetch('http://localhost:3002/crud', {
                    method: "DELETE",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    redirect: "follow",
                    referrerPolicy: "no-referrer",
                    body: JSON.stringify({ id: id }),
                });

                window.location.reload();
            })
        })

    })


class Operations {
    textChange(e) {
        this.text = e.target.value;

        createBtn.addEventListener('click', async () => {
            console.log(this.text);

            await fetch('http://localhost:3002/crud', {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify({ text: this.text }),
            });

            window.location.reload();

        })
    }
}

const operations = new Operations();

input.addEventListener("change", operations.textChange);





