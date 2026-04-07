let allowedDomains = [];
let domainsLoaded = false;

fetch("/.netlify/functions/get-domains")
    .then(res => {
        if (!res.ok) throw new Error("Server error");
        return res.json();
    })
    .then(domains => {
        allowedDomains = domains.map(d => d.toLowerCase());
        domainsLoaded = true;
    })
    .catch(() => {
        showError("Could not load login configuration. Please try refreshing the page.");
    });

function setCookie(name, value, hours) {
    const d = new Date();
    d.setTime(d.getTime() + (hours * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

function handleLogin() {
    if (!domainsLoaded) {
        showError("Still loading, please try again in a moment.");
        return;
    }

    const email = document.getElementById("email").value.trim();
    const domain = email.split("@")[1]?.toLowerCase();

    if (allowedDomains.includes(domain)) {
        setCookie("auth", "true", 24);
        window.location.href = "index.html";
    } else {
        showError("Access denied. Your email domain is not allowed.");
    }
}

function showError(message) {
    const existing = document.getElementById("login-error");
    if (existing) existing.remove();

    const err = document.createElement("p");
    err.id = "login-error";
    err.textContent = message;
    err.style.cssText = "color:#e53935; font-size:0.85rem; margin-top:0.75rem;";
    document.getElementById("login-form").appendChild(err);
}

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    handleLogin();
});
