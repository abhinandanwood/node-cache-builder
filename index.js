const fs  = require('fs');
const path = require('path');
let log = {};

const rootExist = (filename) => {
  if(!fs.existsSync(filename)){
   return false;
 }
 return true;
}


log.setCache =  (name,data) => {
  //check if cache folder exist or not
    if(!rootExist(__dirname+'/cache')){
       //create cache folder 
       fs.mkdir(__dirname+'/cache',(err) => {
          if(err) return console.log(err.message);
       })
    }

      //check cache already exist of given file or not
      let filename = `${__dirname}/cache/${name}.json`;
      if(!rootExist(filename)){
        fs.writeFile(filename,JSON.stringify(data),(err) => {
          if(err) return console.log(err.message);
           return console.log(`Cache save for ${name}`);
        })
      }
}

log.getCache =  (name) => {
  try {
    let filename = `${__dirname}/cache/${name}.json`;
    if(rootExist(filename)){
     
      let data = require(filename)
      return data;
    }else{
      return 'No such file or directory';
    }
  } catch (error) {
    return error.message;
  }
 
}


log.clearCache = (name) => {
  let filename = `${__dirname}/cache/${name}.json`;
  if(rootExist(filename)){
    fs.unlink(filename,(err) => {
      if(err) return console.log(err.message);
      return console.log(`cached clear of ${name}`);
    })
  }else{
    return console.log('No such file or directory')
  }
}

log.updateCache = (name,data) => {
  let filename = `${__dirname}/cache/${name}.json`;
  if(rootExist(filename)){
    fs.writeFile(filename,JSON.stringify(data),(err) => {
      if(err) return console.log(err.message);
       return console.log(`Cache update for ${name}`);
    })
  }else{
    return console.log('No such file or directory');
  }
}

 module.exports = log;