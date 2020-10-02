$(document).ready(async()=>{
  let token = localStorage.getItem("token")
  if(token){
  let glds = await fetch("https://discordapp.com/api/users/@me/guilds",{headers:{Authorization:token}}).then(r=>r.json())
  glds = glds.filter(g=>g.owner||(g.permissions&0x00000008)==0x00000008)
  $("#gl").html("<option value='0'>Выберите сервер</option>"+glds.map(g=>`<option value="${g.id}">${g.name}</option>`).join(""))
  $("#gl").change(()=>{
    if($("#gl").val()=="0")return
    let guild = $("#gl").val()
    window.location.pathname="/guild/"+guild
  })
  }
})