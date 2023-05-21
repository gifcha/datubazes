var key = "#API key#"
var client = supabase.createClient("#Supabase link#", key)

var inputDatums = document.getElementById("datums");
var inputPankukas = document.getElementById("pankukas");
var inputMilti = document.getElementById("milti");
var inputPiens = document.getElementById("piens");
var inputElla = document.getElementById("ella");
var inputOlas = document.getElementById("olas");

function datums() {
    var date = dayjs().format('YYYY-MM-DD');
    inputDatums.value = date;
}

async function loadData(tabula) {
    const { data, error } = await client.from(tabula).select();
    return data;
}

async function ievadit_datus() {
    const datums = inputDatums.value;
    const pankukas = inputPankukas.value;
    const milti = inputMilti.value;
    const piens = inputPiens.value;
    const ella = inputElla.value;
    const olas = inputOlas.value;

    if (datums == "" || pankukas == "" || milti == "" || piens == "" || ella == "" || olas == "") { 
        alert("Visiem datu lauciņiem ir jābūt aizpildītiem!");
        return
    }

    const { data, error } = await client.from('Registrs').select().eq('datums', datums);
    if (data.length != 0) {
        alert('Datubāzē jau ir ieraksts šajā datumā!')
        return
    }
    if (datums == "") {
        alert("Lūdzu ievadi datumu!");
        return
    }

    await client.from("Pankukas").insert([{ pankuku_skaits: pankukas }]);
    const P = await loadData('Pankukas');
    const pankukuId = P[P.length - 1].id // tiko pievienoto datu id
    console.log("data", pankukuId);

    await client.from("Izejvielas").insert([{ olas: olas, milti_kg: milti, ella_kg: ella, piens_l: piens }]);
    const I = await loadData('Izejvielas');
    const izejvieluId = I[I.length - 1].id // tiko pievienoto datu id
    console.log("data", izejvieluId);


    await client.from("Registrs").insert([{ datums: datums, izejvielu_id: izejvieluId, pankuku_id: pankukuId }]);

    
    inputPankukas.value = "";
    inputMilti.value = "";
    inputPiens.value = "";
    inputElla.value = "";
    inputOlas.value = "";

    alert(datums+' datuma dati saglabāti!');
}
