var arr, velocity;
var count = 50;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var radius = 2;
var maxXSpeed = 0.7;
var maxYSpeed = 0.7;

var mouse_x,mouse_y;

canvas.width = window.innerWidth * 2;
canvas.height = window.innerHeight * 2;


function randomPos() {
    return [Math.random() * canvas.width, Math.random() * canvas.height];
}

function randomVelocity() {
    temp = [Math.random() * maxXSpeed, Math.random() * maxYSpeed];
    if (Math.ceil(Math.random() * 2) == 1)
        temp[0] *= -1;
    if (Math.ceil(Math.random() * 2) == 1)
        temp[1] *= -1;
    if (temp[0] == 0 && temp[1] == 0)
        return randomVelocity();
    return temp;
}

function init() {
    arr = [];
    velocity = [];
    for (let i = 0; i < count; i++) {
        arr.push(randomPos());
        velocity.push(randomVelocity());
    }
}
init();


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (canvas.width != window.innerWidth * 2 || canvas.height != window.innerHeight * 2) {
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;
        // init();
    }
    for (var i = 0; i < count; i++) {
        arr[i][0] += velocity[i][0];
        arr[i][1] += velocity[i][1];
        mouse_position = [mouse_x,mouse_y];
        
        if(distance(arr[i],mouse_position)/canvas.width<0.1){
           let repel_force = -0.01;
           new_vel = [1/(repel_force*mouse_x-repel_force*arr[i][0]),1/(repel_force*mouse_y-repel_force*arr[i][1])];

           if(new_vel[0]*new_vel[0]+new_vel[1]*new_vel[1]>velocity[i][0]*velocity[i][0]+velocity[i][1]*velocity[i][1]){
                velocity[i] = new_vel;
            }
        }
        if (arr[i][0] > canvas.width || arr[i][1] > canvas.height || arr[i][0] < 0 || arr[i][1] < 0) {
            arr[i] = randomPos();
            velocity[i] = randomVelocity();
           
            
            
        }
        let neighbour_idx=0;
        let shortest_distance = Number.MAX_SAFE_INTEGER;
        for (let j = 0;j<count;j++){
            if(i!=j){
                if(distance(arr[i],arr[j])<shortest_distance){
                    shortest_distance = distance(arr[i],arr[j]);
                    neighbour_idx = j;
                }
            }
        }

        let proximity = shortest_distance/canvas.width;
        ctx.beginPath();
        ctx.arc(arr[i][0], arr[i][1], radius, 0, 2 * Math.PI);
        ctx.lineTo(arr[neighbour_idx][0],arr[neighbour_idx][1]);

        let color_grading = '0';
        if(proximity<0.01)
            color_grading = '0';
        else if(proximity<0.02)
            color_grading = '1';
        else if(proximity<0.03)
            color_grading = '2';
        else if(proximity<0.04)
            color_grading = '3';
        else if(proximity<0.05)
            color_grading = '4';    
        else if(proximity<0.06)
            color_grading = '5';
        else if(proximity<0.07)
            color_grading = '6';
        else if(proximity<0.08)
            color_grading = '7';
        else if(proximity<0.09)
            color_grading = '8';
        else if(proximity<0.09)
            color_grading = '9';
        else
            color_grading = 'A';    
        
        let color = '';
        for (let k = 0;k<6;k++){
            color+=color_grading;
        }
            ctx.strokeStyle = '#'+color;

        ctx.stroke();
    }
    
    window.requestAnimationFrame(draw);
}


function distance(p1,p2){
    return Math.sqrt((p1[0]-p2[0])*(p1[0]-p2[0])+(p1[1]-p2[1])*(p1[1]-p2[1]));
}
function coordinate(event) {
 
    // clientX gives horizontal coordinate
    mouse_x = event.clientX * 2;

    // clientY gives vertical coordinates
    mouse_y = event.clientY * 2;
 }
 function magnitude(vect){
     return Math.sqrt(vect[0]*vect[0]+vect[1]*vect[1]);
 }
 function clamp(vect,magnitude){
    return [vect[0]/magnitude(vect)*magnitude,vect[1]/magnitude(vect)*magnitude];
 }
window.requestAnimationFrame(draw);
