const express = require("express")
const app = express()
const fetch = require("node-fetch")
const mongoose = require("mongoose")
mongoose.connect('mongodb+srv://Payzi:payziBot@payzidiscord.b2rpx.mongodb.net/Data', {useNewUrlParser: true, useUnifiedTopology: true})
var guild = mongoose.Schema({
  guildID: String,
  premium: {type: Boolean, default: false},
  prefix: {type: String, default: 'p.'},
  currency: {type: String, default: '<:payzi_coin:732516111442116658>'},
  joinChannel: {type: String, default: 'Отсутствует'},
  joinText: {type: String, default: 'Отсутствует'},
  leaveChannel: {type: String, default: 'Отсутствует'},
  leaveText: {type: String, default: 'Отсутствует'},
  mutes: {type: Array, default: []}
})
var gM = mongoose.model("Guild",guild)
app.use(express.static("./data"));
//635858963203751948
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/site/index.html");
  console.log(request.rawHeaders)
});
app.set("view engine","html")
let engines = require("ejs")
app.engine("html",engines.renderFile)
app.set("views",__dirname+"/site")
app.get("/guild/:id",(req,res)=>{
  res.sendFile(__dirname+"/site/guild.html")
  res.render("guild.html",{id:req.params.id})
})
app.use(require("body-parser").urlencoded({extended:false}))
app.get("/ex/:id",async(req,res)=>{
  if(await  gM.exists({guildID:req.params.id})) {return res.json({ex:true})}else res.json({ex:false})
})
app.post("/edit/:id",async(req,res)=>{
  let b = req.body
  if(!b.token)return
  let p = await fetch("https://discordapp.com/api/guilds/"+req.params.id,{headers:{Authorization:b.token}})
  if(!(p.permissions&0x00000008)==0x00000008&&!p.owner) return res.json({perms:"none"})
  gM.findOne({guildID:req.params.id},(req,g)=>{
    if(!g)return
    if(b.lc&&g.leaveChannel!=b.lc)g.leaveChannel=b.lc
    if(b.jc&&g.joinChannel!=b.jc)g.joinChannel=b.jc
    if(b.jt&&g.joinText!=decodeURI(b.jt))g.joinText=decodeURI(b.jt)
    if(b.lt&&g.leaveText!=decodeURI(b.lt))g.leaveText=decodeURI(b.lt)
    if(b.pr&&g.prefix!=decodeURI(b.pr))g.prefix=decodeURI(b.pr)
    g.save()
    console.log("0")
  })
})
app.post("/g/:id",async(req,res)=>{
  let b = req.body
  if(!b.token) return
  let r = await gM.findOne({guildID:req.params.id})
  let g = await fetch("https://discordapp.com/api/guilds/"+req.params.id,{headers:{Authorization:"Bot NTc2NDQyMzUxNDI2MjA3NzQ0.XNWjxg.QfDjcLEepfBuTE59XcegJ3PKEGo"}}).then(r=>r.json())
  let p = await fetch("https://discordapp.com/api/guilds/"+req.params.id,{headers:{Authorization:b.token}}).then(r=>r.json())
  let ch = await fetch("https://discordapp.com/api/guilds/"+req.params.id+"/channels",{headers:{Authorization:"Bot NTc2NDQyMzUxNDI2MjA3NzQ0.XNWjxg.QfDjcLEepfBuTE59XcegJ3PKEGo"}}).then(r=>r.json())
  if(!(p.permissions&0x00000008)==0x00000008&&!p.owner) return res.json({perms:"none"})
  if(!g.id) return res.json({perms:"not-ex-bot"})
  let o = {}
o.id= g.id
  o.name=encodeURI(g.name)
  o.jc=r.joinChannel
  o.jt=encodeURI(r.joinText)
  o.lc=r.leaveChannel
  o.lt=encodeURI(r.leaveText)
  o.avatar=g.avatar
  o.id=g.id
  o.ch=encodeURI(ch.filter(c=>c.type!=2&&c.type!=4).map(c=>`${c.id}$${c.name}`).join("%"))
  o.prefix=encodeURI(r.prefix)
  res.json(o)
})

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
