"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var multer_1 = __importDefault(require("multer"));
var sharp_1 = __importDefault(require("sharp"));
var fs_1 = __importDefault(require("fs"));
var cors_1 = __importDefault(require("cors"));
var cloudinary_1 = __importDefault(require("cloudinary"));
var app = (0, express_1.default)();
cloudinary_1.default.v2.config({
    cloud_name: 'dy4gkixf2',
    api_key: '376243223673282',
    api_secret: 'v1Fm_7RfhZ2n4ViX14CGS7LLdtY',
});
app.use((0, cors_1.default)({
    origin: '*',
}));
var port = process.env.PORT || 5000;
console.log('port', port);
var storage = multer_1.default.memoryStorage();
var upload = (0, multer_1.default)({ storage: storage });
app.use(express_1.default.static('./uploads'));
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.post('/api/upload', upload.single('image'), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var file, _a, buffer, originalname, timeStamp, fileName, resImage, imageUrl;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                fs_1.default.access('./uploads', function (err) {
                    if (err) {
                        fs_1.default.mkdirSync('./uploads');
                    }
                });
                file = req.file;
                _a = file, buffer = _a.buffer, originalname = _a.originalname;
                timeStamp = new Date().toISOString();
                fileName = "".concat(timeStamp, "-").concat(originalname, ".webp");
                return [4 /*yield*/, (0, sharp_1.default)(buffer).webp({ quality: 50 }).toFile("./uploads/".concat(fileName))];
            case 1:
                _b.sent();
                return [4 /*yield*/, cloudinary_1.default.v2.uploader.upload("./uploads/".concat(fileName), {
                        public_id: "".concat(fileName),
                    })];
            case 2:
                resImage = _b.sent();
                imageUrl = resImage.secure_url;
                res.status(200).json({ imageUrl: imageUrl });
                return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
