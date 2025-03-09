const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json";
const dropdowns=document.querySelectorAll(".dropdown select");
let i=0;
const fromCurr =document.querySelector(".from select");
const toCurr =document.querySelector(".to select");
const msg=document.querySelector(".msg");
const btn=document.querySelector("form button");


for(let select of dropdowns)
{
    for(currCode in countryList)
    {
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if (select.name==="from"&&currCode==="USD")
        {
            newOption.selected="selected";
        }
        else if (select.name==="to"&&currCode==="INR")
            {
                newOption.selected="selected";
            }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>
    {
        updateFlag(evt.target);
    });
}
const updateFlag=(element)=>
    {
     let currCode=element.value;
     let countryCode=countryList[currCode];
     let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
     let img=element.parentElement.querySelector("img");
     img.src=newSrc;
    };
    const updateExchangeRate=async()=>
        {
            let amount=document.querySelector(".amount input");
            let amountValue=amount.value;
            if(amountValue===""||amountValue<1)
            {
             amountValue=1;
             amount.value=" 1 ";
            }
            let curr1=fromCurr.value.toLowerCase();
            let curr2=toCurr.value.toLowerCase();
            console.log(curr1,curr2);
            const URL=`https://latest.currency-api.pages.dev/v1/currencies/${curr1}.json`;
            let response= await fetch(URL);
             let data=await response.json();
            let rate=data[curr1][curr2];
            console.log(rate);
            let finalAmount=amountValue*rate;
            msg.innerText=amountValue +fromCurr.value+ "  = "+finalAmount+ toCurr.value;
        }
    btn.addEventListener("click",async(evt)=>
    {
       evt.preventDefault();
       updateExchangeRate();
    })
    window.addEventListener("load",()=>
        {
            updateExchangeRate();
        });