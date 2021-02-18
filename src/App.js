import { useState } from 'react';
import './style.css';
import love from './love.png';
function App() {
  const [change, setChange] = useState(false);
  const [output,setOutput] = useState("");
  const calculate = (f, s) =>{
    if(!f||!s) return;
    //remove extra spaces from their name
    let yourName = f.replace(/\s+/g, '');
    let partnerName = s.replace(/\s+/g, '');
  
    //remove the unwanted repeated character
    for(let i=0;i<f.length;i++){
      let index =partnerName.indexOf(f.charAt(i));
      if(index>-1){
        yourName = remove_character(yourName,i);
        partnerName = remove_character(partnerName,index);
      }
    }
    //add the length of the non repeated character from both 
    let totalLength = yourName.length+partnerName.length;
    
    let flames = "flames";
    let flameLength = 6;

    //calculcate the flames
    for(let i=0;i<5;i++){
      let temp = totalLength%flameLength;
      flames = remove_character_shift(flames,temp);
      flameLength--;
    }
    switch(flames){
      case 'f':
        setOutput("Friends");
        break;
      case 'l':
        setOutput("Love");
        break;
      case 'a':
        setOutput("Affection");
        break;
      case 'm':
        setOutput("Marriage");
        break;
      case 'e':
        setOutput("Enemy");
        break;
      case 's':
        setOutput("Sister");
        break;
      default:
    }
    setChange(true);
  }
  //flames 
  function remove_character_shift(str,pos){
    if(pos===0) return str.substring(0,str.length-1);
    let part1 = str.substring(0,pos-1);
    let part2 = str.substring(pos, str.length);
    return (part2+part1);
  }
  //just removing the character in normal way
  function remove_character(str, char_pos) 
  {
    let part1 = str.substring(0, char_pos);
    let part2 = str.substring(char_pos + 1, str.length);
    return (part1 + part2);
  }
  return (
    <div>
      <header><img src={love} alt="flames"/>FLAMES</header>
      <div className={`form ${output}`}>
        <Form calculate={calculate} />
      </div>
      {change?<Output output={output}/>:null}
    </div>
  );
}

const Form = ({calculate}) =>{
  const [name,setName] = useState("");
  const [partner,setPartner] = useState("");
  return (
      <form onSubmit={(e)=>e.preventDefault()}>
        <label>Your Name</label>
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Your full name.." required/>

        <label>Partner Name</label>
        <input type="text" value={partner} onChange={(e)=>setPartner(e.target.value)} placeholder="Your Partner's full name.." required/>
  
        <input type="submit" onClick={()=>calculate(name,partner)} value="Calculate"/>
      </form>
  );
}

const Output = ({output}) =>{
  return (
      <div className="outputMain">
        <div className={`output ${output}`}>{output}</div>        
      </div>    
  );
}


export default App;
