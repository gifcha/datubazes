var key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpZmtqcGlhcGRpbXpuc2VtZWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzODUyMDgsImV4cCI6MTk5Mzk2MTIwOH0.R4RSdGKgihQF50f-jjWmVFmqMCK1Q4pxlA8cdLqlc0U'
var client = supabase.createClient('https://difkjpiapdimznsemecs.supabase.co', key)

var inputDatums = document.getElementById("datums");
var inputPankukas = document.getElementById("pankukas");
var inputMilti = document.getElementById("milti");
var inputPiens = document.getElementById("piens");
var inputElla = document.getElementById("ella");
var inputOlas = document.getElementById("olas");

var noliktavaMilti = document.getElementById("noliktava_milti");
var noliktavaPiens = document.getElementById("noliktava_piens");
var noliktavaElla = document.getElementById("noliktava_ella");
var noliktavaOlas = document.getElementById("noliktava_olas");


function datums() {
    var date = dayjs().format('YYYY-MM-DD');
    inputDatums.value = date;
}

async function skatit_datus() {
    const datums = inputDatums.value;
    const pankukas = inputPankukas.value;
    const milti = inputMilti.value;
    const piens = inputPiens.value;
    const ella = inputElla.value;
    const olas = inputOlas.value;


    var { data, error } = await client.from("Registrs").select().eq('datums', datums);

    const pankukuId = data[0].pankuku_id;
    const izejvieluId = data[0].izejvielu_id;

    var { data, error } = await client.from("Pankukas").select().eq('id', pankukuId);
    console.log(data);
    inputPankukas.value = data[0].pankuku_skaits;

    var { data, error } = await client.from("Izejvielas").select().eq('id', izejvieluId);
    console.log(data);

    inputMilti.value = data[0].milti_kg;
    inputPiens.value = data[0].piens_l;
    inputElla.value = data[0].ella_kg;
    inputOlas.value = data[0].olas;
}

async function izejvielu_atlikums() {

    noliktavaMilti.value = "";
    noliktavaPiens.value = "";
    noliktavaElla.value = "";
    noliktavaOlas.value = "";

    const { data, error } = await client.from("Registrs").select();

    var sum_pankukas = 0;
    var sum_milti = 0.0;
    var sum_piens = 0.0;
    var sum_ella = 0.0;
    var sum_olas = 0;
    for (i in data) {
        const ieraksts = data[i];
        console.log(ieraksts);
        const izejvielas = await client.from("Izejvielas").select().eq('id', ieraksts.izejvielu_id);
        console.log(izejvielas.data[0]);
        
        const pankukas = await client.from("Pankukas").select().eq('id', ieraksts.pankuku_id);
        console.log(pankukas);

        sum_pankukas += pankukas.data[0].pankuku_skaits;

        sum_milti += izejvielas.data[0].milti_kg;
        sum_piens += izejvielas.data[0].piens_l;
        sum_ella += izejvielas.data[0].ella_kg;
        sum_olas += izejvielas.data[0].olas;
    }
    console.log(sum_pankukas, sum_milti, sum_piens, sum_ella, sum_olas);

    // no izejvielu summas atnem izejvielas kas nepieciesamas lai izceptu pankuku summu
    sum_milti = sum_milti - sum_pankukas/6 * 0.050;
    sum_piens = sum_piens - sum_pankukas/6 * 0.15;
    sum_ella = sum_ella - sum_pankukas/6 * 0.0015;
    sum_olas = sum_olas - sum_pankukas/6;
    console.log(sum_pankukas, sum_milti, sum_piens, sum_ella, sum_olas);

    noliktavaMilti.value = sum_milti;
    noliktavaPiens.value = sum_piens;
    noliktavaElla.value = sum_ella;
    noliktavaOlas.value = sum_olas;
}
