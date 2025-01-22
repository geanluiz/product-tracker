
const modal = document.getElementById('modal')
if (modal) {
    modal.addEventListener('show.bs.modal', event => {
        // Button that triggered the modal
        const button = event.relatedTarget

        const product = button.getAttribute('data-bs-name')

        // Update the modal's content.
        const modalBodyInput = modal.querySelector('.modal-dialog')
        const productId = button.value


        htmlForm = fetch(`/edit/${productId}`)
        .then(response => response.text())
        .then(html => {
            modalBodyInput.innerHTML = html
        })
    })
}

function togglePwd() {
    document.querySelectorAll('.pwd').forEach(e=> {
        if (e.type === "password") {
            e.type = "text";
        } else {
            e.type = "password";
        }
    })
}

