const { exec } = require("child_process");
setTimeout(()=>{
    exec("start chrome --args https://zoom.us/j/95670670574?pwd=L2JLeEs0WTVEM3VmaE9kZ0RCTUVWZz09 ", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
           
            console.log(`stderr: ${stderr}`);
            return;
        }
        
         console.log(`stdout: ${stdout}`);      
        
        
    }); 
},2000)
