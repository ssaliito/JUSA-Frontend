// metodo listar todos los usuarios

$(document).ready(function () {

    const url = 'http://localhost:4000/auth/viewUsers'
    $.get(
        url,
        function (data) {

            if (data.result.length > 0) {

                const users = data.result;
                let content = '';

                users.forEach(user => {
                    content += `
                <div class="card">
                    <div class="card-content">
                        <h3>Nombre Completo: `+ user.fullName + `</h3>
                        <p>Nombre de usuario: `+ user.userName + `</p>
                        <p>Correo Electronico: `+ user.email + `</p>
                        <p>Número de telefono: `+ user.phone + `</p>
                        <p>Rol: `+ user.rol + `</p>
                        <p>Estado: `+ user.status + `</p>
                        <p>id: `+ user.id + `</p>
                    </div>
                    <div class="card-actions">
                        <button class="edit-btn">Editar</button>
                        <button class="delete-btn" data-id="`+ user.id + `">Eliminar</button>
                    </div>
                </div>`;
                });

                // Insertar los nuevos usuarios en el contenedor content

                $('#main-content .content').append(content);
                $('body').append('<script src="/asset/js/script.js"></script>')

                // Mensaje sweet alet

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
                    title: "Usuarios consultados correctamente"
                });
            }else{
                $('body').append('<script src="/asset/js/script.js"></script>')
            };

        });
});


//Metodo que envia la información para la edición
$('#formEdit').on('submit', function (event) {
    event.preventDefault();

    const formData = {
        id: $("#editId").val(),
        name: $("#editFullName").val(),
        userName: $("#editUserName").val(),
        keyword: "defecto",
        rol: $("#editrol").val(),
        email: $("#editEmail").val(),
        state: "defecto",
        phoneNumber: $("#editPhoneNumber").val()
    }

    $.ajax({
        url: 'http://localhost:4000/auth/updateUser',
        type: 'PUT',
        data: formData,
        success: function (data) {
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

            setTineout(function () {
                window.location.href = 'http://localhost:5500/users.html';
            }, 2000)

        }
    });
});

//Metodo que envia la información para la eliminación
$(document).on('click', '.delete.btn', function (event) {
    event.preventDefault();

    const formData = {
        id: $(this).data('id')
    }

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: true
    });
    swalWithBootstrapButtons.fire({
        title: "¿Quiere eliminar elusuario?",
        text: "¨Despues de aceptar, no podras recuperar el usuario.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        reverseButtons: true
    }).then((result) => {

        if (result.isConfirmed) {
            $.ajax({
                url: 'http://localhost:4000/auth/deleteUser',
                type: 'DELETE',
                data: formData,
                success: function (data) {
                    swalWithBootstrapButtons.fire({
                        title: "Eliminado",
                        text: data.result.messagge,
                        icon: "success"
                    });

                    setTineout(function () {
                        window.location.href = 'http://localhost:5500/users.html';
                    }, 2000)
    
                }
            });
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelar",
                text: "El registro no ha sido afectado.",
                icon: "error"
            });
        }

    });
});

//Metodo para crear usuario
$('#formCreate').on('submit', function(event){
    event.preventDefault();

    const formData={
        name: $('input[name="name"]').val(), 
        userName: $('input[name="userName"]').val(), 
        keyword: $('input[name="keyword""]').val(), 
        rol: $('select[name="rol"]').val(), 
        email: $('input[name="email"]').val(), 
        state: $('input[name="state"]').val(), 
        phoneNumber: $('input[name="phoneNumber"]').val() 
    }

    $.post('http://localhost:4000/auth/createUser', formData, function(data){

        // Tiempo de espera para redireccionar
        setTineout(function () {
            window.location.href='http://localhost:5500/users.html';
        }, 2000)

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
    })
});