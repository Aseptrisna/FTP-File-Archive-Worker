const worker = require("./src");

const main = async () => {
    console.log("Worker Running....");
    await worker.main()

}

main()