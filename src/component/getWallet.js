async function getUserwallet(userid ,apiUrl) {
    console.log("I get wallet called")
    try {
      const response = await fetch(`${apiUrl}/getwallet?userid=${userid}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error(`HTTP while getting wallet error! Status: ${response.status}`);
      }
      console.log("I get wallet called",response)
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user wallet:', error.message);
      return null;
    }
  }
   export default getUserwallet;