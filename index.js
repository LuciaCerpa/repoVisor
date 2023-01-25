const iotsdk = require("aws-iot-device-sdk-v2");
const { exit } = require("process");
const mqtt = iotsdk.mqtt;
const TextDecoder = require("util").TextDecoder;
const yargs = require("yargs");
const common_args = require("./util/cli_args");

// env
require("dotenv").config();

// DB
const sequelize = require("./config/db");

// Register sequelize model
let Register;

const setRegister = (register) => {
  Register = register;
};

(function (tableName) {
  var useModel = require("./models/register")(tableName);
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
  const element = Register.build({ register: array });
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
        console.log(message); //mensaje en objeto de entrada
        createRegister(message.d, "subestacionSaltillo");
        date = message.ts.replace("T", " ").slice(0, 19);
        HVACV1 = message.d[0].value;
        HVACV2 = message.d[1].value;
        HVACV3 = message.d[2].value;
        HVACI1 = message.d[3].value;
        HVACI2 = message.d[4].value;
        HVACI3 = message.d[5].value;
        HVACKWh_E = message.d[6].value;
        comp200hpV1 = message.d[7].value;
        comp200hpV2 = message.d[8].value;
        comp200hpV3 = message.d[9].value;
        comp200hpI1 = message.d[10].value;
        comp200hpI2 = message.d[11].value;
        comp200hpI3 = message.d[12].value;
        comp200hpKWh_E = message.d[13].value;
        newcomp200hpV1 = message.d[14].value;
        newcomp200hpV2 = message.d[15].value;
        newcomp200hpV3 = message.d[16].value;
        newcomp200hpI1 = message.d[17].value;
        newcomp200hpI2 = message.d[18].value;
        newcomp200hpI3 = message.d[19].value;
        newcomp200hpKWh_E = message.d[20].value;
        pinturaV1 = message.d[21].value;
        pinturaV2 = message.d[22].value;
        pinturaV3 = message.d[23].value;
        pinturaI1 = message.d[24].value;
        pinturaI2 = message.d[25].value;
        pinturaI3 = message.d[26].value;
        pinturaKWh_E = message.d[27].value;
        nodo1comp150hpV1 = message.d[28].value;
        nodo1comp150hpV2 = message.d[29].value;
        nodo1comp150hpV3 = message.d[30].value;
        nodo1comp150hpA1 = message.d[31].value;
        nodo1comp150hpA2 = message.d[32].value;
        nodo1comp150hpA3 = message.d[33].value;
        nodo1comp15hpKWh = message.d[34].value;
        nodo1tgn1hvacV1 = message.d[35].value;
        nodo1tgn1hvacV2 = message.d[36].value;
        nodo1tgn1hvacV3 = message.d[37].value;
        nodo1tgn1hvacA1 = message.d[38].value;
        nodo1tgn1hvacA2 = message.d[39].value;
        nodo1tgn1hvacA3 = message.d[40].value;
        nodo1tgn1hvacKWh = message.d[41].value;
        DEVICE_ERROR_nodo2 = message.d[42].value;
        nodo2tgn5comp150hpV1 = message.d[43].value;
        nodo2tgn5comp150hpV2 = message.d[44].value;
        nodo2tgn5comp150hpV3 = message.d[45].value;
        nodo2tgn5comp150hpA1 = message.d[46].value;
        nodo2tgn5comp150hpA2 = message.d[47].value;
        nodo2tgn5comp150hpA3 = message.d[48].value;
        nodo2tgn5comp150hpKWh = message.d[49].value;
        nodo2tgn5comp250hpV1 = message.d[50].value;
        nodo2tgn5comp250hpV2 = message.d[51].value;
        nodo2tgn5comp250hpV3 = message.d[52].value;
        nodo2tgn5comp250hpA1 = message.d[53].value;
        nodo2tgn5comp250hpA2 = message.d[54].value;
        nodo2tgn5comp250hpA3 = message.d[55].value;
        nodo2tgn5comp250hpKWh = message.d[56].value;

        dataPoolHVAC = `63ceba0798fb2e3be69e9f8a|SD|DL:0.0.0:AT.0.0.0|${date}|0|0|0|${HVACV1}|${HVACV2}|${HVACV3}|${HVACI1}|${HVACI2}|${HVACI3}|${HVACKWh_E}|${nodo1tgn1hvacV1}|${nodo1tgn1hvacV2}|${nodo1tgn1hvacV3}|${nodo1tgn1hvacA1}|${nodo1tgn1hvacA2}|${nodo1tgn1hvacA3}|${nodo1tgn1hvacKWh}|0|0`;
        //                                        0      1  2                 3      4 5 6      7             8               9               10            11              12            13                  14                15                16                17                18                19                  20                  21                  22                    23              24                    25                  26                  27                      28                   29                       30                      31                      32                    33                      34                        35                    36                        37                        38                    39                    40                          41                      42         43 44
        dataPoolcompresores = `63cebced98fb2e3be69e9f90|SD|DL:0.0.0:AT.0.0.0|${date}|0|0|0|${comp200hpV1}|${comp200hpV2}|${comp200hpV3}|${comp200hpI1}|${comp200hpI2}|${comp200hpI3}|${comp200hpKWh_E}|${newcomp200hpV1}|${newcomp200hpV2}|${newcomp200hpV3}|${newcomp200hpI1}|${newcomp200hpI2}|${newcomp200hpI3}|${newcomp200hpKWh_E}|${nodo1comp150hpV1}|${nodo1comp150hpV2}|${nodo1comp150hpV3}|${nodo1comp150hpA1}|${nodo1comp150hpA2}|${nodo1comp150hpA3}|${nodo1comp15hpKWh}|${DEVICE_ERROR_nodo2}|${nodo2tgn5comp150hpV1}|${nodo2tgn5comp150hpV2}|${nodo2tgn5comp150hpV3}|${nodo2tgn5comp150hpA1}|${nodo2tgn5comp150hpA2}|${nodo2tgn5comp150hpA3}|${nodo2tgn5comp150hpKWh}|${nodo2tgn5comp250hpV1}|${nodo2tgn5comp250hpV2}|${nodo2tgn5comp250hpV3}|${nodo2tgn5comp250hpA1}|${nodo2tgn5comp250hpA2}|${nodo2tgn5comp250hpA3}|${nodo2tgn5comp250hpKWh}|0|0`;
        dataPoolPintura = `63ced3ad98fb2e3be69ea9c4|SD|DL:0.0.0:AT.0.0.0|${date}|0|0|0|${pinturaV1}|${pinturaV2}|${pinturaV3}|${pinturaI1}|${pinturaI2}|${pinturaI3}|${pinturaKWh_E}|0|0`;

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
            client1.connect(port, host, function () {
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
    sequelize.authenticate();
    sequelize.sync();
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
