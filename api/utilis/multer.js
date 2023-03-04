import multer from "multer";
import path, { resolve } from "path";

const __dirname = resolve();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "api/public/images"));
  },
  filename: (req, file, cb) => {
    const types = /png|jpg|jpeg|webp|gif|webp|svg/;
    const ext = path.extname(file.originalname);
    if (types.test(ext)) {
      const uniqueSuffix = Date.now();
      cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    } else {
      cb(
        new Error("Only supported png,jpeg,jpg,gif,webp and svg format image")
      );
    }
  },
});

const upload = multer({ storage });
export default upload;
