window.addEventListener("DOMContentLoaded", function() {
    var backToTopBtn = document.querySelector('.back-to-top');
    var modal = document.getElementById("myModal");
    var closeBtn = document.querySelector("#myModal .close");

    window.addEventListener("scroll", function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    function openForm() {
        modal.style.display = "block";
    }

    function closeForm() {
        modal.style.display = "none";
    }

    function validateForm() {
        var name = document.getElementById("name").value;
        var phone = document.getElementById("phone").value;
        var error = document.getElementById("error-message");

        if (name === "" || phone === "") {
            error.textContent = "Вы пропустили одно или несколько полей!";
            return false;
        }
        return true;
    }

    function submitForm(event) {
        event.preventDefault(); // Предотвращение перезагрузки страницы
        if (validateForm()) {
            var formData = new FormData(document.getElementById('requestForm'));

            fetch('submit_form.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json()) // Предполагая, что сервер возвращает JSON
            .then(data => {
                var formMessage = document.getElementById('formMessage');
                formMessage.style.display = 'block';
                if (data.status === 'success') {
                    formMessage.innerText = 'Заявка успешно отправлена';
                } else {
                    formMessage.innerText = 'Ошибка при отправке заявки: ' + data.message;
                }

                document.getElementById("name").value = "";
                document.getElementById("phone").value = "";
            })
            .catch(error => {
                var formMessage = document.getElementById('formMessage');
                formMessage.style.display = 'block';
                formMessage.innerText = 'Ошибка при отправке заявки';
            });
        }
    }

    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            closeForm();
        }
    });

    closeBtn.addEventListener("click", function() {
        closeForm();
    });

    document.getElementById("phone").addEventListener("input", function() {
        this.value = this.value.replace(/\D/g, '');
        if (this.value.length > 11) {
            this.value = this.value.slice(0, 11);
        }
    });

    document.getElementById('requestForm').addEventListener('submit', submitForm);

    window.openForm = openForm;
    window.closeForm = closeForm;
    window.submitForm = submitForm;
});

