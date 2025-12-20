import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";

// .env 파일에서 값을 가져옵니다.
const region = process.env.REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

// ✅ 수정됨: .env 파일에 적힌 이름(AWS_S3_BUCKET)으로 변경했습니다.
const bucket = process.env.AWS_S3_BUCKET; 

if (!region || !accessKeyId || !secretAccessKey || !bucket) {
  console.warn("[S3 ENV MISSING]", {
    REGION: !!region,
    AWS_ACCESS_KEY: !!accessKeyId,
    AWS_SECRET_ACCESS_KEY: !!secretAccessKey,
    AWS_S3_BUCKET: !!bucket, // 로그 이름도 명확하게 변경
  });
}

const s3 = new S3Client({
  region,
  credentials: { accessKeyId, secretAccessKey },
});

const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

// ✅ 기존 코드(라우트) 호환: s3ImageUpload("hotel").array("images", 5) 형태 유지
export const s3ImageUpload = (folder) =>
  multer({
    fileFilter: (req, file, cb) => {
      if (!allowedMimeTypes.includes(file.mimetype)) {
        const err = new Error("INVALID_IMAGE_TYPE");
        err.status = 400;
        return cb(err, false);
      }
      cb(null, true);
    },
    storage: multerS3({
      s3,
      bucket, // 위에서 정의한 변수(AWS_S3_BUCKET 값)가 들어갑니다.
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: (req, file, cb) => {
        const safeName = file.originalname
          .replace(/\s+/g, "_")
          .replace(/[^a-zA-Z0-9._-]/g, "");
        cb(null, `${folder}/${Date.now()}-${safeName}`);
      },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  });