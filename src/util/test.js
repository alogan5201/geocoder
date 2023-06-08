async function getFakeData(input) {
    const response = await fetch(
        `http://localhost:3000/${input}`,
        { method: "GET" }
    );
    if (response.status !== 200) {
        return;
    }
    const data = await response.json();
    return data;
}

async function main(){
    const data = await getFakeData("addresses/atlanta")
  
}

main()