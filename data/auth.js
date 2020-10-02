$(document).ready(async () => {
  let code = new URLSearchParams(window.location.search.slice(1)).get("code");
  if (code) {
    let r = new URLSearchParams();
    r.append("client_id", "576442351426207744");
    r.append("client_secret", encodeURI("pG-NTRHcpdxLL4A3OiDXrmd_nAW13_8T"));
    r.append("grant_type", "authorization_code");
    r.append("code", code);
    r.append("scope", encodeURI("identify guilds"));
    r.append(
      "redirect_uri",
      encodeURI("https://payzibotsite.glitch.me")
    );
    fetch("https://discordapp.com/api/oauth2/token", {
      method: "POST",
      body: r
    })
      .then(r => r.json())
      .then(j => {
        if (j.access_token) {
          let token = j.access_token;
          let type = j.token_type;
          localStorage.setItem("token", type + " " + token);
        }
      });
  }
  let token = localStorage.getItem("token");
  if (token) {
    let u = await fetch("https://discordapp.com/api/users/@me", {
      headers: { Authorization: token }
    }).then(r => r.json());
    let ic = u.avatar;
    if (!ic) {
      ic = `https://cdn.discord.com/embed/avatars/${u.discriminator}.png`;
    } else ic = `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.png`;
    try {
      $("#1").append(`<img src="${ic}" class="avatar">`);
      $("#tag").html(`${u.username}#${u.discriminator}`);

    } catch (e) {
      alert(e);
    }
  }
});

