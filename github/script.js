const url = "https://api.github.com/users";
const searchinputelement = document.getElementById("search-input");
const searchbuttonelement = document.getElementById("search-btn");
const profilecontainerelement = document.getElementById("profile-container");
const profileloadingelement = document.getElementById("loading");

const generateprofile = (profile) => {
    // Bilkul same hai:

    //function generateprofile(profile) {

    //}

    //Ye dono 100% same hain.
    return `<div class="profile-box">
            <div class="top-section">
                <div class="left">
                    <div class="avatar">
                        <img src="${profile.avatar_url}" />
                    </div>
                    <div class="self">
                        <h1>${profile.name}</h1>
                        <h1>${profile.login}</h1>
                    </div>
                </div>
                <a href="${profile.repos_url}">
                <button class="primary-btn">check profile</button>
                </a>
            </div>
            <div class="about">
                <h2>About</h2>
                <p>${profile.bio}
                </p>
            </div>
            <div class="status">
                <div class="status-item">
                    <h3>Followers</h3>
                    <p>${profile.followers}</p>
                </div>
                <div class="status-item">
                    <h3>Followings</h3>
                    <p>${profile.following}</p>
                </div>
                <div class="status-item">
                    <h3>Repos</h3>
                    <p>${profile.public_repos}</p>
                </div>
            </div>
        </div>`

};
const fetchprofile = async () => {
    const username = searchinputelement.value;
    profileloadingelement.innerText = "loading......";
    profileloadingelement.style.color = "black";
    try {

        const res = await fetch(`${url}/${username}`);

        const data = await res.json();
        if (data.bio) {
            profileloadingelement.innerText = "";
            profilecontainerelement.innerHTML = generateprofile(data);
        }
        else {
            profileloadingelement.innerText = data.message;
            profileloadingelement.style.color = "red";
        }
        console.log("data", data);

    }
    catch (error) {

        console.log(error);
        profileloadingelement.innerText = " ";
    }
};

searchbuttonelement.addEventListener('click', fetchprofile);
