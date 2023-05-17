const iotsdk = require("aws-iot-device-sdk-v2");
const { exit } = require("process");
const mqtt = iotsdk.mqtt;
const TextDecoder = require("util").TextDecoder;
const yargs = require("yargs");
const common_args = require("./util/cli_args");
// var { useModel } = require("./models/register")
const { bot } = require("./flogoBot/telegramBot")

// env
require("dotenv").config();

// DB
const sequelize = require("./config/db");
const { log } = require("console");
const { number } = require("yargs");
var useModel = require("./models/register");

// Register sequelize model
let Register;

const setRegister = (register) => {
  Register = register;
};

(function (tableName) {
  useModel = useModel(tableName);
  setRegister(useModel.Register);
})("subestacionSaltillo");

yargs
  .command(
    "*",
    false,
    (yargs) => {
      common_args.add_direct_connection_establishment_arguments(yargs);
      common_args.add_topic_message_arguments(yargs);
    },
    main
  )
  .parse();

const createRegister = async (array, tableName) => {
  const element = Register.createRegister({ register: array });
  await element
    .save()
    .then((register) => console.log("Registro guardado. "))
    .catch((error) => console.log(error.message));
};

// Obtiene los valores
const getRegister = async (id, tableName) => {
  return await useModel(tableName)
    .Register.findByPk(id)
    .then((data) => {
      console.log(data.dataValues.register);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

// Obtiene los valores
const getRegisters = async (tableName) => {
  return await useModel(tableName)
    .Register.find()
    .then((data) => {
      console.log(data.dataValues.register);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

//getRegisters('usuarios');

async function execute_session(connection, argv) {
  //getRegister(id);
  return new Promise(async (resolve, reject) => {
    try {
      let published = false;
      let subscribed = false;

      const decoder = new TextDecoder("utf8");
      const on_publish = async (topic, payload) => {
        const json = decoder.decode(payload);
        const message = JSON.parse(json);
        console.log("mensaje",message); //mensaje en objeto de entrada
        //createRegister(message.d, "subestacionSaltillo");
        date = message.ts.replace("T", " ").slice(0, 19);       
      
      let arrayDatosAll = [];
      let arrayPool = []; 
      // const telegram = {
      //   // Configuración por defecto
      //   configTelegram: {
      //     baseURL: 'https://api.telegram.org/bot',
      //     token: '6283477638:AAHA8F4DcJFp36aFHK_u6fx9ExDy0-1HfF8',
      //     chat_id: '523931042801',
      //     parse_mode: 'MarkdownV2',
      //   },
      //   /** 
      //    * @description Este método esta pensado para configurar dinámicante el bot de Telegram desde fuera y así poder enviar mensajes a múltiples bot
      //    * @param {string} token Token API para la validación de nuestro Bot
      //    * @param {string} chat_id El identificador del bor para comunicarnos con el Bot
      //    */
      //   config: (token, chat_id) => {
      //     telegram.configTelegram.token = token || telegram.configTelegram.token || '';
      //     telegram.config.chat_id = chat_id || telegram.configTelegram.chat_id || '';
      //   },
      //   /** 
      //    * @description Este método se usa para enviar un mensaje a nuestro Bot
      //    * @param {string} msn Mensaje que vamos a enviar
      //    * @param {string} type Es el tipo de mensaje. 'text': Es un mensaje de texto, 'whatever is': Envia una imagen
      //    * @return 
      //    */
      //   send: async (msn = '', type = 'text') => {
      //     const { baseURL, token, chat_id, parse_mode } = telegram.configTelegram;
      //     const endPoint = type === 'text' ? 'sendMessage' : 'sendSticker';
      //     const url = new URL(`${baseURL}${token}/${endPoint}`);
      //     // Imagen de prueba
      //     const image = 'https://s.tcdn.co/8a1/9aa/8a19aab4-98c0-37cb-a3d4-491cb94d7e12/19.png';
      //     const params = {
      //       chat_id: chat_id,
      //       parse_mode: parse_mode
      //     };
      //     const hasText = type === 'text';
      //     params[hasText ? 'text' : 'sticker'] = hasText ? msn : image;
      //     Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
      //     return await (await fetch(url)).json().catch(error => error);
      //   },
      // };
      // for (let index = 0; index < message.length; index++) {
        console.log("Value de lo que quiero evaluar", message.d[0].value);
        if (message.d[0].value>35) {
          // telegram.send("El voltaje de "+message.d[0].tag+" esta fuera de rango");
          bot.send()
      //     const TOKEN = '6283477638:AAHA8F4DcJFp36aFHK_u6fx9ExDy0-1HfF8';
      // const CHAT_ID = '523931042801';
      // const MESSAGE_TEXT = 'Hola, este es un mensaje automático.';

      // fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     chat_id: CHAT_ID,
      //     text: MESSAGE_TEXT
      //   })
      // })
      // .then(response => {
      //   if (response.ok) {
      //     console.log('Mensaje enviado correctamente.');
      //   } else {
      //     console.log('Error al enviar mensaje.');
      //   }
      // })
      // .catch(error => {
      //   console.log(error);
      // });

//       export const telegram = {
//   // Configuración por defecto
//   configTelegram: {
//     baseURL: 'https://api.telegram.org/bot',
//     token: '',
//     chat_id: '',
//     parse_mode: 'MarkdownV2',
//   },
//   /** 
//    * @description Este método esta pensado para configurar dinámicante el bot de Telegram desde fuera y así poder enviar mensajes a múltiples bot
//    * @param {string} token Token API para la validación de nuestro Bot
//    * @param {string} chat_id El identificador del bor para comunicarnos con el Bot
//    */
//   config: (token, chat_id) => {
//     telegram.configTelegram.token = token || telegram.configTelegram.token || '';
//     telegram.config.chat_id = chat_id || telegram.configTelegram.chat_id || '';
//   },
//   /** 
//    * @description Este método se usa para enviar un mensaje a nuestro Bot
//    * @param {string} msn Mensaje que vamos a enviar
//    * @param {string} type Es el tipo de mensaje. 'text': Es un mensaje de texto, 'whatever is': Envia una imagen
//    * @return 
//    */
//   send: async (msn = '', type = 'text') => {
//     const { baseURL, token, chat_id, parse_mode } = telegram.configTelegram;
//     const endPoint = type === 'text' ? 'sendMessage' : 'sendSticker';
//     const url = new URL(`${baseURL}${token}/${endPoint}`);
//     // Imagen de prueba
//     const image = 'https://s.tcdn.co/8a1/9aa/8a19aab4-98c0-37cb-a3d4-491cb94d7e12/19.png';
//     const params = {
//       chat_id: chat_id,
//       parse_mode: parse_mode
//     };
//     const hasText = type === 'text';
//     params[hasText ? 'text' : 'sticker'] = hasText ? msn : image;
//     Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
//     return await (await fetch(url)).json().catch(error => error);
//   },
// };
//               }       
}             

      function determinarTarjetas(array){  
        let inicio = [];
        let fin = [];
        let datos = [];
        array.map(ele=>{
          if(ele.tag.includes('V1')){
          inicio.push(array.indexOf(ele))    
          }else if(ele.tag.includes('KWh')){
            fin.push(array.indexOf(ele))
          }});  
          datos.push(inicio,fin)
        
        return datos;
      }

      let extras1 ='|SD|DL:0.0.0:AT.0.0.0|';
      let extras2 = '|0|0|0|';
      let extras3 = '|0|0';

      function arrayDatos(array, id, fecha){
        let array1=[];        
        array1.push(id, extras1, fecha, extras2)                
        
        array1.push(array.map(ele=> ele.value).join("|"));    
        array1.push(extras3)      
        return array1.join('');
      }

      function tarjetas(datos){        
        let contador = 0
        while(contador < 8){
          arrayDatosAll=message.d.slice(datos[0][contador], datos[1][contador]+1)
          arrayPool.push(arrayDatos(arrayDatosAll, '63ceba0798fb2e3be69e9f8a', date))
          contador++
        }
      }

      tarjetas(determinarTarjetas(message.d))

      let arrayValoresPoolHVCA=[];
      let arrayHVCA = message.d.slice(0,7);        
      let arrayN1TGN = message.d.slice(message.d.findIndex(m => m.tag === 'nodo1:tgn1hvacV1'), (message.d.findIndex(m => m.tag === 'nodo1:tgn1hvacV1')+7));
               
      arrayHVCA.map(i => arrayValoresPoolHVCA.push(i.value))
      arrayN1TGN.map(i => arrayValoresPoolHVCA.push(i.value));

      let arrayValoresPoolCompresores=[];
      let arrayComp200 = message.d.slice(message.d.findIndex(m => m.tag === 'comp200hp:V1'), (message.d.findIndex(m => m.tag === 'comp200hp:V1')+14));

      let arrayN1comp = message.d.slice(message.d.findIndex(m => m.tag === 'nodo1:comp150hpV1'), (message.d.findIndex(m => m.tag === 'nodo1:comp150hpV1')+7));

      let arrayN2tng = message.d.slice(message.d.findIndex(m => m.tag === 'nodo2:tgn5comp150hpV1'), (message.d.findIndex(m => m.tag === 'nodo2:tgn5comp150hpV1')+14));
              
      arrayComp200.map(i => arrayValoresPoolCompresores.push(i.value));
      arrayN1comp.map(i => arrayValoresPoolCompresores.push(i.value));
      //arrayValoresPoolCompresores.push(message.d[42].value);
      arrayN2tng.map(i => arrayValoresPoolCompresores.push(i.value));

      let arrayValoresPoolPintura=[];
      let arrayPintura = message.d.slice(message.d.findIndex(m => m.tag === 'pintura:V1'), (message.d.findIndex(m => m.tag === 'pintura:V1')+7));
      arrayPintura.map(i => arrayValoresPoolPintura.push(i.value))

      dataPoolHVAC = `63ceba0798fb2e3be69e9f8a|SD|DL:0.0.0:AT.0.0.0|${date}|0|0|0|${arrayValoresPoolHVCA.join('|')}0|0`;
        
        //                                        0      1  2                 3      4 5 6      7             8               9               10            11              12            13                  14                15                16                17                18                19                  20                  21                  22                    23              24                    25                  26                  27                      28                   29                       30                      31                      32                    33                      34                        35                    36                        37                        38                    39                    40                          41                      42         43 44
        
      dataPoolcompresores = `63cebced98fb2e3be69e9f90|SD|DL:0.0.0:AT.0.0.0|${date}|0|0|0|${arrayValoresPoolCompresores.join("|")}0|0`;

      dataPoolPintura = `63ced3ad98fb2e3be69ea9c4|SD|DL:0.0.0:AT.0.0.0|${date}|0|0|0|${arrayValoresPoolPintura.join('|')}0|0`;

      console.log("HVAC \n",dataPoolHVAC);
      console.log("Compresores \n",dataPoolcompresores);
      console.log("Pintura \n",dataPoolPintura);
      
      let poolSaltillo = [dataPoolHVAC, dataPoolcompresores, dataPoolPintura];
        // data sent loop
        //HOST
      const delay = async (ms = 1000) =>
        new Promise((resolve) => setTimeout(resolve, ms));
        async function delaySendData() {
          for (let i = 0; i < poolSaltillo.length; i++) {
            const host = process.env.HOSTNAME;
            const net = require("net");
            //configuracion del puerto
            const port = process.env.PORT;
            //crear cliente
            const client1 = new net.Socket();
            //Conexion al puerto y host especificado
            client1.connect(port, function () {
              //Log conexion establecido
              console.log(`Client 1 :Connected to server on port ${port}`);
              client1.write(poolSaltillo[i]);
            });
            //respuesta del server
            client1.on("data", function (data) {
              console.log(`Client 1 received from server : ${data}`);
            });
            // cierre de socket
            client1.on("close", function () {
              console.log("Client 1 :Connection Closed");
            });
            client1.on("error", function (error) {
              console.error(`Connection Error ${error}`);
            });

            if (message.sequence == argv.count) {
              subscribed = true;
              if (subscribed && published) {
                resolve();
              }
            }
            await delay(1000);
          }
        }
        delaySendData();
      };

      await connection.subscribe(argv.topic, mqtt.QoS.AtLeastOnce, on_publish);
      let published_counts = 0;
      for (let op_idx = 0; op_idx < argv.count; ++op_idx) {
        const publish = async () => {
          const msg = {
            message: argv.message,
            sequence: op_idx + 1,
          };
          const json = JSON.stringify(msg);
          connection
            .publish(argv.topic, json, mqtt.QoS.AtLeastOnce)
            .then(() => {
              ++published_counts;
              if (published_counts == argv.count) {
                published = true;
                if (subscribed && published) {
                  resolve();
                }
              }
            });
        };
        setTimeout(publish, op_idx * 5000);
      }
    } catch (error) {
      reject(error);
    }
  });
}

async function main(argv) {
  // db connection
  try {

    // sequelize.authenticate();
    // sequelize.sync();
    console.log("Connected to DB");
  } catch (error) {
    console.log("Unable to connect to DB:", error);
  }

  common_args.apply_sample_arguments(argv);

  const connection = common_args.build_connection_from_cli_args(argv);

  // force node to wait 90 seconds before killing itself, promises do not keep node alive
  // ToDo: we can get rid of this but it requires a refactor of the native connection binding that includes
  //    pinning the libuv event loop while the connection is active or potentially active.
  const timer = setInterval(() => {}, 90 * 1000);

  await connection.connect().catch((error) => {
    console.log("Connect error: " + error);
    exit(-1);
  });
  await execute_session(connection, argv).catch((error) => {
    console.log("Session error: " + error);
    exit(-1);
  });
  await connection.disconnect().catch((error) => {
    console.log("Disconnect error: " + error), exit(-1);
  });

  // Allow node to die if the promise above resolved
  clearTimeout(timer);
}
