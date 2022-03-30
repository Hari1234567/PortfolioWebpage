
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
let cur_idx = 0;
async function switchRoleText(){
  let role_strings = ["App Developer", "Web Developer","Game Developer","Computer Enthusiast"];
  let text_element = document.getElementById("roles");
  let verticalScale = 1;
  dir = -1;
  let id = setInterval(frame,10);
  function frame(){

    text_element.innerHTML = role_strings[cur_idx];
    verticalScale += dir*0.1;
    if(verticalScale<=0){
      dir = 1;
      cur_idx = (cur_idx+1)%role_strings.length;
    }
    let transform_string = 'scale(1,'+verticalScale+')';
    text_element.style.webkitTransform = transform_string;
    if(verticalScale>=1){
      clearInterval(id);
    }
  }
  await sleep(1000);
  switchRoleText();

  
}
switchRoleText();
