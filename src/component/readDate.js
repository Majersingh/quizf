const getLocaltime=(timestamp)=>{
    let date=new Date(timestamp);
    const formattedDate = {
      full: date.toLocaleString('en-US', { year: "numeric" , month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }),
      short: date.toLocaleString('en-US', { month: 'short', day: 'numeric' }),
      time: date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
    };
    return formattedDate;
  }
  export default getLocaltime;