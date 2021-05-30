"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverInfo = void 0;
var path = require("path");
var fs = require("fs");
var rawInfo = fs.readFileSync(path.join(__dirname, "../serverInfo.json"));
exports.serverInfo = JSON.parse(rawInfo);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmVySW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9TZXJ2ZXJJbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM3QixJQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFlekIsSUFBTSxPQUFPLEdBQ1QsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7QUFDNUQsa0JBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xyXG5jb25zdCBmcyA9IHJlcXVpcmUoXCJmc1wiKTtcclxuXHJcbi8vIEludGVyZmFjZSB0aGF0IGRlZmluZXMgdGhlIHNlcnZlciBpbmZvXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVNlcnZlckluZm8ge1xyXG4gICAgc210cCA6IHtcclxuICAgICAgICBob3N0IDogc3RyaW5nLCBwb3J0OiBudW1iZXIsXHJcbiAgICAgICAgYXV0aCA6IHsgdXNlciA6IHN0cmluZywgcGFzcyA6IHN0cmluZyB9XHJcbiAgICB9LFxyXG4gICAgaW1hcCA6IHtcclxuICAgICAgICBob3N0IDogc3RyaW5nLCBwb3J0IDogbnVtYmVyLFxyXG4gICAgICAgIGF1dGggOiB7IHVzZXI6IHN0cmluZywgcGFzczogc3RyaW5nfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgbGV0IHNlcnZlckluZm8gOiBJU2VydmVySW5mbztcclxuY29uc3QgcmF3SW5mbzogc3RyaW5nID0gXHJcbiAgICBmcy5yZWFkRmlsZVN5bmMocGF0aC5qb2luKF9fZGlybmFtZSwgXCIuLi9zZXJ2ZXJJbmZvLmpzb25cIikpO1xyXG4gICAgc2VydmVySW5mbyA9IEpTT04ucGFyc2UocmF3SW5mbyk7Il19