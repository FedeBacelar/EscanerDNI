const { app,BrowserWindow, ipcMain } = require('electron');

const fs = require('fs/promises');

let ventanaPrincipal;
crearVentanaPrincipal = () =>{
    ventanaPrincipal = new BrowserWindow({
        width: 550,
        height: 350,
        resizable: false,
        webPreferences: { //IMPORTANTE
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    ventanaPrincipal.loadURL(`file://${__dirname}/dist/index.html`);
    ventanaPrincipal.on('closed', ()=>{
        ventanaPrincipal = null;
    })
    ventanaPrincipal.setMenu(null)
    
}
app.whenReady().then(crearVentanaPrincipal);
app.on('window-all-closed', ()=>{
    if(process.platform !== 'darwin'){
        app.quit();
    }
})
app.on('activate', ()=>{
    if(ventanaPrincipal === null){
        crearVentanaPrincipal();
    }
})
//Forma de enviar el dato por x canal:
ipcMain.on('sendDNI', (event, DNI)=>{
    //Evaluar si el DNI esta en la base de datos
    leerData(DNI).then((result) => {
        if(!result){
            result = {
                dni: "",
                nombre: '',
                apellido:'',
                genero:'',
                nacionalidad:'',
                fechaDeNacimiento:{
                  dia: 0,
                  mes: 0,
                  anio: 0
                },
                numeroDeTramite: 0
            }
        }
        ventanaPrincipal.webContents.send('getDNI', result)
    });
})

async function leerData(DNI){
    const result = await fs.readFile('DNIs.json', {encoding: 'utf8'});
    return JSON.parse(result).find((data) => data.dni === DNI);
}

ipcMain.on('registrarDNI', (event, DNI) =>{
    leerData(DNI.dni).then((result) => {
        if(!result){
            fs.readFile('DNIs.json', {encoding: 'utf8'}).then((DNIsJSON) =>{
                const DNIs = JSON.parse(DNIsJSON)
                DNIs.push(DNI)
                fs.writeFile('DNIs.json',JSON.stringify(DNIs))
            })
        }
    })
})
