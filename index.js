document.onkeydown = updateKey;
document.onkeyup = resetKey;

var server_port = 65433;
var server_addr = "172.20.10.10";   // the IP address of your Raspberry PI

function client(dir){
    const net = require('net');
    //var input = document.getElementById("message").value;

    const client = net.createConnection({ port: server_port, host: server_addr }, () => {
        // 'connect' listener.
        console.log('connected to server!');
        // send the message
        client.write(`${dir}\r\n`);
    });
    
    // get the data from the server
    client.on('data', (data) => {
        const dataArr = data.toString().split(",");
        let t = dataArr[0].substring(5);
        let u = dataArr[1];
        let v = dataArr[2];
        console.log(t.toString());
        console.log(v.toString());
        console.log(u.toString());
        document.getElementById("temperature").innerHTML = t;
        document.getElementById("speed").innerHTML = v;
        document.getElementById("ultrasonic").innerHTML = u;
        console.log(data.toString());
        client.end();
        client.destroy();
    });
    client.on('end', () => {
        console.log('disconnected from server');
    });


}

// for detecting which key is been pressed w,a,s,d
function updateKey(e) {

    e = e || window.event;

    if (e.keyCode == '87') {
        // up (w)
        document.getElementById("upArrow").style.color = "green";
        update_data("87");
    }
    else if (e.keyCode == '83') {
        // down (s)
        document.getElementById("downArrow").style.color = "green";
        update_data("83");
    }
    else if (e.keyCode == '65') {
        // left (a)
        document.getElementById("leftArrow").style.color = "green";
        update_data("65");
    }
    else if (e.keyCode == '68') {
        // right (d)
        document.getElementById("rightArrow").style.color = "green";
        update_data("68");
    }    
}

// reset the key to the start state 
function resetKey(e) {

    e = e || window.event;

    document.getElementById("upArrow").style.color = "grey";
    document.getElementById("downArrow").style.color = "grey";
    document.getElementById("leftArrow").style.color = "grey";
    document.getElementById("rightArrow").style.color = "grey";
    update_data("");

}


// update data for every 50ms
function update_data(dir){

    console.log('oogabiogaa!');
    client(dir);
}
