namespace sphero {
    //% block="drive to ( %x|m, %y|m ) at speed %speed| with heading %heading|"
    //% speed.min=0 speed.max=2
    //% heading.min=0 heading.max=359
    //% subcategory=Extension
    export function driveToPosition(heading: number, x: number, y: number, speed: number): void {
        // For other drive functions, the flag 0x01 is used to indicate reverse. It is not needed
        // to drive to an internal reference position
        let flags: number = 0x00;

        let messageData: Array<number> = [speed];
        let headingArray: Array<number> = Utilities.int16ToByteArray(heading);

        for (let i: number = 0; i < headingArray.length; i++) {
            messageData.push(headingArray[i]);
        }

        messageData.push(flags);

        let apiMessage = buildApiCommandMessageWithDefaultFlags(
            ApiTargetsAndSources.robotStTarget,
            ApiTargetsAndSources.serviceSource,
            DriveCommands.driveDeviceId,
            DriveCommandsExt.driveToPositionSI,
            messageData
        );

        serial.writeBuffer(pins.createBufferFromArray(apiMessage.messageRawBytes));
    }

    //% block="reset inertial measurement unit"
    //% subcategory=Extension
    export function resetLocatorXY(): void {
        let apiMessage = buildApiCommandMessageWithDefaultFlags(
            ApiTargetsAndSources.robotStTarget,
            ApiTargetsAndSources.serviceSource,
            SensorCommandsExt.sensorDeviceId,
            SensorCommandsExt.resetLocatorXY,
            null
        );

        serial.writeBuffer(pins.createBufferFromArray(apiMessage.messageRawBytes));
    }
}