"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worker = void 0;
var nodemailer = require("nodemailer");
var Worker = /** @class */ (function () {
    function Worker(inServerInfo) {
        Worker.serverInfo = inServerInfo;
    }
    Worker.prototype.sendMessage = function (inOption) {
        return new Promise(function (inResolve, inReject) {
            var transport = nodemailer.createTransport(Worker.serverInfo.smtp);
            transport.sendMail(inOption, function (inError, inInfo) {
                if (inError) {
                    inReject(inError);
                }
                else {
                    inResolve('Sent');
                }
            });
        });
    };
    return Worker;
}());
exports.Worker = Worker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU01UUC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9TTVRQLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLElBQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUV6QztJQUVJLGdCQUFZLFlBQXlCO1FBQ2pDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsWUFBWSxDQUFDO0lBQ3JDLENBQUM7SUFFTSw0QkFBVyxHQUFsQixVQUFtQixRQUF5QjtRQUV4QyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsU0FBUyxFQUFFLFFBQVE7WUFDbkMsSUFBTSxTQUFTLEdBQVMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNFLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUN2QixVQUFDLE9BQXFCLEVBQUUsTUFBdUI7Z0JBQzNDLElBQUksT0FBTyxFQUFFO29CQUNULFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQTtpQkFDcEI7cUJBQU07b0JBQ0gsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUNyQjtZQUNMLENBQUMsQ0FBQyxDQUFBO1FBQ1YsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBQ0wsYUFBQztBQUFELENBQUMsQUFwQkQsSUFvQkM7QUFwQlksd0JBQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWFpbCBmcm9tIFwibm9kZW1haWxlci9saWIvbWFpbGVyXCI7XHJcbmltcG9ydCB7IFNlbmRNYWlsT3B0aW9ucywgU2VudE1lc3NhZ2VJbmZvIH0gZnJvbSBcIm5vZGVtYWlsZXJcIjtcclxuaW1wb3J0IHsgSVNlcnZlckluZm8gfSBmcm9tIFwiLi9TZXJ2ZXJJbmZvXCI7XHJcbmNvbnN0IG5vZGVtYWlsZXIgPSByZXF1aXJlKFwibm9kZW1haWxlclwiKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBXb3JrZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgc2VydmVySW5mbzogSVNlcnZlckluZm87XHJcbiAgICBjb25zdHJ1Y3RvcihpblNlcnZlckluZm86IElTZXJ2ZXJJbmZvKSB7XHJcbiAgICAgICAgV29ya2VyLnNlcnZlckluZm8gPSBpblNlcnZlckluZm87XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlbmRNZXNzYWdlKGluT3B0aW9uOiBTZW5kTWFpbE9wdGlvbnMpOlxyXG4gICAgUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKGluUmVzb2x2ZSwgaW5SZWplY3QpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdHJhbnNwb3J0OiBNYWlsID0gbm9kZW1haWxlci5jcmVhdGVUcmFuc3BvcnQoV29ya2VyLnNlcnZlckluZm8uc210cCk7XHJcbiAgICAgICAgICAgIHRyYW5zcG9ydC5zZW5kTWFpbChpbk9wdGlvbixcclxuICAgICAgICAgICAgICAgIChpbkVycm9yOiBFcnJvciB8IG51bGwsIGluSW5mbzogU2VudE1lc3NhZ2VJbmZvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5SZWplY3QoaW5FcnJvcilcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpblJlc29sdmUoJ1NlbnQnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn0iXX0=