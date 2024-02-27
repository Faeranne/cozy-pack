let lastDay = 0;
onEvent('level.load', (event) => {
  let server = event.server;
  let level = event.level;
  if(!level.isOverworld()){
    return;
  }
  let time = level.getLocalTime();
  lastDay = Math.floor(time/24000);
  console.log("Starting day:" +lastDay);
  server.schedule(2*SECOND, level, (cb) => {
    let time = level.getLocalTime();
    let day = Math.floor(time/24000);
    if(day!=lastDay){
        console.log("New day: "+day+" changed from "+lastDay);
        lastDay = day
        if(cb.data.getPlayers().length > 0){
            console.log("Expanding border");
            cb.data.server.runCommand("worldborder add 10 5");
            cb.data.server.runCommandSilent("tell @a You survived another night, and a new day has dawned.  The world to explore has grown just a bit more.");
        }else{
            console.log("New day, but no players. skipping border expansion");
        }
    };
    cb.reschedule()
  })
})
