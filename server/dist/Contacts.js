"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worker = void 0;
var path = __importStar(require("path"));
var Datastore = require("nedb");
var Worker = /** @class */ (function () {
    function Worker() {
        this.db = new Datastore({
            filename: path.join(__dirname, "contacts.db"),
            autoload: true,
        });
    }
    Worker.prototype.listContacts = function () {
        var _this = this;
        return new Promise(function (inResolve, inReject) {
            _this.db.find({}, function (inError, inDocs) {
                if (inError) {
                    inReject(inError);
                }
                else {
                    inResolve(inDocs);
                }
            });
        });
    };
    /**
     * Add a new contact.
     *
     * @param  inContact The contact to add.
     * @return           A promise that eventually resolves to an IContact object.
     */
    Worker.prototype.addContact = function (inContact) {
        var _this = this;
        return new Promise(function (inResolve, inReject) {
            _this.db.insert(inContact, function (inError, inNewDoc) {
                if (inError) {
                    inReject(inError);
                }
                else {
                    inResolve(inNewDoc);
                }
            });
        });
    };
    Worker.prototype.deleteContact = function (inID) {
        var _this = this;
        return new Promise(function (inResolve, inReject) {
            _this.db.remove({ _id: inID }, {}, function (inError, inNumRemoved) {
                if (inError) {
                    inReject(inError);
                }
                else {
                    inResolve('Deleted');
                }
            });
        });
    };
    return Worker;
}());
exports.Worker = Worker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGFjdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvQ29udGFjdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHlDQUE2QjtBQUM3QixJQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFRbEM7SUFFRTtRQUNFLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxTQUFTLENBQUM7WUFDdEIsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQztZQUM3QyxRQUFRLEVBQUUsSUFBSTtTQUNmLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSw2QkFBWSxHQUFuQjtRQUFBLGlCQVVDO1FBVEMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLFNBQVMsRUFBRSxRQUFRO1lBQ3JDLEtBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxVQUFDLE9BQWMsRUFBRSxNQUFrQjtnQkFDbEQsSUFBSSxPQUFPLEVBQUU7b0JBQ1gsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUNuQjtxQkFBTTtvQkFDTCxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ25CO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLDJCQUFVLEdBQWpCLFVBQWtCLFNBQW1CO1FBQXJDLGlCQVVDO1FBVEMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLFNBQVMsRUFBRSxRQUFRO1lBQ3JDLEtBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxVQUFDLE9BQXFCLEVBQUUsUUFBa0I7Z0JBQ2xFLElBQUksT0FBTyxFQUFFO29CQUNYLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDbkI7cUJBQU07b0JBQ0wsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUNyQjtZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sOEJBQWEsR0FBcEIsVUFBcUIsSUFBWTtRQUFqQyxpQkFjQztRQWJDLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxTQUFTLEVBQUUsUUFBUTtZQUNyQyxLQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FDWixFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFDYixFQUFFLEVBQ0YsVUFBQyxPQUFxQixFQUFFLFlBQW9CO2dCQUMxQyxJQUFJLE9BQU8sRUFBRTtvQkFDWCxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ25CO3FCQUFNO29CQUNMLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDdEI7WUFDSCxDQUFDLENBQ0YsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILGFBQUM7QUFBRCxDQUFDLEFBdERELElBc0RDO0FBdERZLHdCQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5lZGIgZnJvbSBcIm5lZGJcIjtcclxuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5jb25zdCBEYXRhc3RvcmUgPSByZXF1aXJlKFwibmVkYlwiKTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUNvbnRhY3Qge1xyXG4gIF9pZD86IG51bWJlcjtcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgZW1haWw6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFdvcmtlciB7XHJcbiAgcHJpdmF0ZSBkYjogTmVkYjtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuZGIgPSBuZXcgRGF0YXN0b3JlKHtcclxuICAgICAgZmlsZW5hbWU6IHBhdGguam9pbihfX2Rpcm5hbWUsIFwiY29udGFjdHMuZGJcIiksXHJcbiAgICAgIGF1dG9sb2FkOiB0cnVlLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbGlzdENvbnRhY3RzKCk6IFByb21pc2U8SUNvbnRhY3RbXT4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChpblJlc29sdmUsIGluUmVqZWN0KSA9PiB7XHJcbiAgICAgIHRoaXMuZGIuZmluZCh7fSwgKGluRXJyb3I6IEVycm9yLCBpbkRvY3M6IElDb250YWN0W10pID0+IHtcclxuICAgICAgICBpZiAoaW5FcnJvcikge1xyXG4gICAgICAgICAgaW5SZWplY3QoaW5FcnJvcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGluUmVzb2x2ZShpbkRvY3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBhIG5ldyBjb250YWN0LlxyXG4gICAqXHJcbiAgICogQHBhcmFtICBpbkNvbnRhY3QgVGhlIGNvbnRhY3QgdG8gYWRkLlxyXG4gICAqIEByZXR1cm4gICAgICAgICAgIEEgcHJvbWlzZSB0aGF0IGV2ZW50dWFsbHkgcmVzb2x2ZXMgdG8gYW4gSUNvbnRhY3Qgb2JqZWN0LlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhZGRDb250YWN0KGluQ29udGFjdDogSUNvbnRhY3QpOiBQcm9taXNlPElDb250YWN0PiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKGluUmVzb2x2ZSwgaW5SZWplY3QpID0+IHtcclxuICAgICAgdGhpcy5kYi5pbnNlcnQoaW5Db250YWN0LCAoaW5FcnJvcjogRXJyb3IgfCBudWxsLCBpbk5ld0RvYzogSUNvbnRhY3QpID0+IHtcclxuICAgICAgICBpZiAoaW5FcnJvcikge1xyXG4gICAgICAgICAgaW5SZWplY3QoaW5FcnJvcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGluUmVzb2x2ZShpbk5ld0RvYyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRlbGV0ZUNvbnRhY3QoaW5JRDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgoaW5SZXNvbHZlLCBpblJlamVjdCkgPT4ge1xyXG4gICAgICB0aGlzLmRiLnJlbW92ZShcclxuICAgICAgICB7IF9pZDogaW5JRCB9LFxyXG4gICAgICAgIHt9LFxyXG4gICAgICAgIChpbkVycm9yOiBFcnJvciB8IG51bGwsIGluTnVtUmVtb3ZlZDogTnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICBpZiAoaW5FcnJvcikge1xyXG4gICAgICAgICAgICBpblJlamVjdChpbkVycm9yKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGluUmVzb2x2ZSgnRGVsZXRlZCcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=