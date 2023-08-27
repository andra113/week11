import moment from "moment-timezone";


function loggerTimestamp(message: string) {
    const timestamp = moment().tz('Asia/Jakarta');

    const formattedTime = timestamp.format('YYYY-MM-DD HH:mm');
    console.log(`${formattedTime} - ${message}`);
}

export {loggerTimestamp}
