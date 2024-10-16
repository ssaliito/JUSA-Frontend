$('#formLogin').on('submit', function (event) {
    event.preventDefault();

    const formData = {
        userName: $('input[name="userName"]').val(),
        keyword: $('input[name="keyword""]').val(),
        email: $('input[name="email"]').val(),
    }

    $.post('http:/localhost:4000/auth/login',
        formData,
        function (data) {

            if (data.result.user.length > 0) {
                //  SweetAlrt2

                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: data.result.message
                });

                window.location.href = 'dashboard.html'
            } else{
                //  SweetAlrt2

                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "error",
                    title: "Usuario y/o contraseña incorrectos"
                });
            }
        }

    )
})