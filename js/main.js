taz = {}

taz.compile = function(text){
  var pathStyle = "fill: none; stroke:#ffffff; stroke-width: 5;";
  pathStyle += "stroke-linejoin: round; stroke-linecap: round;"
  var code = '';
  code += '<svg viewBox="0 0 100 100">'
  lines = text.split('\n');
  for(var i=0;i<lines.length;i++){  
    if(lines[i]!='') {
      if(lines[i].startsWith("symbol:")){
        var id = lines[i].split("symbol:")[1];
        code += `<symbol id="${id}">`;
      }
      else if(lines[i].startsWith(":symbol")){
        code += "</symbol>";
      }
      else if(lines[i].startsWith("use:")){
        var id = lines[i].split("use:")[1];
        code += `<use xlink:href="#${id}" />`;
      }
      else{        
        code += `<path style="${pathStyle}" d="${lines[i]}" />`
      }    
    }
  }
  code += '</svg>'
  return code  
}

function onCodeChange(){
  var newCode = document.querySelector("textarea").value;
  document.querySelector("#preview").innerHTML = taz.compile(newCode);
}
