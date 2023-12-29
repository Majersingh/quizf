import { useState ,useContext , useEffect , memo} from "react";
import { UserContext } from "../App";
import getWallet from './getWallet'

const Homenav = ()=>{
    const [matchCategory , setMatchcategory]= useState({general:true , maths:false , science :false , english:false });
    const {  setquizMatch ,setQuerytogetaquizmatch ,user ,apiUrl} = useContext(UserContext);
    const [showWallet , setShowWallet] =useState(false);
    
    useEffect(()=>{
         setquizMatch(undefined);
        console.log("Home nav change ")
    for (const key in matchCategory){
        if(matchCategory[key]===true)
        setQuerytogetaquizmatch([{ keyname :'collectionname' ,collectionname:key+'quizmatch'}] , " homenav");
    }
    return ()=>(setShowWallet(false))
    },[matchCategory])
    return (
        <>
            <div className='fixed z-20 h-auto w-full flex flex-col  shadow-lg justify-between'>
                {/* Nav Section */}
                <div className='flex justify-between p-2   bg-gradient-to-r from-red-600 to-red-800'>
                    <div className='basis-1/5 flex items-center text-white justify-start'>
                        <p className=' h-6 w-6 rounded-full border-2 border-white text-center bg-slate-400'>
                        <i class="fa-solid fa-user  text-[#ffffff]"></i>
                        </p>
                    </div>
                    <div className='basis-1/2 text-white flex items-center justify-center font-semibold tracking-wide text-xl'>QUIZ!!</div>
                    <div className='basis-1/4  p-2 justify-between flex items-center'>
                        <i class="fa-regular fa-bell text-[#ffffff] fa-lg"></i>
                        <i class="fa-solid fa-wallet text-[#ffffff] fa-lg" onClick={()=>setShowWallet(!showWallet)}></i>
                    </div>
                </div>

                {/* Wallet Section */}
                <div className={`w-full transition-all duration-300 overflow-hidden  ${showWallet?'h-[100vh] bg-slate-900/25':'h-0'}`}
                 onClick={(event)=>{if (!event.target.closest('.child-element'))  setShowWallet(false)}}//this to close if click outside child element like on background { and closest check whether that click elemnt parent is elmenrt with clish .childelement}
                >
                  <Wallet user={user} showWallet={showWallet} apiUrl={apiUrl}/>
                </div>

                {/* Category Section */}
                <div className={`${showWallet?'hidden':'flex'} justify-between pt-2 px-2 bg-gradient-to-r from-red-600 to-red-800 `}>
                    <div className={` text-slate-400 flex flex-col items-center  ${matchCategory.general && 'text-slate-50'}`}>
                        <button  className="inline-block p-1 leading-tight uppercase " onClick={()=>{setMatchcategory({general:true , maths:false , science :false , english:false })}}>
                        <i class="fa-solid fa-brain fa-lg"></i>
                        </button>
                        <div className="p-0 text-xs">
                            <p>General</p>
                            <p className={`bg-white h-[4px] w-0 transition-all durartion-500 ease-in-out rounded-lg   ${matchCategory.general ? 'w-auto translate-x-0':'translate-x-12' }`}></p>
                        </div>
                    </div>
                    <div className={`text-slate-400 flex flex-col items-center  ${matchCategory.science && 'text-slate-50'}`}>
                        <button  className="inline-block p-1 leading-tight uppercase "  onClick={()=>{setMatchcategory({general:false , maths:false , science :true , english:false })}}>
                        <i class="fa-solid fa-atom fa-lg"></i>
                        </button>
                        <div className="p-0 text-xs">
                            <p>Science</p>
                            <p className={`bg-white h-[4px] w-0 transition-all  durartion-500 ease-in-out rounded-lg ${matchCategory.science ?'w-auto -translate-x-0.5' :'-translate-x-12' }`}></p>
                        </div>
                    </div>
                    <div className={` text-slate-400 flex flex-col items-center  ${matchCategory.maths && 'text-slate-50'}`}>
                        <button  className="inline-block p-1 leading-tight uppercase " onClick={()=>{setMatchcategory({general:false , maths:true , science :false , english:false })}} >
                        <i class="fa-solid fa-calculator fa-lg"></i>
                        </button>
                        <div className="p-0 text-xs">
                            <p>Maths</p>
                            <p className={`bg-white h-[4px] w-0 transition-all  durartion-500 ease-in-out rounded-lg ${matchCategory.maths ? 'w-auto -translate-x-0.5 ' :'-translate-x-12'}`}></p>
                        </div>
                    </div>
                    
                    <div className={`text-slate-400 flex flex-col items-center  ${matchCategory.english && 'text-slate-50'}`}>
                        <button  className="inline-block p-1 leading-tight uppercase " onClick={()=>{setMatchcategory({general:false , maths:false , science :false , english:true })}} >
                        <i class="fa-solid fa-book fa-lg"></i>
                        </button>
                        <div className="p-0 text-xs">
                            <p>English</p>
                            <p className={`bg-white h-[4px] w-0 transition-all  durartion-500 ease-in-out rounded-lg ${matchCategory.english ? 'w-auto -translate-x-0.5 ' : '-translate-x-12'}`}></p>
                        </div>
                    </div>
                </div>
          </div>
        </>
    )
}
export default memo(Homenav);

function Wallet({user ,showWallet ,apiUrl}){
    const [walletHascum, setWalletHascum] = useState(false);//to avaoi multiple call on opening wallet
    const [walletData, setWalletData] = useState();
    const [amountToAdd, setAmountToAdd] = useState("");
    const [reloadingWallet, setReload] = useState(false);
    const [isPaying, setPaying] = useState(false);

   

    const sentPaydetailstoserver= async(payDetails)=>{
            try {
              const response = await fetch(`${apiUrl}/add-payments` , {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ userid:user._id , amount :amountToAdd , payDetails:payDetails}),
                  credentials: 'include'
                });
        
              if (!response.ok) {
              throw new Error(`HTTP error! Status for adding money: ${response.status}`);
              }
              const data = await response.json();
              console.log("Amount Addedd :",data)   
              
            } catch (error) {
              console.error('Error foradding cash', error.message);
              return null;
            }     
    }
    let doPayments = async()=>{
        setPaying(true);
        try {
            const response = await fetch(`${apiUrl}/create-order` , {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userid:user._id , amount :amountToAdd}),
                credentials: 'include'
              });
      
            if (!response.ok) {
            throw new Error(`HTTP error! Status for adding money: ${response.status}`);
            }
            const order = await response.json();
            console.log("order details",order);
            if(order)
            initiatePay(order);
            setPaying(false);
            
            
          } catch (error) {
            console.error('Error creating order', error.message);
            return null;
          }     

        function initiatePay(order){
            var options = {
                "key": "rzp_test_366hHyX8duDVpO", // Enter the Key ID generated from the Dashboard
                "amount": amountToAdd, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": "INR",
                "name": "Quiz!!", //your business name
                "description": "Test Transaction",
                "image": "https://example.com/your_logo",
                "order_id":order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "handler": (response)=>sentPaydetailstoserver(response), //onsuccessfull it get called
                "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                    "name": "Gaurav Kumar", //your customer's name
                    "email": "gaurav.kumar@example.com", 
                    "contact": "8511926953"  //Provide the customer's phone number for better conversion rates 
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#3399cc"
                }
            };
            setAmountToAdd("");
            var rzp1 = new window.Razorpay(options);
            rzp1.open()
            rzp1.on('payment.failed', function (response){
                    alert("1",response.error.code
                    ,("12",response.error.description)
                    ,("123",response.error.source)
                    ,("1234",response.error.step)
                    ,("12345",response.error.reason)
                    ,("123456",response.error.metadata.order_id)
                    ,("1234567",response.error.metadata.payment_id));
            });
        }
        
    }
    
    useEffect(()=>{
        if (showWallet && !walletHascum) {
            getWallet(user._id, apiUrl)
            .then(walletData => {
              setWalletData(walletData);
              console.log(walletData); // Do something with the wallet data
              console.log("This is the first time Wallet component is open.");
              setWalletHascum(true); // Set the state to indicate that the wallet data has been received.
            // Create a script element
            var script = document.createElement('script');
            // Set the source attribute to the URL of the script
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            // Append the script element to the document's body
            document.body.appendChild(script);
            })
            .catch(error => {
              console.error("Error fetching wallet data:", error);
            });
          }
    },[showWallet])
   
    if(walletData)
     return(
    <> 
       <div className={`${isPaying ? "block":"hidden"} h-[100vh] w-[100vw] flex items-center justify-center w-full bg-slate-400/25`}>
          <span className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-red-600"></span>
        </div>
        <div className="child-element flex-col divide-y justify-center items-center bg-white">
            <div className=" flex flex-col p-2 items-center justify-center">
                <p>Total Balance</p>
                <div className="flex flex-row items-center font-semibold p-1">&#x20B9;{walletData.balance}
                    {reloadingWallet? 
                        <span className="flex ml-2 items-center w-full h-1/5 bg-white justify-center">
                         <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-red-600"></span>
                        </span>
                        :
                        <button onClick={()=>{
                            setReload(true)
                                getWallet(user._id, apiUrl).then(walletData => {
                                        setWalletData(walletData);
                                        setReload(false)
                                    }).catch(e=>console.error(e))
                                }
                        }>
                            <i className="ml-2 fa-solid fa-rotate fa-sm text-red-600" ></i>
                        </button>
                    }
                </div>
                <div className="p-2 text-base">
                    <p>Amount You want to Add</p>
                    <input type="number" value={amountToAdd} placeholder="INR" onChange={(e)=>setAmountToAdd(e.target.value)}
                    className={`mt-1 p-1 outline-none border focus:ring-green-500 focus:border-blue-500 block shadow-md sm:text-s rounded-md border-blue-600`}/>
                </div>
                <button className={`bg-green-600 text-white rounded p-2 font-medium text-sm ${amountToAdd>0?"opacity-100":"opacity-30"}`} disabled={amountToAdd<=0} onClick={doPayments}>ADD CASH</button>
            </div>
            <div className="p-2 text-base">
                <p>Amount Added By You</p>
                <p className="text-sm">&#x20B9;00</p>
            </div>
            <div className="p-2 text-base">
                <p>Winning</p>
                <p  className="text-sm">&#x20B9;00</p>
            </div>
            <div className="p-2 text-base">
                <p>Bonus</p>
                <p  className="text-sm">&#x20B9;00</p>
            </div>
        </div>
    </>)
    else if(!walletData)
    return(
     <span className="flex items-center w-full h-1/5 bg-white justify-center">
          <span className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-red-600"></span>
    </span>
    )
}