var key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpZmtqcGlhcGRpbXpuc2VtZWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzODUyMDgsImV4cCI6MTk5Mzk2MTIwOH0.R4RSdGKgihQF50f-jjWmVFmqMCK1Q4pxlA8cdLqlc0U'
var client = supabase.createClient('https://difkjpiapdimznsemecs.supabase.co', key)

var inputDatums = document.getElementById("datums");
var inputPankukas = document.getElementById("pankukas");
var inputMilti = document.getElementById("milti");
var inputPiens = document.getElementById("piens");
var inputElla = document.getElementById("ella");
var inputOlas = document.getElementById("olas");


async function rediget_datus() {
    const datums = inputDatums.value;
    const pankukas = inputPankukas.value;
    const milti = inputMilti.value;
    const piens = inputPiens.value;
    const ella = inputElla.value;
    const olas = inputOlas.value;


    const { data, error } = await client.from("Registrs").select().eq('datums', datums);

    const pankukuId = data[0].pankuku_id;
    const izejvieluId = data[0].izejvielu_id;

    await client.from("Pankukas").update([{ pankuku_skaits: pankukas }]).eq('id', pankukuId).select();
    await client.from("Izejvielas").update([{ olas: olas, milti_kg: milti, ella_kg: ella, piens_l: piens }]).eq('id', izejvieluId).select();

    inputPankukas.value = "";
    inputMilti.value = "";
    inputPiens.value = "";
    inputElla.value = "";
    inputOlas.value = "";
}

async function dzest_datus() { 
    const datums = inputDatums.value;

    const { data, error } = await client.from("Registrs").select().eq('datums', datums);
    const pankukuId = data[0].pankuku_id;
    const izejvieluId = data[0].izejvielu_id;

    await client.from('Registrs').delete().eq('datums', datums)
    await client.from('Pankukas').delete().eq('id', pankukuId)
    await client.from('Izejvielas').delete().eq('id', izejvieluId)
}