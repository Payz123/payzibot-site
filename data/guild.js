$(document).ready(async()=>{
  let token = localStorage.getItem("token")
  let e = await fetch("/ex/"+id).then(r=>r.json())
  if(e.ex==false||!token){
    $("#cont").html("<h1>Упс.... Похоже что бота нет на вашем сервере или вы не авторизированны</h1>")
    return
  }
  let r = new URLSearchParams()
  r.append("token",token)
  let g = await fetch("/g/"+id,{method:"POST",body:r}).then(r=>r.json())
  for (let p in g){
    g[p]=decodeURI(g[p])
  }
  $("#tit").html("Панель управления — "+g.name)
  g.ch=g.ch.split("%").map(el=>{return {id:el.split("$")[0],name:el.split("$")[1]}})
  $("#opt").append(`<h1>Префикс</h1><textarea class="t" id="${g.id}pr">${g.prefix}</textarea><br><br>`)
  $("#opt").append(`<h1>Канал для сообщений о новых участниках</h1><select class="c" id='${g.id}jc'><option value="0">Выберите канал</option>${g.ch.map(c=>`<option value="${c.id}">${c.name}</option>`)}</select><br><br>`)
  if(g.ch.includes(g.jc)) $("#"+g.id+"jc option[value='"+g.jc+"']").attr("selected","selected")
  $("#opt").append(`<h1>Канал для сообщений об ушедших участниках</h1><select class="c" id='${g.id}lc'><option value="0">Выберите канал</option>${g.ch.map(c=>`<option value="${c.id}">${c.name}</option>`)}</select><br><br>`)
  if(g.ch.includes(g.lc))
  $("#"+g.id+"lc option[value='"+g.lc+"']").attr("selected","selected")
  $("#opt").append(`<h1>Сообщение при входе</h1><textarea class="t" id="${g.id}jt">${g.jt}</textarea><br><br>`)
  $("#opt").append(`<h1>Сообщение при выходе</h1><textarea class="t" id="${g.id}lt">${g.lt}</textarea><br><br>`)
  try{
  $("#"+g.id+"lc").change(()=>{
    let p = new URLSearchParams()
    p.append("lc",$("#"+g.id+"lc").val())
    p.append("token",token)
    p.append("token",token)
    fetch("/edit/"+g.id,{method:"POST",body:p})
  })
  $("#"+g.id+"jc").change(()=>{
    let p = new URLSearchParams()
    p.append("jc",$("#"+g.id+"jc").val())
    p.append("token",token)
    fetch("/edit/"+g.id,{method:"POST",body:p})
    
  })
  $("#"+g.id+"lt").change(()=>{
    let p = new URLSearchParams()
    p.append("lt",encodeURI($("#"+g.id+"lt").val()))
    p.append("token",token)
    fetch("/edit/"+g.id,{method:"POST",body:p})
  })
  $("#"+g.id+"jt").change(()=>{
    let p = new URLSearchParams()
    p.append("jt",encodeURI($("#"+g.id+"jt").val()))
    p.append("token",token)
    fetch("/edit/"+g.id,{method:"POST",body:p})
  })
  $("#"+g.id+"pr").change(()=>{
    let p = new URLSearchParams()
    p.append("pr",encodeURI($("#"+g.id+"pr").val()))
    p.append("token",token)
    fetch("/edit/"+g.id,{method:"POST",body:p})
    })
}catch(e){alert(e)}
})
