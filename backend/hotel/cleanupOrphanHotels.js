// 관리자용: owner 정보가 없는 호텔들을 일괄 삭제하는 스크립트
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "../config/db.js";
import Hotel from "./model.js";

const run = async () => {
  try {
    await connectDB();

    // populate 로 owner 가 null 이거나, 실제 owner 필드가 비어 있는 호텔 찾기
    const orphanHotels = await Hotel.find().populate("owner", "name businessNumber");
    const targets = orphanHotels.filter(
      (h) => !h.owner || (!h.owner.name && !h.owner.businessNumber)
    );

    if (targets.length === 0) {
      console.log("삭제할 대상 호텔이 없습니다.");
      process.exit(0);
    }

    const ids = targets.map((h) => h._id);
    await Hotel.deleteMany({ _id: { $in: ids } });

    console.log(`삭제된 호텔 개수: ${ids.length}`);
    process.exit(0);
  } catch (err) {
    console.error("cleanupOrphanHotels 실행 중 오류:", err);
    process.exit(1);
  }
};

run();


