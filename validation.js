function val_u(user) {
    const u_pattern = /^[A-Za-z]+$/;
    return u_pattern.test(user);
}

function val_e(email) {
    const e_p = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return e_p.test(email);
}

function val_p(phone) {
    const p_p = /^\d{10}$/;
    return p_p.test(phone);
}

function val_pwd(pwd) {
    return pwd.length >= 6;
}

function set_v(input, v) {
    if (v) {
        input.style.borderColor = 'green';
    } else {
        input.style.borderColor = 'red';
    }
}

function validateLoginForm() {
    const u_input = document.querySelector('.user');
    const pwd_input = document.querySelector('.pwd');

    let v = true;

    if (!val_u(u_input.value)) {
        set_v(u_input, false);
        v = false;
    } else {
        set_v(u_input, true);
    }

    if (!val_pwd(pwd_input.value)) {
        set_v(pwd_input, false);
        v = false;
    } else {
        set_v(pwd_input, true);
    }

    return v;
}

function validateSignupForm() {
    const u_input = document.querySelector('.name');
    const e_input = document.querySelector('.email');
    const p_input = document.querySelector('.phone');
    const pwd_input = document.querySelector('.pwd');
    const cp_input = document.querySelector('.c-pwd');

    let v = true;

    if (!val_u(u_input.value)) {
        console.log("Username validation failed");
        set_v(u_input, false);
        v = false;
    } else {
        set_v(u_input, true);
    }

    if (!val_e(e_input.value)) {
        console.log("Email validation failed");
        set_v(e_input, false);
        v = false;
    } else {
        set_v(e_input, true);
    }

    if (!val_p(p_input.value)) {
        console.log("Phone validation failed");
        set_v(p_input, false);
        v = false;
    } else {
        set_v(p_input, true);
    }

    if (!val_pwd(pwd_input.value)) {
        console.log("Password validation failed");
        set_v(pwd_input, false);
        v = false;
    } else {
        set_v(pwd_input, true);
    }

    if (pwd_input.value !== cp_input.value) {
        console.log("Confirm password validation failed");
        set_v(cp_input, false);
        v = false;
    } else {
        set_v(cp_input, true);
    }

    return v;
}

// Attach event listeners to the buttons

document.querySelector('.e').addEventListener('click', function (ev) {
    ev.preventDefault();
    if (validateLoginForm()) {
        alert('Login Successful');
    } else {
        alert('Invalid Login Details');
    }
});

document.querySelector('.button-').addEventListener('click', function (ev) {
    ev.preventDefault();
    console.log("Signup button clicked");
    if (validateSignupForm()) {
        alert('Signup Successful');
    } else {
        alert('Invalid Signup Details');
    }
});
