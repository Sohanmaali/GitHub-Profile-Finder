const searchBtn = document.getElementById('searchBtn');

const usernameInput = document.getElementById('username');
const resultDiv = document.getElementById('result');
const errorDiv = document.getElementById('error');
const loadingDiv = document.getElementById('loading');

async function fetchProfile(username) {
    resultDiv.classList.add('hidden');
    errorDiv.classList.add('hidden');
    loadingDiv.classList.remove('hidden');

    try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        const data = await res.json();
        loadingDiv.classList.add('hidden');

        if (res.status !== 200) {
            errorDiv.textContent = data.message || "User not found!";
            errorDiv.classList.remove('hidden');
            return;
        }

        document.getElementById('avatar').src = data.avatar_url;
        document.getElementById('name').textContent = data.name || 'No name provided';
        document.getElementById('login').textContent = data.login;
        document.getElementById('profileLink').href = data.html_url;
        document.getElementById('bio').textContent = data.bio || 'No bio available.';
        document.getElementById('repos').textContent = data.public_repos;
        document.getElementById('followers').textContent = data.followers;
        document.getElementById('following').textContent = data.following;

        resultDiv.classList.remove('hidden');
        resultDiv.classList.add('fade-in');
    } catch (err) {
        loadingDiv.classList.add('hidden');
        errorDiv.textContent = "Something went wrong. Try again!";
        errorDiv.classList.remove('hidden');
    }
}

searchBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (username) fetchProfile(username);
});

usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchBtn.click();
});
