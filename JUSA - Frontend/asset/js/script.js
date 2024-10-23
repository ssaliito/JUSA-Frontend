document.getElementById('menu-toggle').addEventListener('click',function(){
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');

    //Cuando se da el evento click por primera vez se oculta
    sidebar.classList.toggle('hidden');

    //Cuando el menu esta cerrado el cambia en el main content a estar shifted off o shifted out
    if(sidebar.classList.contains('hidden')){
        mainContent.classList.add('shifted');
    } else{
        mainContent.classList.remove('shifted');
    }
});

document.querySelectorAll('.sidebar-item').forEach(item=>{
    item.addEventListener('click',function(){
        document.querySelectorAll('.sidebar-item').forEach( i=>{
            if( i != this){
                i.classList.remove('active');
            }
        })
        this.classList.toggle('active')
    });
});

document.getElementById('user-photo').addEventListener('click', function(){
    const dropDown = document.getElementById('dropdown');
    dropDown.classList.toggle('show');
})

document.addEventListener('click', function(event){
    const userPhoto = document.getElementById('user-photo');
    const dropDown = document.getElementById('dropdown');
    const formEdit = document.getElementById('formEdit');
    const formCreate = document.getElementById('formCreate');

    if(!userPhoto.contains(event.target) && ! dropDown.contains(event.target)){
        dropDown.classList.remove('show');
    }
})

window.addEventListener('click',function(event){
    if(event.target.className == 'modal-edit'){
        document.getElementById('modal-edit').style.display='none';
    }

    if(event.target.className == 'modal-create'){
        document.getElementById('modal-create').style.display='none';
    }
})

document.getElementById('close-btn-create').addEventListener('click',function () {
    document.getElementById('modal-create').style.display='none';
});

document.getElementById('close-btn-edit').addEventListener('click',function () {
    document.getElementById('modal-edit').style.display='none';
});

document.querySelectorAll('.submenu-item').forEach (item=>{
    if (item.textContent=='Crear'){
        item.addEventListener('click',function(){
            document.getElementById('modal-create').style.display='flex';
        })
    }
});

const currentPath = window.location.pathname;

if (currentPath == '/dashboard.html'){
    document.querySelectorAll('.edit-btn').forEach(button =>{
        button.addEventListener('click', function(){
            const card = this.closest('.card');
            const fullName = card.querySelector('h3').innerText.split(": ")[1];
            const userName = card.querySelector('p:nth-child(2)').innerText.split(": ")[1];
            const email = card.querySelector('p:nth-child(3)').innerText.split(": ")[1];
            const phoneNumber = card.querySelector('p:nth-child(4)').innerText.split(": ")[1];
            const rol = card.querySelector('p:nth-child(5)').innerText.split(": ")[1];
            const status = card.querySelector('p:nth-child(6)').innerText.split(": ")[1];

            console.log(fullName, userName, email, rol, status);

            document.getElementById('editFullName').value = fullName;
            document.getElementById('editUserName').value = userName;
            document.getElementById('editEmail').value = email;
            document.getElementById('editPhoneNumber').value = phoneNumber;

            document.getElementById('modal-edit').style.display = 'flex';
        });
    })
};

if (currentPath == '/users.html'){
    document.querySelectorAll('.edit-btn').forEach(button =>{
        button.addEventListener('click', function(){
            const card = this.closest('.card');
            const fullName = card.querySelector('h3').innerText.split(": ")[1];
            const userName = card.querySelector('p:nth-child(2)').innerText.split(": ")[1];
            const email = card.querySelector('p:nth-child(3)').innerText.split(": ")[1];
            const phoneNumber = card.querySelector('p:nth-child(4)').innerText.split(": ")[1];
            const rol = card.querySelector('p:nth-child(5)').innerText.split(": ")[1];
            const status = card.querySelector('p:nth-child(6)').innerText.split(": ")[1];
            const id = card.querySelector('p:nth-child(7)').innerText.split(": ")[1];

            //console.log(fullName, userName, email, rol, status);

            document.getElementById('editFullName').value = fullName;
            document.getElementById('editUserName').value = userName;
            document.getElementById('editEmail').value = email;
            document.getElementById('editPhoneNumber').value = phoneNumber;
            document.getElementById('editId').value = id;

            document.getElementById('modal-edit').style.display = 'flex';
        });
    })
};