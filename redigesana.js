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

async function rediget_datus() {
    const datums = inputDatums.value;
    const pankukas = inputPankukas.value;
    const milti = inputMilti.value;
    const piens = inputPiens.value;
    const ella = inputElla.value;
    const olas = inputOlas.value;


    const { data, error } = await client.from("Registrs").select().eq('datums', datums);
    if (data.length == 0) {
        alert(datums+" datumā nav ierakstu!");
        return
    }

    const pankukuId = data[0].pankuku_id;
    const izejvieluId = data[0].izejvielu_id;

    await client.from("Pankukas").update([{ pankuku_skaits: pankukas }]).eq('id', pankukuId).select();
    await client.from("Izejvielas").update([{ olas: olas, milti_kg: milti, ella_kg: ella, piens_l: piens }]).eq('id', izejvieluId).select();

    inputPankukas.value = "";
    inputMilti.value = "";
    inputPiens.value = "";
    inputElla.value = "";
    inputOlas.value = "";

    alert(datums+' datuma dati saglabāti!');
}

async function dzest_datus() { 
    const datums = inputDatums.value;

    const { data, error } = await client.from("Registrs").select().eq('datums', datums);
    const pankukuId = data[0].pankuku_id;
    const izejvieluId = data[0].izejvielu_id;

    await client.from('Registrs').delete().eq('datums', datums)
    await client.from('Pankukas').delete().eq('id', pankukuId)
    await client.from('Izejvielas').delete().eq('id', izejvieluId)

    alert('Izdzēsti '+datums+' datuma dati!')
}
