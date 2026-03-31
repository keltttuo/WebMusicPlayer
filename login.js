let allowedDomains = [];

fetch("/.netlify/functions/get-domains")
    .then(res => res.json())
    .then(domains => {
        allowedDomains = domains.map(d => d.toLowerCase());
    });

function setCookie(name, value, hours) {
    const d = new Date();
    d.setTime(d.getTime() + (hours * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

function handleLogin() {
    const email = document.getElementById("email").value.trim();
    const domain = email.split("@")[1]?.toLowerCase();

    if (allowedDomains.includes(domain)) {
        setCookie("auth", "true", 24);
        window.location.href = "index.html";
    } else {
        alert("Access Denied. Domain not allowed.");
    }
}

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    handleLogin();
});
