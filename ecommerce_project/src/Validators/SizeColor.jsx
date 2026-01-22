
export default function SizeColor(e,CheckOptLength) {
  let Lnth=CheckOptLength;
  console.log("Validator Length",Lnth);
  
  let name=e.target.name;

  switch(name)
  {
    case "color":
      if(Lnth==0)
      {
        return name+"Color Field is Mandatory"
      }
      else{
        return ""
      }
      
    case "size":
       if(Lnth==0)
      {
        return name+"Color Field is Mandatory"
      }
      else{
        return ""
      }
      
  default: return name;
    }
}
